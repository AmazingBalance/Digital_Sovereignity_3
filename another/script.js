const image = document.getElementById("image");
const textContainer = document.getElementById("text");

const areas = [
    { x: 111.7, y: 34, width: 6.5, height: 17.5, text: "Светодиод L1", isOn: false },
    { x: 154, y: 34, width: 6.5, height: 17.5, text: "Светодиод L2", isOn: false },
    { x: 106.75, y: 7.25, width: 14.5, height: 25.5, text: "Кнопка B1", isOn: false },
    { x: 127.75, y: 7.25, width: 17.5, height: 25.5, text: "Кнопка B2", isOn: false },
    { x: 230, y: 30.5, width: 19.3, height: 21, text: "Кнопка сброса", isOn: false },
    { x: 230.25, y: 154.25, width: 19.3, height: 21, text: "Кнопка пробуждения", isOn: false },
    { x: 149.5, y: 7.25, width: 17.5, height: 25.5, text: "Кнопка B3", isOn: false },
    { x: 43.5, y: 2.25, width: 60.5, height: 41, text: "GPIO-1", isOn: false },
    { x: 169.5, y: 1.75, width: 60.5, height: 41.5, text: "GPIO-2", isOn: false },
    { x: 43.5, y: 162.5, width: 59, height: 42, text: "GPIO-4", isOn: false },
    { x: 172.5, y: 162.5, width: 59, height: 42, text: "GPIO-3", isOn: false },
    { x: 52.5, y: 86, width: 7, height: 12.75, text: "Индикатор питания", isOn: false },
    { x: 101.5, y: 82.75, width: 7, height: 25.5, text: "Индикаторы UART", isOn: false }
];

let highlightedArea = null;

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
        // Если область ещё не "зажжена", то выделяем её красной рамкой
        if (!highlightedArea) {
            highlightedArea = document.createElement("div");
            highlightedArea.classList.add("area-highlight");
            image.parentElement.appendChild(highlightedArea);
        }

        // Если область не "зажжена", то показываем рамку
        if (!hoveredArea.isOn) {
            highlightedArea.style.left = `${hoveredArea.x}px`;
            highlightedArea.style.top = `${hoveredArea.y}px`;
            highlightedArea.style.width = `${hoveredArea.width}px`;
            highlightedArea.style.height = `${hoveredArea.height}px`;
        }

    } else {
        // Убираем выделение области, если мышь выходит из нее
        if (highlightedArea) {
            highlightedArea.remove();
            highlightedArea = null;
        }
    }
});

// Функция для включения/выключения области
function toggleZone(index) {
    const area = areas[index];
    area.isOn = !area.isOn;  // Переключаем состояние (зажжена или нет)
    updateAreaHighlight();
}

// Обновление подсветки на основе состояния
function updateAreaHighlight() {
    // Удаляем старые выделения
    const existingHighlights = document.querySelectorAll('.area-highlight');
    existingHighlights.forEach(highlight => highlight.remove());

    // Добавляем подсветку для всех "зажжённых" областей
    areas.forEach((area) => {
        if (area.isOn) {
            const highlight = document.createElement("div");
            highlight.classList.add("area-highlight");
            highlight.style.left = `${area.x}px`;
            highlight.style.top = `${area.y}px`;
            highlight.style.width = `${area.width}px`;
            highlight.style.height = `${area.height}px`;
            highlight.style.backgroundColor = "rgba(0, 255, 0, 0.5)"; // Зеленая окраска для зажжённой области
            image.parentElement.appendChild(highlight);
        }
    });
}

