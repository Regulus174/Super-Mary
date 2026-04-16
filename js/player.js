// 玩家系统

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.width = 16;
        this.height = 28;
        this.direction = 1; // 1: 右, -1: 左
        this.state = PLAYER_STATE.SMALL;

        // 状态
        this.grounded = false;
        this.jumping = false;
        this.dead = false;
        this.invincible = false;
        this.invincibleTimer = 0;
        this.starPower = false;
        this.starPowerTimer = 0;

        // 二段跳
        this.canDoubleJump = false;
        this.hasDoubleJumped = false;
        this.jumpKeyPressed = false;

        // 动画
        this.frame = 0;
        this.frameTimer = 0;
        this.facingDirection = 1;

        // 生命和分数
        this.lives = INITIAL_LIVES;
        this.score = 0;
        this.coins = 0;

        // 火球
        this.fireballs = [];
        this.fireballCooldown = 0;

        // 粒子效果
        this.particles = [];
    }

    // 更新
    update(keys, tiles, enemies, powerups, levelWidth) {
        // 死亡时只更新位置（播放死亡动画）
        if (this.dead) {
            this.vy += GRAVITY;
            this.y += this.vy;
            return;
        }

        // 处理输入
        this.handleInput(keys);

        // 应用物理
        this.applyPhysics(tiles);

        // 更新火球
        this.updateFireballs(tiles, enemies);

        // 更新计时器
        this.updateTimers();

        // 更新动画
        this.updateAnimation();

        // 更新粒子
        updateParticles(this.particles);

        // 边界检查
        this.checkBounds(levelWidth);

        // 检查道具碰撞
        this.checkPowerupCollision(powerups);

        // 检查敌人碰撞
        this.checkEnemyCollision(enemies);
    }

    // 处理输入
    handleInput(keys) {
        // 左右移动
        if (keys.left) {
            this.vx = -PLAYER_SPEED;
            this.facingDirection = -1;
        } else if (keys.right) {
            this.vx = PLAYER_SPEED;
            this.facingDirection = 1;
        } else {
            this.vx *= 0.8;
            if (Math.abs(this.vx) < 0.1) this.vx = 0;
        }

        // 跳跃
        if (keys.jump && !this.jumpKeyPressed) {
            if (this.grounded && !this.jumping) {
                // 普通跳跃
                this.vy = PLAYER_JUMP_FORCE;
                this.grounded = false;
                this.jumping = true;
                this.canDoubleJump = true;
                this.hasDoubleJumped = false;
                console.log("First jump!"); // 调试信息
                soundManager.jump();
            }
            else if (!this.grounded && this.canDoubleJump && !this.hasDoubleJumped) {
                // 二段跳
                console.log("Double jump! vy=", this.vy, "grounded=", this.grounded, "canDoubleJump=", this.canDoubleJump, "hasDoubleJumped=", this.hasDoubleJumped); // 调试信息
                this.vy = PLAYER_JUMP_FORCE * 0.8; // 二段跳力度稍小
                this.hasDoubleJumped = true;
                this.canDoubleJump = false;
                soundManager.jump();
            }
            this.jumpKeyPressed = true;
        } else if (!keys.jump) {
            this.jumpKeyPressed = false;
        }

        // 发射火球
        if (keys.fire && this.state === PLAYER_STATE.FIRE && this.fireballCooldown <= 0) {
            this.shootFireball();
            this.fireballCooldown = 20;
        }
    }

    // 应用物理
    applyPhysics(tiles) {
        // 水平移动
        this.x += this.vx;
        const leftCollision = collisionManager.checkLeftCollision(this);
        const rightCollision = collisionManager.checkRightCollision(this);

        if (leftCollision && this.vx < 0) {
            this.x = leftCollision.x + TILE_SIZE;
            this.vx = 0;
        }
        if (rightCollision && this.vx > 0) {
            this.x = rightCollision.x - this.width;
            this.vx = 0;
        }

        // 垂直移动
        this.vy += GRAVITY;
        if (this.vy > MAX_FALL_SPEED) this.vy = MAX_FALL_SPEED;
        this.y += this.vy;

        const topCollision = collisionManager.checkTopCollision(this);
        const bottomCollision = collisionManager.checkBottomCollision(this);

        if (topCollision && this.vy < 0) {
            this.y = topCollision.y + TILE_SIZE;
            this.vy = 0;
            // 顶砖块
            if (topCollision.tile.type === TILE.QUESTION && !topCollision.tile.used) {
                topCollision.tile.used = true;
                return { type: 'hitBlock', tile: topCollision };
            }
            if (topCollision.tile.type === TILE.BRICK && this.state !== PLAYER_STATE.SMALL) {
                return { type: 'breakBlock', tile: topCollision };
            }
        }

        if (bottomCollision && this.vy > 0) {
            this.y = bottomCollision.y - this.height;
            this.vy = 0;
            this.grounded = true;
            this.jumping = false;
            this.canDoubleJump = false;
            this.hasDoubleJumped = false;
        } else {
            this.grounded = false;
        }

        return null;
    }

    // 更新计时器
    updateTimers() {
        if (this.fireballCooldown > 0) this.fireballCooldown--;

        if (this.invincible) {
            this.invincibleTimer--;
            if (this.invincibleTimer <= 0) {
                this.invincible = false;
            }
        }

        if (this.starPower) {
            this.starPowerTimer--;
            if (this.starPowerTimer <= 0) {
                this.starPower = false;
                this.invincible = false;
            }
        }
    }

    // 更新动画
    updateAnimation() {
        if (Math.abs(this.vx) > 0.5) {
            this.frameTimer++;
            if (this.frameTimer >= 6) {
                this.frameTimer = 0;
                this.frame = (this.frame + 1) % 3;
            }
        } else {
            this.frame = 0;
        }
    }

    // 发射火球
    shootFireball() {
        this.fireballs.push({
            x: this.x + (this.facingDirection > 0 ? this.width : -8),
            y: this.y + this.height / 2,
            vx: this.facingDirection * 6,
            vy: 0,
            width: 12,
            height: 12,
            frame: 0
        });
        soundManager.fireball();
    }

    // 更新火球
    updateFireballs(tiles, enemies) {
        for (let i = this.fireballs.length - 1; i >= 0; i--) {
            const fb = this.fireballs[i];

            // 移动
            fb.x += fb.vx;
            fb.vy += GRAVITY;
            fb.y += fb.vy;

            // 地面弹跳
            const groundCheck = collisionManager.checkBottomCollision(fb);
            if (groundCheck) {
                fb.y = groundCheck.y - fb.height;
                fb.vy = -6;
            }

            // 墙壁碰撞
            if (collisionManager.checkLeftCollision(fb) || collisionManager.checkRightCollision(fb)) {
                this.fireballs.splice(i, 1);
                continue;
            }

            // 敌人碰撞
            for (let j = enemies.length - 1; j >= 0; j--) {
                if (enemies[j].alive && collisionManager.entityEntity(fb, enemies[j])) {
                    enemies[j].kill();
                    this.addScore(SCORE.GOOMBA);
                    this.fireballs.splice(i, 1);
                    break;
                }
            }

            // 动画
            fb.frame++;
        }
    }

    // 边界检查
    checkBounds(levelWidth) {
        if (this.x < 0) this.x = 0;
        if (this.x > levelWidth - this.width) {
            this.x = levelWidth - this.width;
        }
    }

    // 道具碰撞
    checkPowerupCollision(powerups) {
        for (let i = powerups.length - 1; i >= 0; i--) {
            const p = powerups[i];
            if (!p.collected && collisionManager.entityEntity(this, p)) {
                p.collected = true;
                this.collectPowerup(p);
                powerups.splice(i, 1);
            }
        }
    }

    // 收集道具
    collectPowerup(powerup) {
        switch (powerup.type) {
            case POWERUP_TYPE.MUSHROOM:
                if (this.state === PLAYER_STATE.SMALL) {
                    this.state = PLAYER_STATE.BIG;
                    this.height = 44;
                    this.y -= 16;
                }
                this.addScore(SCORE.MUSHROOM);
                soundManager.powerup();
                break;

            case POWERUP_TYPE.FIRE_FLOWER:
                if (this.state === PLAYER_STATE.SMALL) {
                    this.height = 44;
                    this.y -= 16;
                }
                this.state = PLAYER_STATE.FIRE;
                this.addScore(SCORE.FIRE_FLOWER);
                soundManager.powerup();
                break;

            case POWERUP_TYPE.STAR:
                this.starPower = true;
                this.invincible = true;
                this.starPowerTimer = 600; // 10秒
                this.addScore(SCORE.STAR);
                soundManager.star();
                break;

            case POWERUP_TYPE.COIN:
                this.coins++;
                this.addScore(SCORE.COIN);
                soundManager.coin();
                if (this.coins >= 100) {
                    this.coins -= 100;
                    this.lives++;
                }
                break;
        }

        // 粒子效果
        this.particles.push(...createParticles(
            this.x + this.width / 2,
            this.y + this.height / 2,
            COLORS.STAR_YELLOW,
            10
        ));
    }

    // 敌人碰撞
    checkEnemyCollision(enemies) {
        for (const enemy of enemies) {
            if (!enemy.alive) continue;

            if (collisionManager.entityEntity(this, enemy)) {
                // 踩敌人
                if (collisionManager.isStomping(this, enemy)) {
                    enemy.stomp();
                    this.vy = -8; // 反弹
                    this.addScore(SCORE.GOOMBA);
                }
                // 无敌状态
                else if (this.starPower || this.invincible) {
                    enemy.kill();
                    this.addScore(SCORE.GOOMBA);
                }
                // 被攻击
                else {
                    this.takeDamage();
                }
            }
        }
    }

    // 受伤
    takeDamage() {
        if (this.invincible || this.starPower) return;

        soundManager.playerHurt();

        if (this.state === PLAYER_STATE.FIRE) {
            this.state = PLAYER_STATE.BIG;
            this.invincible = true;
            this.invincibleTimer = 120;
        } else if (this.state === PLAYER_STATE.BIG) {
            this.state = PLAYER_STATE.SMALL;
            this.height = 28;
            this.invincible = true;
            this.invincibleTimer = 120;
        } else {
            this.die();
        }
    }

    // 死亡
    die() {
        this.dead = true;
        this.vy = -10;
        soundManager.playerDeath();
    }

    // 添加分数
    addScore(points) {
        this.score += points;
    }

    // 复活
    respawn(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.dead = false;
        this.state = PLAYER_STATE.SMALL;
        this.height = 28;
        this.invincible = true;
        this.invincibleTimer = 120;
        this.starPower = false;
        this.fireballs = [];
        this.canDoubleJump = false;
        this.hasDoubleJumped = false;
    }

    // 绘制
    draw(ctx, cameraX, cameraY) {
        const drawX = this.x - cameraX;
        const drawY = this.y - cameraY;

        // 无敌闪烁效果
        if (this.invincible && !this.starPower) {
            if (Math.floor(this.invincibleTimer / 4) % 2 === 0) return;
        }

        // 星星彩虹效果
        if (this.starPower) {
            const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#8b00ff'];
            ctx.fillStyle = colors[Math.floor(this.starPowerTimer / 4) % colors.length];
            ctx.fillRect(drawX - 2, drawY - 2, this.width + 4, this.height + 4);
        }

        // 绘制玩家
        if (this.state === PLAYER_STATE.SMALL) {
            Sprites.drawMarioSmall(ctx, drawX, drawY, this.facingDirection, this.frame);
        } else if (this.state === PLAYER_STATE.BIG) {
            Sprites.drawMarioBig(ctx, drawX, drawY, this.facingDirection, this.frame);
        } else if (this.state === PLAYER_STATE.FIRE) {
            Sprites.drawMarioFire(ctx, drawX, drawY, this.facingDirection, this.frame);
        }

        // 绘制火球
        this.fireballs.forEach(fb => {
            Sprites.drawFireball(ctx, fb.x - cameraX, fb.y - cameraY, fb.frame);
        });

        // 绘制粒子
        drawParticles(ctx, this.particles);
    }
}
