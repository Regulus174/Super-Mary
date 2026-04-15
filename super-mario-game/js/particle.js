// 粒子效果系统

class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    // 添加粒子
    add(x, y, color, count = 5, options = {}) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x + (options.spreadX ? randomInt(-options.spreadX, options.spreadX) : 0),
                y: y + (options.spreadY ? randomInt(-options.spreadY, options.spreadY) : 0),
                vx: options.vx !== undefined ? options.vx : (Math.random() - 0.5) * 6,
                vy: options.vy !== undefined ? options.vy : (Math.random() - 0.5) * 6 - 2,
                size: options.size || randomInt(2, 4),
                color: color,
                life: options.life || 30,
                maxLife: options.life || 30,
                gravity: options.gravity !== undefined ? options.gravity : 0.2
            });
        }
    }

    // 更新所有粒子
    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.life--;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    // 绘制所有粒子
    draw(ctx, cameraX, cameraY) {
        this.particles.forEach(p => {
            const alpha = p.life / p.maxLife;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = alpha;
            ctx.fillRect(
                Math.floor(p.x - cameraX),
                Math.floor(p.y - cameraY),
                p.size,
                p.size
            );
        });
        ctx.globalAlpha = 1;
    }

    // 清空粒子
    clear() {
        this.particles = [];
    }
}

// 全局粒子系统
const particleSystem = new ParticleSystem();

// 砖块破碎效果
function createBrickParticles(x, y) {
    const pieces = [];
    for (let i = 0; i < 4; i++) {
        const px = x + (i % 2) * (TILE_SIZE / 2);
        const py = y + Math.floor(i / 2) * (TILE_SIZE / 2);
        pieces.push({
            x: px,
            y: py,
            vx: (i % 2 === 0 ? -2 : 2) + (Math.random() - 0.5) * 2,
            vy: -8 - Math.random() * 4,
            rotation: 0,
            rotationSpeed: (Math.random() - 0.5) * 0.3,
            size: TILE_SIZE / 2,
            life: 60
        });
    }
    return pieces;
}

// 更新砖块碎片
function updateBrickPieces(pieces) {
    for (let i = pieces.length - 1; i >= 0; i--) {
        const p = pieces[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += GRAVITY;
        p.rotation += p.rotationSpeed;
        p.life--;

        if (p.life <= 0) {
            pieces.splice(i, 1);
        }
    }
}

// 绘制砖块碎片
function drawBrickPieces(ctx, pieces, cameraX, cameraY) {
    pieces.forEach(p => {
        ctx.save();
        ctx.translate(p.x - cameraX + p.size/2, p.y - cameraY + p.size/2);
        ctx.rotate(p.rotation);
        ctx.fillStyle = COLORS.BRICK_RED;
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        ctx.restore();
    });
}

// 得分文字效果
function createScoreText(x, y, score) {
    return {
        x: x,
        y: y,
        score: score,
        life: 60,
        vy: -1
    };
}

// 更新得分文字
function updateScoreTexts(texts) {
    for (let i = texts.length - 1; i >= 0; i--) {
        const t = texts[i];
        t.y += t.vy;
        t.life--;

        if (t.life <= 0) {
            texts.splice(i, 1);
        }
    }
}

// 绘制得分文字
function drawScoreTexts(ctx, texts, cameraX, cameraY) {
    texts.forEach(t => {
        const alpha = t.life / 60;
        ctx.globalAlpha = alpha;
        drawText(ctx, t.score.toString(), t.x - cameraX, t.y - cameraY, 12, COLORS.WHITE, 'center');
        ctx.globalAlpha = 1;
    });
}

// 烟花效果（过关时使用）
function createFirework(x, y) {
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#ff00ff', '#00ffff'];
    const color = randomChoice(colors);
    particleSystem.add(x, y, color, 20, {
        spreadX: 5,
        spreadY: 5,
        vx: 0,
        vy: -5,
        gravity: 0.1,
        life: 40
    });
}

// 星星无敌效果
function createStarSparkle(x, y) {
    const colors = ['#ffff00', '#ffa500', '#ff0000'];
    particleSystem.add(x, y, randomChoice(colors), 2, {
        spreadX: 10,
        spreadY: 10,
        size: 2,
        life: 15,
        gravity: 0
    });
}
