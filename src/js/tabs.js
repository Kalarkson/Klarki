const tabLinks = document.querySelectorAll('.tab-link');
const tabContent = document.querySelectorAll('.tab-pane');

tabLinks[0].classList.add('active');
document.getElementById(tabLinks[0].dataset.tab).classList.add('active');

tabLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetTab = document.getElementById(link.dataset.tab);

    tabContent.forEach((content) => {
      content.classList.remove('active');
    });

    tabLinks.forEach((link) => {
      link.classList.remove('active');
    });

    targetTab.classList.add('active');
    link.classList.add('active');

    // Store inner tab state in sessionStorage (no-op since there are no inner tabs)
    sessionStorage.setItem(`innerTabState-${targetTab.id}`, '');
  });
});

// Restore inner tab state from sessionStorage when returning to outer tab (no-op since there are no inner tabs)
tabLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetTab = document.getElementById(link.dataset.tab);
    const innerTabId = sessionStorage.getItem(`innerTabState-${targetTab.id}`);
    if (innerTabId) {
      // No inner tabs, so no need to do anything here
    }
  });
});