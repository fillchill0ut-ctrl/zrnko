// Zrnko – generátor denních lekcí.
// Spouští ho GitHub Actions každé ráno. Píše lekce přes bezplatné API Groq (klíč v secretu GROQ_API_KEY).
// Umí i Mistral (MISTRAL_API_KEY) nebo OpenRouter (OPENROUTER_API_KEY), pokud je v repozitáři jejich klíč.
// Postup: vybere témata ze zásobníku (topics.json) → napíše lekci → druhý průchod ji zkontroluje
// a opraví fakta → ověří formát → přidá do daily.json.
// Zkušební běh bez AI: ZRNKO_MOCK=1 node scripts/generate.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MOCK = process.env.ZRNKO_MOCK === "1";
const PER_DAY = Math.max(1, Math.min(5, parseInt(process.env.ZRNKO_PER_DAY || "2", 10)));
const PROVIDERS = [
  { name: "Mistral", key: process.env.MISTRAL_API_KEY, url: "https://api.mistral.ai/v1/chat/completions",
    models: ["mistral-large-latest", "mistral-medium-latest", "mistral-small-latest"] },
  { name: "Groq", key: process.env.GROQ_API_KEY, url: "https://api.groq.com/openai/v1/chat/completions",
    models: ["openai/gpt-oss-120b", "moonshotai/kimi-k2-instruct-0905", "llama-3.3-70b-versatile"] },
  { name: "OpenRouter", key: process.env.OPENROUTER_API_KEY, url: "https://openrouter.ai/api/v1/chat/completions",
    models: ["meta-llama/llama-3.3-70b-instruct:free"] }
].filter(p => p.key);
const CATS = ["veda","telo","dejiny","literatura","umeni","jazyk","mytologie","sport","jak","priroda","vesmir","ekonomie"];
const today = process.env.ZRNKO_DATE || new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Prague" });
const sleep = ms => new Promise(r => setTimeout(r, ms));

const readJSON = (f, d) => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, f), "utf8")); } catch { return d; } };
const daily = readJSON("daily.json", []);
const topics = readJSON("topics.json", []);

// názvy už existujících lekcí, aby se témata neopakovala
function baseTitles() {
  try {
    const win = {}; new Function("window", fs.readFileSync(path.join(ROOT, "lessons.js"), "utf8"))(win);
    return (win.LESSONS || []).map(l => l.title);
  } catch { return []; }
}
const norm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
const existing = new Set([...baseTitles(), ...daily.map(d => d.title), ...daily.map(d => d.topic)].map(norm));
const usedTopics = new Set(daily.map(d => norm(d.topic)));

// ---------- volání modelu ----------
async function chat(messages, maxTokens) {
  if (MOCK) return mockAnswer(messages);
  if (!PROVIDERS.length) throw new Error("Chybí klíč k AI. V repozitáři přidej secret GROQ_API_KEY (Settings → Secrets and variables → Actions).");
  let lastErr;
  for (const p of PROVIDERS) {
    for (const model of p.models) {
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          await sleep(1500);
          const res = await fetch(p.url, {
            method: "POST",
            headers: { "Authorization": "Bearer " + p.key, "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({ model, messages, temperature: 0.4, max_tokens: maxTokens, response_format: { type: "json_object" } })
          });
          if (res.status === 429) { lastErr = new Error(p.name + " " + model + ": limit požadavků (429)"); await sleep(30000); continue; }
          if (!res.ok) { lastErr = new Error(p.name + " " + model + ": HTTP " + res.status + " " + (await res.text()).slice(0, 300)); break; }
          const data = await res.json();
          const text = data?.choices?.[0]?.message?.content;
          if (!text) { lastErr = new Error(p.name + " " + model + ": prázdná odpověď"); continue; }
          console.log("  model:", p.name, model);
          return text;
        } catch (e) { lastErr = e; }
      }
    }
  }
  throw lastErr || new Error("Žádný model neodpověděl.");
}
function parseJSON(text) {
  let t = String(text).trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  const a = t.indexOf("{"), b = t.lastIndexOf("}");
  if (a < 0 || b < a) throw new Error("Odpověď neobsahuje JSON.");
  return JSON.parse(t.slice(a, b + 1));
}

// ---------- zadání ----------
const STYLE = `Píšeš lekce pro českou vzdělávací aplikaci Zrnko. Čtenář je zvídavý dospělý bez odborného vzdělání, čte na mobilu místo scrollování sociálních sítí.
PRAVIDLA OBSAHU:
- Používej jen ověřená, obecně přijímaná fakta (učebnice, encyklopedie, odborný konsenzus). Nic si nevymýšlej.
- Když si číslem, datem, jménem nebo citátem nejsi jistý, napiš to obecněji („kolem roku…“, „zhruba…“) nebo to vynech.
- Nevkládej doslovné citáty, které nedokážeš ověřit. Žádná aktuální politika ani zprávy z posledních let.
- Kde je věc sporná nebo vědci neví, řekni to.
PRAVIDLA STYLU:
- Česky, spisovně, krátké jasné věty, oslovuj čtenáře „ty“. Vysvětluj příčiny a souvislosti, ne jen fakta.
- Nepoužívej pomlčky jako vsuvky, rétorické triky typu „nejde o X, ale o Y“ ani fráze jako „stojí za zmínku“.
FORMÁT:
- 5 karet. Každá karta: "h" (krátký nadpis), "p" (pole se 2 odstavci po 2 až 4 větách).
- Ve 2 kartách přidej "an": přirovnání z běžného života, které věc pomůže představit.
- Ve 2 kartách přidej "ln": jedna až dvě věty, jak karta souvisí s předchozí kartou.
- V 1 nebo 2 kartách můžeš přidat "tip": krátká ověřená zajímavost.
- Poslední karta má "remember": shrnutí celé lekce do 1 až 2 vět.
- Důležité pojmy obal do **dvou hvězdiček**. Jeden až dva odborné pojmy můžeš zapsat jako [[pojem|krátké vysvětlení]].
- Kvíz: 5 otázek. Každá má "q", "a" (4 možnosti), "c" (index správné odpovědi 0 až 3), "why" (1 věta vysvětlení). Poslední otázka je typu pravda/nepravda: "a": ["Pravda","Nepravda"].
- Špatné odpovědi musí být věrohodné, ale jednoznačně špatné. Odpověď musí jít z textu lekce.
Odpovídej POUZE platným JSON objektem:
{"cat":"…","title":"…","sub":"jedna věta podtitulu","cards":[{"h":"…","p":["…","…"],"an":"…","ln":"…","tip":"…"},…,{"h":"…","p":["…","…"],"remember":"…"}],"quiz":[{"q":"…","a":["…","…","…","…"],"c":0,"why":"…"},…]}`;

const EXAMPLE = `Ukázka jedné karty v požadovaném stylu:
{"h":"Roztančená voda","p":["Molekula vody se chová jako malý magnet: na jedné straně je trochu kladná, na druhé trochu záporná. Elektrické pole mikrovln mění směr miliardkrát za sekundu a molekuly vody se pořád natáčejí podle něj.","Přitom do sebe narážejí a třou se o okolní molekuly. Ten pohyb se mění v **teplo**. Proto se nejrychleji ohřívá jídlo, které obsahuje hodně vody."],"an":"Představ si sál plný lidí, kterým někdo miliardkrát za sekundu zavelí „čelem vzad“. Pořád by do sebe vráželi a brzy by se všichni zapotili."}`;

async function writeLesson(topic) {
  const user = `Téma lekce: ${topic.t}
Kategorie (cat): ${topic.cat}${topic.n ? "\nPoznámka k tématu: " + topic.n : ""}
Název lekce může být otázka nebo krátké tvrzení, ať čtenáře láká. ${EXAMPLE}`;
  return parseJSON(await chat([{ role: "system", content: STYLE }, { role: "user", content: user }], 8000));
}
async function factCheck(lesson) {
  const sys = `Jsi pečlivý redaktor a ověřovatel faktů české vzdělávací aplikace. Dostaneš lekci ve formátu JSON.
Úkoly:
1. Projdi každé faktické tvrzení (data, čísla, jména, místa, příčiny). Co není podle odborného konsenzu pravda, oprav. Co je nejisté, přeformuluj obecněji nebo odstraň.
2. Zkontroluj kvíz: správná odpověď (index "c") musí být opravdu správná a ostatní jednoznačně špatné. Otázky musí jít zodpovědět z textu lekce.
3. Oprav češtinu, překlepy a neobratné věty. Zachovej styl a délku.
4. Zachovej přesně stejnou strukturu JSON a stejné klíče.
Vrať POUZE opravený JSON objekt.`;
  return parseJSON(await chat([{ role: "system", content: sys }, { role: "user", content: JSON.stringify(lesson) }], 8000));
}
async function proposeTopics(k) {
  const taken = [...existing].slice(-400).join("; ");
  const sys = "Navrhuješ témata pro krátké vzdělávací lekce v češtině. Témata musí být nadčasová, ověřitelná a zajímavá pro běžného dospělého. Žádná aktuální politika.";
  const user = `Navrhni ${k} nových témat. Kategorie vyber z: ${CATS.join(", ")}. Střídej kategorie. Tato témata už existují, neopakuj je ani v jiné podobě: ${taken}
Vrať JSON {"topics":[{"cat":"…","t":"…"}]}`;
  const j = parseJSON(await chat([{ role: "system", content: sys }, { role: "user", content: user }], 800));
  return (j.topics || []).filter(t => t && t.t && CATS.includes(t.cat));
}

// ---------- kontrola formátu ----------
const s = (x, max) => (x == null ? undefined : String(x).trim().slice(0, max || 1200) || undefined);
function validate(l, topic) {
  if (!l || typeof l !== "object") throw new Error("Lekce není objekt.");
  const title = s(l.title, 90); if (!title) throw new Error("Chybí název.");
  const cards = (Array.isArray(l.cards) ? l.cards : []).filter(c => c && c.h).map(c => {
    const p = (Array.isArray(c.p) ? c.p : [c.p]).map(x => s(x, 900)).filter(Boolean);
    const o = { h: s(c.h, 80), p };
    for (const k of ["an", "ln", "tip", "remember"]) { const v = s(c[k], 600); if (v) o[k] = v; }
    return o;
  }).filter(c => c.p.length);
  if (cards.length < 4 || cards.length > 7) throw new Error("Lekce má " + cards.length + " karet.");
  if (!cards[cards.length - 1].remember) throw new Error("Chybí shrnutí na poslední kartě.");
  const quiz = (Array.isArray(l.quiz) ? l.quiz : []).filter(q => q && q.q && Array.isArray(q.a) && q.a.length >= 2 && q.a.length <= 4)
    .map(q => ({ q: s(q.q, 300), a: q.a.map(x => s(x, 160)).filter(Boolean), c: parseInt(q.c, 10), why: s(q.why, 400) || "" }))
    .filter(q => q.a.length >= 2 && q.c >= 0 && q.c < q.a.length && new Set(q.a).size === q.a.length);
  if (quiz.length < 3) throw new Error("Kvíz má málo platných otázek.");
  const cat = CATS.includes(l.cat) ? l.cat : topic.cat;
  return { cat, title, sub: s(l.sub, 160) || "", cards, quiz: quiz.slice(0, 6) };
}

// ---------- hlavní běh ----------
async function main() {
  const doneToday = daily.filter(d => d.date === today).length;
  const need = PER_DAY - doneToday;
  if (need <= 0) { console.log(`Na ${today} už jsou ${doneToday} lekce. Hotovo.`); return; }

  let queue = topics.filter(t => !usedTopics.has(norm(t.t)) && !existing.has(norm(t.t)));
  if (queue.length < need) {
    console.log("Zásobník témat dochází, nechávám navrhnout nová.");
    try { queue = queue.concat((await proposeTopics(need * 3)).filter(t => !existing.has(norm(t.t)))); }
    catch (e) { console.log("  Návrh témat selhal:", e.message); }
  }
  // střídání kategorií: nevybírej dvakrát stejnou kategorii za den
  const picked = [];
  for (const t of queue) { if (picked.length >= need + 2) break; if (!picked.some(p => p.cat === t.cat)) picked.push(t); }
  for (const t of queue) { if (picked.length >= need + 2) break; if (!picked.includes(t)) picked.push(t); }

  let made = 0;
  for (const topic of picked) {
    if (made >= need) break;
    console.log(`Téma: ${topic.t} (${topic.cat})`);
    try {
      const draft = validate(await writeLesson(topic), topic);
      let final = draft;
      try { final = validate(await factCheck(draft), topic); console.log("  kontrola faktů: hotovo"); }
      catch (e) { console.log("  kontrola faktů selhala, lekci přeskakuji:", e.message); continue; }
      if (existing.has(norm(final.title))) { console.log("  stejný název už existuje, přeskakuji"); continue; }
      const id = `d-${today}-${doneToday + made + 1}`;
      daily.push({ id, date: today, topic: topic.t, ai: true, ...final });
      existing.add(norm(final.title)); existing.add(norm(topic.t));
      made++;
      console.log(`  ✓ ${final.title}`);
    } catch (e) { console.log("  chyba:", e.message); }
  }
  fs.writeFileSync(path.join(ROOT, "daily.json"), JSON.stringify(daily, null, 1) + "\n");
  console.log(`Přidáno lekcí: ${made}. Celkem nových lekcí: ${daily.length}.`);
  if (made === 0) process.exitCode = 1;
}

// ---------- zkušební odpovědi bez AI ----------
function mockAnswer(messages) {
  const sys = messages[0].content;
  if (sys.startsWith("Navrhuješ")) return JSON.stringify({ topics: [{ cat: "veda", t: "Zkušební téma " + Date.now() }] });
  if (sys.startsWith("Jsi pečlivý")) return messages[1].content;
  const topic = (messages[1].content.match(/Téma lekce: (.*)/) || [])[1] || "Zkouška";
  const cat = (messages[1].content.match(/Kategorie \(cat\): (\w+)/) || [])[1] || "veda";
  const card = (i, last) => Object.assign({ h: "Karta " + i, p: ["Zkušební odstavec o tématu " + topic + " s **důležitým pojmem**.", "Druhý odstavec s [[pojmem|vysvětlení pojmu]]."] }, i === 1 ? { an: "Zkušební přirovnání." } : {}, i === 2 ? { ln: "Zkušební souvislost." } : {}, last ? { remember: "Zkušební shrnutí." } : {});
  return JSON.stringify({ cat, title: topic, sub: "Zkušební lekce bez AI.", cards: [1, 2, 3, 4, 5].map(i => card(i, i === 5)),
    quiz: [1, 2, 3, 4].map(i => ({ q: "Otázka " + i + "?", a: ["Správně", "Špatně A", "Špatně B", "Špatně C"], c: 0, why: "Protože." })).concat([{ q: "Pravda, nebo nepravda: tohle je zkouška.", a: ["Pravda", "Nepravda"], c: 0, why: "Je." }]) });
}

main().catch(e => { console.error(e); process.exitCode = 1; });
