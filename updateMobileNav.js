const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const oldCssFix = `/* --- MOBILE NAV FIX --- */
@media (max-width: 760px) {
  .nav-right {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-end !important;
    gap: 12px !important;
    width: auto !important;
    flex-wrap: nowrap !important;
  }
  .theme-btn, .mobile-menu-toggle {
    display: inline-flex !important;
    margin: 0 !important;
    position: relative !important;
    top: auto !important;
    right: auto !important;
  }
}`;

const newCssFix = `/* --- MOBILE NAV FIX --- */
@media (max-width: 760px) {
  .nav-right {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-end !important;
    gap: 12px !important;
    width: auto !important;
    flex-wrap: nowrap !important;
  }
  .theme-btn, .mobile-menu-toggle {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin: 0 !important;
    position: relative !important;
    top: auto !important;
    right: auto !important;
  }
}`;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if(content.includes('/* --- MOBILE NAV FIX --- */')) {
    // Just replace the block
    let newContent = content.replace(oldCssFix, newCssFix);
    
    // Fallback if exact match fails due to line endings
    if(newContent === content) {
      newContent = content.replace(/display: inline-flex !important;/g, "display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;");
    }
    
    fs.writeFileSync(f, newContent, 'utf8');
    console.log('Fixed ' + f);
  }
});
