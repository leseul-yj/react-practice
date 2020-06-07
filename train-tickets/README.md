## 改造create-react-app 创建的项目
1. npx create-react-app train-tickets
2. 删除src目录下除了serviceWorker.js的文件 ls | grep -v serviceWorker.js| xargs rm
3. 创建四个目录文件 
+ mkdir index
+ touch index.js App.css App.jsx reducers.js action.js store.js

4. 初始化index目录下的文件
5. 将index文件夹内容复制三份 cp -r index query
6. 将public目录下的index.html也复制三份 分别为 tickets.html
7. 运行npm run eject 报错  需要把新创建的文件夹提交到仓库中

### 8.1 数据结构与模块设计
+ React 视觉组件拆分
1. 顶部导航栏 公共组件 --> Header
2. 始发站 终到站 首页组件--> Journey
3. 日期选择 首页组件 -> departDate
4. 只看高铁动车 首页组件 ->highSpeedRail
5. 提交按钮 首页组件 ->submit
+ redux store状态设计
+ redux action/reducer 设计


