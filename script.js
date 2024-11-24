const image = document.getElementById("image");
const textContainer = document.getElementById("text");
const arrow = document.getElementById("arrow");
const line = document.getElementById("line");

const areas = [
    { x: 225, y: 68, width: 14, height: 35, text: "Светодиод L1. <картинка блока pin L1>. Данная команда помещается в setup и настраивает светодиод для работы. <картинка изменения яркости цифровой>. Эта команда принимает 2 значения 1 (зажечь) и 0 (потушить). <картинка аналоговой>. Эта команда может принимать значения от 0 до 255. Чем больше значение, тем ярче горит светодиод." },
    { x: 310, y: 68, width: 14, height: 35, text: "Светодиод L2. <картинка блока pin L2>. Данная команда помещается в setup и настраивает светодиод для работы. <картинка изменения яркости цифровой>. Эта команда принимает 2 значения 1 (зажечь) и 0 (потушить). <картинка аналоговой>. Эта команда может принимать значения от 0 до 255. Чем больше значение, тем ярче горит светодиод." },
    { x: 213.5, y: 14.5, width: 35, height: 51, text: "Кнопка B1. <картинка блока pin B1>. Данная команда помещается в setup и настраивает кнопку для работы. <зажатия кнопки>. Эта команда проверяет зажата ли кнопка B1." },
    { x: 255.5, y: 14.5, width: 35, height: 51, text: "Кнопка B2. <картинка блока pin B2>. Данная команда помещается в setup и настраивает кнопку для работы. <зажатия кнопки>. Эта команда проверяет зажата ли кнопка B2." },
    { x: 460, y: 61, width: 38.6, height: 42, text: "Кнопка сброса. Кнопка используется перезапуска прошивки, не загружая её с компьютера." },
    { x: 460.5, y: 308.5, width: 38.6, height: 42, text: "Кнопка пробуждения. Кнопка пробуждения в Рудирон — это кнопка, при нажатии на которую микроконтроллер просыпается из спящего режима." },
    { x: 299, y: 14.5, width: 35, height: 51, text: "Кнопка B3. <картинка блока pin B3>. Данная команда помещается в setup и настраивает кнопку для работы. <зажатия кнопки>. Эта команда проверяет зажата ли кнопка B3." },
    { x: 254, y: 164, width: 86, height: 29, text: "РУДИРОН" },
    { x: 265.6, y: 200, width: 72.8, height: 72.8, text: "Микроконтроллер. Микроконтроллер сложное устройство. Он представляет собой микропроцессор с множеством дополнительных устройств, что превращает его по сути  в микрокомпьютер. Не такой мощный как настольные компьютеры и ноутбуки." },
    { x: 32, y: 50, width: 58, height: 38, text: "Разъем TFT модуля" },
    { x: 87, y: 4.5, width: 121, height: 82, text: "GPIO-1" },
    { x: 339, y: 3.5, width: 121, height: 83, text: "GPIO-2" },
    { x: 87, y: 325, width: 118, height: 84, text: "GPIO-4" },
    { x: 345, y: 325, width: 118, height: 84, text: "GPIO-3" },
    { x: 108, y: 172, width: 14, height: 25.5, text: "Индикатор питания. Светодиодный индикатор питания на плате Рудирон — это светодиод, который загорается каждый раз, когда плата подключена к источнику питания." },
    { x: 206, y: 165.5, width: 14, height: 51, text: "Индикаторы UART. Индикаторы UART в Рудирон — это светодиоды, которые обеспечивают визуальную индикацию состояния пинов (выводов) UART. Такая индикация помогает контролировать работоспособность схемы и определять неисправность узла, так как визуально видно, какими модулями данные отправляются и какими принимаются." },
    { x: 202, y: 232, width: 31, height: 32, text: "Программирование по USB" },
    { x: 173, y: 150, width: 20.4, height: 61, text: "Внешнее питание. Внешнее питание Рудирон — это способ обеспечить питание платы от внешнего источника, например, сетевого AC/DC-адаптера или аккумулятора/батареи. Внешнее питание можно подавать как напрямую от USB-порта компьютера, так и от любого AC/DC блока питания через разъём питания или USB." },
    { x: 52, y: 172, width: 21, height: 45, text: "Выбор источника питания" },
    { x: 240, y: 108, width: 104, height: 47, text: "Модуль расширения CAN/UART. Модуль расширения CAN/UART — это преобразователь интерфейсов CAN в UART. 4 Он обеспечивает преобразование данных между протоколами CAN и TTL." },
    { x: 51, y: 321, width: 39, height: 44, text: "Питание радиомодуля. Питание радиомодуля NRF24L01 осуществляется через выводы Vcc и GND, на которые подаётся напряжение 3,3 или 5 В постоянного тока. " },
    { x: 240, y: 349, width: 39, height: 54, text: "Питание радиомодуля. Питание радиомодуля NRF24L01 осуществляется через выводы Vcc и GND, на которые подаётся напряжение 3,3 или 5 В постоянного тока. " },
    { x: 281, y: 344, width: 30, height: 62, text: "ESP-01. ESP-01 — это миниатюрный микроконтроллер с Wi-Fi передатчиком. Он позволяет подключить устройство к безпроводному Интернету или локальной сети. С помощью модуля ESP-01 можно передавать данные о температуре, влажности и другие." },
    { x: 205, y: 334, width: 31, height: 63, text: "ESP-01. ESP-01 — это миниатюрный микроконтроллер с Wi-Fi передатчиком. Он позволяет подключить устройство к безпроводному Интернету или локальной сети. С помощью модуля ESP-01 можно передавать данные о температуре, влажности и другие." },
    { x: 313, y: 332, width: 30, height: 69, text: "NRF24L01. NRF24L01 — это одночиповый приемопередатчик, работающий под общим диапазоном ISM 2.4-2.5 ГГц." },
    { x: 244, y: 323, width: 64, height: 19, text: "NRF24L01. NRF24L01 — это одночиповый приемопередатчик, работающий под общим диапазоном ISM 2.4-2.5 ГГц." },
    { x: 388, y: 140, width: 20.4, height: 61, text: "Интерфейс J-Link программатора. J-Link — это программатор, который поддерживает несколько интерфейсов для работы с целевыми устройствами" },
    { x: 388, y: 213, width: 20.4, height: 61, text: "Модуль расширения I2C. Модуль расширения I2C — это плата для двунаправленного ввода-вывода, которая позволяет увеличить количество портов. Используется при необходимости расширения портов GPIO на контроллерах Рудирон и других устройствах." },
    { x: 417, y: 107, width: 100, height: 198, text: "Интерфейс J-Link программатора. J-Link — это программатор, который поддерживает несколько интерфейсов для работы с целевыми устройствами" },

];

let highlightedArea = null;  // Для хранения выделенной области

image.addEventListener("mousemove", (e) => {
    const rect = image.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let hoveredArea = null;

    // Находим область, на которую наведена мышка
    for (const area of areas) {
        if (mouseX >= area.x && mouseX <= area.x + area.width && mouseY >= area.y && mouseY <= area.y + area.height) {
            hoveredArea = area;
            break;
        }
    }

    // Если область найдена
    if (hoveredArea) {
        textContainer.style.display = "block";
        textContainer.innerHTML = hoveredArea.text;

        // Выделяем область красной рамкой
        if (!highlightedArea) {
            highlightedArea = document.createElement("div");
            highlightedArea.classList.add("area-highlight");
            highlightedArea.style.left = `${hoveredArea.x}px`;
            highlightedArea.style.top = `${hoveredArea.y}px`;
            highlightedArea.style.width = `${hoveredArea.width}px`;
            highlightedArea.style.height = `${hoveredArea.height}px`;
            image.parentElement.appendChild(highlightedArea);
        }

        highlightedArea.style.left = `${hoveredArea.x}px`;
        highlightedArea.style.top = `${hoveredArea.y}px`;
        highlightedArea.style.width = `${hoveredArea.width}px`;
        highlightedArea.style.height = `${hoveredArea.height}px`;

    } else {
        textContainer.style.display = "none";

        // Убираем выделение области, если мышь выходит из нее
        if (highlightedArea) {
            highlightedArea.remove();
            highlightedArea = null;
        }
    }
});

image.addEventListener("mouseleave", () => {
    textContainer.style.display = "none";

    // Убираем выделение области при выходе мыши
    if (highlightedArea) {
        highlightedArea.remove();
        highlightedArea = null;
    }
});