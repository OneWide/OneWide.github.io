const en = document.documentElement.lang === 'en';
const themeToggle = document.querySelector('.theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
function syncThemeButton() {
 const dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : systemTheme.matches;
 themeToggle.setAttribute('aria-pressed', String(dark));
 themeToggle.setAttribute('aria-label', en ? `Switch to ${dark ? 'light' : 'dark'} theme` : `切换${dark ? '浅色' : '深色'}主题`);
}
syncThemeButton();
systemTheme.addEventListener('change', syncThemeButton);
themeToggle.addEventListener('click', () => {
 const theme = themeToggle.getAttribute('aria-pressed') === 'true' ? 'light' : 'dark';
 document.documentElement.dataset.theme = theme;
 try { localStorage.setItem('theme', theme); } catch {}
 syncThemeButton();
});
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); }
menu.addEventListener('click', () => {
 const open = menu.getAttribute('aria-expanded') !== 'true';
 menu.setAttribute('aria-expanded', String(open));
 navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeMenu(); });
document.addEventListener('click', e => { if(!e.target.closest('.header-inner')) closeMenu(); });

document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
 document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
 let count = 0;
 document.querySelectorAll('.award-row').forEach(row => {
  row.hidden = button.dataset.filter !== 'all' && row.dataset.level !== button.dataset.filter;
  if(!row.hidden) count++;
 });
 document.querySelector('#filter-status').textContent = en ? `${count} awards shown` : `已显示 ${count} 项获奖`;
}));

const dialog = document.querySelector('#certificate-dialog');
let lastCertificate;
document.querySelectorAll('[data-certificate]').forEach(link => link.addEventListener('click', e => {
 if(typeof dialog.showModal !== 'function' || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
 e.preventDefault(); lastCertificate = link;
 document.querySelector('#certificate-title').textContent = link.dataset.title;
 const image = document.querySelector('#certificate-image');
 image.alt = link.dataset.title; image.src = link.href;
 document.querySelector('#certificate-original').href = link.href;
 dialog.showModal(); document.body.classList.add('dialog-open');
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => {
 const r = dialog.getBoundingClientRect();
 if(e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close();
});
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); lastCertificate?.focus(); });

async function copyText(value) {
 try { await navigator.clipboard.writeText(value); return true; }
 catch {
  const field = document.createElement('textarea'); field.value = value; field.style.position = 'fixed'; field.style.opacity = '0';
  document.body.append(field); field.select();
  try { return document.execCommand('copy'); } finally { field.remove(); }
 }
}
document.querySelector('.copy-email').addEventListener('click', async e => {
 const button = e.currentTarget;
 const ok = await copyText(button.dataset.email);
 document.querySelector('#copy-status').textContent = ok ? (en ? 'Copied!' : '已复制') : (en ? 'Please copy the address above.' : '请手动复制上方邮箱地址');
 button.focus();
});
document.querySelectorAll('.copy-bibtex').forEach(button => button.addEventListener('click', async () => {
 const ok = await copyText(button.previousElementSibling.textContent);
 button.textContent = ok ? (en ? 'Copied!' : '已复制') : (en ? 'Please select and copy the citation.' : '请选中引用手动复制');
}));

if('IntersectionObserver' in window) {
 const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   if(entry.isIntersecting) {
    navigation.querySelectorAll('a').forEach(a => {
     if(a.hash === `#${entry.target.id}`) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current');
    });
   }
  });
 }, { rootMargin: '-15% 0px -60% 0px' });
 document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
}
