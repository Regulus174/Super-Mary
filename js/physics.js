// 物理引擎

class Physics {
    constructor() {
        this.gravity = GRAVITY;
        this.maxFallSpeed = MAX_FALL_SPEED;
    }

    // 应用重力
    applyGravity(entity) {
        entity.vy += this.gravity;
        if (entity.vy > this.maxFallSpeed) {
            entity.vy = this.maxFallSpeed;
        }
    }

    // 应用速度
    applyVelocity(entity) {
        entity.x += entity.vx;
        entity.y += entity.vy;
    }

    // 水平移动（带碰撞检测）
    moveHorizontal(entity, tiles) {
        entity.x += entity.vx;

        const collision = this.checkTileCollision(entity, tiles);
        if (collision) {
            if (entity.vx > 0) {
                entity.x = collision.x - entity.width;
            } else if (entity.vx < 0) {
                entity.x = collision.x + TILE_SIZE;
            }
            entity.vx = 0;
            return collision;
        }
        return null;
    }

    // 垂直移动（带碰撞检测）
    moveVertical(entity, tiles) {
        entity.y += entity.vy;

        const collision = this.checkTileCollision(entity, tiles);
        if (collision) {
            if (entity.vy > 0) {
                entity.y = collision.y - entity.height;
                entity.vy = 0;
                entity.grounded = true;
            } else if (entity.vy < 0) {
                entity.y = collision.y + TILE_SIZE;
                entity.vy = 0;
            }
            return collision;
        } else {
            entity.grounded = false;
        }
        return null;
    }

    // 检测瓦片碰撞
    checkTileCollision(entity, tiles) {
        // 获取实体边界对应的瓦片范围
        const startCol = Math.floor(entity.x / TILE_SIZE);
        const endCol = Math.floor((entity.x + entity.width - 1) / TILE_SIZE);
        const startRow = Math.floor(entity.y / TILE_SIZE);
        const endRow = Math.floor((entity.y + entity.height - 1) / TILE_SIZE);

        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                if (tiles[row] && tiles[row][col] && tiles[row][col].solid) {
                    return {
                        x: col * TILE_SIZE,
                        y: row * TILE_SIZE,
                        row: row,
                        col: col,
                        tile: tiles[row][col]
                    };
                }
            }
        }
        return null;
    }

    // 检测是否站在瓦片上
    isOnGround(entity, tiles) {
        const row = Math.floor((entity.y + entity.height) / TILE_SIZE);
        const startCol = Math.floor(entity.x / TILE_SIZE);
        const endCol = Math.floor((entity.x + entity.width - 1) / TILE_SIZE);

        for (let col = startCol; col <= endCol; col++) {
            if (tiles[row] && tiles[row][col] && tiles[row][col].solid) {
                return true;
            }
        }
        return false;
    }

    // 获取实体下方的瓦片
    getTileBelow(entity, tiles) {
        const row = Math.floor((entity.y + entity.height) / TILE_SIZE);
        const col = Math.floor((entity.x + entity.width / 2) / TILE_SIZE);
        if (tiles[row] && tiles[row][col]) {
            return tiles[row][col];
        }
        return null;
    }

    // 获取实体上方的瓦片
    getTileAbove(entity, tiles) {
        const row = Math.floor((entity.y - 1) / TILE_SIZE);
        const col = Math.floor((entity.x + entity.width / 2) / TILE_SIZE);
        if (tiles[row] && tiles[row][col]) {
            return tiles[row][col];
        }
        return null;
    }

    // 获取实体左侧的瓦片
    getTileLeft(entity, tiles) {
        const row = Math.floor((entity.y + entity.height / 2) / TILE_SIZE);
        const col = Math.floor((entity.x - 1) / TILE_SIZE);
        if (tiles[row] && tiles[row][col]) {
            return tiles[row][col];
        }
        return null;
    }

    // 获取实体右侧的瓦片
    getTileRight(entity, tiles) {
        const row = Math.floor((entity.y + entity.height / 2) / TILE_SIZE);
        const col = Math.floor((entity.x + entity.width) / TILE_SIZE);
        if (tiles[row] && tiles[row][col]) {
            return tiles[row][col];
        }
        return null;
    }
}

// 全局物理引擎实例
const physics = new Physics();
