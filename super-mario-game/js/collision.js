// 碰撞检测系统

class CollisionManager {
    constructor() {
        this.tiles = [];
    }

    // 设置瓦片地图
    setTiles(tiles) {
        this.tiles = tiles;
    }

    // 矩形碰撞检测
    rectRect(r1, r2) {
        return r1.x < r2.x + r2.width &&
               r1.x + r1.width > r2.x &&
               r1.y < r2.y + r2.height &&
               r1.y + r1.height > r2.y;
    }

    // 点是否在矩形内
    pointInRect(px, py, rect) {
        return px >= rect.x && px <= rect.x + rect.width &&
               py >= rect.y && py <= rect.y + rect.height;
    }

    // 实体与瓦片碰撞
    entityTiles(entity) {
        const collisions = [];
        const startCol = Math.floor(entity.x / TILE_SIZE);
        const endCol = Math.floor((entity.x + entity.width) / TILE_SIZE);
        const startRow = Math.floor(entity.y / TILE_SIZE);
        const endRow = Math.floor((entity.y + entity.height) / TILE_SIZE);

        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                if (this.tiles[row] && this.tiles[row][col]) {
                    const tile = this.tiles[row][col];
                    if (tile.solid) {
                        collisions.push({
                            tile: tile,
                            x: col * TILE_SIZE,
                            y: row * TILE_SIZE,
                            row: row,
                            col: col
                        });
                    }
                }
            }
        }
        return collisions;
    }

    // 检测实体是否在地面上
    isOnGround(entity) {
        const testY = entity.y + entity.height + 1;
        const startCol = Math.floor(entity.x / TILE_SIZE);
        const endCol = Math.floor((entity.x + entity.width - 1) / TILE_SIZE);
        const row = Math.floor(testY / TILE_SIZE);

        for (let col = startCol; col <= endCol; col++) {
            if (this.tiles[row] && this.tiles[row][col] && this.tiles[row][col].solid) {
                return true;
            }
        }
        return false;
    }

    // 检测上方碰撞
    checkTopCollision(entity) {
        const testY = entity.y - 1;
        const startCol = Math.floor(entity.x / TILE_SIZE);
        const endCol = Math.floor((entity.x + entity.width - 1) / TILE_SIZE);
        const row = Math.floor(testY / TILE_SIZE);

        for (let col = startCol; col <= endCol; col++) {
            if (this.tiles[row] && this.tiles[row][col] && this.tiles[row][col].solid) {
                return {
                    tile: this.tiles[row][col],
                    x: col * TILE_SIZE,
                    y: row * TILE_SIZE,
                    row: row,
                    col: col
                };
            }
        }
        return null;
    }

    // 检测下方碰撞
    checkBottomCollision(entity) {
        const testY = entity.y + entity.height + 1;
        const startCol = Math.floor(entity.x / TILE_SIZE);
        const endCol = Math.floor((entity.x + entity.width - 1) / TILE_SIZE);
        const row = Math.floor(testY / TILE_SIZE);

        for (let col = startCol; col <= endCol; col++) {
            if (this.tiles[row] && this.tiles[row][col] && this.tiles[row][col].solid) {
                return {
                    tile: this.tiles[row][col],
                    x: col * TILE_SIZE,
                    y: row * TILE_SIZE,
                    row: row,
                    col: col
                };
            }
        }
        return null;
    }

    // 检测左侧碰撞
    checkLeftCollision(entity) {
        const testX = entity.x - 1;
        const startRow = Math.floor(entity.y / TILE_SIZE);
        const endRow = Math.floor((entity.y + entity.height - 1) / TILE_SIZE);
        const col = Math.floor(testX / TILE_SIZE);

        for (let row = startRow; row <= endRow; row++) {
            if (this.tiles[row] && this.tiles[row][col] && this.tiles[row][col].solid) {
                return {
                    tile: this.tiles[row][col],
                    x: col * TILE_SIZE,
                    y: row * TILE_SIZE,
                    row: row,
                    col: col
                };
            }
        }
        return null;
    }

    // 检测右侧碰撞
    checkRightCollision(entity) {
        const testX = entity.x + entity.width + 1;
        const startRow = Math.floor(entity.y / TILE_SIZE);
        const endRow = Math.floor((entity.y + entity.height - 1) / TILE_SIZE);
        const col = Math.floor(testX / TILE_SIZE);

        for (let row = startRow; row <= endRow; row++) {
            if (this.tiles[row] && this.tiles[row][col] && this.tiles[row][col].solid) {
                return {
                    tile: this.tiles[row][col],
                    x: col * TILE_SIZE,
                    y: row * TILE_SIZE,
                    row: row,
                    col: col
                };
            }
        }
        return null;
    }

    // 实体与实体碰撞
    entityEntity(e1, e2) {
        return this.rectRect(
            { x: e1.x, y: e1.y, width: e1.width, height: e1.height },
            { x: e2.x, y: e2.y, width: e2.width, height: e2.height }
        );
    }

    // 玩家是否踩到敌人
    isStomping(player, enemy) {
        // 玩家正在下落
        if (player.vy <= 0) return false;

        // 玩家底部与敌人顶部的碰撞
        const playerBottom = player.y + player.height;
        const enemyTop = enemy.y;
        const verticalOverlap = playerBottom - enemyTop;

        // 垂直重叠小于一定值且水平有交集
        if (verticalOverlap > 0 && verticalOverlap < 15) {
            const horizontalOverlap = Math.min(
                player.x + player.width - enemy.x,
                enemy.x + enemy.width - player.x
            );
            return horizontalOverlap > player.width * 0.3;
        }
        return false;
    }

    // 获取碰撞方向
    getCollisionDirection(entity, collision) {
        const entityCenterX = entity.x + entity.width / 2;
        const entityCenterY = entity.y + entity.height / 2;
        const tileCenterX = collision.x + TILE_SIZE / 2;
        const tileCenterY = collision.y + TILE_SIZE / 2;

        const dx = entityCenterX - tileCenterX;
        const dy = entityCenterY - tileCenterY;

        if (Math.abs(dx) > Math.abs(dy)) {
            return dx > 0 ? 'right' : 'left';
        } else {
            return dy > 0 ? 'bottom' : 'top';
        }
    }

    // 掉落检测（掉出地图）
    isFallOffMap(entity, mapHeight) {
        return entity.y > mapHeight * TILE_SIZE + 100;
    }
}

// 全局碰撞管理器实例
const collisionManager = new CollisionManager();
