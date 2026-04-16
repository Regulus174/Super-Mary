// 关卡系统

class Level {
    constructor(levelNumber) {
        this.levelNumber = levelNumber;
        this.tiles = [];
        this.width = 0;
        this.height = 0;
        this.enemies = [];
        this.powerups = [];
        this.decorations = [];
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.brickPieces = [];
        this.scoreTexts = [];

        // 加载关卡
        this.load(levelNumber);
    }

    load(levelNumber) {
        switch (levelNumber) {
            case 1:
                this.loadLevel1();
                break;
            case 2:
                this.loadLevel2();
                break;
            case 3:
                this.loadLevel3();
                break;
            default:
                this.loadLevel1();
        }

        // 设置碰撞管理器的瓦片
        collisionManager.setTiles(this.tiles);
    }

    // 第一关：草原世界
    loadLevel1() {
        this.width = 200;
        this.height = 15;

        // 初始化瓦片数组
        this.initTiles();

        // 地面
        for (let x = 0; x < this.width; x++) {
            // 有几个坑
            if ((x >= 30 && x <= 32) || (x >= 60 && x <= 63)) continue;
            this.setTile(x, 14, TILE.GROUND, true);
            this.setTile(x, 13, TILE.GROUND, true);
        }

        // 砖块和问号砖
        // 第一组
        this.setTile(10, 9, TILE.QUESTION, true, { hasItem: true, itemType: POWERUP_TYPE.MUSHROOM });
        this.setTile(11, 9, TILE.BRICK, true, { breakable: true });
        this.setTile(12, 9, TILE.QUESTION, true, { hasItem: true, itemType: POWERUP_TYPE.COIN });
        this.setTile(13, 9, TILE.BRICK, true, { breakable: true });
        this.setTile(14, 9, TILE.QUESTION, true, { hasItem: true, itemType: POWERUP_TYPE.FIRE_FLOWER });

        // 第二组 - 高台
        for (let x = 20; x < 25; x++) {
            this.setTile(x, 9, TILE.BRICK, true, { breakable: true });
        }
        this.setTile(22, 5, TILE.QUESTION, true, { hasItem: true, itemType: POWERUP_TYPE.STAR });

        // 管道
        this.setPipe(40, 11, 3);
        this.setPipe(50, 10, 4);
        this.setPipe(70, 11, 3);

        // 阶梯
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j <= i; j++) {
                this.setTile(80 + i, 12 - j, TILE.BRICK, true);
            }
        }
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4 - i; j++) {
                this.setTile(86 + i, 12 - j, TILE.BRICK, true);
            }
        }

        // 更多砖块
        for (let x = 100; x < 105; x++) {
            this.setTile(x, 9, TILE.BRICK, true, { breakable: true });
        }
        this.setTile(102, 5, TILE.QUESTION, true, { hasItem: true, itemType: POWERUP_TYPE.MUSHROOM });

        // 问号砖
        this.setTile(120, 9, TILE.QUESTION, true, { hasItem: true, itemType: POWERUP_TYPE.COIN });
        this.setTile(130, 9, TILE.QUESTION, true, { hasItem: true, itemType: POWERUP_TYPE.COIN });

        // 最后的阶梯
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j <= i; j++) {
                this.setTile(160 + i, 12 - j, TILE.BRICK, true);
            }
        }

        // 旗杆
        this.setTile(180, 2, TILE.FLAG, false);
        for (let y = 2; y < 14; y++) {
            this.tiles[y][180] = { type: TILE.FLAG, solid: false };
        }

        // 城堡
        this.setCastle(185);

        // 敌人
        this.enemies.push(createEnemy(15 * TILE_SIZE, 12 * TILE_SIZE, ENEMY_TYPE.GOOMBA));
        this.enemies.push(createEnemy(25 * TILE_SIZE, 12 * TILE_SIZE, ENEMY_TYPE.GOOMBA));
        this.enemies.push(createEnemy(45 * TILE_SIZE, 12 * TILE_SIZE, ENEMY_TYPE.GOOMBA));
        this.enemies.push(createEnemy(55 * TILE_SIZE, 12 * TILE_SIZE, ENEMY_TYPE.KOOPA));
        this.enemies.push(createEnemy(75 * TILE_SIZE, 12 * TILE_SIZE, ENEMY_TYPE.GOOMBA));
        this.enemies.push(createEnemy(110 * TILE_SIZE, 12 * TILE_SIZE, ENEMY_TYPE.GOOMBA));
        this.enemies.push(createEnemy(115 * TILE_SIZE, 12 * TILE_SIZE, ENEMY_TYPE.KOOPA));
        this.enemies.push(createEnemy(140 * TILE_SIZE, 12 * TILE_SIZE, ENEMY_TYPE.GOOMBA));
        this.enemies.push(createEnemy(145 * TILE_SIZE, 12 * TILE_SIZE, ENEMY_TYPE.GOOMBA));

        // 装饰
        this.addCloud(5, 2, 2);
        this.addCloud(25, 3, 1);
        this.addCloud(45, 1, 2);
        this.addCloud(75, 2, 1);
        this.addCloud(105, 3, 2);
        this.addCloud(135, 2, 1);
        this.addCloud(165, 3, 1);

        this.addBush(8, 12, 1);
        this.addBush(35, 12, 2);
        this.addBush(65, 12, 1);
        this.addBush(95, 12, 1);
        this.addBush(125, 12, 2);
        this.addBush(155, 12, 1);

        this.addHill(15, 12, 1);
        this.addHill(55, 12, 2);
        this.addHill(95, 12, 1);
        this.addHill(135, 12, 2);

        // 起点和终点
        this.startX = 2 * TILE_SIZE;
        this.startY = 11 * TILE_SIZE;
        this.endX = 180 * TILE_SIZE;
    }

    // 第二关：地下世界
    loadLevel2() {
        this.width = 180;
        this.height = 15;

        this.initTiles();

        // 地面和天花板
        for (let x = 0; x < this.width; x++) {
            this.setTile(x, 14, TILE.GROUND, true);
            this.setTile(x, 0, TILE.GROUND, true);
        }

        // 管道入口
        this.setPipe(5, 11, 3);

        // 地下砖块布局
        for (let x = 10; x < 30; x++) {
            this.setTile(x, 10, TILE.BRICK, true, { breakable: true });
        }

        // 问号砖
        this.setTile(15, 6, TILE.QUESTION, true, { hasItem: true, itemType: POWERUP_TYPE.MUSHROOM });
        this.setTile(20, 6, TILE.QUESTION, true, { hasItem: true, itemType: POWERUP_TYPE.COIN });
        this.setTile(25, 6, TILE.QUESTION, true, { hasItem: true, itemType: POWERUP_TYPE.FIRE_FLOWER });

        // 移动平台区域
        for (let x = 35; x < 50; x++) {
            if (x % 5 === 0) {
                this.setTile(x, 8, TILE.PLATFORM, false);
            }
        }

        // 更多砖块
        for (let x = 55; x < 75; x++) {
            this.setTile(x, 10, TILE.BRICK, true, { breakable: true });
            if (x % 3 === 0) {
                this.setTile(x, 6, TILE.BRICK, true, { breakable: true });
            }
        }

        // 阶梯
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j <= i; j++) {
                this.setTile(80 + i, 12 - j, TILE.BRICK, true);
            }
        }

        // 管道
        this.setPipe(95, 10, 4);
        this.setPipe(110, 11, 3);

        // 金币区
        for (let x = 120; x < 135; x += 2) {
            this.setTile(x, 8, TILE.COIN, false);
        }

        // 最后区域
        for (let x = 140; x < 160; x++) {
            this.setTile(x, 10, TILE.BRICK, true, { breakable: true });
        }

        // 出口管道
        this.setPipe(165, 11, 3);

        // 敌人
        this.enemies.push(createEnemy(20 * TILE_SIZE, 9 * TILE_SIZE, ENEMY_TYPE.GOOMBA));
        this.enemies.push(createEnemy(30 * TILE_SIZE, 9 * TILE_SIZE, ENEMY_TYPE.GOOMBA));
        this.enemies.push(createEnemy(40 * TILE_SIZE, 7 * TILE_SIZE, ENEMY_TYPE.FLYING_KOOPA));
        this.enemies.push(createEnemy(60 * TILE_SIZE, 9 * TILE_SIZE, ENEMY_TYPE.KOOPA));
        this.enemies.push(createEnemy(70 * TILE_SIZE, 9 * TILE_SIZE, ENEMY_TYPE.GOOMBA));
        this.enemies.push(createEnemy(100 * TILE_SIZE, 9 * TILE_SIZE, ENEMY_TYPE.GOOMBA));
        this.enemies.push(createEnemy(115 * TILE_SIZE, 9 * TILE_SIZE, ENEMY_TYPE.KOOPA));
        this.enemies.push(createEnemy(125 * TILE_SIZE, 9 * TILE_SIZE, ENEMY_TYPE.FLYING_KOOPA));
        this.enemies.push(createEnemy(145 * TILE_SIZE, 9 * TILE_SIZE, ENEMY_TYPE.GOOMBA));
        this.enemies.push(createEnemy(150 * TILE_SIZE, 9 * TILE_SIZE, ENEMY_TYPE.GOOMBA));

        this.startX = 3 * TILE_SIZE;
        this.startY = 11 * TILE_SIZE;
        this.endX = 165 * TILE_SIZE;
    }

    // 第三关：城堡世界
    loadLevel3() {
        this.width = 160;
        this.height = 15;

        this.initTiles();

        // 地面
        for (let x = 0; x < this.width; x++) {
            this.setTile(x, 14, TILE.GROUND, true);
            // 有岩浆坑
            if ((x >= 15 && x <= 18) || (x >= 35 && x <= 40) || (x >= 65 && x <= 72) || (x >= 100 && x <= 110)) {
                this.setTile(x, 14, TILE.LAVA, false);
            }
        }

        // 城堡砖块
        for (let x = 0; x < this.width; x++) {
            this.setTile(x, 1, TILE.BRICK, true);
        }

        // 平台和障碍
        for (let x = 5; x < 15; x++) {
            this.setTile(x, 10, TILE.BRICK, true, { breakable: true });
        }

        // 问号砖
        this.setTile(8, 6, TILE.QUESTION, true, { hasItem: true, itemType: POWERUP_TYPE.FIRE_FLOWER });
        this.setTile(12, 6, TILE.QUESTION, true, { hasItem: true, itemType: POWERUP_TYPE.COIN });

        // 岩浆桥
        for (let x = 15; x <= 18; x++) {
            this.setTile(x, 10, TILE.PLATFORM, false);
        }

        // 更多平台
        for (let x = 20; x < 35; x++) {
            this.setTile(x, 10, TILE.BRICK, true, { breakable: true });
        }

        this.setTile(25, 6, TILE.QUESTION, true, { hasItem: true, itemType: POWERUP_TYPE.STAR });
        this.setTile(30, 6, TILE.QUESTION, true, { hasItem: true, itemType: POWERUP_TYPE.MUSHROOM });

        // 岩浆桥2
        for (let x = 35; x <= 40; x++) {
            this.setTile(x, 8, TILE.PLATFORM, false);
        }

        // 阶梯区域
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j <= i; j++) {
                this.setTile(42 + i, 12 - j, TILE.BRICK, true);
            }
        }

        // 更多平台
        for (let x = 50; x < 65; x++) {
            this.setTile(x, 10, TILE.BRICK, true, { breakable: true });
        }

        // 岩浆桥3（最长）
        for (let x = 65; x <= 72; x++) {
            this.setTile(x, 10, TILE.PLATFORM, false);
            this.setTile(x, 6, TILE.PLATFORM, false);
        }

        // 上层路径
        for (let x = 75; x < 100; x++) {
            this.setTile(x, 8, TILE.BRICK, true, { breakable: true });
        }

        this.setTile(80, 4, TILE.QUESTION, true, { hasItem: true, itemType: POWERUP_TYPE.FIRE_FLOWER });
        this.setTile(90, 4, TILE.QUESTION, true, { hasItem: true, itemType: POWERUP_TYPE.COIN });

        // 最后岩浆桥
        for (let x = 100; x <= 110; x++) {
            this.setTile(x, 10, TILE.PLATFORM, false);
        }

        // Boss区域
        for (let x = 115; x < 145; x++) {
            this.setTile(x, 10, TILE.BRICK, true);
        }

        // Boss
        this.enemies.push(createEnemy(130 * TILE_SIZE, 6 * TILE_SIZE, ENEMY_TYPE.BOWSER));

        // 敌人
        this.enemies.push(createEnemy(10 * TILE_SIZE, 9 * TILE_SIZE, ENEMY_TYPE.GOOMBA));
        this.enemies.push(createEnemy(22 * TILE_SIZE, 9 * TILE_SIZE, ENEMY_TYPE.GOOMBA));
        this.enemies.push(createEnemy(28 * TILE_SIZE, 9 * TILE_SIZE, ENEMY_TYPE.KOOPA));
        this.enemies.push(createEnemy(52 * TILE_SIZE, 9 * TILE_SIZE, ENEMY_TYPE.GOOMBA));
        this.enemies.push(createEnemy(58 * TILE_SIZE, 9 * TILE_SIZE, ENEMY_TYPE.FLYING_KOOPA));
        this.enemies.push(createEnemy(78 * TILE_SIZE, 7 * TILE_SIZE, ENEMY_TYPE.GOOMBA));
        this.enemies.push(createEnemy(85 * TILE_SIZE, 7 * TILE_SIZE, ENEMY_TYPE.KOOPA));
        this.enemies.push(createEnemy(95 * TILE_SIZE, 7 * TILE_SIZE, ENEMY_TYPE.GOOMBA));
        this.enemies.push(createEnemy(120 * TILE_SIZE, 9 * TILE_SIZE, ENEMY_TYPE.GOOMBA));
        this.enemies.push(createEnemy(125 * TILE_SIZE, 9 * TILE_SIZE, ENEMY_TYPE.GOOMBA));

        // 旗杆
        this.setTile(150, 2, TILE.FLAG, false);
        for (let y = 2; y < 14; y++) {
            this.tiles[y][150] = { type: TILE.FLAG, solid: false };
        }

        this.startX = 2 * TILE_SIZE;
        this.startY = 11 * TILE_SIZE;
        this.endX = 150 * TILE_SIZE;
    }

    // 初始化瓦片数组
    initTiles() {
        this.tiles = [];
        for (let y = 0; y < this.height; y++) {
            this.tiles[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.tiles[y][x] = { type: TILE.EMPTY, solid: false };
            }
        }
    }

    // 设置瓦片
    setTile(x, y, type, solid = false, data = {}) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.tiles[y][x] = { type, solid, ...data };
        }
    }

    // 设置管道
    setPipe(x, y, height) {
        for (let i = 0; i < height; i++) {
            const row = y + i;
            if (row < this.height) {
                this.tiles[row][x] = { type: TILE.PIPE_BODY_LEFT, solid: true };
                this.tiles[row][x + 1] = { type: TILE.PIPE_BODY_RIGHT, solid: true };
            }
        }
        // 顶部
        const topRow = y - 1;
        if (topRow >= 0) {
            this.tiles[topRow][x] = { type: TILE.PIPE_TOP_LEFT, solid: true };
            this.tiles[topRow][x + 1] = { type: TILE.PIPE_TOP_RIGHT, solid: true };
        }
    }

    // 设置城堡
    setCastle(x) {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 4; j++) {
                this.tiles[11 - j][x + i] = { type: TILE.CASTLE, solid: false };
            }
        }
    }

    // 添加云
    addCloud(x, y, size) {
        this.decorations.push({ type: 'cloud', x: x * TILE_SIZE, y: y * TILE_SIZE, size });
    }

    // 添加灌木
    addBush(x, y, size) {
        this.decorations.push({ type: 'bush', x: x * TILE_SIZE, y: y * TILE_SIZE, size });
    }

    // 添加山丘
    addHill(x, y, size) {
        this.decorations.push({ type: 'hill', x: x * TILE_SIZE, y: y * TILE_SIZE, size });
    }

    // 更新
    update(player, cameraX) {
        // 更新敌人
        this.enemies.forEach(enemy => {
            enemy.update(this.tiles, player, this.width * TILE_SIZE);
        });

        // 更新道具
        this.powerups.forEach(powerup => {
            powerup.update(this.tiles, this.width * TILE_SIZE);
        });

        // 更新砖块碎片
        updateBrickPieces(this.brickPieces);

        // 更新得分文字
        updateScoreTexts(this.scoreTexts);

        // 更新粒子
        particleSystem.update();

        // 检查玩家是否到达终点
        if (player.x >= this.endX) {
            return true; // 过关
        }

        return false;
    }

    // 处理砖块被顶
    hitBlock(row, col, playerState) {
        const tile = this.tiles[row][col];
        if (!tile) return;

        if (tile.type === TILE.QUESTION && !tile.used) {
            tile.used = true;
            if (tile.hasItem) {
                const powerup = createPowerup(col * TILE_SIZE + 8, row * TILE_SIZE, tile.itemType);
                this.powerups.push(powerup);

                if (tile.itemType === POWERUP_TYPE.COIN) {
                    return { type: 'coin' };
                }
            }
        }

        if (tile.type === TILE.BRICK && tile.breakable && playerState !== PLAYER_STATE.SMALL) {
            // 破碎砖块
            this.tiles[row][col] = { type: TILE.EMPTY, solid: false };
            this.brickPieces.push(...createBrickParticles(col * TILE_SIZE, row * TILE_SIZE));
            soundManager.brickBreak();
            return { type: 'break' };
        }

        return null;
    }

    // 绘制
    draw(ctx, cameraX, cameraY) {
        // 绘制背景装饰（云、山丘、灌木）
        this.decorations.forEach(dec => {
            if (!isInViewport(dec.x, dec.y, 64, 64, cameraX, cameraY)) return;

            switch (dec.type) {
                case 'cloud':
                    Sprites.drawCloud(ctx, dec.x - cameraX, dec.y - cameraY, dec.size);
                    break;
                case 'bush':
                    Sprites.drawBush(ctx, dec.x - cameraX, dec.y - cameraY, dec.size);
                    break;
                case 'hill':
                    Sprites.drawHill(ctx, dec.x - cameraX, dec.y - cameraY, dec.size);
                    break;
            }
        });

        // 绘制瓦片
        const startCol = Math.floor(cameraX / TILE_SIZE);
        const endCol = startCol + Math.ceil(CANVAS_WIDTH / TILE_SIZE) + 1;

        for (let row = 0; row < this.height; row++) {
            for (let col = startCol; col <= endCol && col < this.width; col++) {
                const tile = this.tiles[row][col];
                if (!tile || tile.type === TILE.EMPTY) continue;

                const x = col * TILE_SIZE - cameraX;
                const y = row * TILE_SIZE - cameraY;

                switch (tile.type) {
                    case TILE.GROUND:
                        Sprites.drawGround(ctx, x, y);
                        break;
                    case TILE.BRICK:
                        Sprites.drawBrick(ctx, x, y);
                        break;
                    case TILE.QUESTION:
                    case TILE.QUESTION_USED:
                        Sprites.drawQuestionBlock(ctx, x, y, Math.floor(Date.now() / 500), tile.used);
                        break;
                    case TILE.PIPE_TOP_LEFT:
                    case TILE.PIPE_TOP_RIGHT:
                    case TILE.PIPE_BODY_LEFT:
                    case TILE.PIPE_BODY_RIGHT:
                        // 管道在setPipe时处理
                        break;
                    case TILE.FLAG:
                        Sprites.drawFlag(ctx, x, y, 12 * TILE_SIZE);
                        break;
                    case TILE.CASTLE:
                        Sprites.drawCastle(ctx, x, y);
                        break;
                    case TILE.LAVA:
                        Sprites.drawLava(ctx, x, y, Math.floor(Date.now() / 100));
                        break;
                    case TILE.COIN:
                        Sprites.drawCoin(ctx, x, y, Math.floor(Date.now() / 100));
                        break;
                    case TILE.PLATFORM:
                        ctx.fillStyle = '#8b4513';
                        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE / 2);
                        break;
                }
            }
        }

        // 绘制管道（特殊处理）
        this.drawPipes(ctx, cameraX, cameraY);

        // 绘制敌人
        this.enemies.forEach(enemy => {
            enemy.draw(ctx, cameraX, cameraY);
        });

        // 绘制道具
        this.powerups.forEach(powerup => {
            powerup.draw(ctx, cameraX, cameraY);
        });

        // 绘制砖块碎片
        drawBrickPieces(ctx, this.brickPieces, cameraX, cameraY);

        // 绘制得分文字
        drawScoreTexts(ctx, this.scoreTexts, cameraX, cameraY);

        // 绘制粒子
        particleSystem.draw(ctx, cameraX, cameraY);
    }

    // 绘制管道
    drawPipes(ctx, cameraX, cameraY) {
        // 找到所有管道并绘制
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                const tile = this.tiles[row][col];
                if (tile && tile.type === TILE.PIPE_TOP_LEFT) {
                    // 计算管道高度
                    let height = TILE_SIZE;
                    let checkRow = row + 1;
                    while (checkRow < this.height &&
                           this.tiles[checkRow][col] &&
                           this.tiles[checkRow][col].type === TILE.PIPE_BODY_LEFT) {
                        height += TILE_SIZE;
                        checkRow++;
                    }

                    const x = col * TILE_SIZE - cameraX;
                    const y = row * TILE_SIZE - cameraY;
                    Sprites.drawPipe(ctx, x, y, height);
                }
            }
        }
    }
}
