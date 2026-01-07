document.addEventListener('DOMContentLoaded', () => {
  const imgs = Array.from(document.querySelectorAll('.gallery-container img'));
  let loadedCount = 0;

  // naturalWidth/naturalHeightでimgDataを集めたいので、全部読み込み終わってから計算する
  imgs.forEach(img => {
    img.addEventListener('load', checkAllLoaded);
    if (img.complete) checkAllLoaded.call(img);
  });

  function checkAllLoaded() {
    loadedCount++;
    if (loadedCount < imgs.length) return;

    // 全部ロード完了！
    const imgData = imgs.map(img => {
      const w = img.naturalWidth, h = img.naturalHeight;
      // wide/tallクラスもここでつけてOK
      if (w / h > 1.25) img.classList.add('wide');
      else img.classList.add('tall');
      return { img, w, h };
    });

    // 横幅最大＝一番横長な画像
    const maxW = Math.max(...imgData.map(i => i.w));
    const longestImg = imgData.find(i => i.w === maxW);

    // サイト幅
    const siteWidth = 1000;

    // 基準面積計算（この画像を"サイト幅いっぱい"にした時の面積）
    const baseDispH = siteWidth * (longestImg.h / maxW);
    const baseArea = siteWidth * baseDispH;

    imgData.forEach(i => {
      if(i === longestImg) {
        i.img.style.width = siteWidth + 'px';
        i.img.style.height = 'auto';
        i.img.style.maxWidth = '100%';
      } else {
        const ratio = i.w / i.h;
        const dispH = Math.sqrt(baseArea / ratio);
        const dispW = dispH * ratio;
        i.img.style.width = dispW + 'px';
        i.img.style.height = dispH + 'px';
        i.img.style.maxWidth = '100%';
      }
    });
  }
});