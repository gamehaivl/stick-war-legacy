(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const menuBtn = $('.mobile-menu-btn');
  const nav = $('#site-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    $$('.nav-group > a', nav).forEach(link => {
      link.addEventListener('click', (event) => {
        if (window.matchMedia('(max-width: 980px)').matches) {
          event.preventDefault();
          link.parentElement.classList.toggle('open');
        }
      });
    });
  }

  const toc = $('.toc-box');
  const tocBtn = $('.toc-toggle');
  if (toc && tocBtn) {
    tocBtn.addEventListener('click', () => {
      const collapsed = toc.classList.toggle('collapsed');
      tocBtn.setAttribute('aria-expanded', String(!collapsed));
    });
  }

  $$('.related-tabs').forEach(widget => {
    const buttons = $$('.tab-btn', widget);
    const panels = $$('.tab-panel', widget);
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        buttons.forEach(b => b.classList.toggle('active', b === btn));
        panels.forEach(panel => panel.classList.toggle('active', panel.dataset.panel === tab));
      });
    });
  });

  const backtop = $('.backtop');
  if (backtop) {
    window.addEventListener('scroll', () => backtop.classList.toggle('show', window.scrollY > 500), { passive: true });
    backtop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function formatSize(bytes) {
    const size = Number(bytes || 0);
    if (!size) return 'Đang cập nhật';
    if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB';
    if (size < 1024 * 1024 * 1024) return (size / 1024 / 1024).toFixed(2) + ' MB';
    return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB';
  }

  function fallbackDownload(list, sv) {
    list.innerHTML = `<div class="download-item"><div><strong>Stick War Legacy APK</strong><small>Nếu API tải không phản hồi trên GitHub Pages, hãy mở trang gốc hoặc cấu hình lại endpoint tải.</small></div><a href="https://gamehaivl.com/stick-war-legacy/" target="_blank" rel="noopener">Mở trang gốc</a></div>`;
  }

  $$('.download-box').forEach(box => {
    const btn = $('.download-main', box);
    const list = $('.download-list', box);
    const sv = box.dataset.sv;
    if (!btn || !list || !sv) return;
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      btn.textContent = 'Đang tải danh sách...';
      try {
        const response = await fetch(`https://link.modradar.com/download/${encodeURIComponent(sv)}`);
        const data = await response.json();
        if (!data.success || !Array.isArray(data.data)) throw new Error('Invalid download payload');
        list.innerHTML = data.data.map((item, index) => `
          <div class="download-item">
            <div><strong>${item.filename || 'File APK'}</strong><small>${formatSize(item.size)} | v${item.version || ''} | ${item.fileinfo || ''}</small></div>
            <button type="button" data-index="${index}">Tải về</button><span class="download-count" data-count="${index}"></span>
          </div>`).join('');
        $$('button[data-index]', list).forEach(downloadBtn => {
          downloadBtn.addEventListener('click', () => startCountdown(downloadBtn, sv, list));
        });
        btn.style.display = 'none';
      } catch (err) {
        fallbackDownload(list, sv);
        btn.style.display = 'none';
      }
    });
  });

  function startCountdown(button, sv, root) {
    if (button.dataset.ready === 'true' && button.dataset.url) {
      window.location.href = button.dataset.url;
      return;
    }
    button.disabled = true;
    const index = button.dataset.index;
    const count = $(`[data-count="${index}"]`, root);
    let seconds = 15;
    if (count) count.textContent = `${seconds}s`;
    const timer = setInterval(async () => {
      seconds -= 1;
      if (count) count.textContent = `${seconds}s`;
      if (seconds > 0) return;
      clearInterval(timer);
      try {
        const response = await fetch(`https://link.modradar.com/download/${encodeURIComponent(sv)}/${index}`);
        const result = await response.json();
        if (!result.success || !result.data || !result.data.url) throw new Error('No URL');
        button.disabled = false;
        button.dataset.ready = 'true';
        button.dataset.url = result.data.url;
        button.textContent = 'Tải về ngay';
        button.style.background = '#16a34a';
        if (count) count.textContent = '';
      } catch (err) {
        button.disabled = false;
        if (count) count.textContent = 'Lỗi, thử lại';
      }
    }, 1000);
  }
})();
