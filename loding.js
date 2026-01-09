const minLoadTime = 1000; // 最低1秒表示
const startTime = Date.now();

window.addEventListener('load', () => {
  const loadTime = Date.now() - startTime;
  const delay = Math.max(0, minLoadTime - loadTime);

  setTimeout(() => {
    document.getElementById('loading').classList.add('loaded');
    document.getElementById('content').classList.add('show');
  }, delay);
});