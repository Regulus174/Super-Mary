// 工具函数

// 矩形碰撞检测
function rectCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// 获取两点之间的距离
function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// 限制数值在范围内
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

// 随机整数
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 随机选择
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// 绘制像素矩形
function drawPixelRect(ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), width, height);
}

// 绘制像素圆形
function drawPixelCircle(ctx, x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(Math.floor(x), Math.floor(y), radius, 0, Math.PI * 2);
    ctx.fill();
}

// 绘制文字（像素风格）
function drawText(ctx, text, x, y, size, color, align = 'left') {
    ctx.fillStyle = color;
    ctx.font = `${size}px "Press Start 2P", monospace`;
    ctx.textAlign = align;
    ctx.textBaseline = 'top';
    ctx.fillText(text, Math.floor(x), Math.floor(y));
}

// 创建简单的粒子
function createParticles(x, y, color, count = 5) {
    const particles = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6 - 2,
            size: randomInt(2, 4),
            color: color,
            life: 30
        });
    }
    return particles;
}

// 更新粒子
function updateParticles(particles) {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.life--;
        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

// 绘制粒子
function drawParticles(ctx, particles) {
    particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
    });
}

// 数字转字符串（补零）
function padZero(num, length) {
    return String(num).padStart(length, '0');
}

// 计时器格式化
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${padZero(mins, 2)}:${padZero(secs, 2)}`;
}

// 延迟执行
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 检查是否在视口内
function isInViewport(x, y, width, height, cameraX, cameraY) {
    return x + width > cameraX &&
           x < cameraX + CANVAS_WIDTH &&
           y + height > cameraY &&
           y < cameraY + CANVAS_HEIGHT;
}

// 线性插值
function lerp(start, end, t) {
    return start + (end - start) * t;
}

// 缓动函数
const Easing = {
    linear: t => t,
    easeIn: t => t * t,
    easeOut: t => t * (2 - t),
    easeInOut: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    bounce: t => {
        if (t < 1/2.75) {
            return 7.5625 * t * t;
        } else if (t < 2/2.75) {
            return 7.5625 * (t -= 1.5/2.75) * t + 0.75;
        } else if (t < 2.5/2.75) {
            return 7.5625 * (t -= 2.25/2.75) * t + 0.9375;
        } else {
            return 7.5625 * (t -= 2.625/2.75) * t + 0.984375;
        }
    }
};
