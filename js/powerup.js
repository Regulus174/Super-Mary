// 道具系统

class Powerup {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.type = type;
        this.width = 16;
        this.height = 16;
        this.collected = false;
        this.frame = 0;
        this.frameTimer = 0;
        this.spawning = true;
        this.spawnY = y + TILE_SIZE;
        this.active = false;

        // 设置道具类型
        this.setupType();
    }

    setupType() {
        switch (this.type) {
            case POWERUP_TYPE.MUSHROOM:
                this.vx = 2;
                break;
            case POWERUP_TYPE.FIRE_FLOWER:
                this.vx = 0;
                break;
            case POWERUP_TYPE.STAR:
                this.vx = 2;
                break;
            case POWERUP_TYPE.COIN:
                this.vy = -8;
                this.isCoin = true;
                break;
        }
    }

    update(tiles, levelWidth) {
        if (this.collected) return;

        // 金币动画
        if (this.isCoin) {
            this.vy += 0.5;
            this.y += this.vy;
            this.frame++;
            if (this.vy > 0 && this.y > this.spawnY - TILE_SIZE) {
                this.collected = true;
            }
            return;
        }

        // 生成动画
        if (this.spawning) {
            this.y -= 1;
            if (this.y <= this.spawnY - TILE_SIZE) {
                this.spawning = false;
                this.active = true;
            }
            return;
        }

        // 移动
        this.x += this.vx;

        // 重力
        this.vy += GRAVITY;
        this.y += this.vy;

        // 地面碰撞
        const groundCollision = collisionManager.checkBottomCollision(this);
        if (groundCollision) {
            this.y = groundCollision.y - this.height;
            this.vy = 0;
        }

        // 墙壁碰撞
        const leftCollision = collisionManager.checkLeftCollision(this);
        const rightCollision = collisionManager.checkRightCollision(this);

        if (leftCollision && this.vx < 0) {
            this.vx *= -1;
        }
        if (rightCollision && this.vx > 0) {
            this.vx *= -1;
        }

        // 边界检查
        if (this.x < -50 || this.x > levelWidth + 50) {
            this.collected = true;
        }

        // 动画
        this.frameTimer++;
        if (this.frameTimer >= 8) {
            this.frameTimer = 0;
            this.frame++;
        }
    }

    draw(ctx, cameraX, cameraY) {
        if (this.collected) return;

        const drawX = this.x - cameraX;
        const drawY = this.y - cameraY;

        switch (this.type) {
            case POWERUP_TYPE.MUSHROOM:
                Sprites.drawMushroom(ctx, drawX, drawY);
                break;
            case POWERUP_TYPE.FIRE_FLOWER:
                Sprites.drawFireFlower(ctx, drawX, drawY, this.frame);
                break;
            case POWERUP_TYPE.STAR:
                Sprites.drawStar(ctx, drawX, drawY, this.frame);
                break;
            case POWERUP_TYPE.COIN:
                Sprites.drawCoin(ctx, drawX, drawY, this.frame);
                break;
        }
    }
}

// 创建道具
function createPowerup(x, y, type) {
    return new Powerup(x, y, type);
}

// 从砖块生成道具
function spawnPowerupFromBlock(x, y, playerState) {
    // 根据玩家状态决定道具类型
    if (playerState === PLAYER_STATE.SMALL) {
        // 小马里奥 - 出蘑菇
        return createPowerup(x, y, POWERUP_TYPE.MUSHROOM);
    } else {
        // 大马里奥 - 出火花
        return createPowerup(x, y, POWERUP_TYPE.FIRE_FLOWER);
    }
}

// 随机道具
function randomPowerup(x, y) {
    const types = [POWERUP_TYPE.MUSHROOM, POWERUP_TYPE.FIRE_FLOWER, POWERUP_TYPE.STAR];
    const weights = [0.5, 0.35, 0.15]; // 概率权重

    let rand = Math.random();
    let cumulative = 0;

    for (let i = 0; i < types.length; i++) {
        cumulative += weights[i];
        if (rand < cumulative) {
            return createPowerup(x, y, types[i]);
        }
    }

    return createPowerup(x, y, POWERUP_TYPE.MUSHROOM);
}
