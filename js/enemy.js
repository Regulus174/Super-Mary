// 敌人系统

class Enemy {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.vx = -1;
        this.vy = 0;
        this.type = type;
        this.alive = true;
        this.frame = 0;
        this.frameTimer = 0;
        this.direction = -1;

        // 根据类型设置属性
        this.setupType();
    }

    setupType() {
        switch (this.type) {
            case ENEMY_TYPE.GOOMBA:
                this.width = 16;
                this.height = 20;
                this.vx = -1;
                break;

            case ENEMY_TYPE.KOOPA:
                this.width = 16;
                this.height = 26;
                this.vx = -1;
                this.isShell = false;
                this.shellMoving = false;
                break;

            case ENEMY_TYPE.FLYING_KOOPA:
                this.width = 16;
                this.height = 26;
                this.vx = -1;
                this.flyY = this.y;
                this.flyAmplitude = 32;
                this.flySpeed = 0.05;
                this.flyPhase = Math.random() * Math.PI * 2;
                break;

            case ENEMY_TYPE.BOWSER:
                this.width = 48;
                this.height = 48;
                this.vx = -0.5;
                this.health = 5;
                this.fireTimer = 0;
                this.fireballs = [];
                break;
        }
    }

    update(tiles, player, levelWidth) {
        if (!this.alive) return;

        switch (this.type) {
            case ENEMY_TYPE.GOOMBA:
                this.updateGoomba(tiles);
                break;
            case ENEMY_TYPE.KOOPA:
                this.updateKoopa(tiles, player);
                break;
            case ENEMY_TYPE.FLYING_KOOPA:
                this.updateFlyingKoopa(tiles);
                break;
            case ENEMY_TYPE.BOWSER:
                this.updateBowser(tiles, player);
                break;
        }

        // 边界检查
        if (this.x < -100 || this.x > levelWidth + 100) {
            this.alive = false;
        }

        // 更新动画
        this.frameTimer++;
        if (this.frameTimer >= 8) {
            this.frameTimer = 0;
            this.frame = (this.frame + 1) % 2;
        }
    }

    updateGoomba(tiles) {
        // 移动
        this.x += this.vx;

        // 墙壁碰撞
        if (collisionManager.checkLeftCollision(this) ||
            collisionManager.checkRightCollision(this)) {
            this.vx *= -1;
        }

        // 悬崖检测
        if (!this.checkGroundAhead(tiles)) {
            this.vx *= -1;
        }

        // 重力
        this.vy += GRAVITY;
        this.y += this.vy;

        const groundCollision = collisionManager.checkBottomCollision(this);
        if (groundCollision) {
            this.y = groundCollision.y - this.height;
            this.vy = 0;
        }
    }

    updateKoopa(tiles, player) {
        if (this.isShell) {
            if (this.shellMoving) {
                this.x += this.vx;

                // 墙壁碰撞反弹
                if (collisionManager.checkLeftCollision(this) ||
                    collisionManager.checkRightCollision(this)) {
                    this.vx *= -1;
                    soundManager.bounce();
                }

                // 重力
                this.vy += GRAVITY;
                this.y += this.vy;

                const groundCollision = collisionManager.checkBottomCollision(this);
                if (groundCollision) {
                    this.y = groundCollision.y - this.height;
                    this.vy = 0;
                }
            }
        } else {
            // 正常移动
            this.x += this.vx;
            this.direction = this.vx > 0 ? 1 : -1;

            if (collisionManager.checkLeftCollision(this) ||
                collisionManager.checkRightCollision(this)) {
                this.vx *= -1;
            }

            if (!this.checkGroundAhead(tiles)) {
                this.vx *= -1;
            }

            this.vy += GRAVITY;
            this.y += this.vy;

            const groundCollision = collisionManager.checkBottomCollision(this);
            if (groundCollision) {
                this.y = groundCollision.y - this.height;
                this.vy = 0;
            }
        }
    }

    updateFlyingKoopa(tiles) {
        // 水平移动
        this.x += this.vx;

        if (collisionManager.checkLeftCollision(this) ||
            collisionManager.checkRightCollision(this)) {
            this.vx *= -1;
            this.direction = this.vx > 0 ? 1 : -1;
        }

        // 垂直飞行
        this.flyPhase += this.flySpeed;
        this.y = this.flyY + Math.sin(this.flyPhase) * this.flyAmplitude;
    }

    updateBowser(tiles, player) {
        // 移动
        this.x += this.vx;
        this.direction = this.vx > 0 ? 1 : -1;

        // 边界反弹
        if (this.x < this.startX - 100 || this.x > this.startX + 100) {
            this.vx *= -1;
        }

        // 发射火球
        this.fireTimer++;
        if (this.fireTimer >= 120) {
            this.fireTimer = 0;
            this.shootFireball(player);
        }

        // 更新火球
        for (let i = this.fireballs.length - 1; i >= 0; i--) {
            const fb = this.fireballs[i];
            fb.x += fb.vx;
            fb.vy += GRAVITY;
            fb.y += fb.vy;

            // 地面碰撞
            const groundCollision = collisionManager.checkBottomCollision(fb);
            if (groundCollision) {
                fb.y = groundCollision.y - fb.height;
                fb.vy = -4;
            }

            // 移除出界火球
            if (fb.y > CANVAS_HEIGHT + 100) {
                this.fireballs.splice(i, 1);
            }
        }
    }

    checkGroundAhead(tiles) {
        const checkX = this.vx > 0 ? this.x + this.width + 2 : this.x - 2;
        const checkY = this.y + this.height + 2;
        const col = Math.floor(checkX / TILE_SIZE);
        const row = Math.floor(checkY / TILE_SIZE);

        return tiles[row] && tiles[row][col] && tiles[row][col].solid;
    }

    shootFireball(player) {
        const dx = player.x - this.x;
        const dir = dx > 0 ? 1 : -1;

        this.fireballs.push({
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
            vx: dir * 4,
            vy: -6,
            width: 12,
            height: 12
        });
        soundManager.fireball();
    }

    stomp() {
        if (this.type === ENEMY_TYPE.GOOMBA) {
            this.alive = false;
            soundManager.enemyDeath();
        } else if (this.type === ENEMY_TYPE.KOOPA || this.type === ENEMY_TYPE.FLYING_KOOPA) {
            if (this.isShell) {
                // 踢龟壳
                this.shellMoving = true;
                this.vx = 6; // 根据玩家方向设置
                soundManager.bounce();
            } else {
                // 变成龟壳
                this.isShell = true;
                this.height = 16;
                this.shellMoving = false;
                soundManager.enemyDeath();
            }
        } else if (this.type === ENEMY_TYPE.BOWSER) {
            this.health--;
            soundManager.enemyDeath();
            if (this.health <= 0) {
                this.alive = false;
            }
        }
    }

    kill() {
        this.alive = false;
        soundManager.enemyDeath();
    }

    draw(ctx, cameraX, cameraY) {
        if (!this.alive) return;

        const drawX = this.x - cameraX;
        const drawY = this.y - cameraY;

        switch (this.type) {
            case ENEMY_TYPE.GOOMBA:
                Sprites.drawGoomba(ctx, drawX, drawY, this.frame);
                break;

            case ENEMY_TYPE.KOOPA:
            case ENEMY_TYPE.FLYING_KOOPA:
                if (this.isShell) {
                    Sprites.drawKoopaShell(ctx, drawX, drawY, this.shellMoving);
                } else {
                    Sprites.drawKoopa(ctx, drawX, drawY, this.direction, this.frame);
                }
                break;

            case ENEMY_TYPE.BOWSER:
                this.drawBowser(ctx, drawX, drawY);
                // 绘制火球
                this.fireballs.forEach(fb => {
                    Sprites.drawFireball(ctx, fb.x - cameraX, fb.y - cameraY, 0);
                });
                break;
        }
    }

    drawBowser(ctx, x, y) {
        // 身体
        ctx.fillStyle = '#2d5a27';
        ctx.fillRect(x + 8, y + 8, 32, 32);

        // 头
        ctx.fillStyle = '#2d5a27';
        ctx.fillRect(x + 16, y, 16, 16);

        // 眼睛
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 20, y + 4, 6, 6);
        ctx.fillStyle = '#000000';
        ctx.fillRect(x + 22, y + 6, 3, 3);

        // 角
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(x + 18, y - 6, 4, 8);
        ctx.fillRect(x + 26, y - 6, 4, 8);

        // 嘴
        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(x + 18, y + 12, 12, 4);

        // 脚
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(x + 8, y + 40, 8, 8);
        ctx.fillRect(x + 32, y + 40, 8, 8);

        // 尾巴
        ctx.fillStyle = '#2d5a27';
        ctx.fillRect(x + 40, y + 20, 8, 4);
        ctx.fillRect(x + 44, y + 24, 4, 4);

        // 甲壳
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(x + 12, y + 12, 24, 20);
        ctx.fillStyle = '#6b3410';
        ctx.fillRect(x + 16, y + 16, 16, 12);
    }
}

// 创建敌人
function createEnemy(x, y, type) {
    const enemy = new Enemy(x, y, type);
    if (type === ENEMY_TYPE.BOWSER) {
        enemy.startX = x;
    }
    return enemy;
}
