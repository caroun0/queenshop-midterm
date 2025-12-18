/* js/main.js (修正版) */

// -----------------------------------------------------------------
// 1. 您的內容資料庫
// -----------------------------------------------------------------
const inspirationData = {
  'new-in': {
    mainImage: 'img/inspiration-new-in.jpg',
    products: [
      { name: '抽鬚剪接設計傘擺牛仔裙 S/M/L', price: 'NT 790', img: 'img/product-1.jpg', url: 'product.html' },
      { name: '大口袋工裝設計彎刀長褲 兩色售 S/M/L', price: 'NT 790', img: 'img/product-2.jpg', url: 'product.html' },
      { name: '素面層次剪接夾克外套 兩色售', price: 'NT 890', img: 'img/product-3.jpg', url: 'product.html' },
      { name: '荷葉透紗花苞罩衫背心 三色售', price: 'NT 590', img: 'img/product-4.jpg', url: 'product.html' }
    ]
  },
  'cool': {
    mainImage: 'img/inspiration-cool.jpg',
    products: [
      { name: '涼感小花印字寬版上衣 兩色售', price: 'NT 490', img: 'img/product-5.jpg', url: 'product.html' },
      { name: '涼感輕薄下擺抽繩連帽外套 三色售', price: 'NT 690', img: 'img/product-6.jpg', url: 'product.html' },
      { name: '涼感素面傘襬蛋糕長裙 兩色售', price: 'NT 690', img: 'img/product-7.jpg', url: 'product.html' },
      { name: '涼感鬆緊腰頭綁帶長褲 五色售 S/M', price: 'NT 690', img: 'img/product-8.jpg', url: 'product.html' }
    ]
  },
  'collab': {
    mainImage: 'img/inspiration-collab.jpg',
    products: [
      { name: '姵萱聯名 立體手繪花花刺繡縫線針織毛衣-綠', price: 'NT 1380', img: 'img/product-9.jpg', url: 'product.html' },
      { name: '姵萱聯名 袖抽皺娃娃領牛仔上衣-深藍 S/M', price: 'NT 1280', img: 'img/product-10.jpg', url: 'product.html' },
      { name: '姵萱聯名 洗水刺繡口袋連帽衛衣-藍S/M/L/XL', price: 'NT 1280', img: 'img/product-11.jpg', url: 'product.html' },
      { name: '姵萱聯名 澎袖透紗綁帶異材質上衣-米白 S/M', price: 'NT 1180', img: 'img/product-12.jpg', url: 'product.html' }
    ]
  },
  'contest': {
    mainImage: 'img/inspiration-contest.jpg',
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

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================
  // (F) 側邊欄選單功能 (多內容切換版)
  // ==========================================================

  const menuTriggers = document.querySelectorAll('.menu-trigger'); // 抓取所有有 class="menu-trigger" 的連結
  const sidebarNav = document.getElementById('sidebar-nav');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const closeBtn = document.getElementById('close-btn');
  const submenuToggles = document.querySelectorAll('.submenu-toggle');
  const allMenuContents = document.querySelectorAll('.menu-content'); // 抓取所有側邊欄內容區塊

  // 1. 點擊 Header 上的任一按鈕
  if (menuTriggers.length > 0 && sidebarNav && sidebarOverlay) {
    menuTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault(); // 阻止連結跳轉

        // (A) 先取得這個按鈕對應的 menu id (例如 menu-inspiration)
        const targetMenuId = trigger.getAttribute('data-menu');

        // (B) 隱藏所有側邊欄內容
        allMenuContents.forEach(content => {
          content.classList.remove('active');
        });

        // (C) 顯示對應的內容
        const targetContent = document.getElementById(targetMenuId);
        if (targetContent) {
          targetContent.classList.add('active');
        }

        // (D) 打開側邊欄
        sidebarNav.classList.add('active');
        sidebarOverlay.classList.add('active');
      });
    });
  }

  // 2. 關閉側邊欄
  function closeSidebar() {
    if (sidebarNav && sidebarOverlay) {
      sidebarNav.classList.remove('active');
      sidebarOverlay.classList.remove('active');
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

  // 3. 子選單手風琴效果 (保持不變)
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const parentLi = toggle.parentElement;
      parentLi.classList.toggle('open');
    });
  });

  // ==========================================================
  // (NEW) 編輯精選：穿搭 Lookbook 切換功能
  // ==========================================================
  const lookbookItems = document.querySelectorAll('.lookbook-item');
  const productGroups = document.querySelectorAll('.product-group');

  if (lookbookItems.length > 0) {
    lookbookItems.forEach(item => {
      item.addEventListener('click', function() {
        // 1. 取得目標 ID
        const targetId = this.getAttribute('data-target');
        if (!targetId) return;

        // 2. 切換上方選單的 active 樣式
        lookbookItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        // 3. 切換下方商品的 active 樣式
        productGroups.forEach(group => {
          group.classList.remove('active');
          if (group.id === targetId) {
            group.classList.add('active');
          }
        });

        // 4. (選優) 點擊後自動將該項目捲動到中間 (適合手機板)
        this.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
    });
  }


  // ==========================================================
  // (A) 首頁專屬：靈感 Tab 切換 (如果有需要保留的話)
  // ==========================================================
  const navLinks = document.querySelectorAll('.inspiration-promo-nav a[data-tab]');
  const mainImage = document.querySelector('.inspiration-main-image img');
  const productGrid = document.querySelector('.inspiration .product-grid');

  // 在 main.js 中找到這個函式並覆蓋
  function updateProductGrid(products) {
    // 1. 找到要插入商品的容器 (對應您 HTML 中的 product-group)
    // 注意：這裡假設您已經有邏輯去抓取當前 active 的 group，或者您可以直接清空並重繪
    // 為了配合您目前的架構，這裡示範如何生成符合新排版的 HTML 字串

    const productGrid = document.querySelector('.product-group.active');
    // 如果您的邏輯是每次切換都清空重繪，請確保選對容器

    if (!productGrid) return;

    productGrid.innerHTML = ''; // 清空舊內容

    products.forEach(product => {
      // 確保資料庫有這些欄位，若無則顯示預設值避免報錯
      const name = product.name || '商品名稱';
      const price = product.price || '0';
      const modelId = product.modelId || '00000000'; // 型號
      const weight = product.weight || '0g';        // 重量
      const sales = product.sales || '已銷售0件';    // 銷售

      const productCardHTML = `
      <div class="product-card">
          <a href="${product.url || '#'}">
              <img src="${product.img}" alt="${name}">

              <div class="custom-product-info">

                  <h3 class="cp-name">${name}</h3>

                  <div class="cp-meta-row">
                      <div class="cp-meta-left">
                          <span class="cp-id">${modelId}</span>
                          <span class="cp-weight">${weight}</span>
                      </div>
                      <span class="cp-sales">${sales}</span>
                  </div>

                  <div class="cp-price-row">
                      NT. ${price}
                  </div>

              </div>
          </a>
      </div>
    `;
      productGrid.insertAdjacentHTML('beforeend', productCardHTML);
    });
  }

  if (navLinks.length > 0 && mainImage && productGrid) {
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

    const defaultTabId = 'new-in';
    const defaultData = inspirationData[defaultTabId];
    if (defaultData) {
      mainImage.src = defaultData.mainImage;
      mainImage.alt = defaultTabId;
      updateProductGrid(defaultData.products);
    }
  }


  // ==========================================================
  // (B) 無限滾動動畫
  // ==========================================================
  function setupInfiniteScroll(containerSelector, direction) {
    const carouselContainer = document.querySelector(containerSelector);
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

  setupInfiniteScroll('.carousel-horizontal', 'horizontal');
  // setupInfiniteScroll('.carousel-vertical-grid', 'vertical');


  // ==========================================================
  // (C) 商品頁手風琴 (Accordion)
  // ==========================================================
  const accordionItems = document.querySelectorAll('.product-accordion .accordion-item');
  if (accordionItems.length > 0) {
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      header.addEventListener('click', () => {
        if (header.id === 'open-size-chart-modal') return;
        const isActive = item.classList.contains('active');
        accordionItems.forEach(otherItem => otherItem.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    });
  }


  // ==========================================================
  // (NEW) 尺寸表 Modal
  // ==========================================================
  const sizeChartModal = document.getElementById('size-chart-modal');
  const openSizeChartButton = document.getElementById('open-size-chart-modal');
  const closeSizeChartButton = document.getElementById('close-size-chart-modal');

  if (sizeChartModal && openSizeChartButton && closeSizeChartButton) {
    openSizeChartButton.addEventListener('click', (e) => {
      e.preventDefault();
      sizeChartModal.classList.add('active');
    });
    closeSizeChartButton.addEventListener('click', () => {
      sizeChartModal.classList.remove('active');
    });
    sizeChartModal.addEventListener('click', (e) => {
      if (e.target === sizeChartModal) {
        sizeChartModal.classList.remove('active');
      }
    });
  }


  // ==========================================================
  // (D) 商品頁選項 (Option Selection)
  // ==========================================================
  function handleOptionSelection(containerSelector, buttonSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
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

  if (colorSwatches.length > 0 && gallerySets.length > 0) {
    colorSwatches.forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        e.preventDefault();
        const targetColor = swatch.dataset.color;
        colorSwatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
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

  handleOptionSelection('.size-options', 'button');
  handleOptionSelection('.availability-tabs', 'button');


  // ==========================================================
  // (E) 滾動觸發式廣告
  // ==========================================================
  const stickyAd = document.getElementById('sticky-ad-banner');
  const inspirationSection = document.getElementById('inspiration-section');

  if (stickyAd && inspirationSection) {
    const observerOptions = { rootMargin: '0px', threshold: 0.1 };
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

}); // DOMContentLoaded End
