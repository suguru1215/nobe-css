(function () {
  var btn = document.getElementById('nv2-menu-btn');
  var nav = document.getElementById('nv2-gnav');
  if (!btn || !nav) return;
  function setOpen(open) {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    if (open) { nav.setAttribute('data-open', 'true'); }
    else { nav.removeAttribute('data-open'); }
  }
  btn.addEventListener('click', function () {
    setOpen(btn.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      setOpen(false); btn.focus();
    }
  });
  setOpen(false);
})();


(function () {
  // Native Form の ID 設定漏れでも動くよう、相談内容欄から親フォームを辿る
  var form = document.getElementById('contact-form');
  if (!form) {
    var probe = document.getElementById('consultation_details');
    form = probe ? probe.closest('form') : null;
  }
  if (!form) return;
  var ta = document.getElementById('consultation_details');
  var count = document.getElementById('count-details');

  if (ta && count) {
    var render = function () { count.textContent = ta.value.length + ' / 3000文字'; };
    ta.addEventListener('input', render);
    render();
  }

  // 任意項目。未入力は許可し、入力時は http/https の絶対URLとホストを検証する
  function isOptionalHttpUrl(raw) {
    var value = String(raw == null ? '' : raw).trim();
    if (!value) return true;
    if (!/^https?:\/\//i.test(value)) return false;
    if (/\s|\\/.test(value)) return false;
    try {
      var url = new URL(value);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
      if (!url.hostname) return false;
      var probe = document.createElement('input');
      probe.type = 'url';
      probe.value = value;
      return probe.validity.valid;
    } catch (err) {
      return false;
    }
  }

  var RULES = [
    { id: 'company_name', msg: '会社名を入力してください。' },
    { id: 'full_name', msg: 'お名前を入力してください。' },
    { id: 'email', msg: 'メールアドレスを入力してください。',
      bad: 'メールアドレスの形式を確認してください。',
      re: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    { id: 'consultation_details', msg: 'ご相談内容を入力してください。' },
    { id: 'website_url', optional: true,
      bad: 'URLを https:// または http:// から入力してください。',
      test: isOptionalHttpUrl },
    { id: 'privacy_consent', check: true,
      msg: '個人情報の取り扱いへの同意をご確認ください。' }
  ];

  function showError(el, box, message) {
    box.textContent = message;
    box.hidden = false;
    el.setAttribute('aria-invalid', 'true');
    el.setAttribute('aria-describedby',
      (el.getAttribute('aria-describedby') || '').split(' ')
        .filter(function (x) { return x && x !== box.id; }).concat(box.id).join(' '));
  }
  function clearError(el, box) {
    box.hidden = true;
    el.removeAttribute('aria-invalid');
    // ヘルプ・カウンターなど他の参照は保持し、エラーIDだけを取り除く
    var ids = (el.getAttribute('aria-describedby') || '').split(' ')
      .filter(function (x) { return x && x !== box.id; });
    if (ids.length) { el.setAttribute('aria-describedby', ids.join(' ')); }
    else { el.removeAttribute('aria-describedby'); }
  }

  function validate() {
    var first = null;
    RULES.forEach(function (r) {
      var el = document.getElementById(r.id);
      var box = document.getElementById('err-' + r.id);
      if (!el || !box) return;
      clearError(el, box);
      var v = r.check ? el.checked : el.value.trim();
      if (r.check) {
        if (!v) { showError(el, box, r.msg); first = first || el; }
        return;
      }
      if (!v) {
        if (!r.optional) { showError(el, box, r.msg); first = first || el; }
        return;
      }
      var invalid = (r.test && !r.test(v)) || (r.re && !r.re.test(v));
      if (invalid) { showError(el, box, r.bad); first = first || el; }
    });
    return first;
  }

  // 送信完了・失敗の表示と送信中ラベルは Webflow Forms 側が制御する
  form.addEventListener('submit', function (e) {
    var first = validate();
    if (first) {
      e.preventDefault();
      e.stopImmediatePropagation();
      first.focus();
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'contact_form_validation_error', form_id: 'contact-form' });
      }
    }
  }, true);

  var started = false;
  form.addEventListener('input', function () {
    if (started) return;
    started = true;
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'contact_form_start', form_id: 'contact-form' });
    }
  }, true);
})();
