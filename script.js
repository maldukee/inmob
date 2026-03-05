var app = {
  user: "",
  month: new Date().getMonth(),

  // Вход в систему
  start: function(name) {
    this.user = name;
    document.getElementById('screen-login').style.display = 'none';
    document.getElementById('screen-main').style.display = 'block';
    document.getElementById('display-user').innerText = name;
    this.updateUI();
  },

  // Чтение текста из поля
  handleInput: function() {
    var text = document.getElementById('input-text').value.toLowerCase();
    if (!text) return;

    var tov = 0;
    var sim = 0;
    var usl = 0;
    var rows = text.split('\n');

    for (var i = 0; i < rows.length; i++) {
      var line = rows[i];
      // Извлекаем только число из строки
      var num = parseInt(line.replace(/[^0-9]/g, '')) || 0;

      if (line.indexOf('настр') !== -1 || line.indexOf('уст') !== -1) {
        usl = usl + num;
      } else if (line.indexOf('мпл') !== -line.indexOf('сим') !== -1) {
        sim = sim + 1;
      } else if (num > 0) {
        tov = tov + num;
      }
    }

    this.save(new Date().getDate(), tov, sim, usl);
    document.getElementById('input-text').value = "";
  },

  // Сохранение и расчет
  save: function(day, tov, sim, usl) {
    var key = "work_data_" + this.user + "_" + this.month;
    var raw = localStorage.getItem(key);
    var db = raw ? JSON.parse(raw) : [];
    
    // Считаем прогресс месяца для бонуса
    var totalS = sim;
    var totalN = usl;
    for (var j = 0; j < db.length; j++) {
      if (parseInt(db[j].day) !== day) {
        totalS = totalS + db[j].sim;
        totalN = totalN + db[j].usl;
      }
    }

    // Базовая формула ЗП
    var base = 1200 + (tov * 0.1) + (sim * 100) + (usl * 0.5);
    
    // Если план выполнен (30 симок или 10к услуг) — надбавка 20%
    if (totalS >= 30 || totalN >= 10000) {
      base = base * 1.2;
    }

    var dayStr = day.toString();
    if (dayStr.length < 2) dayStr = "0" + dayStr;

    // Удаляем старую запись за этот день
    var newDb = [];
    for (var k = 0; k < db.length; k++) {
      if (db[k].day !== dayStr) {
        newDb.push(db[k]);
      }
    }
    
    // Добавляем новую
    newDb.push({
      day: dayStr,
      tov: tov,
      sim: sim,
      usl: usl,
      zp: Math.round(base)
    });

    localStorage.setItem(key, JSON.stringify(newDb));
    this.updateUI();
  },

  // Обновление интерфейса
  updateUI: function() {
    var key = "work_data_" + this.user + "_" + this.month;
    var raw = localStorage.getItem(key);
    var db = raw ? JSON.parse(raw) : [];
    var today = new Date().getDate();
    
    var daysMap = {};
    for (var l = 0; l < db.length; l++) {
      daysMap[parseInt(db[l].day)] = db[l];
    }

    var currentZp = 0;
    if (daysMap[today]) {
      currentZp = daysMap[today].zp;
    }
    document.getElementById('display-zp').innerText = currentZp + " ₽";

    var html = "";
    for (var d = 1; d <= 31; d++) {
      var cls = "day";
      if (daysMap[d]) {
        cls = cls + " green";
      } else if (d < today) {
        cls = cls + " red";
      }
      html = html + '<div class="' + cls + '" onclick="app.showInfo(' + d + ')">' + d + '</div>';
    }
    document.getElementById('calendar-grid').innerHTML = html;
  },

  showInfo: function(d) {
    var key = "work_data_" + this.user + "_" + this.month;
    var db = JSON.parse(localStorage.getItem(key) || "[]");
    var found = null;
    for (var i = 0; i < db.length; i++) {
      if (parseInt(db[i].day) === d) found = db[i];
    }
    if (found) {
      alert("ДЕНЬ: " + found.day + "\nЗП: " + found.zp + " ₽\nТовар: " + found.tov + " ₽\nСим: " + found.sim + "\nУслуги: " + found.usl);
    }
  },

  handleAdminSave: function() {
    var d = parseInt(document.getElementById('adm-day').value);
    if (!d) return;
    this.save(d, 
      parseInt(document.getElementById('adm-tov').value) || 0, 
      parseInt(document.getElementById('adm-sim').value) || 0, 
      parseInt(document.getElementById('adm-usl').value) || 0
    );
    this.toggleAdmin();
  },

  toggleAdmin: function() {
    var b = document.
getElementById('admin-box');
    if (b.style.display === 'block') {
      b.style.display = 'none';
    } else {
      b.style.display = 'block';
    }
  }
};
