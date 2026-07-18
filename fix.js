const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const cursorCssToInject = `
.cursor-dot,.cursor-ring{
  position:fixed; top:0; left:0; z-index:9999;
  pointer-events:none; border-radius:50%;
  transform:translate(-50%,-50%);
  will-change:transform;
}
.cursor-dot{
  width:6px; height:6px; background:var(--amber);
}
.cursor-ring{
  width:38px; height:38px; opacity:0;
  border:1px solid var(--amber);
  display:flex; align-items:center; justify-content:center;
  transition:width .3s var(--ease), height .3s var(--ease), opacity .2s, border-color .3s;
}
.cursor-ring span{
  font-family:var(--f-mono); font-size:9px; letter-spacing:.1em;
  color:var(--amber); text-transform:uppercase; opacity:0;
}
.cursor-ring.show{ opacity:1; }
.cursor-ring.expand{ width:74px; height:74px; background:var(--amber-dim); }
.cursor-ring.expand span{ opacity:1; }
body.has-cursor, body.has-cursor *{ cursor:none !important; }
@media (hover:none), (pointer:coarse){
  .cursor-dot,.cursor-ring{ display:none; }
}
`;

const cursorJsToInject = `
  if (window.matchMedia('(hover: hover)').matches) {
    document.body.classList.add('has-cursor');
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (typeof root !== 'undefined') {
          root.style.setProperty('--mx', \`\${mouseX}px\`);
          root.style.setProperty('--my', \`\${mouseY}px\`);
      }
      if (typeof spotlight !== 'undefined') spotlight?.classList.add('active');
      const cursorDot = document.getElementById('cursorDot');
      if (cursorDot) {
        cursorDot.style.left = \`\${mouseX}px\`;
        cursorDot.style.top = \`\${mouseY}px\`;
      }
    });

    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      const cursorRing = document.getElementById('cursorRing');
      if (cursorRing) {
        cursorRing.style.left = \`\${ringX}px\`;
        cursorRing.style.top = \`\${ringY}px\`;
      }
      requestAnimationFrame(renderCursor);
    };
    renderCursor();

    document.querySelectorAll('a, button, .project-card, .feature-card, .slider-track img, .film-panel, .accordion-button').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        const cursorRing = document.getElementById('cursorRing');
        const cursorLabel = document.getElementById('cursorLabel');
        cursorRing?.classList.add('show');
        if (el.dataset.cursor && cursorLabel) {
          cursorLabel.textContent = el.dataset.cursor;
          cursorRing.classList.add('expand');
        }
      });
      el.addEventListener('mouseleave', () => {
        const cursorRing = document.getElementById('cursorRing');
        const cursorLabel = document.getElementById('cursorLabel');
        cursorRing?.classList.remove('expand');
        if (cursorLabel) cursorLabel.textContent = '';
      });
    });
  }
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Update Active Nav Link
    // Remove all existing class="active" from nav links
    let newContent = content.replace(/(<a\s+href="([^"]+)"[^>]*?)(\s*class="active")([^>]*>)/g, '$1$4');
    
    // Determine which href should be active
    let targetHref = file === 'index.html' ? '#home' : file;
    // Special case for other pages to avoid making home active
    if (!['index.html', 'project.html', 'about.html', 'contactUs.html'].includes(file)) {
        targetHref = null;
    }
    
    if (targetHref) {
        // Add active class to the correct link in .nav-links
        const navLinksRegex = new RegExp(`(<div class="nav-links">.*?<a\\s+href="${targetHref}")([^>]*>)`, 's');
        newContent = newContent.replace(navLinksRegex, '$1 class="active"$2');

        // And in mobile-nav-links
        const mobileNavRegex = new RegExp(`(<div class="mobile-nav-links"[^>]*>.*?<a\\s+href="${targetHref}")([^>]*>)`, 's');
        newContent = newContent.replace(mobileNavRegex, '$1 class="active"$2');
    }

    // 2. Update CSS Cursor
    // Try to replace the existing cursor block
    const cssCursorRegex = /\.cursor-dot,\.cursor-ring\{[\s\S]*?@media[^{]*\{[^}]*\}\s*\}/;
    if (cssCursorRegex.test(newContent)) {
        newContent = newContent.replace(cssCursorRegex, cursorCssToInject.trim());
    } else {
        // Fallback for ytDownloader etc
        const cssCursorRegex2 = /\.cursor-dot,\.cursor-ring\{[\s\S]*?body\.has-cursor \*\{cursor:none !important;\}\s*@media[^{]*\{[^}]*\}\s*\}/;
        if (cssCursorRegex2.test(newContent)) {
            newContent = newContent.replace(cssCursorRegex2, cursorCssToInject.trim());
        }
    }

    // 3. Update JS Cursor
    const startString = "if (window.matchMedia('(hover: hover)').matches) {";
    const startIndex = newContent.indexOf(startString);
    if (startIndex !== -1) {
        // find the matching closing brace
        let openBraces = 0;
        let endIndex = -1;
        for (let i = startIndex; i < newContent.length; i++) {
            if (newContent[i] === '{') openBraces++;
            if (newContent[i] === '}') {
                openBraces--;
                if (openBraces === 0) {
                    endIndex = i;
                    break;
                }
            }
        }
        if (endIndex !== -1) {
            newContent = newContent.substring(0, startIndex) + cursorJsToInject.trim() + '\n\n' + newContent.substring(endIndex + 1);
        }
    } else {
        // If not found, inject at the end of DOMContentLoaded
        const injectPoint = /\}\);\s*<\/script>/;
        if (injectPoint.test(newContent)) {
            newContent = newContent.replace(injectPoint, '\n' + cursorJsToInject.trim() + '\n  });\n</script>');
        }
    }

    if (newContent !== content) {
        fs.writeFileSync(file, newContent);
        console.log(`Updated ${file}`);
    }
});
