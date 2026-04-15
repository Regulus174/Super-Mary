// 排行榜系统

class Leaderboard {
    constructor() {
        this.storageKey = 'superMario_leaderboard';
        this.maxEntries = 10;
        this.entries = this.load();
    }

    // 加载排行榜
    load() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (data) {
                return JSON.parse(data);
            }
        } catch (e) {
            console.log('Failed to load leaderboard:', e);
        }
        return [];
    }

    // 保存排行榜
    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.entries));
        } catch (e) {
            console.log('Failed to save leaderboard:', e);
        }
    }

    // 添加新记录
    addScore(name, score, level) {
        const entry = {
            name: name || '匿名',
            score: score,
            level: level,
            date: new Date().toLocaleDateString('zh-CN')
        };

        this.entries.push(entry);

        // 按分数排序
        this.entries.sort((a, b) => b.score - a.score);

        // 只保留前10名
        if (this.entries.length > this.maxEntries) {
            this.entries = this.entries.slice(0, this.maxEntries);
        }

        this.save();

        // 返回排名（1-based）
        return this.entries.findIndex(e => e === entry) + 1;
    }

    // 检查是否是新纪录
    isNewHighScore(score) {
        if (this.entries.length < this.maxEntries) return true;
        return score > this.entries[this.entries.length - 1].score;
    }

    // 获取排名
    getRank(score) {
        for (let i = 0; i < this.entries.length; i++) {
            if (score >= this.entries[i].score) {
                return i + 1;
            }
        }
        return this.entries.length + 1;
    }

    // 获取所有记录
    getEntries() {
        return this.entries;
    }

    // 清空排行榜
    clear() {
        this.entries = [];
        this.save();
    }

    // 渲染排行榜到HTML
    renderToContainer(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (this.entries.length === 0) {
            container.innerHTML = '<p style="color: #fff; text-align: center;">暂无记录</p>';
            return;
        }

        let html = '';
        this.entries.forEach((entry, index) => {
            let className = 'leaderboard-entry';
            if (index === 0) className += ' gold';
            else if (index === 1) className += ' silver';
            else if (index === 2) className += ' bronze';

            html += `
                <div class="${className}">
                    <span>#${index + 1} ${entry.name}</span>
                    <span>${entry.score}</span>
                </div>
            `;
        });

        container.innerHTML = html;
    }
}

// 全局排行榜实例
const leaderboard = new Leaderboard();
