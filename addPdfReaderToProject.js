const fs = require('fs');

let content = fs.readFileSync('project.html', 'utf8');

const newCard = `        <article class="project-card glow-border reveal" data-category="android">
          <div class="card-media">
            <img src="https://images.unsplash.com/photo-1547237711-8e9a3a37b85e?w=600&h=400&fit=crop" alt="Cobra PDF Reader" loading="lazy">
            <span class="card-tag tag-android">Android</span>
            <span class="card-index">PRJ—00</span>
          </div>
          <div class="card-body">
            <div class="card-top">
              <span class="card-kicker">MVVM / Security</span>
              <span class="card-status">Live</span>
            </div>
            <h3 class="card-title">Cobra PDF Reader</h3>
            <p class="card-text">A fast, secure, and 100% offline PDF management system for mobile professionals featuring 128-bit AES encryption.</p>
            <div class="card-metrics">
              <div class="metric"><strong>100%</strong><span>Offline</span></div>
              <div class="metric"><strong>AES</strong><span>Encrypted</span></div>
              <div class="metric"><strong>Fast</strong><span>Rendering</span></div>
            </div>
            <div class="card-stack"><span>Kotlin</span><span>Room DB</span><span>iText 7</span></div>
            <div class="card-footer">
              <span class="impact">Zero Data Upload Guarantee</span>
              <a href="cobraPdf.html" class="btn btn-primary">View Project <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </article>
`;

const insertionPoint = '<div class="projects-grid">';
if (content.includes(insertionPoint)) {
  // It will replace the first occurrence of <div class="projects-grid">
  // Since Android is the first category in project.html, this is perfect.
  content = content.replace(insertionPoint, insertionPoint + '\n' + newCard);
  fs.writeFileSync('project.html', content, 'utf8');
  console.log('Added to project.html');
} else {
  console.log('Could not find insertion point.');
}
