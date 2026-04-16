// 游戏常量定义
const TILE_SIZE = 32;
const GRAVITY = 0.25;
const MAX_FALL_SPEED = 10;

// Canvas 尺寸
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

// 玩家常量
const PLAYER_SPEED = 2.5;
const PLAYER_JUMP_FORCE = -8;
const PLAYER_MAX_SPEED = 5;

// 游戏状态
const GAME_STATE = {
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    LEVEL_TRANSITION: 'level_transition',
    GAME_OVER: 'game_over',
    VICTORY: 'victory'
};

// 玩家状态
const PLAYER_STATE = {
    SMALL: 'small',
    BIG: 'big',
    FIRE: 'fire'
};

// 瓦片类型
const TILE = {
    EMPTY: 0,
    GROUND: 1,
    BRICK: 2,
    QUESTION: 3,
    QUESTION_USED: 4,
    PIPE_TOP_LEFT: 5,
    PIPE_TOP_RIGHT: 6,
    PIPE_BODY_LEFT: 7,
    PIPE_BODY_RIGHT: 8,
    COIN: 9,
    PLATFORM: 10,
    FLAG: 11,
    CASTLE: 12,
    LAVA: 13,
    SPIKE: 14
};

// 敌人类型
const ENEMY_TYPE = {
    GOOMBA: 'goomba',
    KOOPA: 'koopa',
    FLYING_KOOPA: 'flying_koopa',
    BOWSER: 'bowser'
};

// 道具类型
const POWERUP_TYPE = {
    MUSHROOM: 'mushroom',
    FIRE_FLOWER: 'fire_flower',
    STAR: 'star',
    COIN: 'coin'
};

// 颜色定义
const COLORS = {
    // 天空
    SKY: '#5c94fc',

    // 玩家
    MARIO_RED: '#e52521',
    MARIO_SKIN: '#fca044',
    MARIO_BROWN: '#6b4c2e',

    // 敌人
    GOOMBA_BROWN: '#a0522d',
    GOOMBA_TAN: '#d2b48c',
    KOOPA_GREEN: '#43b047',
    KOOPA_YELLOW: '#fbd000',

    // 道具
    MUSHROOM_RED: '#e52521',
    MUSHROOM_WHITE: '#ffffff',
    FIRE_FLOWER_RED: '#ff6b6b',
    FIRE_FLOWER_YELLOW: '#fbd000',
    STAR_YELLOW: '#fbd000',
    COIN_YELLOW: '#fbd000',

    // 地形
    BRICK_RED: '#c84c0c',
    BRICK_DARK: '#9c4a0c',
    GROUND_BROWN: '#8b4513',
    GROUND_TAN: '#d2b48c',
    QUESTION_YELLOW: '#fbd000',
    QUESTION_BROWN: '#8b4513',
    PIPE_GREEN: '#43b047',
    PIPE_DARK: '#2d7a32',

    // 其他
    LAVA_RED: '#ff4500',
    LAVA_ORANGE: '#ff6b00',
    WHITE: '#ffffff',
    BLACK: '#000000',
    CLOUD_WHITE: '#ffffff'
};

// 分数
const SCORE = {
    GOOMBA: 100,
    KOOPA: 100,
    COIN: 200,
    MUSHROOM: 1000,
    FIRE_FLOWER: 1000,
    STAR: 1000,
    TIME_BONUS: 50
};

// 关卡时间（秒）
const LEVEL_TIME = 400;

// 玩家初始生命
const INITIAL_LIVES = 3;
