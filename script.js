document.addEventListener('DOMContentLoaded', () => {
    // 1. БАЗА ДАННЫХ
    let db = JSON.parse(localStorage.getItem('Infinity_V5_Data')) || {};

    // 2. ЭЛЕМЕНТЫ
    const ui = {
        screenLogin: document.getElementById('screen-login'),
        screenMain: document.getElementById('screen-main'),
        userName: document.getElementById('user-display'),
        noteArea: document.getElementById('note-area'),
        totalVal: document.getElementById('total-val'),
        grid: document.getElementById('grid'),
        modal: document.getElementById('modal'),
        admLink: document.getElementById('adm-link'),
        admBox: document.getElementById('adm-box'),
        calBox: document.getElementById('cal-box')
    };

    // 3. ФУНКЦИИ ЛОГИКИ
    const save = () => localStorage.setItem('Infinity_V5_Data', JSON.stringify(db));

    const render = () => {
        ui.grid.innerHTML = "";
        let totalMonth = 0;
        for (let i = 1; i <= 31; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = "day";
            let label = "";
            if (db[i]) {
                if (db[i].cash > 0) {
                    dayDiv.classList.add("green");
                    label = db[i].cash + " ₽";
                    totalMonth += db[i].cash;
                } else if (db[i].note && db[i].note.trim() !== "") {
                    dayDiv.classList.add("green");
                    label = "ЗАП";
                }
            }
            dayDiv.innerHTML = <b>${i}</b><span style="font-size:7px">${label}</span>;
            dayDiv.addEventListener('click', () => showDay(i));
            ui.grid.appendChild(dayDiv);
        }
        ui.totalVal.innerText = totalMonth.toLocaleString() + " ₽";
    };

    const showDay = (i) => {
        const d = db[i];
        ui.modal.style.display = 'block';
        document.getElementById('m-title').innerText = i + " ЧИСЛО";
        document.getElementById('m-body').innerText = d?.note || "Записей нет";
        const table = document.getElementById('m-table-body');
        table.innerHTML = "";
        if (d && d.cash > 0) {
            table.innerHTML = `
                <tr><td>Товар (5%):</td><td align="right">${Math.round(d.tov*0.05)} ₽</td></tr>
                <tr><td>Услуги (20%):</td><td align="right">${Math.round(d.usl*0.2)} ₽</td></tr>
                <tr><td>Сим-карты:</td><td align="right">${d.sim} ₽</td></tr>`;
            document.getElementById('m-cash-box').style.display = "block";
            document.getElementById('m-cash').innerText = "ИТОГО: " + d.cash + " ₽";
        } else {
            document.getElementById('m-cash-box').style.display = "none";
        }
    };

    // 4. НАЗНАЧЕНИЕ СОБЫТИЙ (САМОЕ ВАЖНОЕ)
    const login = (name) => {
        const today = new Date().getDate();
        if (!db[today]) db[today] = { cash: 0, note: "", tov: 0, usl: 0, sim: 0 };
        ui.screenLogin.style.display = 'none';
        ui.screenMain.style.display = 'block';
        ui.userName.innerText = "СМЕНА: " + name;
        if (name === 'НИКИТА') ui.admLink.style.display = 'block';
        ui.noteArea.value = db[today].note || "";
        render();
    };

    document.getElementById('btn-ivan').addEventListener('click', () => login('ИВАН'));
    document.getElementById('btn-nikita').addEventListener('click', () => login('НИКИТА'));

    document.getElementById('btn-save-note').addEventListener('click', () => {
        const today = new Date().getDate();
        if (!db[today]) db[today] = { cash: 0, note: "", tov: 0, usl: 0, sim: 0 };
        db[today].note = ui.noteArea.value;
        save();
        render();
        alert("✅ Сохранено");
    });

    document.getElementById('btn-toggle-cal').addEventListener('click', () => {
        ui.calBox.style.display = ui.calBox.style.display === 'none' ? 'block' : 'none';
    });

    ui.admLink.addEventListener('click', () => {
        ui.admBox.style.display = ui.admBox.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('btn-admin-save').
addEventListener('click', () => {
        const d = document.getElementById('adm-d').value;
        const t = parseFloat(document.getElementById('adm-tov').value) || 0;
        const u = parseFloat(document.getElementById('adm-usl').value) || 0;
        const s = parseFloat(document.getElementById('adm-sim').value) || 0;
        if (!dd > 31) return alert("Введите число!");
        const total = Math.round((t * 0.05) + (u * 0.2) + s);
        if (!db[d]) db[d] = { note: "" };
        db[d].cash = total; db[d].tov = t; db[d].usl = u; db[d].sim = s;
        save(); render();
        alert("Расчет за " + d + " число готов!");
    });

    document.getElementById('btn-exit').addEventListener('click', () => location.reload());
    document.getElementById('btn-close-modal').addEventListener('click', () => ui.modal.style.display = 'none');
    
    // Закрытие модалки по клику вне контента
    window.addEventListener('click', (e) => { if(e.target == ui.modal) ui.modal.style.display = 'none'; });
});