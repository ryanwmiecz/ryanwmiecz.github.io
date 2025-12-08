// Small UI helpers: nav toggle, theme toggle, smooth scroll and year
document.addEventListener('DOMContentLoaded', function(){
  const yearEl = document.getElementById('year');
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');

  yearEl && (yearEl.textContent = new Date().getFullYear());

  function activatePanel(name){
    tabs.forEach(t => {
      const isActive = t.dataset.target === name;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    panels.forEach(p => {
      const match = p.dataset.panel === name;
      p.setAttribute('aria-hidden', match ? 'false' : 'true');
    });
  }

  tabs.forEach(t => {
    t.addEventListener('click', () => activatePanel(t.dataset.target));
  });

  // clicking brand logo activates About tab
  const brand = document.getElementById('brandLogo');
  brand && brand.addEventListener('click', (e) => {
    e.preventDefault();
    activatePanel('about');
  });

  // keyboard support for tabs
  document.querySelector('.tabs')?.addEventListener('keydown', (e) => {
    const key = e.key;
    const cur = Array.from(tabs).findIndex(t => t.classList.contains('active'));
    if(key === 'ArrowRight'){
      const next = (cur + 1) % tabs.length;
      tabs[next].focus(); tabs[next].click();
    } else if(key === 'ArrowLeft'){
      const prev = (cur - 1 + tabs.length) % tabs.length;
      tabs[prev].focus(); tabs[prev].click();
    }
  });

  // Image carousel functionality
  function initCarousels() {
    const carousels = document.querySelectorAll('.project-image-carousel');
    
    carousels.forEach(carousel => {
      const images = carousel.querySelectorAll('.carousel-images img');
      const dotsContainer = carousel.querySelector('.carousel-dots');
      const prevBtn = carousel.querySelector('.carousel-btn.prev');
      const nextBtn = carousel.querySelector('.carousel-btn.next');
      
      if (images.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
      }
      
      // Create dots
      images.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `View image ${index + 1}`);
        dot.addEventListener('click', () => showImage(index));
        dotsContainer.appendChild(dot);
      });
      
      let currentIndex = 0;
      
      function showImage(index) {
        if (!dotsContainer.children || dotsContainer.children.length === 0) return;
        
        images[currentIndex].classList.remove('active');
        dotsContainer.children[currentIndex].classList.remove('active');
        
        currentIndex = (index + images.length) % images.length;
        
        images[currentIndex].classList.add('active');
        dotsContainer.children[currentIndex].classList.add('active');
      }
      
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showImage(currentIndex - 1);
      });
      
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showImage(currentIndex + 1);
      });
    });
  }
  
  initCarousels();
});
