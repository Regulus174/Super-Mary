// 游戏主循环

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        // 设置画布大小
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;

        // 游戏状态
        this.state = GAME_STATE.MENU;
        this.level = null;
        this.player = null;
        this.currentLevel = 1;
        this.maxLevel = 3;

        // 相机
        this.cameraX = 0;
        this.cameraY = 0;

        // 死亡处理标志
        this.isDying = false;

        // 时间
        this.time = LEVEL_TIME;
        this.lastTime = 0;

        // 输入
        this.keys = {
            left: false,
            right: false,
            jump: false,
            fire: false
        };
        this.prevKeys = {};

        // 屏幕元素
        this.menuScreen = document.getElementById('menu-screen');
        this.pauseScreen = document.getElementById('pause-screen');
        this.gameoverScreen = document.getElementById('gameover-screen');
        this.leaderboardScreen = document.getElementById('leaderboard-screen');
        this.levelTransition = document.getElementById('level-transition');

        // 绑定事件
        this.bindEvents();
    }

    // 绑定事件
    bindEvents() {
        // 键盘事件
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));

        // 按钮事件
        document.getElementById('start-btn').addEventListener('click', () => {
            soundManager.init();
            soundManager.menuConfirm();
            this.startGame();
        });

        document.getElementById('leaderboard-btn').addEventListener('click', () => {
            soundManager.init();
            soundManager.menuSelect();
            this.showLeaderboard();
        });

        document.getElementById('controls-btn').addEventListener('click', () => {
            soundManager.menuSelect();
            const info = document.getElementById('controls-info');
            info.style.display = info.style.display === 'none' ? 'block' : 'none';
        });

        document.getElementById('resume-btn').addEventListener('click', () => {
            soundManager.menuConfirm();
            this.resumeGame();
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            soundManager.menuConfirm();
            this.restartLevel();
        });

        document.getElementById('quit-btn').addEventListener('click', () => {
            soundManager.menuSelect();
            this.quitToMenu();
        });

        document.getElementById('retry-btn').addEventListener('click', () => {
            soundManager.menuConfirm();
            this.restartGame();
        });

        document.getElementById('menu-btn').addEventListener('click', () => {
            soundManager.menuSelect();
            this.quitToMenu();
        });

        document.getElementById('submit-score-btn').addEventListener('click', () => {
            this.submitScore();
        });

        document.getElementById('back-btn').addEventListener('click', () => {
            soundManager.menuSelect();
            this.hideAllScreens();
            this.menuScreen.style.display = 'flex';
        });

        // 玩家名字输入回车提交
        document.getElementById('player-name').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.submitScore();
            }
        });
    }

    // 键盘按下
    handleKeyDown(e) {
        const key = e.key.toLowerCase();

        if (key === 'arrowleft' || key === 'a') this.keys.left = true;
        if (key === 'arrowright' || key === 'd') this.keys.right = true;
        if (key === ' ' || key === 'z' || key === 'w' || key === 'arrowup') this.keys.jump = true;
        if (key === 'x') this.keys.fire = true;

        // 菜单导航
        if (this.state === GAME_STATE.MENU) {
            if (key === 'enter') {
                soundManager.init();
                soundManager.menuConfirm();
                this.startGame();
            }
        }

        // 暂停
        if ((key === 'escape' || key === 'p') && this.state === GAME_STATE.PLAYING) {
            this.pauseGame();
        } else if ((key === 'escape' || key === 'p') && this.state === GAME_STATE.PAUSED) {
            this.resumeGame();
        }

        // 游戏结束时的回车
        if (key === 'enter' && this.state === GAME_STATE.GAME_OVER) {
            this.restartGame();
        }
    }

    // 键盘抬起
    handleKeyUp(e) {
        const key = e.key.toLowerCase();

        if (key === 'arrowleft' || key === 'a') this.keys.left = false;
        if (key === 'arrowright' || key === 'd') this.keys.right = false;
        if (key === ' ' || key === 'z' || key === 'w' || key === 'arrowup') this.keys.jump = false;
        if (key === 'x') this.keys.fire = false;
    }

    // 开始游戏
    startGame() {
        this.currentLevel = 1;
        this.player = new Player(0, 0);
        this.player.lives = INITIAL_LIVES;
        this.player.score = 0;
        this.player.coins = 0;
        this.isDying = false;

        this.loadLevel(this.currentLevel);
        this.hideAllScreens();
        this.state = GAME_STATE.PLAYING;
        this.time = LEVEL_TIME;
        this.lastTime = performance.now();

        // 显示关卡过渡
        this.showLevelTransition();
    }

    // 加载关卡
    loadLevel(levelNumber) {
        this.level = new Level(levelNumber);
        this.player.respawn(this.level.startX, this.level.startY);
        this.cameraX = 0;
        this.time = LEVEL_TIME;
    }

    // 显示关卡过渡
    showLevelTransition() {
        this.state = GAME_STATE.LEVEL_TRANSITION;
        ui.drawLevelTransition(this.ctx, this.currentLevel);
        this.levelTransition.style.display = 'flex';

        setTimeout(() => {
            this.levelTransition.style.display = 'none';
            this.state = GAME_STATE.PLAYING;
        }, 2000);
    }

    // 暂停游戏
    pauseGame() {
        this.state = GAME_STATE.PAUSED;
        soundManager.pause();
        this.pauseScreen.style.display = 'flex';
    }

    // 继续游戏
    resumeGame() {
        this.state = GAME_STATE.PLAYING;
        this.lastTime = performance.now();
        this.pauseScreen.style.display = 'none';
    }

    // 重新开始当前关卡
    restartLevel() {
        this.player.respawn(this.level.startX, this.level.startY);
        this.level = new Level(this.currentLevel);
        this.cameraX = 0;
        this.time = LEVEL_TIME;
        this.pauseScreen.style.display = 'none';
        this.state = GAME_STATE.PLAYING;
        this.lastTime = performance.now();
    }

    // 完全重新开始
    restartGame() {
        this.hideAllScreens();
        this.startGame();
    }

    // 返回主菜单
    quitToMenu() {
        this.state = GAME_STATE.MENU;
        this.hideAllScreens();
        this.menuScreen.style.display = 'flex';
    }

    // 显示排行榜
    showLeaderboard() {
        this.hideAllScreens();
        leaderboard.renderToContainer('leaderboard-list');
        this.leaderboardScreen.style.display = 'flex';
    }

    // 隐藏所有屏幕
    hideAllScreens() {
        this.menuScreen.style.display = 'none';
        this.pauseScreen.style.display = 'none';
        this.gameoverScreen.style.display = 'none';
        this.leaderboardScreen.style.display = 'none';
        this.levelTransition.style.display = 'none';
    }

    // 游戏结束
    gameOver() {
        this.state = GAME_STATE.GAME_OVER;
        this.isDying = false;
        soundManager.gameOver();

        const isNewHighScore = leaderboard.isNewHighScore(this.player.score);
        ui.drawGameOver(this.ctx, this.player.score, isNewHighScore);

        this.gameoverScreen.style.display = 'flex';

        if (isNewHighScore) {
            document.getElementById('name-input-container').style.display = 'flex';
        } else {
            document.getElementById('name-input-container').style.display = 'none';
        }
    }

    // 提交分数
    submitScore() {
        const nameInput = document.getElementById('player-name');
        const name = nameInput.value.trim() || '匿名';

        leaderboard.addScore(name, this.player.score, this.currentLevel);

        nameInput.value = '';
        document.getElementById('name-input-container').style.display = 'none';

        soundManager.menuConfirm();
        this.showLeaderboard();
    }

    // 过关
    levelComplete() {
        soundManager.levelComplete();

        // 时间奖励
        const timeBonus = Math.floor(this.time) * SCORE.TIME_BONUS;
        this.player.addScore(timeBonus);

        this.currentLevel++;

        if (this.currentLevel > this.maxLevel) {
            // 通关
            this.victory();
        } else {
            // 下一关
            this.loadLevel(this.currentLevel);
            this.showLevelTransition();
        }
    }

    // 胜利
    victory() {
        this.state = GAME_STATE.VICTORY;
        // 显示胜利界面
        this.gameoverScreen.style.display = 'flex';
        document.getElementById('final-score').innerHTML = `
            <div style="font-size: 24px; color: #ffd700;">恭喜通关!</div>
            <div style="margin-top: 20px;">最终得分: ${this.player.score}</div>
        `;
        document.getElementById('name-input-container').style.display = 'flex';
    }

    // 玩家死亡
    playerDeath() {
        // 防止重复调用
        if (this.isDying) return;
        this.isDying = true;

        this.player.lives--;

        if (this.player.lives <= 0) {
            this.gameOver();
        } else {
            // 复活 - 重置关卡和玩家
            setTimeout(() => {
                // 重新加载关卡
                this.level = new Level(this.currentLevel);
                this.player.respawn(this.level.startX, this.level.startY);
                this.cameraX = 0;
                this.lastTime = performance.now();
                this.isDying = false;
            }, 1500);
        }
    }

    // 更新
    update() {
        if (this.state !== GAME_STATE.PLAYING) return;

        // 更新时间
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.time -= deltaTime;
        if (this.time <= 0) {
            this.player.die();
            this.playerDeath();
            return;
        }

        // 更新玩家
        const hitResult = this.player.update(
            this.keys,
            this.level.tiles,
            this.level.enemies,
            this.level.powerups,
            this.level.width * TILE_SIZE
        );

        // 处理砖块碰撞
        if (hitResult) {
            if (hitResult.type === 'hitBlock' || hitResult.type === 'breakBlock') {
                const result = this.level.hitBlock(
                    hitResult.tile.row,
                    hitResult.tile.col,
                    this.player.state
                );

                if (result && result.type === 'coin') {
                    this.player.coins++;
                    this.player.addScore(SCORE.COIN);
                    soundManager.coin();
                }
            }
        }

        // 检查玩家是否掉落
        if (this.player.y > this.level.height * TILE_SIZE + 100) {
            if (!this.player.dead) {
                this.player.die();
            }
            this.playerDeath();
        }

        // 检查玩家被敌人杀死后的死亡动画完成
        if (this.player.dead && this.player.y > this.level.height * TILE_SIZE) {
            this.playerDeath();
        }

        // 更新关卡
        const levelComplete = this.level.update(this.player, this.cameraX);

        if (levelComplete) {
            this.levelComplete();
        }

        // 更新相机
        this.updateCamera();

        // 星星无敌粒子效果
        if (this.player.starPower && Math.random() < 0.3) {
            createStarSparkle(
                this.player.x + Math.random() * this.player.width,
                this.player.y + Math.random() * this.player.height
            );
        }

        // 更新FPS
        ui.updateFPS();
    }

    // 更新相机
    updateCamera() {
        // 相机跟随玩家
        const targetX = this.player.x - CANVAS_WIDTH / 3;
        this.cameraX += (targetX - this.cameraX) * 0.1;

        // 相机边界
        this.cameraX = Math.max(0, Math.min(this.cameraX, this.level.width * TILE_SIZE - CANVAS_WIDTH));
    }

    // 渲染
    render() {
        // 清空画布
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // 绘制背景
        this.drawBackground();

        if (this.state === GAME_STATE.PLAYING ||
            this.state === GAME_STATE.PAUSED ||
            this.state === GAME_STATE.LEVEL_TRANSITION) {

            // 绘制关卡
            this.level.draw(this.ctx, this.cameraX, this.cameraY);

            // 绘制玩家
            this.player.draw(this.ctx, this.cameraX, this.cameraY);

            // 绘制HUD
            ui.drawHUD(this.ctx, this.player, this.time, this.currentLevel);
        }
    }

    // 绘制背景
    drawBackground() {
        // 根据关卡设置不同的背景
        if (this.currentLevel === 1) {
            // 天空蓝
            this.ctx.fillStyle = COLORS.SKY;
        } else if (this.currentLevel === 2) {
            // 地下黑色
            this.ctx.fillStyle = '#1a1a2e';
        } else if (this.currentLevel === 3) {
            // 城堡深色
            this.ctx.fillStyle = '#2d132c';
        } else {
            this.ctx.fillStyle = COLORS.SKY;
        }

        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    // 游戏循环
    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }

    // 开始游戏循环
    start() {
        this.gameLoop();
    }
}
