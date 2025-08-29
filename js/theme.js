// Theme toggle functionality

// Function to set theme
function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem('theme', theme);
  
  // Update theme toggle icon
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      if (theme === 'dark-theme') {
        icon.className = 'fas fa-moon';
        themeToggle.setAttribute('aria-label', 'Switch to light theme');
      } else {
        icon.className = 'fas fa-sun';
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
      }
    }
  }
}

// Initialize theme
export function setupTheme() {
  // Check for saved theme preference or use browser preference
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Check browser preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark-theme' : 'light-theme');
  }
  
  // Theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.className;
      const newTheme = currentTheme === 'dark-theme' ? 'light-theme' : 'dark-theme';
      setTheme(newTheme);
    });
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only change theme if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark-theme' : 'light-theme');
    }
  });
}