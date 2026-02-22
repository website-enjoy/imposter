const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 2. Inject JS logic Part 1
const jsTarget1 = /wordEl\.className\s*=\s*'role-word\s+word-anim';\s*if\s*\(\s*player\.role\s*===\s*'imposter'\s*&&\s*gameState\.mode\s*===\s*'classic'\s*\)\s*\{/;

const jsReplacement1 = `            wordEl.className = 'role-word word-anim';
            const descEl = document.getElementById('role-word-desc');
            if (descEl) {
                descEl.innerText = '';
                descEl.style.display = 'none';
            }

            if (player.role === 'imposter' && gameState.mode === 'classic') {`;

if (!html.includes("descEl.style.display = 'none';") && jsTarget1.test(html)) {
    html = html.replace(jsTarget1, jsReplacement1);
    console.log("Injected JS Part 1");
}

// 3. Inject JS logic Part 2
const jsTarget2 = /\s*\}\s*else\s*\{\s*vibrate\(50\);\s*\}\s*wordEl\.innerText\s*=\s*player\.word;/;

const jsReplacement2 = `            } else {
                vibrate(50);
                if (descEl) {
                    if (pair.w1 === player.word) {
                        descEl.innerText = pair.d1;
                        descEl.style.display = 'block';
                    } else if (pair.w2 === player.word) {
                        descEl.innerText = pair.d2;
                        descEl.style.display = 'block';
                    }
                }
            }
            
            if(player.role === 'imposter' && gameState.mode === 'hard') {
                if (descEl) {
                    if (pair.w1 === player.word) {
                        descEl.innerText = pair.d1;
                        descEl.style.display = 'block';
                    } else if (pair.w2 === player.word) {
                        descEl.innerText = pair.d2;
                        descEl.style.display = 'block';
                    }
                }
            }

            wordEl.innerText = player.word;`;

if (!html.includes("descEl.innerText = pair.d1;") && jsTarget2.test(html)) {
    html = html.replace(jsTarget2, jsReplacement2);
    console.log("Injected JS Part 2");
}

fs.writeFileSync('index.html', html, 'utf8');
console.log("Done regex injection");
