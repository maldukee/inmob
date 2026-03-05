body { font-family: sans-serif; background: #f4f4f9; margin: 0; padding: 15px; display: flex; justify-content: center; }
.win { background: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 100%; max-width: 400px; text-align: center; }

h2, h3 { color: #333; margin-top: 0; }

/* КНОПКИ ВХОДА */
.login-buttons button { width: 100%; padding: 12px; margin: 5px 0; border: none; border-radius: 8px; background: #007bff; color: white; font-size: 16px; cursor: pointer; }

/* КАЛЕНДАРЬ - МАЛЕНЬКИЕ КНОПКИ */
.grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin: 10px 0; background: #eee; padding: 5px; border-radius: 8px; }
.day-btn { padding: 6px 0; font-size: 12px; border: 1px solid #ddd; background: #fff; cursor: pointer; border-radius: 3px; }
.active-day { background: #28a745 !important; color: white; font-weight: bold; border-color: #1e7e34; }

/* ЗАРПЛАТА */
.zp-box { background: #e7f3ff; padding: 15px; border-radius: 10px; margin: 15px 0; }
.zp-value { font-size: 28px; font-weight: bold; color: #0056b3; }

/* МОДАЛЬНОЕ ОКНО */
.modal { position: fixed; z-index: 100; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); }
.modal-content { background: white; margin: 30% auto; padding: 20px; width: 75%; border-radius: 12px; position: relative; }
.close { position: absolute; right: 15px; top: 10px; font-size: 24px; cursor: pointer; }

/* АДМИНКА */
.adm { background: #fff3cd; padding: 15px; border-radius: 10px; margin-top: 10px; border: 1px solid #ffeeba; }
.adm input { width: 80%; padding: 8px; margin: 4px 0; border: 1px solid #ccc; border-radius: 5px; }
.save-admin { background: #ffc107; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 5px; }

.admin-link { color: #666; font-size: 14px; margin-top: 15px; cursor: pointer; text-decoration: underline; }
.calendar-toggle-btn { background: #6c757d; color: white; border: none; padding: 10px; border-radius: 5px; width: 100%; cursor: pointer; }
.exit-btn { font-size: 12px; color: #999; cursor: pointer; margin-top: 20px; }
.delete-btn { background: #dc3545; color: white; border: none; padding: 8px; border-radius: 5px; margin-top: 10px; cursor: pointer; font-size: 12px; }