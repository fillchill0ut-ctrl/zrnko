// Ilustrace (obálky lekcí) a schémata do karet. Vše kreslené jako SVG, bez externích obrázků.
(function(){
var n = 0;
function uid(){ return "z" + (++n); }
function lg(id, a, b, horiz){ return '<linearGradient id="'+id+'" x1="0" y1="0" x2="'+(horiz?1:0)+'" y2="'+(horiz?0:1)+'"><stop offset="0" stop-color="'+a+'"/><stop offset="1" stop-color="'+b+'"/></linearGradient>'; }
function rg(id, a, b){ return '<radialGradient id="'+id+'"><stop offset="0" stop-color="'+a+'"/><stop offset="1" stop-color="'+b+'"/></radialGradient>'; }
function bg(id, a, b){ return '<defs>'+lg(id,a,b)+'</defs><rect width="320" height="180" fill="url(#'+id+')"/>'; }
function rnd(seed){ return function(){ seed = (seed*9301+49297)%233280; return seed/233280; }; }
function stars(k, seed, maxY, col){ var r=rnd(seed), s=""; for(var i=0;i<k;i++){ s+='<circle cx="'+(r()*320).toFixed(1)+'" cy="'+(r()*maxY).toFixed(1)+'" r="'+(0.6+r()*1.4).toFixed(1)+'" fill="'+(col||"#fff")+'" opacity="'+(0.4+r()*0.6).toFixed(2)+'"/>'; } return s; }

// ---------- obálky ----------
var SC = {
pamet: function(u){ return bg(u,"#7A4FC0","#3B2A7E")+
  '<circle cx="270" cy="30" r="60" fill="#fff" opacity=".06"/>'+
  '<path d="M118 180 L122 142 C98 130 90 102 96 78 C104 42 138 22 172 26 C206 30 226 56 224 86 C223 96 230 102 234 110 L226 114 C228 122 226 130 218 132 C218 142 210 148 198 148 L196 180Z" fill="#F4B79F"/>'+
  '<path d="M126 70 C130 44 156 34 178 38 C200 42 212 60 208 82 C204 102 186 110 166 108 C144 106 124 94 126 70Z" fill="#5B3A9E"/>'+
  '<rect x="142" y="56" width="18" height="18" rx="3" fill="#F7C548"/><rect x="164" y="54" width="18" height="18" rx="3" fill="#5FD3C4"/><rect x="152" y="78" width="18" height="18" rx="3" fill="#F28AB2"/><rect x="176" y="76" width="16" height="16" rx="3" fill="#F7C548" opacity=".8"/>'+
  '<g transform="rotate(14 258 70)"><rect x="248" y="60" width="20" height="20" rx="3" fill="#5FD3C4"/></g><g transform="rotate(-18 280 120)"><rect x="270" y="110" width="18" height="18" rx="3" fill="#F28AB2"/></g><g transform="rotate(30 240 140)"><rect x="232" y="132" width="15" height="15" rx="3" fill="#F7C548"/></g>'+
  '<path d="M224 70 C236 66 244 66 250 68M226 112 C240 116 254 118 268 118" stroke="#fff" stroke-width="2" stroke-dasharray="3 5" fill="none" opacity=".6"/>'; },
spanek: function(u){ return bg(u,"#141B45","#3C4A94")+stars(40,7,120)+
  '<circle cx="232" cy="62" r="34" fill="#FCE9A8"/><circle cx="248" cy="52" r="32" fill="#1B2458"/>'+
  '<g fill="#fff" opacity=".9"><ellipse cx="90" cy="150" rx="70" ry="22"/><ellipse cx="150" cy="140" rx="50" ry="26"/><ellipse cx="220" cy="156" rx="80" ry="22"/><ellipse cx="300" cy="150" rx="40" ry="18"/></g>'+
  '<g fill="#FCE9A8" font-family="Georgia,serif" font-weight="700"><text x="96" y="92" font-size="18">z</text><text x="112" y="72" font-size="26">z</text><text x="134" y="48" font-size="34">Z</text></g>'; },
kofein: function(u){ return bg(u,"#D99A62","#8A4F2C")+
  '<ellipse cx="160" cy="160" rx="96" ry="14" fill="#6E3B1F" opacity=".5"/><ellipse cx="160" cy="150" rx="88" ry="16" fill="#F6E7D3"/>'+
  '<path d="M104 78 H216 V118 C216 140 194 152 160 152 C126 152 104 140 104 118Z" fill="#FFFFFF"/><path d="M216 90 C246 90 246 128 214 126" stroke="#fff" stroke-width="10" fill="none"/>'+
  '<ellipse cx="160" cy="78" rx="56" ry="10" fill="#5A2E15"/><ellipse cx="160" cy="77" rx="40" ry="5" fill="#8A4F2C" opacity=".7"/>'+
  '<g stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".75"><path d="M138 60 C130 48 146 40 138 26"/><path d="M162 58 C154 44 170 36 162 18"/><path d="M186 60 C178 48 194 40 186 28"/></g>'+
  '<g fill="#4A230F"><ellipse cx="40" cy="60" rx="10" ry="14" transform="rotate(-30 40 60)"/><ellipse cx="276" cy="40" rx="9" ry="13" transform="rotate(25 276 40)"/><ellipse cx="290" cy="110" rx="10" ry="14" transform="rotate(-10 290 110)"/></g>'+
  '<g stroke="#D99A62" stroke-width="2"><path d="M36 50 Q44 60 38 72"/><path d="M272 30 Q280 40 276 52"/></g>'; },
ockovani: function(u){ return bg(u,"#2E9A8E","#1C5470")+
  '<path d="M160 20 L218 40 V92 C218 128 192 152 160 166 C128 152 102 128 102 92 V40Z" fill="#EAF6F3"/><path d="M160 34 L206 50 V92 C206 120 186 140 160 152Z" fill="#CBEBE4"/>'+
  '<path d="M148 92 h24 M160 80 v24" stroke="#2E9A8E" stroke-width="10" stroke-linecap="round"/>'+
  '<g stroke="#F7C548" stroke-width="4" stroke-linecap="round" fill="none"><path d="M54 120 v-16 l-8 -9 M54 104 l8 -9"/><path d="M262 64 v-16 l-8 -9 M262 48 l8 -9"/><path d="M78 52 v-14 l-7 -8 M78 38 l7 -8"/><path d="M252 140 v-14 l-7 -8 M252 126 l7 -8"/></g>'+
  '<g fill="#F2716B"><circle cx="30" cy="60" r="12"/><circle cx="292" cy="112" r="11"/></g><g stroke="#F2716B" stroke-width="3" stroke-linecap="round"><path d="M30 44v-4M30 76v4M14 60h-4M46 60h4M19 49l-3-3M41 71l3 3M41 49l3-3M19 71l-3 3"/><path d="M292 97v-4M292 127v4M277 112h-4M307 112h4"/></g>'; },
sametova: function(u){ var r=rnd(17), crowd=""; for(var i=0;i<22;i++){ var x=i*15+(r()*6), y=128+r()*14; crowd+='<circle cx="'+x+'" cy="'+y+'" r="8" fill="#20243F"/><rect x="'+(x-10)+'" y="'+(y+6)+'" width="20" height="40" rx="8" fill="#20243F"/>'; }
  var keys=""; [40,100,170,230,290].forEach(function(x,i){ var y=96+(i%2)*8; keys+='<path d="M'+x+' '+(y+40)+' L'+(x+4)+' '+(y+8)+'" stroke="#20243F" stroke-width="6" stroke-linecap="round"/><g fill="none" stroke="#F7C548" stroke-width="3"><circle cx="'+(x+5)+'" cy="'+y+'" r="5"/><path d="M'+(x+5)+' '+(y-5)+' v-12 m0 4 h5 m-5 4 h4"/></g>'; });
  return bg(u,"#2E3F78","#D0667A")+stars(12,3,60)+
  '<g fill="#fff" opacity=".9"><rect x="20" y="40" width="5" height="22" rx="2"/><circle cx="22.5" cy="36" r="4" fill="#F7C548"/><rect x="292" y="34" width="5" height="22" rx="2"/><circle cx="294.5" cy="30" r="4" fill="#F7C548"/></g>'+keys+crowd+
  '<g transform="translate(140 30)"><rect width="40" height="9" fill="#fff"/><rect y="9" width="40" height="9" fill="#D7141A"/><path d="M0 0 L18 9 L0 18Z" fill="#11457E"/></g><path d="M140 30 v50" stroke="#fff" stroke-width="2"/>'; },
karel4: function(u){ var arches=""; for(var i=0;i<6;i++){ arches+='<ellipse cx="'+(28+i*56)+'" cy="146" rx="22" ry="20" fill="#5E8FB8"/>'; }
  return bg(u,"#9DCBEA","#F7E3B5")+
  '<g fill="#B79B79" opacity=".7"><path d="M10 100 L18 70 L26 100Z"/><path d="M30 100 L36 78 L42 100Z"/><rect x="8" y="98" width="70" height="12"/></g>'+
  '<path d="M0 104 Q80 94 160 104 T320 100 V180 H0Z" fill="#9BB57A" opacity=".6"/>'+
  '<rect x="0" y="118" width="320" height="34" fill="#8B7A66"/><rect x="0" y="112" width="320" height="8" fill="#6E5F4F"/>'+arches+
  '<rect x="0" y="150" width="320" height="30" fill="#5E8FB8"/><path d="M10 160 h30 M80 166 h40 M170 160 h30 M240 168 h40" stroke="#9FC4E2" stroke-width="2"/>'+
  '<rect x="236" y="46" width="44" height="70" fill="#5A4C40"/><path d="M230 48 L258 12 L286 48Z" fill="#3A3029"/><rect x="250" y="80" width="16" height="36" rx="8" fill="#8B7A66"/><rect x="246" y="58" width="8" height="12" fill="#F7E3B5" opacity=".6"/><rect x="262" y="58" width="8" height="12" fill="#F7E3B5" opacity=".6"/>'+
  '<g stroke="#3A3029" stroke-width="2">'+[40,90,140,190].map(function(x){return '<path d="M'+x+' 112 v-10"/><circle cx="'+x+'" cy="98" r="4" fill="#3A3029"/>';}).join("")+'</g>'; },
pismo: function(u){ var r=rnd(5), w=""; for(var row=0;row<5;row++){ for(var c=0;c<8;c++){ if(r()<.25) continue; var x=92+c*18+r()*4, y=52+row*20; var t=r(); w+= t<.5 ? '<path d="M'+x+' '+y+' l10 0 l-5 4Z M'+(x+5)+' '+(y+4)+' v8" />' : '<path d="M'+x+' '+(y+6)+' l0 -6 l5 3Z M'+x+' '+(y+3)+' h12" />'; } }
  return bg(u,"#E2C08F","#A97B4A")+
  '<rect x="82" y="34" width="166" height="122" rx="16" fill="#8C5E33" opacity=".35" transform="translate(6 6)"/>'+
  '<rect x="82" y="34" width="166" height="122" rx="16" fill="#C99A63"/><rect x="82" y="34" width="166" height="122" rx="16" fill="none" stroke="#A97B4A" stroke-width="3"/>'+
  '<g fill="#7A4E26" stroke="#7A4E26" stroke-width="2" stroke-linejoin="round">'+w+'</g>'+
  '<path d="M260 40 L300 120" stroke="#6B8E3A" stroke-width="6" stroke-linecap="round"/><path d="M296 112 L304 128 L292 122Z" fill="#E2C08F"/>'; },
robot: function(u){ return '<defs>'+lg(u,"#2B1A33","#120B17")+'<radialGradient id="'+u+'s" cx=".5" cy="0" r="1"><stop offset="0" stop-color="#FFF4C9" stop-opacity=".55"/><stop offset="1" stop-color="#FFF4C9" stop-opacity="0"/></radialGradient></defs><rect width="320" height="180" fill="url(#'+u+')"/>'+
  '<path d="M120 0 L200 0 L250 180 L70 180Z" fill="url(#'+u+'s)"/>'+
  '<rect x="0" y="150" width="320" height="30" fill="#3A2412"/><rect x="0" y="148" width="320" height="4" fill="#6B4423"/>'+
  '<g fill="#3B4A63"><circle cx="160" cy="82" r="13"/><path d="M140 150 L144 108 C146 98 152 96 160 96 C168 96 174 98 176 108 L180 150Z"/><path d="M144 104 L126 128 M176 104 L194 128" stroke="#3B4A63" stroke-width="8" stroke-linecap="round"/></g>'+
  '<path d="M0 0 C40 30 30 120 56 180 L0 180Z" fill="#A3202B"/><path d="M320 0 C280 30 290 120 264 180 L320 180Z" fill="#A3202B"/><path d="M0 0 H320 V18 C240 28 80 28 0 18Z" fill="#7E1620"/>'+
  '<g stroke="#7E1620" stroke-width="3" fill="none" opacity=".7"><path d="M18 20 C28 70 22 130 36 178"/><path d="M302 20 C292 70 298 130 284 178"/></g>'+
  '<text x="160" y="52" text-anchor="middle" font-family="Georgia,serif" font-size="20" font-weight="700" fill="#F7C548" letter-spacing="6">R.U.R.</text>'; },
monalisa: function(u){ return bg(u,"#DCD3C6","#C2B5A3")+
  '<rect x="0" y="146" width="320" height="34" fill="#8E7B66"/><rect x="0" y="144" width="320" height="4" fill="#6F5E4C"/>'+
  '<rect x="20" y="40" width="54" height="70" fill="#7A5B3A"/><rect x="26" y="46" width="42" height="58" fill="#5E7A6B"/><path d="M26 90 Q46 70 68 86 V104 H26Z" fill="#3E5A4C"/>'+
  '<rect x="246" y="34" width="60" height="80" fill="#7A5B3A"/><rect x="252" y="40" width="48" height="68" fill="#C47F4E"/><circle cx="276" cy="64" r="12" fill="#E8B45F"/>'+
  '<rect x="122" y="30" width="76" height="98" fill="#E7DFD3"/><rect x="122" y="30" width="76" height="98" fill="none" stroke="#B5A792" stroke-width="2" stroke-dasharray="5 4"/>'+
  '<g fill="#5A4A3A"><circle cx="134" cy="40" r="3"/><circle cx="186" cy="40" r="3"/><circle cx="134" cy="118" r="3"/><circle cx="186" cy="118" r="3"/></g>'+
  '<text x="160" y="84" text-anchor="middle" font-family="Georgia,serif" font-size="30" fill="#9C8D78">?</text>'+
  '<g fill="#B08A3A"><rect x="104" y="118" width="5" height="34"/><rect x="211" y="118" width="5" height="34"/></g><path d="M106 124 Q160 144 213 124" stroke="#A3202B" stroke-width="5" fill="none"/>'; },
mesice: function(u){ var cols=["#7FB3E0","#8FC1E8","#A7D49B","#7CC47C","#F2C14E","#F4A64A","#F28C38","#E9C46A","#E07A3F","#C8553D","#9C7B5A","#8FA9C9"];
  var t=""; for(var i=0;i<12;i++){ var x=78+(i%4)*42, y=46+Math.floor(i/4)*40; t+='<rect x="'+x+'" y="'+y+'" width="36" height="34" rx="6" fill="'+cols[i]+'"/>'; }
  return bg(u,"#EAF1E6","#CFE0C8")+
  '<rect x="66" y="22" width="188" height="150" rx="14" fill="#fff"/><rect x="66" y="22" width="188" height="20" rx="10" fill="#C8553D"/><circle cx="100" cy="22" r="5" fill="#5A4A3A"/><circle cx="220" cy="22" r="5" fill="#5A4A3A"/>'+t+
  '<g stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"><path d="M96 54v18M87 63h18M90 57l12 12M102 57l-12 12"/></g>'+
  '<path d="M218 140 c-2 -12 10 -16 14 -8 c4 -8 14 -2 10 8 c-4 6 -12 10 -12 10 s-10 -4 -12 -10Z" fill="#fff" opacity=".85"/>'+
  '<circle cx="182" cy="105" r="8" fill="#fff" opacity=".9"/>'+
  '<path d="M30 150 C50 130 46 110 24 100 C44 104 60 120 54 150Z" fill="#C8553D" opacity=".8"/><path d="M286 60 C300 46 300 30 290 20 C306 30 312 48 296 62Z" fill="#E9C46A"/>'; },
golem: function(u){ return bg(u,"#7A6553","#2A211C")+stars(16,11,70,"#F6E3C3")+
  '<circle cx="262" cy="40" r="16" fill="#F6E3C3" opacity=".85"/>'+
  '<path d="M0 180 V128 L20 128 L20 114 L40 108 L40 128 L60 128 V180Z" fill="#3A2E27"/>'+
  '<path d="M44 180 V122 L60 122 L60 108 L72 108 L72 96 L84 96 L84 84 L96 84 L96 96 L108 96 L108 108 L120 108 L120 122 L136 122 V180Z" fill="#4A3A30"/>'+
  '<rect x="80" y="130" width="10" height="16" rx="5" fill="#F6C66E"/>'+
  '<path d="M250 180 V120 L270 110 L290 120 V180Z M290 180 V130 H320 V180Z" fill="#3A2E27"/>'+
  '<g fill="#A97250"><circle cx="196" cy="66" r="17"/><path d="M164 180 L168 104 C170 90 182 84 196 84 C210 84 222 90 224 104 L228 180Z"/></g>'+
  '<path d="M170 102 L150 150 M222 102 L242 150" stroke="#A97250" stroke-width="16" stroke-linecap="round"/>'+
  '<g fill="#2A211C"><circle cx="190" cy="64" r="2.5"/><circle cx="203" cy="64" r="2.5"/></g><rect x="190" y="72" width="12" height="3" rx="1.5" fill="#F7E3B5"/>'+
  '<g fill="#1E1714"><circle cx="128" cy="140" r="6"/><path d="M118 180 L121 150 C122 146 125 145 128 145 C131 145 134 146 135 150 L138 180Z"/><path d="M119 135 h18 l-2 -5 h-14Z"/></g>'; },
maraton: function(u){ return bg(u,"#F5A35C","#F8D88E")+
  '<circle cx="250" cy="52" r="26" fill="#FFF1C4"/>'+
  '<path d="M0 110 Q60 96 120 106 T240 102 T320 108 V180 H0Z" fill="#E0B070"/>'+
  '<path d="M120 180 L150 106 L170 106 L230 180Z" fill="#6E5A50"/><path d="M160 112 v10 M160 130 v14 M160 154 v18" stroke="#F8D88E" stroke-width="3"/>'+
  '<g stroke="#2B2A3A" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M96 82 L88 112"/><path d="M94 88 L80 100 L72 94"/><path d="M94 88 L106 100 L114 96"/><path d="M88 112 L76 130 L64 134"/><path d="M88 112 L100 130 L106 148"/></g><circle cx="100" cy="70" r="9" fill="#2B2A3A"/>'+
  '<path d="M196 136 h70" stroke="#fff" stroke-width="4"/><path d="M196 128 v20 M266 128 v20" stroke="#2B2A3A" stroke-width="3"/>'+
  '<text x="282" y="164" text-anchor="end" font-family="Georgia,serif" font-weight="700" font-size="16" fill="#2B2A3A">42,195</text>'; },
gps: function(u){ var sats=[[70,50],[250,40],[165,30]];
  return bg(u,"#1B2F5E","#4F6FE0")+stars(14,9,90)+
  '<circle cx="160" cy="370" r="230" fill="#2B8A6E"/><path d="M60 175 C80 145 120 137 150 149 C170 157 190 151 210 139 C240 121 280 131 300 159 V180 H60Z" fill="#46B38D"/>'+
  '<g stroke="#F4C95D" stroke-width="2" stroke-dasharray="5 5">'+sats.map(function(p){return '<path d="M'+p[0]+' '+p[1]+' L160 150"/>';}).join("")+'</g>'+
  sats.map(function(p){return '<g transform="translate('+p[0]+' '+p[1]+')"><rect x="-22" y="-4" width="14" height="8" fill="#9EC5FF"/><rect x="8" y="-4" width="14" height="8" fill="#9EC5FF"/><rect x="-8" y="-7" width="16" height="14" rx="2" fill="#F4C95D"/></g>';}).join("")+
  '<rect x="151" y="140" width="18" height="30" rx="4" fill="#fff"/><path d="M160 116 c-8 0 -12 6 -12 11 c0 8 12 17 12 17 s12 -9 12 -17 c0 -5 -4 -11 -12 -11Z" fill="#F06BA8"/><circle cx="160" cy="127" r="4" fill="#fff"/>'; },
letadlo: function(u){ return bg(u,"#3F86D6","#BFE3F7")+
  '<g fill="#fff" opacity=".85"><ellipse cx="60" cy="140" rx="50" ry="14"/><ellipse cx="90" cy="130" rx="30" ry="14"/><ellipse cx="270" cy="40" rx="40" ry="10"/><ellipse cx="250" cy="150" rx="60" ry="12"/></g>'+
  '<g stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".8"><path d="M0 70 C80 70 150 66 200 84 S270 118 320 124"/><path d="M0 92 C80 92 150 92 200 104 S270 132 320 140"/><path d="M0 48 C80 48 160 44 210 62 S280 94 320 100"/></g>'+
  '<g fill="#F4F6FA"><path d="M60 92 L236 84 C256 83 270 88 270 92 C270 96 256 100 236 100 L60 98Z"/><path d="M60 94 L48 70 L66 70 L82 92Z"/></g>'+
  '<path d="M140 94 L194 92 L156 134 L132 134Z" fill="#D6DCE8"/><path d="M146 92 L180 90 L152 72 L138 72Z" fill="#E4E8F0"/>'+
  '<g fill="#3F86D6">'+[0,1,2,3,4,5,6,7].map(function(i){return '<circle cx="'+(130+i*14)+'" cy="89" r="2.2"/>';}).join("")+'</g><path d="M60 95 h-6" stroke="#F06BA8" stroke-width="4"/>'; },
mikrovlnka: function(u){ return bg(u,"#E8605C","#F4A65A")+
  '<rect x="54" y="38" width="212" height="112" rx="12" fill="#F4F2EE"/><rect x="54" y="140" width="212" height="10" rx="4" fill="#D7D2CA"/>'+
  '<rect x="68" y="52" width="140" height="84" rx="8" fill="#2C2F3A"/>'+
  '<g stroke="#F7C548" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".9"><path d="M78 72 q8 -8 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0"/><path d="M78 92 q8 -8 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0"/></g>'+
  '<ellipse cx="138" cy="122" rx="48" ry="8" fill="#555B6E"/><path d="M114 104 h48 l-6 16 h-36Z" fill="#E8605C"/>'+
  '<g stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".8"><path d="M128 100 c-4 -6 4 -8 0 -14"/><path d="M146 100 c-4 -6 4 -8 0 -14"/></g>'+
  '<rect x="220" y="54" width="34" height="18" rx="3" fill="#2C2F3A"/><text x="237" y="67" text-anchor="middle" font-family="monospace" font-size="11" fill="#7CF29A">2:00</text>'+
  '<circle cx="237" cy="94" r="10" fill="#D7D2CA"/><circle cx="237" cy="122" r="10" fill="#D7D2CA"/>'; },
internet: function(u){ var dots=""; for(var i=0;i<6;i++){ dots+='<circle cx="'+(40+i*48)+'" cy="'+(140+Math.sin(i)*6).toFixed(1)+'" r="4" fill="#9FF3FF"/>'; }
  return bg(u,"#1D5C86","#0B2238")+
  '<path d="M0 34 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#7CC6E8" stroke-width="2" fill="none"/><rect x="0" y="0" width="320" height="32" fill="#7CC6E8" opacity=".35"/>'+
  '<path d="M0 162 C60 150 100 168 160 158 S260 150 320 164 V180 H0Z" fill="#3B2E2A"/>'+
  '<path d="M0 142 C60 130 100 150 160 140 S260 132 320 146" stroke="#F7C548" stroke-width="6" fill="none"/>'+dots+
  '<g fill="#F28AB2" opacity=".9"><path d="M70 80 q14 -10 28 0 q-14 10 -28 0Z M98 80 l8 -6 v12Z"/><path d="M220 100 q12 -8 24 0 q-12 8 -24 0Z M244 100 l7 -5 v10Z"/></g>'+
  '<g stroke="#5FD3C4" stroke-width="3" stroke-linecap="round" fill="none"><path d="M30 162 c-4 -12 4 -18 0 -30"/><path d="M290 166 c4 -12 -4 -18 0 -28"/></g>'; },
obloha: function(u){ return bg(u,"#5466F2","#FF9A5A")+
  '<circle cx="160" cy="132" r="30" fill="#FFE08A"/><circle cx="160" cy="132" r="44" fill="#FFE08A" opacity=".25"/>'+
  '<rect y="132" width="320" height="48" fill="#2F3E8F"/><g stroke="#9FB0FF" stroke-width="2.5" stroke-linecap="round"><path d="M40 146h40M120 156h80M230 148h40M90 168h30M200 170h50"/></g>'+
  '<g stroke="#FFE08A" stroke-width="3" stroke-linecap="round"><path d="M126 140h68M134 150h52M144 160h32"/></g>'+
  '<g fill="#fff" opacity=".8"><ellipse cx="60" cy="50" rx="34" ry="8"/><ellipse cx="250" cy="70" rx="44" ry="9"/></g>'+
  '<g fill="#2B2A3A"><path d="M96 40 q6 -6 12 0 q6 -6 12 0" stroke="#2B2A3A" stroke-width="2.5" fill="none"/><path d="M206 30 q5 -5 10 0 q5 -5 10 0" stroke="#2B2A3A" stroke-width="2.5" fill="none"/></g>'; },
vcely: function(u){ var h=""; for(var r=0;r<5;r++){ for(var c=0;c<9;c++){ var x=c*40+(r%2?20:0), y=r*34; h+='<path d="M'+x+' '+(y+10)+' l18 -10 l18 10 v20 l-18 10 l-18 -10Z"/>'; } }
  return '<rect width="320" height="180" fill="#F4C95D"/><g fill="#F7D57A" stroke="#E0A93A" stroke-width="2">'+h+'</g>'+
  '<g transform="translate(180 92) rotate(-15)"><ellipse rx="34" ry="22" fill="#2A2320"/><path d="M-12 -21v42M4 -22v44M20 -18v36" stroke="#F4C95D" stroke-width="7"/><circle cx="-34" cy="-2" r="13" fill="#2A2320"/><ellipse cx="-4" cy="-30" rx="20" ry="12" fill="#fff" opacity=".85"/><ellipse cx="14" cy="-26" rx="16" ry="10" fill="#fff" opacity=".7"/><path d="M-40 -12 q-8 -14 -2 -22 M-32 -14 q0 -14 8 -20" stroke="#2A2320" stroke-width="2.5" fill="none"/></g>'+
  '<path d="M60 150 C90 120 110 160 140 130 S190 110 210 128" stroke="#2A2320" stroke-width="2.5" stroke-dasharray="2 6" fill="none" stroke-linecap="round"/>'; },
mesic: function(u){ return bg(u,"#0F1640","#2C3C7E")+stars(40,21,110)+
  '<circle cx="220" cy="58" r="40" fill="#F1EEDF"/><g fill="#D7D2BE"><circle cx="206" cy="48" r="8"/><circle cx="232" cy="70" r="6"/><circle cx="236" cy="44" r="4"/><circle cx="212" cy="76" r="4"/></g>'+
  '<path d="M0 150 C60 136 100 150 150 142 L150 180 H0Z" fill="#15183A"/><path d="M40 146 a20 20 0 0 1 40 0Z" fill="#E8E8F0"/><rect x="56" y="122" width="8" height="10" fill="#E8E8F0" transform="rotate(30 60 127)"/>'+
  '<path d="M64 124 L212 70" stroke="#7CF29A" stroke-width="2" opacity=".9"/>'+
  '<rect y="150" width="320" height="30" fill="#1A2560"/><g stroke="#F1EEDF" stroke-width="2" stroke-linecap="round" opacity=".6"><path d="M190 160h60M206 168h30M216 175h10"/></g>'; },
obdobi: function(u){ return '<defs>'+lg(u,"#0E1230","#1E2A5E")+rg(u+"s","#FFE7A0","#F2A33A")+'</defs><rect width="320" height="180" fill="url(#'+u+')"/>'+stars(30,31,180)+
  '<ellipse cx="160" cy="96" rx="140" ry="40" fill="none" stroke="#fff" stroke-opacity=".25" stroke-dasharray="4 6"/>'+
  '<circle cx="160" cy="96" r="26" fill="url(#'+u+'s)"/><circle cx="160" cy="96" r="38" fill="#FFE7A0" opacity=".15"/>'+
  '<g transform="translate(46 100)"><circle r="18" fill="#3B82C4"/><path d="M0 -18 a18 18 0 0 1 0 36Z" fill="#0E1230" opacity=".45" transform="rotate(180)"/><path d="M-6 -10 c6 2 10 8 6 14 c-4 4 -10 2 -12 -2Z" fill="#5FB36B"/><path d="M-10 -26 L10 26" stroke="#fff" stroke-width="2" transform="rotate(-0)"/></g>'+
  '<g transform="translate(274 92)"><circle r="18" fill="#3B82C4"/><path d="M0 -18 a18 18 0 0 1 0 36Z" fill="#0E1230" opacity=".45"/><path d="M-4 -8 c6 2 10 8 6 14 c-4 4 -10 2 -12 -2Z" fill="#5FB36B"/><path d="M-10 -26 L10 26" stroke="#fff" stroke-width="2"/></g>'; },
svetelnyrok: function(u){ var arms=""; for(var i=0;i<4;i++){ arms+='<ellipse cx="0" cy="0" rx="'+(70-i*12)+'" ry="'+(22-i*3)+'" fill="none" stroke="#C8B6FF" stroke-opacity="'+(0.25+i*0.15)+'" stroke-width="'+(10-i*2)+'" transform="rotate('+(i*22)+')"/>'; }
  return '<defs>'+lg(u,"#090C26","#1B1446")+rg(u+"c","#FFF4D6","rgba(200,182,255,0)")+'</defs><rect width="320" height="180" fill="url(#'+u+')"/>'+stars(90,41,180)+
  '<g transform="translate(176 92) rotate(-18)">'+arms+'<ellipse rx="26" ry="14" fill="url(#'+u+'c)"/></g>'+
  '<g fill="#FFE08A"><path d="M40 40 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3Z"/><path d="M280 140 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2Z"/></g>'; },
inflace: function(u){ var stacks=""; [3,5,7,10].forEach(function(k,i){ var x=60+i*56; for(var j=0;j<k;j++){ stacks+='<ellipse cx="'+x+'" cy="'+(150-j*9)+'" rx="20" ry="6" fill="'+(j%2?"#F7D57A":"#E9B949")+'" stroke="#A47B1A" stroke-width="1.5"/>'; } });
  return bg(u,"#F3E3A6","#E2B652")+'<rect y="150" width="320" height="30" fill="#C99A3A"/>'+stacks+
  '<path d="M40 112 L110 96 L170 84 L250 46" stroke="#C8443A" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M250 46 l-14 -1 m14 1 l-5 13" stroke="#C8443A" stroke-width="5" stroke-linecap="round"/>'+
  '<g transform="translate(268 20) rotate(15)"><path d="M0 0 h34 l12 12 l-12 12 h-34Z" fill="#fff"/><circle cx="38" cy="12" r="3" fill="#E2B652"/><text x="16" y="17" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="12" fill="#C8443A">+%</text></g>'; }
};
var GENERIC = {
  veda:'<ellipse cx="50" cy="50" rx="40" ry="14"/><ellipse cx="50" cy="50" rx="40" ry="14" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="40" ry="14" transform="rotate(120 50 50)"/><circle cx="50" cy="50" r="6" fill="#fff"/>',
  telo:'<path d="M50 84C30 70 14 56 14 38a18 18 0 0 1 36-6 18 18 0 0 1 36 6c0 18-16 32-36 46Z"/>',
  dejiny:'<path d="M18 32 50 14 82 32Z"/><path d="M18 32h64M24 84h52M18 90h64M30 38v40M43 38v40M57 38v40M70 38v40"/>',
  literatura:'<path d="M50 28C40 20 24 20 12 24v54c12-4 28-4 38 4 10-8 26-8 38-4V24c-12-4-28-4-38 4Z"/><path d="M50 28v54"/>',
  umeni:'<path d="M50 14a36 36 0 1 0 0 72c6 0 8-6 4-10s-2-10 4-10h10a18 18 0 0 0 18-18c0-18-16-34-36-34Z"/><circle cx="34" cy="40" r="5"/><circle cx="52" cy="30" r="5"/><circle cx="68" cy="42" r="5"/>',
  jazyk:'<path d="M16 22h56v40H40l-14 12V62H16Z"/><path d="M30 38h28M30 48h18"/>',
  mytologie:'<path d="M50 12 62 40l30 2-23 18 8 28-27-16-27 16 8-28-23-18 30-2Z"/>',
  sport:'<circle cx="50" cy="58" r="30"/><path d="M50 58V40M42 18h16M50 18v10M74 32l6-6"/>',
  jak:'<circle cx="50" cy="50" r="30" stroke-width="12" stroke-dasharray="9 9.85"/><circle cx="50" cy="50" r="22"/><circle cx="50" cy="50" r="8"/>',
  priroda:'<path d="M18 82C18 42 44 18 84 18c0 38-24 64-66 64Z"/><path d="M18 82 64 36"/>',
  vesmir:'<path d="M60 14a36 36 0 1 0 26 52A30 30 0 1 1 60 14Z"/>',
  ekonomie:'<ellipse cx="50" cy="28" rx="28" ry="10"/><path d="M22 28v14c0 5.5 12.5 10 28 10s28-4.5 28-10V28M22 42v14c0 5.5 12.5 10 28 10s28-4.5 28-10V42"/>',
  vlastni:'<path d="M50 12 59 39l29 1-23 17 8 28-23-17-23 17 8-28-23-17 29-1Z"/>'
};
var CATCOL = {veda:"#3A5BC7",telo:"#C2456B",dejiny:"#9C4A2F",literatura:"#6D44A8",umeni:"#B8573A",jazyk:"#2F7F6F",mytologie:"#7A5B2E",sport:"#C2410C",jak:"#2F6F7E",priroda:"#3F7D3A",vesmir:"#26305E",ekonomie:"#9A7410",vlastni:"#5A6B70"};

var PAIR = {veda:["#4C6FE0","#2A3C8F"],telo:["#E0627F","#8E2C4C"],dejiny:["#C46A43","#6E3420"],literatura:["#8A5BD0","#3F2580"],umeni:["#E07B4F","#8C3A26"],jazyk:["#3FA08C","#1C5A50"],mytologie:["#B08A4A","#4E3A1C"],sport:["#F08A3C","#A4380E"],jak:["#3E8FA0","#1C4E5A"],priroda:["#5BA352","#285A24"],vesmir:["#3B4A9E","#141A44"],ekonomie:["#D2A73A","#7A5A0E"],vlastni:["#7A8A90","#3A4A50"]};
function hash(str){ var h=0; for(var i=0;i<str.length;i++){ h=(h*31+str.charCodeAt(i))|0; } return Math.abs(h)+1; }
function generic(l, u){
  var c = PAIR[l.cat]||PAIR.vlastni, r = rnd(hash(String(l.id||l.title))), shapes = "";
  for(var i=0;i<7;i++){ var x=r()*320, y=r()*180, rad=10+r()*46, kind=r();
    shapes += kind<.5 ? '<circle cx="'+x.toFixed(0)+'" cy="'+y.toFixed(0)+'" r="'+rad.toFixed(0)+'" fill="#fff" opacity="'+(0.05+r()*0.1).toFixed(2)+'"/>'
      : '<circle cx="'+x.toFixed(0)+'" cy="'+y.toFixed(0)+'" r="'+rad.toFixed(0)+'" fill="none" stroke="#fff" stroke-width="2" opacity="'+(0.12+r()*0.15).toFixed(2)+'"/>'; }
  var dots = ""; for(var j=0;j<18;j++){ dots += '<circle cx="'+(r()*320).toFixed(0)+'" cy="'+(r()*180).toFixed(0)+'" r="'+(1+r()*2).toFixed(1)+'" fill="#fff" opacity=".35"/>'; }
  var rot = (r()*24-12).toFixed(0);
  return bg(u,c[0],c[1])+shapes+dots+'<circle cx="214" cy="92" r="70" fill="#fff" opacity=".1"/><g transform="translate(150 28) rotate('+rot+' 64 64) scale(1.28)" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">'+(GENERIC[l.cat]||GENERIC.vlastni)+'</g>';
}
function scene(lesson){
  var u = uid(), f = SC[lesson.id];
  var inner = f ? f(u) : generic(lesson, u);
  return '<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+inner+'</svg>';
}

// ---------- schémata ----------
function arrow(x1,y1,x2,y2,cls,w){
  var a=Math.atan2(y2-y1,x2-x1), h=9;
  var p1=(x2-h*Math.cos(a-0.45)).toFixed(1)+","+(y2-h*Math.sin(a-0.45)).toFixed(1), p2=(x2-h*Math.cos(a+0.45)).toFixed(1)+","+(y2-h*Math.sin(a+0.45)).toFixed(1);
  return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" class="s-'+cls+'" stroke-width="'+(w||2.5)+'"/><polygon points="'+x2+','+y2+' '+p1+' '+p2+'" class="f-'+cls+'"/>';
}
function T(x,y,s,o){ o=o||{}; return '<text x="'+x+'" y="'+y+'"'+(o.a?' text-anchor="'+o.a+'"':'')+(o.c?' class="'+o.c+'"':'')+'>'+s+'</text>'; }
var FIG = {
memory: function(){
  var items=[[40,40,"obraz"],[40,140,"zvuk"],[280,40,"vůně"],[280,140,"pocit"]];
  return items.map(function(it){ return '<circle cx="'+it[0]+'" cy="'+it[1]+'" r="20" class="f-soft"/>'+T(it[0],it[1]+4,it[2],{a:"middle"})+'<line x1="'+(it[0]<160?it[0]+22:it[0]-22)+'" y1="'+it[1]+'" x2="'+(it[0]<160?118:202)+'" y2="'+(it[1]<90?78:102)+'" class="s-mu dash" stroke-width="2"/>'; }).join("")+
  '<rect x="112" y="60" width="96" height="60" rx="12" class="f-acc"/><text x="160" y="95" text-anchor="middle" class="inv">vzpomínka</text>'; },
sleep: function(){
  var lv={0:28,1:58,2:92,3:126}, seq=[[0,0],[10,2],[30,3],[70,2],[85,1],[95,2],[120,3],[160,2],[175,1],[195,2],[220,3],[240,2],[265,1],[290,2],[355,1],[385,2],[440,1],[475,0],[480,0]];
  var X=function(t){return 64+t*(244/480);}, pts="", rem="";
  for(var i=0;i<seq.length-1;i++){ var a=seq[i], b=seq[i+1]; pts+=X(a[0])+","+lv[a[1]]+" "+X(b[0])+","+lv[a[1]]+" "; if(a[1]===1) rem+='<line x1="'+X(a[0])+'" y1="'+lv[1]+'" x2="'+X(b[0])+'" y2="'+lv[1]+'" class="s-fl" stroke-width="5"/>'; }
  pts+=X(480)+","+lv[0];
  var lab=[["bdění",0],["REM",1],["lehký",2],["hluboký",3]].map(function(l){return T(56,lv[l[1]]+4,l[0],{a:"end",c:"m"});}).join("");
  var hrs=[0,2,4,6,8].map(function(h){return T(X(h*60),160,h+" h",{a:"middle",c:"m"});}).join("");
  return '<line x1="64" y1="142" x2="308" y2="142" class="s-line"/>'+lab+hrs+'<polyline points="'+pts+'" class="s-acc" stroke-width="2.5"/>'+rem; },
caffeine: function(){
  function rec(x){ return '<path d="M'+(x-34)+' 150 V96 H'+(x-12)+' V112 H'+(x+12)+' V96 H'+(x+34)+' V150Z" class="f-soft s-mu" stroke-width="2"/>'; }
  return rec(80)+rec(240)+
  '<path d="M68 112 L80 88 L92 112Z" class="f-fl"/>'+T(80,80,"adenosin",{a:"middle"})+
  '<g>'+[0,1,2].map(function(i){return '<path d="M'+(54+i*18)+' 160 q4 6 8 0 t8 0" class="s-fl" stroke-width="2"/>';}).join("")+'</g>'+T(80,176,"únava",{a:"middle",c:"m"})+
  '<rect x="228" y="88" width="24" height="24" rx="4" class="f-acc"/>'+T(240,80,"kofein",{a:"middle"})+
  '<path d="M270 52 L282 28 L294 52Z" class="f-fl" opacity=".55"/>'+T(282,66,"čeká",{a:"middle",c:"m"})+T(240,176,"klid, žádný signál",{a:"middle",c:"m"})+
  '<line x1="160" y1="30" x2="160" y2="170" class="s-line dash"/>'; },
immune: function(){
  return '<line x1="40" y1="150" x2="304" y2="150" class="s-line"/><line x1="40" y1="20" x2="40" y2="150" class="s-line"/>'+
  T(172,170,"čas (dny)",{a:"middle",c:"m"})+'<text x="18" y="85" class="m" transform="rotate(-90 18 85)" text-anchor="middle">protilátky</text>'+
  '<path d="M44 148 C80 148 88 144 104 120 C116 104 126 110 140 140 C146 148 150 148 156 148" class="s-mu" stroke-width="2.5"/>'+
  '<path d="M170 148 C180 148 186 70 196 40 C206 20 222 30 236 60 C252 96 270 110 300 116" class="s-acc" stroke-width="3"/>'+
  '<line x1="56" y1="150" x2="56" y2="158" class="s-ink"/><line x1="174" y1="150" x2="174" y2="158" class="s-ink"/>'+
  T(106,108,"1. setkání",{a:"middle",c:"m"})+T(242,36,"2. setkání",{a:"start"}); },
velvet: function(){
  var ev=[["17. 11.","Národní třída"],["19. 11.","Občanské fórum"],["27. 11.","generální stávka"],["29. 11.","konec vedoucí úlohy KSČ"],["29. 12.","Havel prezidentem"]];
  return '<line x1="30" y1="22" x2="30" y2="164" class="s-line" stroke-width="3"/>'+ev.map(function(e,i){ var y=26+i*34; return '<circle cx="30" cy="'+y+'" r="7" class="'+(i===4?"f-fl":"f-acc")+'"/>'+T(48,y+4,e[0])+T(110,y+4,e[1],{c:"m"}); }).join(""); },
karel: function(){
  var ev=[["1316","narození v Praze"],["1346","český král"],["1348","univerzita a Nové Město"],["1355","římský císař"],["1357","základní kámen mostu"],["1378","úmrtí"]];
  return '<line x1="30" y1="18" x2="30" y2="168" class="s-line" stroke-width="3"/>'+ev.map(function(e,i){ var y=20+i*29; return '<circle cx="30" cy="'+y+'" r="6" class="'+(i===2?"f-fl":"f-acc")+'"/>'+T(48,y+4,e[0])+T(92,y+4,e[1],{c:"m"}); }).join(""); },
cuneiform: function(){
  var star='<g class="s-ink" stroke-width="2.5"><path d="M50 50 L50 20 M50 50 L50 80 M50 50 L20 50 M50 50 L80 50 M50 50 L29 29 M50 50 L71 71 M50 50 L71 29 M50 50 L29 71"/></g>';
  function wedge(x,y,rot){ return '<g transform="translate('+x+' '+y+') rotate('+rot+')"><polygon points="0,-6 10,0 0,6" class="f-ink"/><line x1="8" y1="0" x2="26" y2="0" class="s-ink" stroke-width="2.5"/></g>'; }
  return '<g transform="translate(10 30)">'+star+'</g>'+arrow(104,80,130,80,"mu",2)+
  '<g transform="translate(140 30)">'+wedge(22,50,0)+wedge(50,22,90)+wedge(50,50,45)+wedge(50,50,-45)+'</g>'+arrow(214,80,240,80,"mu",2)+
  '<g transform="translate(250 34)">'+wedge(0,46,0)+wedge(24,30,90)+wedge(36,46,0)+'</g>'+
  T(60,150,"obrázek",{a:"middle"})+T(60,166,"kolem 3000 př. n. l.",{a:"middle",c:"m"})+T(184,150,"klínky",{a:"middle"})+T(184,166,"o staletí později",{a:"middle",c:"m"})+T(276,150,"pozdní tvar",{a:"middle"})+T(276,166,"ještě později",{a:"middle",c:"m"}); },
sfumato: function(){ var u=uid();
  return '<defs><linearGradient id="'+u+'"><stop offset="0" stop-color="var(--ink)"/><stop offset="1" stop-color="var(--soft)"/></linearGradient></defs>'+
  '<rect x="30" y="30" width="54" height="100" class="f-ink"/><rect x="84" y="30" width="54" height="100" class="f-soft"/>'+
  '<rect x="182" y="30" width="108" height="100" style="fill:url(#'+u+')"/>'+
  T(84,152,"ostrý přechod",{a:"middle"})+T(236,152,"sfumato",{a:"middle"}); },
gps: function(){
  var c=[[90,60,86,"acc"],[240,55,97,"bl"],[175,30,81,"mu"]];
  return c.map(function(k){ return '<circle cx="'+k[0]+'" cy="'+k[1]+'" r="'+k[2]+'" class="s-'+k[3]+' dash" stroke-width="2"/><rect x="'+(k[0]-7)+'" y="'+(k[1]-5)+'" width="14" height="10" rx="2" class="f-'+k[3]+'"/>'; }).join("")+
  '<circle cx="160" cy="110" r="7" class="f-fl"/>'+T(172,128,"tady jsi",{})+T(90,44,"družice 1",{a:"middle",c:"m"})+T(240,40,"družice 2",{a:"middle",c:"m"})+T(175,16,"družice 3",{a:"middle",c:"m"}); },
wing: function(){
  return '<g class="s-bl" stroke-width="2">'+[56,76,96].map(function(y,i){ return '<path d="M0 '+y+' C70 '+y+' 130 '+(y-10+i*4)+' 190 '+(y+6+i*6)+' S270 '+(y+40)+' 320 '+(y+52)+'"/>'; }).join("")+'<path d="M0 132 C80 132 150 128 210 126 S290 140 320 150"/></g>'+
  '<path d="M40 104 C70 76 160 72 250 104 C170 112 80 116 40 104Z" class="f-soft s-ink" stroke-width="2"/>'+
  arrow(150,70,150,26,"fl",3.5)+T(160,34,"vztlak",{})+arrow(292,130,304,166,"acc",3)+T(286,176,"vzduch dolů",{a:"end",c:"m"})+T(110,60,"nižší tlak",{a:"middle",c:"m"})+T(140,138,"vyšší tlak",{a:"middle",c:"m"}); },
forces: function(){
  return '<path d="M90 92 L220 86 C240 85 252 89 252 92 C252 95 240 99 220 99 L90 96Z" class="f-soft s-ink" stroke-width="2"/><path d="M90 94 L80 74 L96 74 L108 93Z" class="f-soft s-ink" stroke-width="2"/><path d="M150 94 L196 92 L162 122 L142 122Z" class="f-soft s-ink" stroke-width="2"/>'+
  arrow(165,80,165,24,"fl",4)+T(176,32,"vztlak",{})+arrow(165,106,165,164,"ink",4)+T(176,160,"tíha",{})+arrow(256,92,310,92,"acc",4)+T(282,82,"tah",{a:"middle"})+arrow(84,92,24,92,"mu",4)+T(50,82,"odpor",{a:"middle"}); },
microwave: function(){
  function mol(x,y,r){ return '<g transform="translate('+x+' '+y+') rotate('+r+')"><circle r="15" class="f-fl"/><circle cx="-14" cy="12" r="8" class="f-soft s-mu"/><circle cx="14" cy="12" r="8" class="f-soft s-mu"/><text x="0" y="5" text-anchor="middle" class="inv">O</text></g>'; }
  return T(20,96,"+",{c:"big"})+T(300,96,"−",{c:"big"})+'<line x1="40" y1="30" x2="40" y2="150" class="s-line" stroke-width="3"/><line x1="280" y1="30" x2="280" y2="150" class="s-line" stroke-width="3"/>'+
  mol(100,70,-90)+mol(170,110,-70)+mol(230,60,-110)+
  '<path d="M80 110 a26 26 0 0 0 40 0" class="s-acc" stroke-width="2"/><polygon points="120,110 112,106 114,115" class="f-acc"/>'+
  T(160,168,"pole mění směr 2,45 miliardkrát za sekundu",{a:"middle",c:"m"}); },
packets: function(){
  var N=[[40,90],[110,40],[110,140],[180,90],[250,40],[250,140],[290,90]], E=[[0,1],[0,2],[1,3],[2,3],[1,4],[3,4],[3,5],[2,5],[4,6],[5,6]];
  return E.map(function(e){ var a=N[e[0]], b=N[e[1]]; return '<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" class="s-line" stroke-width="2.5"/>'; }).join("")+
  N.map(function(p,i){ return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+(i===0||i===6?14:9)+'" class="'+(i===0||i===6?"f-acc":"f-soft s-mu")+'"/>'; }).join("")+
  '<rect x="68" y="58" width="12" height="12" rx="2" class="f-fl"/><rect x="140" y="58" width="12" height="12" rx="2" class="f-bl"/><rect x="210" y="112" width="12" height="12" rx="2" class="f-sun"/>'+
  T(40,124,"ty",{a:"middle"})+T(290,124,"server",{a:"middle"})+T(180,170,"router = křižovatka",{a:"middle",c:"m"}); },
rayleigh: function(){
  var sc=""; [[110,70,92,42],[150,92,170,54],[150,92,130,130],[190,86,214,120],[226,92,232,50],[130,96,104,120]].forEach(function(s){ sc+=arrow(s[0],s[1],s[2],s[3],"bl",2); });
  return '<rect x="90" y="20" width="170" height="140" rx="16" class="f-soft"/>'+T(175,154,"atmosféra",{a:"middle",c:"m"})+
  '<circle cx="36" cy="92" r="20" class="f-sun"/>'+'<line x1="58" y1="92" x2="300" y2="92" class="s-fl" stroke-width="3"/><polygon points="304,92 294,87 294,97" class="f-fl"/>'+sc+
  T(296,80,"červená",{a:"end",c:"m"})+T(175,34,"modrá se rozptýlí",{a:"middle"}); },
sunset: function(){
  return '<circle cx="160" cy="310" r="200" class="f-soft"/><circle cx="160" cy="310" r="240" class="s-bl dash" stroke-width="2"/><circle cx="160" cy="310" r="200" class="s-mu" stroke-width="2"/>'+
  '<circle cx="160" cy="110" r="5" class="f-ink"/>'+arrow(160,20,160,102,"fl",3)+T(152,48,"poledne: krátká cesta",{a:"end"})+
  '<circle cx="40" cy="152" r="5" class="f-ink"/>'+arrow(300,30,48,148,"fl",3)+T(240,100,"večer: dlouhá cesta",{a:"middle"}); },
waggle: function(){
  return '<rect x="176" y="20" width="128" height="140" rx="12" class="f-soft"/>'+T(240,174,"plást v úlu",{a:"middle",c:"m"})+
  '<line x1="240" y1="40" x2="240" y2="140" class="s-mu dash"/>'+
  '<path d="M240 110 L268 62" class="s-fl" stroke-width="4"/><path d="M268 62 C300 70 290 116 240 110 M268 62 C226 46 210 100 240 110" class="s-acc" stroke-width="2"/>'+
  '<path d="M240 82 a28 28 0 0 1 14 4" class="s-ink" stroke-width="2"/>'+T(248,76,"α",{})+
  '<circle cx="40" cy="30" r="14" class="f-sun"/><circle cx="60" cy="140" r="8" class="f-ink"/>'+T(60,166,"úl",{a:"middle",c:"m"})+
  '<line x1="60" y1="140" x2="44" y2="44" class="s-mu dash"/>'+arrow(60,140,128,72,"fl",3)+T(132,68,"květy",{})+'<path d="M56 112 a28 28 0 0 1 22 4" class="s-ink" stroke-width="2"/>'+T(74,104,"α",{}); },
tides: function(){
  return '<ellipse cx="100" cy="90" rx="78" ry="56" class="f-bl" opacity=".35"/><circle cx="100" cy="90" r="46" class="f-acc"/>'+T(100,94,"Země",{a:"middle",c:"inv"})+
  '<circle cx="290" cy="90" r="16" class="f-mu"/>'+T(290,124,"Měsíc",{a:"middle"})+arrow(240,90,268,90,"mu",2)+
  T(196,84,"příliv",{a:"middle"})+T(20,84,"příliv",{a:"start"})+T(100,24,"odliv",{a:"middle",c:"m"})+T(100,166,"odliv",{a:"middle",c:"m"})+
  arrow(290,148,316,148,"fl",2.5)+T(300,170,"+3,8 cm za rok",{a:"end",c:"m"}); },
seasons: function(){
  function earth(x,label){ return '<g transform="translate('+x+' 90)"><circle r="22" class="f-bl"/><line x1="-12" y1="-30" x2="12" y2="30" class="s-ink" stroke-width="2.5" transform="rotate(0)"/></g>'+T(x,140,label,{a:"middle"}); }
  return '<ellipse cx="160" cy="90" rx="130" ry="34" class="s-mu dash" stroke-width="1.5"/><circle cx="160" cy="90" r="24" class="f-sun"/>'+
  earth(44,"prosinec")+earth(276,"červen")+
  T(44,156,"u nás zima",{a:"middle",c:"m"})+T(276,156,"u nás léto",{a:"middle",c:"m"})+T(276,48,"23,4°",{a:"middle",c:"m"}); },
parallax: function(){
  return '<ellipse cx="160" cy="140" rx="110" ry="22" class="s-mu dash" stroke-width="1.5"/><circle cx="160" cy="140" r="10" class="f-sun"/>'+
  '<circle cx="50" cy="140" r="7" class="f-bl"/><circle cx="270" cy="140" r="7" class="f-bl"/>'+T(50,166,"leden",{a:"middle",c:"m"})+T(270,166,"červenec",{a:"middle",c:"m"})+
  '<circle cx="160" cy="70" r="5" class="f-fl"/>'+T(172,74,"blízká hvězda",{})+
  '<line x1="50" y1="140" x2="214" y2="16" class="s-acc" stroke-width="1.5"/><line x1="270" y1="140" x2="106" y2="16" class="s-acc" stroke-width="1.5"/>'+
  '<circle cx="214" cy="16" r="3" class="f-mu"/><circle cx="106" cy="16" r="3" class="f-mu"/>'+T(160,14,"posun proti pozadí",{a:"middle",c:"m"}); }
};
function fig(id){ var f = FIG[id]; return f ? '<svg viewBox="0 0 320 180" role="img">'+f()+'</svg>' : ''; }

window.ART = { scene: scene, fig: fig, CATCOL: CATCOL };
})();
