const form = document.getElementById('employeeForm');
const messageBox = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');

function showMessage(text, type) {
  messageBox.hidden = false;
  messageBox.className = `message ${type}`;
  messageBox.textContent = text;
}

function clearMessage() {
  messageBox.hidden = true;
  messageBox.className = 'message';
  messageBox.textContent = '';
}

function getFormData() {
  const data = new FormData(form);
  return {
    department: (data.get('department') || '').toString().trim(),
    email: (data.get('email') || '').toString().trim().toLowerCase(),
    status1: (data.get('status1') || '').toString().trim(),
    extension: (data.get('extension') || '').toString().trim(),
    status2: (data.get('status2') || '').toString().trim()
  };
}

function jsonp(url, params) {
  return new Promise((resolve, reject) => {
    const callbackName = `cb_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    const script = document.createElement('script');
    const query = new URLSearchParams({ ...params, callback: callbackName }).toString();
    const src = `${url}${url.includes('?') ? '&' : '?'}${query}`;

    const cleanup = () => {
      delete window[callbackName];
      script.remove();
      clearTimeout(timer);
    };

    const timer = setTimeout(() => {
      cleanup();
      reject(new Error('timeout'));
    }, 20000);

    window[callbackName] = result => {
      cleanup();
      resolve(result);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error('network'));
    };

    script.src = src;
    document.body.appendChild(script);
  });
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  clearMessage();

  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === 'PUT_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE') {
    showMessage('حطي رابط Apps Script داخل ملف config.js', 'err');
    return;
  }

  if (!form.reportValidity()) {
    return;
  }

  const payload = getFormData();
  submitBtn.disabled = true;
  submitBtn.textContent = 'جارٍ الإرسال...';

  try {
    const result = await jsonp(APPS_SCRIPT_URL, {
      action: 'submit',
      department: payload.department,
      email: payload.email,
      status1: payload.status1,
      extension: payload.extension,
      status2: payload.status2
    });

    if (result && result.ok) {
      showMessage('تم حفظ البيانات بنجاح', 'ok');
      form.reset();
      return;
    }

    showMessage(result && result.message ? result.message : 'تعذر حفظ البيانات', 'err');
  } catch (error) {
    showMessage('حدث خطأ في الاتصال', 'err');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'إرسال';
  }
});
