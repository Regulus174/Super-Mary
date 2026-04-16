// UI系统

class UI {
    constructor() {
        this.fps = 0;
        this.frameCount = 0;
        this.lastTime = performance.now();
    }

    // 绘制HUD
    drawHUD(ctx, player, time, levelNumber) {
        // 背景
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, 40);

        // 分数
        drawText(ctx, 'SCORE', 20, 8, 10, COLORS.WHITE);
        drawText(ctx, padZero(player.score, 6), 20, 22, 12, COLORS.WHITE);

        // 金币
        ctx.fillStyle = COLORS.COIN_YELLOW;
        ctx.fillRect(180, 14, 12, 12);
        drawText(ctx, '×' + padZero(player.coins, 2), 196, 14, 12, COLORS.WHITE);

        // 关卡
        drawText(ctx, 'WORLD', 300, 8, 10, COLORS.WHITE);
        drawText(ctx, '1-' + levelNumber, 300, 22, 12, COLORS.WHITE);

        // 时间
        drawText(ctx, 'TIME', 420, 8, 10, COLORS.WHITE);
        drawText(ctx, padZero(Math.max(0, Math.floor(time)), 3), 420, 22, 12, COLORS.WHITE);

        // 生命
        ctx.fillStyle = COLORS.MARIO_RED;
        ctx.fillRect(520, 14, 12, 12);
        drawText(ctx, '×' + player.lives, 536, 14, 12, COLORS.WHITE);

        // FPS（调试用）
        // drawText(ctx, 'FPS:' + this.fps, 700, 14, 10, COLORS.WHITE);
    }

    // 绘制开始菜单
    drawMenu(ctx, selectedOption) {
        // 已经在HTML中实现
    }

    // 绘制暂停界面
    drawPause(ctx) {
        // 已经在HTML中实现
    }

    // 绘制游戏结束界面
    drawGameOver(ctx, score, isNewHighScore) {
        document.getElementById('final-score').innerHTML = `
            <div>得分: ${score}</div>
            ${isNewHighScore ? '<div style="color: #ffd700; margin-top: 10px;">新纪录!</div>' : ''}
        `;
    }

    // 绘制关卡过渡
    drawLevelTransition(ctx, levelNumber) {
        document.getElementById('level-text').textContent = `世界 1-${levelNumber}`;
    }

    // 绘制胜利界面
    drawVictory(ctx, score, time) {
        const timeBonus = Math.floor(time) * SCORE.TIME_BONUS;
        const totalScore = score + timeBonus;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        drawText(ctx, '恭喜通关!', CANVAS_WIDTH / 2, 150, 24, COLORS.STAR_YELLOW, 'center');

        drawText(ctx, '得分: ' + score, CANVAS_WIDTH / 2, 220, 16, COLORS.WHITE, 'center');
        drawText(ctx, '时间奖励: +' + timeBonus, CANVAS_WIDTH / 2, 260, 16, COLORS.WHITE, 'center');
        drawText(ctx, '总分: ' + totalScore, CANVAS_WIDTH / 2, 320, 20, COLORS.STAR_YELLOW, 'center');

        drawText(ctx, '按 Enter 继续', CANVAS_WIDTH / 2, 420, 14, COLORS.WHITE, 'center');
    }

    // 更新FPS
    updateFPS() {
        this.frameCount++;
        const currentTime = performance.now();
        if (currentTime - this.lastTime >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = currentTime;
        }
    }

    // 绘制教程提示
    drawTutorial(ctx, text, y = CANVAS_HEIGHT - 60) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, y, CANVAS_WIDTH, 40);
        drawText(ctx, text, CANVAS_WIDTH / 2, y + 14, 12, COLORS.WHITE, 'center');
    }

    // 绘制生命损失动画
    drawLifeLost(ctx, player, cameraX, cameraY) {
        // 玩家死亡动画在player类中处理
    }

    // 绘制倒计时
    drawCountdown(ctx, count) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        drawText(ctx, count.toString(), CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20, 48, COLORS.WHITE, 'center');
    }
}

// 全局UI实例
const ui = new UI();
