// ==========================================
// KONFİQURASİYA HİSSƏSİ (Buranı Dəyişdir)
// ==========================================

// Bura öz PayPal gmailini yaz. Sistem bunu oxuyacaq.
const CONFIG = {
    paypalEmail: "admin@example.com", // BURANI DƏYİŞDİR
    currency: "$"
};

// ==========================================
// SİMULYASİYA EDİLMİŞ VERİLƏNLƏR BAZASI
// ==========================================
// Qeyd: Real API olmadığı üçün, email-ə görə fərqli "fake" datalar yaradırıq.
function generateData(email) {
    // Email hərflərinin uzunluğuna görə təsadüfi rəqəm yaradırıq (sabit qalsın deyə)
    let seed = email.length * 123; 
    
    return {
        balance: (seed * 15.4).toFixed(2),
        weeklyIncome: (seed * 2.1).toFixed(2),
        weeklyExpense: (seed * 0.8).toFixed(2),
        transactions: [
            { name: "Upwork Payment", amount: "+ 150.00", date: "Bu gün" },
            { name: "Spotify", amount: "- 9.99", date: "Dünən" },
            { name: "Fiverr Freelance", amount: "+ 45.00", date: "2 gün əvvəl" },
            { name: "AWS Server", amount: "- 25.50", date: "Keçən həftə" },
            { name: "Envato Market", amount: "+ 320.00", date: "Keçən həftə" }
        ]
    };
}

// ==========================================
// SİSTEMİN İŞƏ DÜŞMƏSİ
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Emaili ekrana yaz
    const emailDisplay = document.getElementById("user-email-display");
    emailDisplay.innerText = CONFIG.paypalEmail.toUpperCase();

    // 2. Məlumatları "Gətir" (Simulyasiya)
    const data = generateData(CONFIG.paypalEmail);

    // 3. Ekrana doldur
    document.getElementById("total-balance").innerText = data.balance + " " + CONFIG.currency;
    document.getElementById("weekly-income").innerText = data.weeklyIncome + " " + CONFIG.currency;
    document.getElementById("weekly-expense").innerText = data.weeklyExpense + " " + CONFIG.currency;

    // 4. Tranzaksiyaları doldur
    const list = document.getElementById("transaction-list");
    list.innerHTML = ""; // Təmizlə
    
    data.transactions.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span>${item.name}</span>
            <span>${item.amount} ${CONFIG.currency}</span>
        `;
        list.appendChild(li);
    });

    console.log("Sistem işə düşdü: " + CONFIG.paypalEmail);
});
