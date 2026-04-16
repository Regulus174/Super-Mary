// 音效系统 - 使用 Web Audio API 生成像素风格音效

class SoundManager {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.masterVolume = 0.3;
        this.initialized = false;
    }

    // 初始化音频上下文（需要用户交互后调用）
    init() {
        if (this.initialized) return;
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
        } catch (e) {
            console.log('Web Audio API not supported');
            this.enabled = false;
        }
    }

    // 创建音效
    createSound(frequency, duration, type = 'square', volume = this.masterVolume) {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

        gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    // 跳跃音效
    jump() {
        if (!this.enabled) return;
        this.createSound(400, 0.1, 'square');
        setTimeout(() => this.createSound(600, 0.1, 'square'), 50);
    }

    // 吃金币音效
    coin() {
        if (!this.enabled) return;
        this.createSound(988, 0.1, 'square');
        setTimeout(() => this.createSound(1319, 0.15, 'square'), 100);
    }

    // 吃道具音效
    powerup() {
        if (!this.enabled) return;
        const notes = [523, 659, 784, 1047];
        notes.forEach((note, i) => {
            setTimeout(() => this.createSound(note, 0.15, 'square'), i * 80);
        });
    }

    // 敌人死亡音效
    enemyDeath() {
        if (!this.enabled) return;
        this.createSound(400, 0.1, 'square');
        this.createSound(200, 0.2, 'square');
    }

    // 玩家受伤音效
    playerHurt() {
        if (!this.enabled) return;
        this.createSound(200, 0.1, 'sawtooth');
        setTimeout(() => this.createSound(150, 0.1, 'sawtooth'), 100);
        setTimeout(() => this.createSound(100, 0.15, 'sawtooth'), 200);
    }

    // 玩家死亡音效
    playerDeath() {
        if (!this.enabled) return;
        const notes = [494, 466, 440, 392, 370, 330, 294, 262];
        notes.forEach((note, i) => {
            setTimeout(() => this.createSound(note, 0.2, 'square', 0.2), i * 100);
        });
    }

    // 过关音效
    levelComplete() {
        if (!this.enabled) return;
        const melody = [659, 659, 659, 523, 659, 784, 392];
        melody.forEach((note, i) => {
            setTimeout(() => this.createSound(note, 0.15, 'square'), i * 100);
        });
    }

    // 游戏结束音效
    gameOver() {
        if (!this.enabled) return;
        const notes = [392, 330, 262, 196];
        notes.forEach((note, i) => {
            setTimeout(() => this.createSound(note, 0.3, 'square', 0.2), i * 200);
        });
    }

    // 菜单选择音效
    menuSelect() {
        if (!this.enabled) return;
        this.createSound(523, 0.1, 'square');
    }

    // 菜单确认音效
    menuConfirm() {
        if (!this.enabled) return;
        this.createSound(659, 0.1, 'square');
        setTimeout(() => this.createSound(784, 0.15, 'square'), 80);
    }

    // 暂停音效
    pause() {
        if (!this.enabled) return;
        this.createSound(440, 0.15, 'square');
        setTimeout(() => this.createSound(330, 0.15, 'square'), 100);
    }

    // 火球发射音效
    fireball() {
        if (!this.enabled) return;
        this.createSound(600, 0.05, 'square');
        this.createSound(800, 0.05, 'square');
    }

    // 砖块破碎音效
    brickBreak() {
        if (!this.enabled) return;
        this.createSound(200, 0.1, 'sawtooth');
        setTimeout(() => this.createSound(300, 0.1, 'sawtooth'), 50);
    }

    // 弹跳音效（弹簧/龟壳）
    bounce() {
        if (!this.enabled) return;
        this.createSound(300, 0.1, 'square');
        setTimeout(() => this.createSound(400, 0.1, 'square'), 50);
    }

    // 无敌星音效
    star() {
        if (!this.enabled) return;
        const notes = [659, 784, 988, 784, 659, 523, 659, 784];
        notes.forEach((note, i) => {
            setTimeout(() => this.createSound(note, 0.1, 'square'), i * 80);
        });
    }

    // 背景音乐节拍（简化版）
    bgMusicBeat() {
        if (!this.enabled) return;
        this.createSound(131, 0.05, 'square', 0.1);
    }

    // 切换音效
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // 设置音量
    setVolume(volume) {
        this.masterVolume = clamp(volume, 0, 1);
    }
}

// 全局音效管理器
const soundManager = new SoundManager();
