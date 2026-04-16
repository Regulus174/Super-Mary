# 超级玛丽网页游戏

一个经典的超级玛丽风格单人闯关网页游戏，使用纯前端技术实现，可部署到任何静态网站托管服务。

## 游戏特点

- 3个精心设计的关卡（草原世界、地下世界、城堡世界）
- 完整的道具系统（蘑菇、火花、无敌星、金币）
- 多种敌人类型（蘑菇怪、乌龟、飞行乌龟、Boss库巴）
- 像素风格美术，使用Canvas绘制
- 音效系统（Web Audio API）
- 本地排行榜
- 响应式设计

## 操作说明

| 按键 | 功能 |
|------|------|
| ← → / A D | 移动 |
| 空格 / Z / W | 跳跃 |
| X | 发射火球（火焰马里奥状态） |
| P / ESC | 暂停 |
| Enter | 确认 |

## 道具说明

| 道具 | 效果 |
|------|------|
| 🔴 蘑菇 | 变大，可顶碎砖块 |
| 🌸 火花 | 获得发射火球能力 |
| ⭐ 星星 | 短暂无敌，碰触敌人可消灭 |
| 🪙 金币 | 收集100个获得额外生命 |

## 运行方式

### 方式一：直接打开
双击 `index.html` 文件在浏览器中打开即可游玩。

### 方式二：本地服务器
```bash
# Python
python -m http.server 8080

# Node.js
npx serve
```
然后访问 http://localhost:8080

## 部署

可将整个 `super-mario-game` 文件夹部署到以下平台：

- **GitHub Pages**: 推送到仓库，在设置中启用Pages
- **Vercel**: 拖拽文件夹到vercel.com
- **Netlify**: 拖拽文件夹到netlify.com

## 技术栈

- HTML5 Canvas
- JavaScript (ES6+)
- Web Audio API
- localStorage

## 项目结构

```
super-mario-game/
├── index.html           # 主页面
├── css/
│   └── style.css        # 游戏样式
├── js/
│   ├── main.js          # 游戏入口
│   ├── game.js          # 游戏主循环
│   ├── player.js        # 玩家角色
│   ├── enemy.js         # 敌人类
│   ├── level.js         # 关卡系统
│   ├── collision.js     # 碰撞检测
│   ├── physics.js       # 物理引擎
│   ├── powerup.js       # 道具系统
│   ├── sound.js         # 音效管理
│   ├── sprites.js       # 精灵绘制
│   ├── particle.js      # 粒子效果
│   ├── ui.js            # 界面渲染
│   ├── leaderboard.js   # 排行榜
│   ├── constants.js     # 常量定义
│   └── utils.js         # 工具函数
└── README.md            # 项目说明
```

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License
