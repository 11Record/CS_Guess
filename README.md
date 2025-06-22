# 🎮“弗一把”选手猜测游戏项目

## 🌟项目简介
“弗一把”是一个基于Vue 3构建的选手猜测游戏。玩家需要在十次机会内猜出预设的谜底选手。每次猜测后，游戏会根据选手的出生日期、国籍、战队和位置给出提示，帮助玩家缩小猜测范围。游戏结束后，玩家可以选择重置游戏再次挑战。

## ✨功能特性
- **选手筛选** 🎯 ：在输入框输入选手名字，可实时筛选出匹配的选手列表。
- **提示机制** 💡 ：每次猜测后，显示出生日期、国籍、战队和位置的比较结果，以颜色（绿色、黄色、红色）提示与谜底选手的匹配程度。
- **猜测记录** 📝 ：记录每次猜测的结果和提示信息，方便玩家回顾和分析。
- **游戏重置** 🔄 ：游戏结束后，可点击按钮重置游戏，重新开始挑战。

## 📁项目结构
```
cs/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── src/
│ ├── App.vue
│ ├── main.js
│ ├── assets/
│ │ └── style.css
│ └── players.js
```

## ⚙️安装与运行
### 1. 克隆项目
```
git clone <项目仓库地址>
cd <项目目录>
```
### 2. 安装依赖
```
npm install
```
### 3. 启动开发服务器
```
npm run serve
```

打开浏览器，访问 ```http://localhost:5173``` 即可开始游戏。


##  💻 代码说明
### 核心文件
* ```index.html```：项目的入口 HTML 文件，引入了样式表和主 JavaScript 文件。
* ```src/main.js```：创建 Vue 应用实例，并挂载到 DOM 上。
* ```src/App.vue```：游戏的主组件，包含游戏逻辑和界面布局。
* ```src/assets/style.css```：全局样式文件，定义了页面的基本样式。
* ```src/players.js```：存储选手信息的文件，包含选手的名字、出生日期、国籍、位置和战队。

### 主要函数
* ```filterPlayers```：根据输入框的值过滤选手列表。
* ```compareBirthDate```：比较两个选手的出生日期，返回颜色提示。
* ```compareNationality```：比较两个选手的国籍，返回颜色提示。
* ```compareTeam```：比较两个选手的战队，返回颜色提示。
* ```comparePosition```：比较两个选手的位置，返回颜色提示。
* ```selectPlayer```：选择选手并进行猜测，记录猜测结果和提示信息。
* ```resetGame```：重置游戏，清空输入框和猜测记录，重新选择谜底选手。
* ```selectSecretPlayer```：随机选择一个谜底选手。

##  🤝 贡献指南
如果你想为这个项目做出贡献，请遵循以下步骤：

1. Fork 这个仓库。
2. 创建一个新的分支：```git checkout -b feature/your-feature```。
3. 提交你的更改：```git commit -m 'Add some feature'```。
4. 推送到分支：```git push origin feature/your-feature```。
5. 提交 ```Pull Request```。

## 许可证
本项目采用 ```MIT``` 许可证。详情请参阅 ```package.json``` 文件。
