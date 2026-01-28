// ==========================================
// KONFİQURASİYA HİSSƏSİ (Buranı Dəyişdir)
// ==========================================
const CONFIG = {
    paypalEmail: "ghost_runner@net.co", // DƏYİŞDİR
    currency: "$"
};

// ==========================================
// SİMULYASİYA EDİLMİŞ VERİLƏNLƏR BAZASI
// ==========================================
function generateData(email) {
    let seed = 0;
    for (let i = 0; i < email.length; i++) {
        seed += email.charCodeAt(i);
    }
    
    return {
        // Rəqəmləri number tipində saxlayırıq ki, animasiya edə bilək
        balance: (seed * 25.43), 
        weeklyIncome: (seed * 3.15),
        weeklyExpense: (seed * 1.22),
        transactions: [
            { name: "CYBERPUNK_JOB", amount: "+ 450.00", date: "SYSTEM_TIME: NOW" },
            { name: "SERVER_COST", amount: "- 29.99", date: "T-MINUS 1 DAY" },
            { name: "DATA_SELL", amount: "+ 145.00", date: "T-MINUS 3 DAY" },
            { name: "NET_RUNNER_FEE", amount: "- 55.50", date: "LAST_CYCLE" },
            { name: "CRYPTO_EXCH", amount: "+ 820.00", date: "LAST_CYCLE" }
        ]
    };
}

// ==========================================
// RƏQƏM SAYMA ANİMASİYASI (YENİ)
// ==========================================
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Rəqəmi formatla (məs: 1234.56)
        obj.innerText = (progress * (end - start) + start).toFixed(2) + " " + CONFIG.currency;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ==========================================
// SİSTEMİN İŞƏ DÜŞMƏSİ
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Emaili yaz
    document.getElementById("user-email-display").innerText = CONFIG.paypalEmail.toUpperCase();

    // 2. Məlumatları gətir
    const data = generateData(CONFIG.paypalEmail);

    // 3. Ekrana doldur (Animasiya ilə - 2 saniyə ərzində)
    animateValue("total-balance", 0, data.balance, 2000);
    animateValue("weekly-income", 0, data.weeklyIncome, 1500);
    animateValue("weekly-expense", 0, data.weeklyExpense, 1500);

    // 4. Qrafikləri qaldır (Gecikmə ilə)
    setTimeout(() => {
        document.querySelectorAll('.bar-fill').forEach(bar => {
            bar.style.height = bar.getAttribute('style').replace('--h:', '');
        });
    }, 500);

    // 5. Tranzaksiyaları doldur
    const list = document.getElementById("transaction-list");
    list.innerHTML = ""; 
    data.transactions.forEach((item, index) => {
        let li = document.createElement("li");
        // Gecikmə ilə gəlmə effekti
        li.style.animation = `pulse 0.5s ease forwards ${index * 0.1}s`;
        li.innerHTML = `
            <span><span style="color:var(--primary)">></span> ${item.name}</span>
            <span style="text-align:right">${item.amount} ${CONFIG.currency}<br><small style="opacity:0.5">${item.date}</small></span>
        `;
        list.appendChild(li);
    });

    console.log("KİBER SİSTEM AKTİVDİR: " + CONFIG.paypalEmail);
});
