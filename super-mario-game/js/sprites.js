// 精灵绘制系统 - 像素风格

const Sprites = {
    // 绘制小马里奥
    drawMarioSmall(ctx, x, y, direction, frame, state = 'normal') {
        ctx.save();
        if (direction === -1) {
            ctx.translate(x + 16, y);
            ctx.scale(-1, 1);
            x = 0;
            y = 0;
        }

        // 帽子
        ctx.fillStyle = COLORS.MARIO_RED;
        ctx.fillRect(x + 3, y, 10, 3);
        ctx.fillRect(x + 1, y + 3, 14, 3);

        // 脸
        ctx.fillStyle = COLORS.MARIO_SKIN;
        ctx.fillRect(x + 1, y + 6, 14, 5);
        ctx.fillRect(x + 2, y + 11, 4, 2);
        ctx.fillRect(x + 10, y + 11, 4, 2);

        // 眼睛
        ctx.fillStyle = COLORS.BLACK;
        ctx.fillRect(x + 10, y + 7, 2, 2);

        // 胡子
        ctx.fillStyle = COLORS.MARIO_BROWN;
        ctx.fillRect(x + 8, y + 10, 5, 2);

        // 身体
        ctx.fillStyle = COLORS.MARIO_RED;
        ctx.fillRect(x + 2, y + 13, 12, 6);

        // 背带裤
        ctx.fillStyle = COLORS.MARIO_BROWN;
        ctx.fillRect(x + 4, y + 16, 8, 3);
        ctx.fillStyle = COLORS.MARIO_SKIN;
        ctx.fillRect(x + 3, y + 19, 10, 3);

        // 腿（根据帧动画）
        ctx.fillStyle = COLORS.MARIO_BROWN;
        if (frame === 0) {
            ctx.fillRect(x + 2, y + 22, 4, 6);
            ctx.fillRect(x + 10, y + 22, 4, 6);
        } else if (frame === 1) {
            ctx.fillRect(x + 1, y + 22, 4, 6);
            ctx.fillRect(x + 11, y + 22, 4, 6);
        } else {
            ctx.fillRect(x + 3, y + 22, 4, 6);
            ctx.fillRect(x + 9, y + 22, 4, 6);
        }

        ctx.restore();
    },

    // 绘制大马里奥
    drawMarioBig(ctx, x, y, direction, frame, state = 'normal') {
        ctx.save();
        if (direction === -1) {
            ctx.translate(x + 28, y);
            ctx.scale(-1, 1);
            x = 0;
            y = 0;
        }

        // 帽子
        ctx.fillStyle = COLORS.MARIO_RED;
        ctx.fillRect(x + 6, y, 16, 4);
        ctx.fillRect(x + 2, y + 4, 24, 4);

        // 脸
        ctx.fillStyle = COLORS.MARIO_SKIN;
        ctx.fillRect(x + 2, y + 8, 24, 8);
        ctx.fillRect(x + 4, y + 16, 8, 4);
        ctx.fillRect(x + 18, y + 16, 8, 4);

        // 眼睛
        ctx.fillStyle = COLORS.BLACK;
        ctx.fillRect(x + 18, y + 10, 4, 4);

        // 胡子
        ctx.fillStyle = COLORS.MARIO_BROWN;
        ctx.fillRect(x + 14, y + 16, 10, 3);

        // 身体
        ctx.fillStyle = COLORS.MARIO_RED;
        ctx.fillRect(x + 4, y + 20, 20, 10);

        // 背带裤
        ctx.fillStyle = COLORS.MARIO_BROWN;
        ctx.fillRect(x + 6, y + 25, 16, 5);
        ctx.fillStyle = COLORS.MARIO_SKIN;
        ctx.fillRect(x + 5, y + 30, 18, 4);

        // 腿
        ctx.fillStyle = COLORS.MARIO_BROWN;
        if (frame === 0) {
            ctx.fillRect(x + 4, y + 34, 6, 10);
            ctx.fillRect(x + 18, y + 34, 6, 10);
        } else if (frame === 1) {
            ctx.fillRect(x + 2, y + 34, 6, 10);
            ctx.fillRect(x + 20, y + 34, 6, 10);
        } else {
            ctx.fillRect(x + 6, y + 34, 6, 10);
            ctx.fillRect(x + 16, y + 34, 6, 10);
        }

        ctx.restore();
    },

    // 绘制火焰马里奥
    drawMarioFire(ctx, x, y, direction, frame, state = 'normal') {
        ctx.save();
        if (direction === -1) {
            ctx.translate(x + 28, y);
            ctx.scale(-1, 1);
            x = 0;
            y = 0;
        }

        // 帽子（白色）
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 6, y, 16, 4);
        ctx.fillRect(x + 2, y + 4, 24, 4);

        // 脸
        ctx.fillStyle = COLORS.MARIO_SKIN;
        ctx.fillRect(x + 2, y + 8, 24, 8);
        ctx.fillRect(x + 4, y + 16, 8, 4);
        ctx.fillRect(x + 18, y + 16, 8, 4);

        // 眼睛
        ctx.fillStyle = COLORS.BLACK;
        ctx.fillRect(x + 18, y + 10, 4, 4);

        // 胡子
        ctx.fillStyle = COLORS.MARIO_BROWN;
        ctx.fillRect(x + 14, y + 16, 10, 3);

        // 身体（红色）
        ctx.fillStyle = '#e52521';
        ctx.fillRect(x + 4, y + 20, 20, 10);

        // 背带裤（红色）
        ctx.fillStyle = '#c41e1a';
        ctx.fillRect(x + 6, y + 25, 16, 5);
        ctx.fillStyle = COLORS.MARIO_SKIN;
        ctx.fillRect(x + 5, y + 30, 18, 4);

        // 腿
        ctx.fillStyle = '#c41e1a';
        if (frame === 0) {
            ctx.fillRect(x + 4, y + 34, 6, 10);
            ctx.fillRect(x + 18, y + 34, 6, 10);
        } else if (frame === 1) {
            ctx.fillRect(x + 2, y + 34, 6, 10);
            ctx.fillRect(x + 20, y + 34, 6, 10);
        } else {
            ctx.fillRect(x + 6, y + 34, 6, 10);
            ctx.fillRect(x + 16, y + 34, 6, 10);
        }

        ctx.restore();
    },

    // 绘制蘑菇怪
    drawGoomba(ctx, x, y, frame) {
        // 身体
        ctx.fillStyle = COLORS.GOOMBA_BROWN;
        ctx.fillRect(x + 2, y + 0, 12, 8);
        ctx.fillRect(x + 0, y + 8, 16, 8);

        // 眼睛
        ctx.fillStyle = COLORS.WHITE;
        ctx.fillRect(x + 2, y + 8, 5, 4);
        ctx.fillRect(x + 9, y + 8, 5, 4);
        ctx.fillStyle = COLORS.BLACK;
        ctx.fillRect(x + 4, y + 9, 2, 3);
        ctx.fillRect(x + 10, y + 9, 2, 3);

        // 脚
        ctx.fillStyle = COLORS.GOOMBA_TAN;
        if (frame === 0) {
            ctx.fillRect(x + 0, y + 16, 6, 4);
            ctx.fillRect(x + 10, y + 16, 6, 4);
        } else {
            ctx.fillRect(x + 2, y + 16, 5, 4);
            ctx.fillRect(x + 9, y + 16, 5, 4);
        }
    },

    // 绘制被踩扁的蘑菇怪
    drawGoombaSquashed(ctx, x, y) {
        ctx.fillStyle = COLORS.GOOMBA_BROWN;
        ctx.fillRect(x, y + 12, 16, 4);
        ctx.fillStyle = COLORS.GOOMBA_TAN;
        ctx.fillRect(x + 2, y + 16, 12, 2);
    },

    // 绘制乌龟
    drawKoopa(ctx, x, y, direction, frame) {
        ctx.save();
        if (direction === -1) {
            ctx.translate(x + 16, y);
            ctx.scale(-1, 1);
            x = 0;
            y = 0;
        }

        // 壳
        ctx.fillStyle = COLORS.KOOPA_GREEN;
        ctx.fillRect(x + 2, y + 8, 12, 14);

        // 头
        ctx.fillStyle = COLORS.KOOPA_GREEN;
        ctx.fillRect(x + 12, y + 2, 6, 8);

        // 眼睛
        ctx.fillStyle = COLORS.WHITE;
        ctx.fillRect(x + 14, y + 3, 4, 4);
        ctx.fillStyle = COLORS.BLACK;
        ctx.fillRect(x + 16, y + 4, 2, 2);

        // 脚
        ctx.fillStyle = COLORS.KOOPA_YELLOW;
        if (frame === 0) {
            ctx.fillRect(x + 2, y + 22, 4, 4);
            ctx.fillRect(x + 10, y + 22, 4, 4);
        } else {
            ctx.fillRect(x + 0, y + 22, 4, 4);
            ctx.fillRect(x + 12, y + 22, 4, 4);
        }

        ctx.restore();
    },

    // 绘制乌龟壳
    drawKoopaShell(ctx, x, y, moving = false) {
        ctx.fillStyle = COLORS.KOOPA_GREEN;
        ctx.fillRect(x + 0, y + 4, 16, 12);
        ctx.fillStyle = COLORS.KOOPA_YELLOW;
        ctx.fillRect(x + 4, y + 16, 8, 4);
        if (moving) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x + 2, y + 2, 3, 2);
        }
    },

    // 绘制蘑菇道具
    drawMushroom(ctx, x, y) {
        // 帽子
        ctx.fillStyle = COLORS.MUSHROOM_RED;
        ctx.fillRect(x + 2, y, 12, 4);
        ctx.fillRect(x + 0, y + 4, 16, 4);

        // 白点
        ctx.fillStyle = COLORS.MUSHROOM_WHITE;
        ctx.fillRect(x + 2, y + 2, 4, 3);
        ctx.fillRect(x + 10, y + 2, 4, 3);

        // 脸
        ctx.fillStyle = COLORS.MUSHROOM_WHITE;
        ctx.fillRect(x + 2, y + 8, 12, 6);

        // 眼睛
        ctx.fillStyle = COLORS.BLACK;
        ctx.fillRect(x + 4, y + 10, 2, 2);
        ctx.fillRect(x + 10, y + 10, 2, 2);
    },

    // 绘制火花道具
    drawFireFlower(ctx, x, y, frame) {
        // 茎
        ctx.fillStyle = '#43b047';
        ctx.fillRect(x + 6, y + 10, 4, 6);

        // 花瓣（动画）
        ctx.fillStyle = frame % 2 === 0 ? COLORS.FIRE_FLOWER_RED : COLORS.FIRE_FLOWER_YELLOW;
        ctx.fillRect(x + 4, y + 2, 8, 8);
        ctx.fillRect(x + 0, y + 4, 4, 4);
        ctx.fillRect(x + 12, y + 4, 4, 4);
        ctx.fillRect(x + 6, y + 0, 4, 4);

        // 中心
        ctx.fillStyle = COLORS.WHITE;
        ctx.fillRect(x + 6, y + 4, 4, 4);

        // 眼睛
        ctx.fillStyle = COLORS.BLACK;
        ctx.fillRect(x + 5, y + 5, 2, 2);
        ctx.fillRect(x + 9, y + 5, 2, 2);
    },

    // 绘制无敌星
    drawStar(ctx, x, y, frame) {
        ctx.fillStyle = frame % 2 === 0 ? COLORS.STAR_YELLOW : '#ffaa00';
        // 星星形状
        ctx.fillRect(x + 6, y + 0, 4, 4);
        ctx.fillRect(x + 4, y + 4, 8, 4);
        ctx.fillRect(x + 2, y + 8, 12, 4);
        ctx.fillRect(x + 0, y + 12, 4, 4);
        ctx.fillRect(x + 12, y + 12, 4, 4);

        // 眼睛
        ctx.fillStyle = COLORS.BLACK;
        ctx.fillRect(x + 4, y + 8, 2, 2);
        ctx.fillRect(x + 10, y + 8, 2, 2);
    },

    // 绘制金币
    drawCoin(ctx, x, y, frame) {
        ctx.fillStyle = COLORS.COIN_YELLOW;
        const width = [8, 10, 12, 10][frame % 4];
        const offset = (16 - width) / 2;
        ctx.fillRect(x + offset, y + 2, width, 12);
        ctx.fillStyle = '#daa520';
        ctx.fillRect(x + offset + width/2 - 1, y + 4, 2, 8);
    },

    // 绘制砖块
    drawBrick(ctx, x, y) {
        ctx.fillStyle = COLORS.BRICK_RED;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

        // 砖缝
        ctx.fillStyle = COLORS.BRICK_DARK;
        ctx.fillRect(x, y + 7, TILE_SIZE, 2);
        ctx.fillRect(x, y + 23, TILE_SIZE, 2);
        ctx.fillRect(x + 7, y, 2, 7);
        ctx.fillRect(x + 23, y, 2, 7);
        ctx.fillRect(x + 15, y + 9, 2, 14);
        ctx.fillRect(x + 7, y + 25, 2, 7);
        ctx.fillRect(x + 23, y + 25, 2, 7);
    },

    // 绘制问号砖块
    drawQuestionBlock(ctx, x, y, frame, used = false) {
        if (used) {
            ctx.fillStyle = COLORS.QUESTION_BROWN;
            ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = '#6b4423';
            ctx.fillRect(x + 4, y + 4, TILE_SIZE - 8, TILE_SIZE - 8);
        } else {
            ctx.fillStyle = frame % 2 === 0 ? COLORS.QUESTION_YELLOW : '#ffcc00';
            ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = '#daa520';
            ctx.fillRect(x + 4, y + 4, TILE_SIZE - 8, TILE_SIZE - 8);

            // 问号
            ctx.fillStyle = COLORS.WHITE;
            ctx.fillRect(x + 12, y + 6, 8, 4);
            ctx.fillRect(x + 16, y + 10, 4, 8);
            ctx.fillRect(x + 12, y + 18, 4, 4);
            ctx.fillRect(x + 12, y + 22, 4, 4);
        }
    },

    // 绘制地面
    drawGround(ctx, x, y) {
        ctx.fillStyle = COLORS.GROUND_BROWN;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

        // 纹理
        ctx.fillStyle = COLORS.GROUND_TAN;
        ctx.fillRect(x + 4, y + 4, 4, 4);
        ctx.fillRect(x + 20, y + 12, 6, 6);
        ctx.fillRect(x + 8, y + 22, 4, 4);
    },

    // 绘制管道
    drawPipe(ctx, x, y, height) {
        // 管道顶部
        ctx.fillStyle = COLORS.PIPE_GREEN;
        ctx.fillRect(x - 8, y, 48, 16);
        ctx.fillStyle = COLORS.PIPE_DARK;
        ctx.fillRect(x - 8, y + 12, 48, 4);

        // 管道主体
        ctx.fillStyle = COLORS.PIPE_GREEN;
        ctx.fillRect(x, y + 16, 32, height - 16);
        ctx.fillStyle = '#5fd45f';
        ctx.fillRect(x + 4, y + 16, 8, height - 16);
        ctx.fillStyle = COLORS.PIPE_DARK;
        ctx.fillRect(x + 20, y + 16, 8, height - 16);
    },

    // 绘制旗杆
    drawFlag(ctx, x, y, height) {
        // 杆子
        ctx.fillStyle = '#43b047';
        ctx.fillRect(x + 14, y, 4, height);

        // 旗帜
        ctx.fillStyle = COLORS.STAR_YELLOW;
        ctx.fillRect(x + 18, y, 24, 16);
        ctx.fillStyle = '#daa520';
        ctx.fillRect(x + 18, y + 6, 20, 4);

        // 顶部球
        ctx.fillStyle = COLORS.STAR_YELLOW;
        ctx.fillRect(x + 10, y - 8, 12, 10);
    },

    // 绘制城堡
    drawCastle(ctx, x, y) {
        ctx.fillStyle = '#8b4513';
        // 主体
        ctx.fillRect(x, y + 32, 64, 32);
        // 塔楼
        ctx.fillRect(x + 8, y + 16, 16, 16);
        ctx.fillRect(x + 40, y + 16, 16, 16);
        ctx.fillRect(x + 24, y, 16, 16);
        // 城垛
        ctx.fillStyle = '#6b3410';
        for (let i = 0; i < 8; i++) {
            ctx.fillRect(x + i * 8, y + 28, 6, 4);
        }
        // 门
        ctx.fillStyle = COLORS.BLACK;
        ctx.fillRect(x + 24, y + 48, 16, 16);
    },

    // 绘制岩浆
    drawLava(ctx, x, y, frame) {
        ctx.fillStyle = COLORS.LAVA_RED;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = COLORS.LAVA_ORANGE;
        const waveY = Math.sin((x + frame * 2) * 0.1) * 4;
        ctx.fillRect(x, y + waveY, TILE_SIZE, 8);
    },

    // 绘制云
    drawCloud(ctx, x, y, size = 1) {
        ctx.fillStyle = COLORS.CLOUD_WHITE;
        const s = size;
        ctx.fillRect(x + 8*s, y, 16*s, 8*s);
        ctx.fillRect(x, y + 8*s, 32*s, 8*s);
        ctx.fillRect(x + 4*s, y + 16*s, 24*s, 8*s);
    },

    // 绘制灌木
    drawBush(ctx, x, y, size = 1) {
        ctx.fillStyle = '#43b047';
        const s = size;
        ctx.fillRect(x + 4*s, y + 8*s, 8*s, 8*s);
        ctx.fillRect(x, y + 12*s, 16*s, 8*s);
        ctx.fillRect(x + 16*s, y + 8*s, 8*s, 8*s);
        ctx.fillRect(x + 12*s, y + 12*s, 16*s, 8*s);
    },

    // 绘制山丘
    drawHill(ctx, x, y, size = 1) {
        ctx.fillStyle = '#43b047';
        const s = size;
        ctx.fillRect(x + 16*s, y, 16*s, 8*s);
        ctx.fillRect(x + 8*s, y + 8*s, 32*s, 8*s);
        ctx.fillRect(x, y + 16*s, 48*s, 8*s);
    },

    // 绘制火球
    drawFireball(ctx, x, y, frame) {
        ctx.fillStyle = frame % 2 === 0 ? '#ff6b00' : '#ffff00';
        ctx.fillRect(x + 2, y, 8, 4);
        ctx.fillRect(x, y + 4, 12, 4);
        ctx.fillRect(x + 2, y + 8, 8, 4);
    }
};
