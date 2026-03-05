const app = {
    // ЦЕНЫ: 5% товар, 20% услуги, симки: 100, 150, 200, 250
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
        this.loadTodayNote();
    },

    // Сохранение текста в блокноте (привязано к сегодняшнему числу)
    saveNote: function() {
        const day = new Date().getDate();
        const noteText = document.getElementById('quick-note').value;
        
        if (!this.daysData[day]) this.daysData[day] = { total: 0, note: "" };
        this.daysData[day].note = noteText;
        this.saveData();
    },

    loadTodayNote: function() {
        const day = new Date().getDate();
        if (this.daysData[day] && this.daysData[day].note) {
            document.getElementById('quick-note').value = this.daysData[day].note;
        }
    },

    calcQuick: function() {
        const tov = parseFloat(document.getElementById('quick-tov').value) || 0;
        const s1 = parseInt(document.getElementById('q-s1').value) || 0;
        const s2 = parseInt(document.getElementById('q-s2').value) || 0;
        const s3 = parseInt(document.getElementById('q-s3').value) || 0;
        const s4 = parseInt(document.getElementById('q-s4').value) || 0;
        const usl = parseFloat(document.getElementById('q-usl').value) || 0;

        const res = Math.round(
            (tov * this.prices.pct) + (usl * this.prices.uslPct) +
            (s1 * this.prices.s1) + (s2 * this.prices.s2) + 
            (s3 * this.prices.s3) + (s4 * this.prices.s4)
        );
        document.getElementById('quick-res').innerText = res;
    },

    renderCalendar: function() {
        const grid = document.getElementById('calendar-grid');
        grid.innerHTML = "";
        for (let i = 1; i <= 31; i++) {
            const btn = document.createElement('button');
            btn.innerText = i;
            btn.className = "day-btn " + (this.daysData[i] ? "active-day" : "");
            btn.onclick = () => this.showDayDetails(i);
            grid.appendChild(btn);
        }
    },

    showDayDetails: function(day) {
        const modal = document.getElementById('day-details');
        document.getElementById('detail-date').innerText = day + " Число";
        const d = this.daysData[day];

        const noteView = document.getElementById('detail-note');
        noteView.innerText = (d && d.note) ? d.note : "Записей в блокноте нет";

        const info = document.getElementById('detail-info');
        if (d && d.total > 0) {
            info.innerHTML = <p style="color:green; font-weight:bold;">Прибыль в графике: ${d.total} ₽</p>;
        } else {
            info.innerHTML = "<p style='font-size:12px;'>Итог в график пока не внесён</p>";
        }

        document.getElementById('delete-day-btn').onclick = () => this.deleteDay(day);
        document.getElementById('delete-day-btn').style.display = (this.currentUser === 'НИКИТА') ? 'block' : 'none';
        modal.style.display = 'block';
    },

    handleAdminSave: function() {
        const day = document.getElementById('adm-day').value;
        const tov = parseFloat(document.getElementById('adm-tov').value) || 0;
        const usl = parseFloat(document.getElementById('adm-usl').value) || 0;
        const s1 = parseInt(document.getElementById('adm-s1').value) || 0;
        const s2 = parseInt(document.getElementById('adm-s2').value) || 0;
        const s3 = parseInt(document.getElementById('adm-s3').value) || 0;
        const s4 = parseInt(document.
getElementById('adm-s4').value) || 0;

        if (!day) return alert("Укажите число!");

        const dailyProfit = Math.round(
            (tov * this.prices.pct) + (usl * this.prices.uslPct) +
            (s1 * this.prices.s1) + (s2 * this.prices.s2) + 
            (s3 * this.prices.s3) + (s4 * this.prices.s4)
        );

        if (!this.daysData[day]) this.daysData[day] = { note: "" };
        this.daysData[day].total = dailyProfit;
        
        this.saveData();
        this.renderCalendar();
        this.updateTotalSalary();
        alert("График обновлен!");
    },

    toggleCalendar: function() {
        const c = document.getElementById('calendar-container');
        c.style.display = (c.style.display === 'none') ? 'block' : 'none';
    },
    toggleAdmin: function() {
        const b = document.getElementById('admin-box');
        b.style.display = (b.style.display === 'none') ? 'block' : 'none';
    },
    closeDetails: function() { document.getElementById('day-details').style.display = 'none'; },
    updateTotalSalary: function() {
        let t = 0;
        for (let d in this.daysData) t += (this.daysData[d].total || 0);
        document.getElementById('display-zp').innerText = t + " ₽";
    },
    saveData: function() { localStorage.setItem('savedDaysData', JSON.stringify(this.daysData)); },
    deleteDay: function(day) {
        if (confirm("Удалить данные за " + day + "?")) {
            delete this.daysData[day];
            this.saveData();
            this.renderCalendar();
            this.updateTotalSalary();
            this.closeDetails();
        }
    }
};