> Пингвинчик:
const app = {
    // ЦЕНЫ ЗА СИМКИ (можно менять тут)
    prices: { s1: 100, s2: 150, s3: 200, s4: 250, pct: 0.05, uslPct: 0.20 },
    
    currentUser: "",
    daysData: JSON.parse(localStorage.getItem('savedDaysData')) || {}, 

    start: function(name) {
        this.currentUser = name;
        document.getElementById('screen-login').style.display = 'none';
        document.getElementById('screen-main').style.display = 'block';
        document.getElementById('display-user').innerText = "Профиль: " + name;

        const adminLink = document.getElementById('admin-link-wrapper');
        adminLink.style.display = (name.toUpperCase() === 'НИКИТА') ? 'block' : 'none';

        this.renderCalendar();
        this.updateTotalSalary();
    },

    // МГНОВЕННЫЙ РАСЧЕТ
    calcQuick: function() {
        const tov = parseFloat(document.getElementById('quick-tov').value) || 0;
        const s1 = parseInt(document.getElementById('q-s1').value) || 0;
        const s2 = parseInt(document.getElementById('q-s2').value) || 0;
        const s3 = parseInt(document.getElementById('q-s3').value) || 0;
        const s4 = parseInt(document.getElementById('q-s4').value) || 0;

        const res = Math.round(
            (tov * this.prices.pct) + 
            (s1 * this.prices.s1) + 
            (s2 * this.prices.s2) + 
            (s3 * this.prices.s3) + 
            (s4 * this.prices.s4)
        );
        document.getElementById('quick-res').innerText = res;
    },

    renderCalendar: function() {
        const grid = document.getElementById('calendar-grid');
        grid.innerHTML = "";
        for (let i = 1; i <= 31; i++) {
            const btn = document.createElement('button');
            btn.innerText = i;
            btn.className = "day-btn";
            if (this.daysData[i]) btn.classList.add('active-day');
            btn.onclick = () => this.showDayDetails(i);
            grid.appendChild(btn);
        }
    },

    toggleCalendar: function() {
        const cont = document.getElementById('calendar-container');
        cont.style.display = (cont.style.display === 'none') ? 'block' : 'none';
    },

    showDayDetails: function(day) {
        const modal = document.getElementById('day-details');
        const info = document.getElementById('detail-info');
        const delBtn = document.getElementById('delete-day-btn');
        document.getElementById('detail-date').innerText = day + " Число";

        const d = this.daysData[day];
        if (d) {
            info.innerHTML = `
                <p style="font-size:18px; color:green;">💰 Итог: <b>${d.total} ₽</b></p>
                <div style="text-align:left; font-size:12px;">
                    • Товар: ${d.tov} ₽<br>
                    • Симки: [1:${d.s1}] [2:${d.s2}] [3:${d.s3}] [4:${d.s4}]<br>
                    • Услуги: ${d.usl} ₽
                </div>
            `;
            delBtn.onclick = () => this.deleteDay(day);
            delBtn.style.display = (this.currentUser === 'НИКИТА') ? 'inline-block' : 'none';
        } else {
            info.innerHTML = "<p>Нет данных</p>";
            delBtn.style.display = 'none';
        }
        modal.style.display = 'block';
    },

    closeDetails: function() { document.getElementById('day-details').style.display = 'none'; },
    toggleAdmin: function() {
        const box = document.getElementById('admin-box');
        box.style.display = (box.style.display === 'none') ? 'block' : 'none';
    },

    handleAdminSave: function() {
        const day = document.getElementById('adm-day').value;
        const tov = parseFloat(document.getElementById('adm-tov').value) || 0;
        const s1 = parseInt(document.getElementById('adm-s1').value) || 0;
        const s2 = parseInt(document.getElementById('adm-s2').value) || 0;
        const s3 = parseInt(document.getElementById('adm-s3').value) || 0;
        const s4 = parseInt(document.getElementById('adm-s4').value) || 0;
        const usl = parseFloat(document.getElementById('adm-usl').value) || 0;

        if (!day⠵⠵⠵⠵⠟⠞⠺⠞⠟⠵⠵day > 31) return alert("Введите число!");

> Пингвинчик:
const dailyProfit = Math.round(
            (tov * this.prices.pct) + 
            (s1 * this.prices.s1) + (s2 * this.prices.s2) + 
            (s3 * this.prices.s3) + (s4 * this.prices.s4) + 
            (usl * this.prices.uslPct)
        );

        this.daysData[day] = { tov, s1, s2, s3, s4, usl, total: dailyProfit };
        this.saveData();
        this.renderCalendar();
        this.updateTotalSalary();
        this.toggleAdmin();
        alert("Данные за " + day + " число сохранены!");
    },

    deleteDay: function(day) {
        if (confirm("Удалить " + day + " число?")) {
            delete this.daysData[day];
            this.saveData();
            this.renderCalendar();
            this.updateTotalSalary();
            this.closeDetails();
        }
    },

    updateTotalSalary: function() {
        let total = 0;
        for (let day in this.daysData) total += this.daysData[day].total;
        document.getElementById('display-zp').innerText = total + " ₽";
    },

    saveData: function() { localStorage.setItem('savedDaysData', JSON.stringify(this.daysData)); }
};
