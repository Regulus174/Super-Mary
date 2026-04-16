// 游戏入口

let game;

// 页面加载完成后初始化游戏
window.addEventListener('load', () => {
    game = new Game();
    game.start();

    // 添加触摸支持提示（可选）
    console.log('超级玛丽游戏已加载!');
    console.log('操作说明:');
    console.log('- 方向键/WASD: 移动');
    console.log('- 空格/Z/W: 跳跃');
    console.log('- X: 发射火球');
    console.log('- P/ESC: 暂停');
});

// 防止页面滚动
window.addEventListener('keydown', (e) => {
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
    }
});

// 窗口失焦时暂停
window.addEventListener('blur', () => {
    if (game && game.state === GAME_STATE.PLAYING) {
        game.pauseGame();
    }
});
