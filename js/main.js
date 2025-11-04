/* js/main.js */

// -----------------------------------------------------------------
// 1. 您的內容資料庫
//    !! 請在這裡更新您要顯示的 圖片路徑 和 商品資訊 !!
// -----------------------------------------------------------------
const inspirationData = {
  // "NEW IN" 對應 data-tab="new-in"
  'new-in': {
    mainImage: 'img/inspiration-new-in.jpg', // "NEW IN" 的大圖
    products: [
      { name: '抽鬚剪接設計傘擺牛仔裙 S/M/L', price: 'NT 790', img: 'img/product-1.jpg', url: 'product.html' },
      { name: '設計感牛仔裙 S/M/L', price: 'NT 790', img: 'img/product-2.jpg', url: 'product.html' },
      { name: '基本款牛仔褲 S/M/L', price: 'NT 790', img: 'img/product-3.jpg', url: 'product.html' },
      { name: '涼感系列上衣 S/M/L', price: 'NT 790', img: 'img/product-4.jpg', url: 'product.html' }
    ]
  },
  // "COOL FFEELING" 對應 data-tab="cool"
  'cool': {
    mainImage: 'img/inspiration-cool.jpg', // "COOL FFEELING" 的大圖
    products: [
      { name: '涼感系列 - 商品 A', price: 'NT 690', img: 'img/product-5.jpg', url: 'product.html' },
      { name: '涼感系列 - 商品 B', price: 'NT 720', img: 'img/product-6.jpg', url: 'product.html' },
      { name: '涼感系列 - 商品 C', price: 'NT 590', img: 'img/product-7.jpg', url: 'product.html' },
      { name: '涼感系列 - 商品 D', price: 'NT 890', img: 'img/product-8.jpg', url: 'product.html' }
    ]
  },
  // "最新聯名" 對應 data-tab="collab"
  'collab': {
    mainImage: 'img/inspiration-collab.jpg', // "最新聯名" 的大圖
    products: [
      { name: '聯名商品 - 款式 1', price: 'NT 1280', img: 'img/product-9.jpg', url: 'product.html' },
      { name: '聯名商品 - 款式 2', price: 'NT 1080', img: 'img/product-10.jpg', url: 'product.html' },
      { name: '聯名商品 - 款式 3', price: 'NT 980', img: 'img/product-11.jpg', url: 'product.html' },
      { name: '聯名商品 - 款式 4', price: 'NT 1180', img: 'img/product-12.jpg', url: 'product.html' }
    ]
  },
  // "穿搭大賽" 對應 data-tab="contest"
  'contest': {
    mainImage: 'img/inspiration-contest.jpg', // "穿搭大賽" 的大圖
    products: [
      { name: '精選穿搭 - 上衣', price: 'NT 790', img: 'img/product-13.jpg', url: 'product.html' },
      { name: '精選穿搭 - 褲子', price: 'NT 890', img: 'img/product-14.jpg', url: 'product.html' },
      { name: '精選穿搭 - 外套', price: 'NT 1480', img: 'img/product-15.jpg', url: 'product.html' },
      { name: '精選穿搭 - 配件', price: 'NT 490', img: 'img/product-16.jpg', url: 'product.html' }
    ]
  }
};

// -----------------------------------------------------------------
// 2. JavaScript 程式邏輯 (您不需要修改這裡)
// -----------------------------------------------------------------

// 確保網頁 DOM 載入完成後才執行
document.addEventListener('DOMContentLoaded', () => {

  // 抓取所有相關的元素
  const navLinks = document.querySelectorAll('.inspiration-promo-nav a[data-tab]');
  const mainImage = document.querySelector('.inspiration-main-image img');
  const productGrid = document.querySelector('.inspiration .product-grid');

  // 替換商品網格內容的函式
  function updateProductGrid(products) {
    // 1. 清空目前的商品
    productGrid.innerHTML = '';

    // 2. 迴圈讀取
    products.forEach(product => {
      // 3. 建立每個商品的 HTML
      const productCardHTML = `
                <div class="product-card">
                    <a href="${product.url}">
                        <img src="${product.img}" alt="${product.name}" class="placeholder">
                        <div class="product-info">
                            <p class="product-name">${product.name}</p>
                            <p class="product-price">${product.price}</p>
                        </div>
                    </a>
                    <a href="#" class="shop-btn">SHOP</a>
                </div>
            `;
      // 4. 將建立好的 HTML 塞回網格中
      productGrid.insertAdjacentHTML('beforeend', productCardHTML);
    });
  }

  // 幫每個導覽連結加上點擊事件
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // 防止點擊連結時頁面跳動

      // 取得點擊的 tab ID (例如 "new-in", "cool")
      const tabId = link.dataset.tab;
      // 從資料庫中取得對應的資料
      const data = inspirationData[tabId];

      if (data) {
        // 1. 更新 "active" class
        // 移除所有連結的 active
        document.querySelector('.inspiration-promo-nav li.active').classList.remove('active');
        // 幫被點擊的連結的父層(li)加上 active
        link.parentElement.classList.add('active');

        // 2. 更新大圖片
        mainImage.src = data.mainImage;
        mainImage.alt = tabId; // 順便更新 alt 文字

        // 3. 更新商品網格
        updateProductGrid(data.products);
      }
    });
  });

  function setupInfiniteScroll(containerSelector, direction) {
    const carouselContainer = document.querySelector(containerSelector);
    if (!carouselContainer) return;

    const carouselTrack = carouselContainer.querySelector('.carousel-track');
    const originalImages = Array.from(carouselTrack.children);

    // 複製圖片，確保有足夠的內容來實現無限滾動
    // 至少複製兩次原始內容，以避免在滾動時出現空白
    originalImages.forEach(img => carouselTrack.appendChild(img.cloneNode(true)));
    originalImages.forEach(img => carouselTrack.appendChild(img.cloneNode(true))); // 再複製一次，共三套

    // 設定 CSS 變數來控制動畫的 `to` 點 (移動的距離)
    let animationKeyframe = '';
    if (direction === 'horizontal') {
      const trackWidth = carouselTrack.scrollWidth / 3; // 原始內容的一套寬度
      animationKeyframe = `
                @keyframes scrollHorizontal {
                    from { transform: translateX(0); }
                    to { transform: translateX(-${trackWidth}px); }
                }
            `;
      // carouselTrack.style.width = `${trackWidth * 3}px`; // 確保 track 寬度正確 (若有問題再啟用)
    } else if (direction === 'vertical') {
      const trackHeight = carouselTrack.scrollHeight / 3; // 原始內容的一套高度
      animationKeyframe = `
                @keyframes scrollVertical {
                    from { transform: translateY(0); }
                    to { transform: translateY(-${trackHeight}px); }
                }
            `;
      // carouselTrack.style.height = `${trackHeight * 3}px`; // 確保 track 高度正確 (若有問題再啟用)
    }

    // 將動態生成的 keyframes 插入到 style 標籤中
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = animationKeyframe;
    document.head.appendChild(styleSheet);
  }

  // 呼叫設定函式來啟動水平和垂直輪播
  setupInfiniteScroll('.carousel-horizontal', 'horizontal');
  setupInfiniteScroll('.carousel-vertical-grid', 'vertical');

  const defaultTabId = 'new-in'; // 我們的預設 tab ID
  const defaultData = inspirationData[defaultTabId]; // 去資料庫抓資料

  if (defaultData) {
    // 抓到資料後，手動更新大圖和商品網格
    mainImage.src = defaultData.mainImage;
    mainImage.alt = defaultTabId;
    updateProductGrid(defaultData.products);
  }
  const stickyAd = document.getElementById('sticky-ad-banner');
  const inspirationSection = document.getElementById('inspiration-section');

  // 確保廣告 和 觸發區塊 都存在於頁面上
  if (stickyAd && inspirationSection) {

    const observerOptions = {
      rootMargin: '0px',
      threshold: 0.1 // 觸發區塊 10% 進入視窗時
    };

    const adObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 區塊進入視窗，顯示廣告
          stickyAd.classList.remove('hidden');

          // (可選) 顯示後就停止觀察，讓它永久顯示
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // 開始觀察「探索本周靈感」區塊
    adObserver.observe(inspirationSection);
  }
});
