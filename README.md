# موقع تسجيل الموظفين

## 1) جهزي ملف الإكسل
- ارفعي ملف الإكسل إلى Google Drive
- افتحيه في Google Sheets
- إذا تبغين نسخة Google Sheets مستقلة: File > Save as Google Sheets

## 2) اربطيه مع Apps Script
- من داخل الجدول: Extensions > Apps Script
- انسخي محتوى `apps-script/Code.gs`
- بدلي `PUT_YOUR_GOOGLE_SHEET_ID_HERE` بمعرف الجدول
- تأكدي أن اسم الورقة `Sheet1` أو غيريه في الكود
- Deploy > New deployment > Web app
- Execute as: Me
- Who has access: Anyone
- انسخي رابط `exec`

## 3) اربطي الواجهة
- افتحي `config.js`
- بدلي `PUT_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` برابط `exec`

## 4) ارفعي الموقع إلى GitHub
- أنشئي Repository جديد
- ارفعي الملفات
- Settings > Pages
- اختاري Branch الرئيسي و Root
- بيطلع لك رابط الموقع

## 5) النتيجة
- كل موظف يفتح الرابط ويدخل بياناته
- التكرار ممنوع حسب الإيميل
- البيانات تنحفظ في نفس ترتيب أعمدة ملفك

## 6) إذا تبين Excel مرة ثانية
- من Google Sheets: File > Download > Microsoft Excel
