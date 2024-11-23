const canvas = document.getElementById('gameCanvas');
canvas.width = window.innerWidth * 0.9; // Устанавливаем ширину канваса
canvas.height = window.innerHeight * 0.6; // Устанавливаем высоту канваса
const ctx = canvas.getContext('2d');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * (canvas.width / 20)), y: Math.floor(Math.random() * (canvas.height / 20)) };
let score = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем змейку
    ctx.fillStyle = 'green';
    snake.forEach(part => {
        ctx.fillRect(part.x * 20, part.y * 20, 18, 18);
    });

    // Рисуем еду
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 20, food.y * 20, 18, 18);

    // Двигаем змейку
    let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Проверка на столкновение с едой
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * (canvas.width / 20)),
            y: Math.floor(Math.random() * (canvas.height / 20))
        };

        // Не убираем последний элемент змейки при поедании еды
        snake.unshift(head);

        // Увеличиваем длину змейки
        return;

    } else {
        snake.pop(); // Убираем последний элемент змейки
    }

    // Проверка на столкновение со стенами или самой собой
    if (head.x < 0 || head.x >= canvas.width / 20 || head.y < 0 || head.y >= canvas.height / 20 || collision(head)) {
        alert('Игра окончена! Ваш счет: ' + score);
        document.location.reload();
        return;
    }

    snake.unshift(head); // Добавляем новую голову змейки
}

function collision(head) {
    return snake.some(part => part.x === head.x && part.y === head.y);
}

// Обработка событий нажатий на кнопки управления
document.getElementById('up').addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: -1 };
});

document.getElementById('down').addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: 1 };
});

document.getElementById('left').addEventListener('click', () => {
    if (direction.x === 0) direction = { x: -1, y: 0 };
});

document.getElementById('right').addEventListener('click', () => {
    if (direction.x === 0) direction = { x: 1, y: 0 };
});

// Запуск игры
setInterval(draw, 100); // Обновляем игру каждые 100 мс