// script.js
document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM
    const emailInput = document.getElementById('faucetpay-email');
    const startBtn = document.getElementById('start-mining');
    const stopBtn = document.getElementById('stop-mining');
    const loginSection = document.getElementById('login-section');
    const miningStats = document.getElementById('mining-stats');
    const balanceElement = document.getElementById('balance');
    const hashrateElement = document.getElementById('hashrate');
    const progressBar = document.getElementById('progress-bar');
    const earningsElement = document.getElementById('earnings');
    
    // متغيرات التعدين
    let miningInterval;
    let currentBalance = 0;
    let miningActive = false;
    let hashrate = 0;
    
    // معدلات التعدين (يمكن تغييرها)
    const baseHashrate = 10; // H/s
    const earningsPerSecond = 0.0000001; // BTC
    
    // بدء التعدين
    startBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();
        
        // التحقق من صحة الإيميل
        if (!validateEmail(email)) {
            alert('الرجاء إدخال إيميل FaucetPay صحيح');
            return;
        }
        
        // بدء التعدين
        startMiningProcess(email);
    });
    
    // إيقاف التعدين
    stopBtn.addEventListener('click', stopMiningProcess);
    
    // التحقق من صحة الإيميل
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // عملية التعدين
    function startMiningProcess(email) {
        // تبديل الواجهة
        loginSection.style.display = 'none';
        miningStats.style.display = 'block';
        miningActive = true;
        
        // تسجيل الدخول (في الواقع هنا يجب الاتصال بالخادم)
        console.log('بدأ التعدين لحساب: ', email);
        
        // محاكاة التعدين
        miningInterval = setInterval(function() {
            // زيادة الرصيد
            currentBalance += earningsPerSecond;
            balanceElement.textContent = currentBalance.toFixed(8);
            
            // توليد معدل هاش عشوائي
            hashrate = baseHashrate + Math.random() * 5;
            hashrateElement.textContent = hashrate.toFixed(2);
            
            // تحديث شريط التقدم
            const progress = (currentBalance % 0.0001) / 0.0001 * 100;
            progressBar.style.width = progress + '%';
            
            // عند الوصول إلى حد معين (مثال: 0.0001 BTC)
            if (currentBalance >= 0.0001 && currentBalance % 0.0001 < earningsPerSecond) {
                // في الواقع هنا يجب إرسال طلب إلى FaucetPay API
                simulatePayout(email, 0.0001);
                currentBalance -= 0.0001;
            }
        }, 1000);
    }
    
    // إيقاف التعدين
    function stopMiningProcess() {
        clearInterval(miningInterval);
        miningActive = false;
        
        // تبديل الواجهة
        miningStats.style.display = 'none';
        loginSection.style.display = 'block';
        
        console.log('تم إيقاف التعدين. الرصيد النهائي: ', currentBalance);
    }
    
    // محاكاة دفع إلى FaucetPay (في الواقع يجب استخدام API)
    function simulatePayout(email, amount) {
        console.log(`تم دفع ${amount} BTC إلى ${email}`);
        earningsElement.innerHTML += `<div class="payout">+${amount.toFixed(8)} BTC</div>`;
        
        // عرض إشعار
        const notification = document.createElement('div');
        notification.className = 'payout-notification';
        notification.textContent = `تم تحويل ${amount.toFixed(8)} BTC إلى ${email}`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    // يمكن إضافة المزيد من الوظائف مثل:
    // - الاتصال بـ FaucetPay API
    // - حفظ الجلسة
    // - إدارة الإعدادات
});