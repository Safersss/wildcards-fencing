document.addEventListener('DOMContentLoaded', function() {
    // Создаём всплывающее окно
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div id="formModal" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:white; padding:20px; border-radius:10px; z-index:1000; width:350px; box-shadow:0 0 20px rgba(0,0,0,0.3);">
            <h3>Запись на пробное занятие</h3>
            <input type="text" id="name" placeholder="Ваше ФИО" style="width:100%; padding:8px; margin-bottom:10px;"><br>
            <input type="tel" id="phone" placeholder="Контактный телефон" style="width:100%; padding:8px; margin-bottom:10px;"><br>
            <select id="direction" style="width:100%; padding:8px; margin-bottom:10px;">
                <option>Рапира</option>
                <option>Шпага</option>
                <option>Сабля</option>
                <option>Историческое фехтование</option>
            </select><br>
            <label style="display:block; margin-bottom:10px;">
                <input type="checkbox" id="consent"> Я соглашаюсь на обработку персональных данных
            </label><br>
            <button id="submitForm" style="background:#e94560; color:white; padding:10px; border:none; border-radius:5px; cursor:pointer; width:100%; margin-bottom:5px;">Отправить</button>
            <button id="closeForm" style="background:#ccc; color:black; padding:10px; border:none; border-radius:5px; cursor:pointer; width:100%;">Закрыть</button>
        </div>
        <div id="overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:999;"></div>
    `;
    document.body.appendChild(modal);

    const modalDiv = document.getElementById('formModal');
    const overlay = document.getElementById('overlay');
    const openBtn = document.getElementById('openFormBtn');

    if(openBtn) {
        openBtn.onclick = function() {
            modalDiv.style.display = 'block';
            overlay.style.display = 'block';
        };
    }

    document.getElementById('closeForm').onclick = function() {
        modalDiv.style.display = 'none';
        overlay.style.display = 'none';
    };

    document.getElementById('submitForm').onclick = async function() {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const direction = document.getElementById('direction').value;
        const consent = document.getElementById('consent').checked;

        if(!name || !phone || !consent) {
            alert('Заполните все поля и поставьте галочку согласия!');
            return;
        }

        // ВСТАВЬТЕ СЮДА ВАШ URL ИЗ ШАГА 6.3
        const SCRIPT_URL = 'https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbydZeI95VJG3QRCFCrTn8HUuvJrmgmcjCk5qRZJ5UEOnXfkStPQTVZQW5BJIe-XdVeJ/exec/exec';

        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',    
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, direction })
            });
            alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами.');
            modalDiv.style.display = 'none';
            overlay.style.display = 'none';
            document.getElementById('name').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('consent').checked = false;
        } catch(error) {
            alert('Ошибка отправки. Попробуйте ещё раз.');
        }
    };
});