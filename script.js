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
});
