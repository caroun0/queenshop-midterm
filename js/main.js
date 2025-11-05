/* js/main.js (已更新並修正錯誤) */

// -----------------------------------------------------------------
// 1. 您的內容資料庫
// -----------------------------------------------------------------
const inspirationData = {
  // "NEW IN" 對應 data-tab="new-in"
  'new-in': {
    mainImage: 'img/inspiration-new-in.jpg', // "NEW IN" 的大圖
    products: [
      { name: '抽鬚剪接設計傘擺牛仔裙 S/M/L', price: 'NT 790', img: 'img/product-1.jpg', url: 'product.html' },
      { name: '大口袋工裝設計彎刀長褲 兩色售 S/M/L', price: 'NT 790', img: 'img/product-2.jpg', url: 'product.html' },
      { name: '素面層次剪接夾克外套 兩色售', price: 'NT 890', img: 'img/product-3.jpg', url: 'product.html' },
      { name: '荷葉透紗花苞罩衫背心 三色售', price: 'NT 590', img: 'img/product-4.jpg', url: 'product.html' }
    ]
  },
  // "COOL FFEELING" 對應 data-tab="cool"
  'cool': {
    mainImage: 'img/inspiration-cool.jpg', // "COOL FFEELING" 的大圖
    products: [
      { name: '涼感小花印字寬版上衣 兩色售', price: 'NT 490', img: 'img/product-5.jpg', url: 'product.html' },
      { name: '涼感輕薄下擺抽繩連帽外套 三色售', price: 'NT 690', img: 'img/product-6.jpg', url: 'product.html' },
      { name: '涼感素面傘襬蛋糕長裙 兩色售', price: 'NT 690', img: 'img/product-7.jpg', url: 'product.html' },
      { name: '涼感鬆緊腰頭綁帶長褲 五色售 S/M', price: 'NT 690', img: 'img/product-8.jpg', url: 'product.html' }
    ]
  },
  // "最新聯名" 對應 data-tab="collab"
  'collab': {
    mainImage: 'img/inspiration-collab.jpg', // "最新聯名" 的大圖
    products: [
      { name: '姵萱聯名 立體手繪花花刺繡縫線針織毛衣-綠', price: 'NT 1380', img: 'img/product-9.jpg', url: 'product.html' },
      { name: '姵萱聯名 袖抽皺娃娃領牛仔上衣-深藍 S/M', price: 'NT 1280', img: 'img/product-10.jpg', url: 'product.html' },
      { name: '姵萱聯名 洗水刺繡口袋連帽衛衣-藍S/M/L/XL', price: 'NT 1280', img: 'img/product-11.jpg', url: 'product.html' },
      { name: '姵萱聯名 澎袖透紗綁帶異材質上衣-米白 S/M', price: 'NT 1180', img: 'img/product-12.jpg', url: 'product.html' }
    ]
  },
  // "穿搭大賽" 對應 data-tab="contest"
  'contest': {
    mainImage: 'img/inspiration-contest.jpg', // "穿搭大賽" 的大圖
    products: [
      { name: '兩面穿排釦抓皺設計透膚長袖上衣 三色售', price: 'NT 490', img: 'img/product-13.jpg', url: 'product.html' },
      { name: '豹紋設計直筒長裙附皮帶 S/M/L', price: 'NT 790', img: 'img/product-14.jpg', url: 'product.html' },
      { name: '真羊皮分趾設計娃娃鞋 兩色售 36-39', price: 'NT 1780', img: 'img/product-15.jpg', url: 'product.html' },
      { name: '軟皮革半月造型側背包 三色售', price: 'NT 590', img: 'img/product-16.jpg', url: 'product.html' }
    ]
  }
};

// -----------------------------------------------------------------
// 2. JavaScript 程式邏輯
// -----------------------------------------------------------------

// 確保網頁 DOM 載入完成後才執行
document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================
  // (A) 首頁專屬：靈感 Tab 切換
  // ==========================================================
  const navLinks = document.querySelectorAll('.inspiration-promo-nav a[data-tab]');
  const mainImage = document.querySelector('.inspiration-main-image img');
  const productGrid = document.querySelector('.inspiration .product-grid');

  // 替換商品網格內容的函式
  function updateProductGrid(products) {
    // 1. 清空目前的商品
    productGrid.innerHTML = '';
    // 2. 迴圈讀取
    products.forEach(product => {
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
      productGrid.insertAdjacentHTML('beforeend', productCardHTML);
    });
  }

  // *** 這是關鍵修正 ***
  // 只有當 `navLinks`, `mainImage`, `productGrid` 都存在時 (亦即在 index.html)，才執行
  if (navLinks.length > 0 && mainImage && productGrid) {

    // 幫每個導覽連結加上點擊事件
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = link.dataset.tab;
        const data = inspirationData[tabId];

        if (data) {
          document.querySelector('.inspiration-promo-nav li.active').classList.remove('active');
          link.parentElement.classList.add('active');
          mainImage.src = data.mainImage;
          mainImage.alt = tabId;
          updateProductGrid(data.products);
        }
      });
    });

    // 手動初始化，載入預設(NEW IN)的內容
    const defaultTabId = 'new-in';
    const defaultData = inspirationData[defaultTabId];
    if (defaultData) {
      mainImage.src = defaultData.mainImage;
      mainImage.alt = defaultTabId;
      updateProductGrid(defaultData.products);
    }
  }


  // ==========================================================
  // (B) 首頁專屬：無限滾動
  // ==========================================================
  function setupInfiniteScroll(containerSelector, direction) {
    const carouselContainer = document.querySelector(containerSelector);
    // (防護罩) 如果在其他頁面找不到此元素，就直接退出
    if (!carouselContainer) return;

    const carouselTrack = carouselContainer.querySelector('.carousel-track');
    const originalImages = Array.from(carouselTrack.children);

    originalImages.forEach(img => carouselTrack.appendChild(img.cloneNode(true)));
    originalImages.forEach(img => carouselTrack.appendChild(img.cloneNode(true)));

    let animationKeyframe = '';
    if (direction === 'horizontal') {
      const trackWidth = carouselTrack.scrollWidth / 3;
      animationKeyframe = `
                @keyframes scrollHorizontal {
                    from { transform: translateX(0); }
                    to { transform: translateX(-${trackWidth}px); }
                }
            `;
    } else if (direction === 'vertical') {
      const trackHeight = carouselTrack.scrollHeight / 3;
      animationKeyframe = `
                @keyframes scrollVertical {
                    from { transform: translateY(0); }
                    to { transform: translateY(-${trackHeight}px); }
                }
            `;
    }

    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = animationKeyframe;
    document.head.appendChild(styleSheet);
  }

  // 呼叫設定函式
  setupInfiniteScroll('.carousel-horizontal', 'horizontal');
  setupInfiniteScroll('.carousel-vertical-grid', 'vertical');


  // ==========================================================
  // (C) 商品頁專屬：手風琴 (Accordion)
  // ==========================================================
  const accordionItems = document.querySelectorAll('.product-accordion .accordion-item');

  // (防護罩) 只有在找到手風琴項目時才執行
  if (accordionItems.length > 0) {
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');

      header.addEventListener('click', () => {
        if (header.id === 'open-size-chart-modal') {
          return; // 結束，不執行下面的程式碼
        }
        const isActive = item.classList.contains('active');
        accordionItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }


  // ==========================================================
  // (NEW) 商品頁專屬：尺寸表 Modal
  // ==========================================================
  const sizeChartModal = document.getElementById('size-chart-modal');
  const openSizeChartButton = document.getElementById('open-size-chart-modal');
  const closeSizeChartButton = document.getElementById('close-size-chart-modal');

  // (防護罩)
  if (sizeChartModal && openSizeChartButton && closeSizeChartButton) {

    // 1. 點擊「尺寸表」按鈕
    openSizeChartButton.addEventListener('click', (e) => {
      e.preventDefault();
      sizeChartModal.classList.add('active');
    });

    // 2. 點擊 "X" 關閉
    closeSizeChartButton.addEventListener('click', () => {
      sizeChartModal.classList.remove('active');
    });

    // 3. 點擊背景遮罩關閉
    sizeChartModal.addEventListener('click', (e) => {
      // 確保點擊的是遮罩本身，而不是裡面的內容
      if (e.target === sizeChartModal) {
        sizeChartModal.classList.remove('active');
      }
    });
  }

  // ==========================================================
  // (D) 商品頁專屬：選項 (Option Selection)
  // ==========================================================

  /**
   * 輔助函式：處理選項群組的 "active" 狀態
   * @param {string} containerSelector - 包含選項的父層容器 (e.g., '.size-options')
   * @param {string} buttonSelector - 可點擊的選項 (e.g., 'button')
   */
  function handleOptionSelection(containerSelector, buttonSelector) {
    const container = document.querySelector(containerSelector);

    // (防護罩) 如果在其他頁面找不到此元素，就直接退出
    if (!container) {
      return;
    }

    const buttons = container.querySelectorAll(buttonSelector);

    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
  }

  const colorSwatches = document.querySelectorAll('.color-swatches .swatch');
  const gallerySets = document.querySelectorAll('.product-gallery-stack .gallery-images-set');

// (防護罩) 只有在 product.html 頁面才執行
  if (colorSwatches.length > 0 && gallerySets.length > 0) {
    colorSwatches.forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        e.preventDefault();

        // 1. 取得要顯示的顏色 (e.g., "black")
        const targetColor = swatch.dataset.color;

        // 2. 更新按鈕的 active 狀態
        colorSwatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');

        // 3. 更新大圖的 active 狀態
        gallerySets.forEach(set => {
          if (set.dataset.colorGallery === targetColor) {
            set.classList.add('active');
          } else {
            set.classList.remove('active');
          }
        });
      });
    });
  }

  // 呼叫函式，分別套用在您
  handleOptionSelection('.size-options', 'button');         // 2. 尺寸群組
  handleOptionSelection('.availability-tabs', 'button');  // 3. 官網/店鋪群組


  // ==========================================================
  // (E) 首頁專屬：滾動觸發式廣告
  // ==========================================================
  const stickyAd = document.getElementById('sticky-ad-banner');
  const inspirationSection = document.getElementById('inspiration-section');

  // (防護罩) 只有在*同時*找到廣告 和 *首頁觸發區塊* 時才執行
  if (stickyAd && inspirationSection) {

    const observerOptions = {
      rootMargin: '0px',
      threshold: 0.1
    };

    const adObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stickyAd.classList.remove('hidden');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    adObserver.observe(inspirationSection);
  }

}); // DOMContentLoaded 結束
