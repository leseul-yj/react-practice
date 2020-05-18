## 改造create-react-app 创建的项目
1. npx create-react-app train-tickets
2. 删除src目录下除了serviceWorker.js的文件 ls | grep -v serviceWorker.js| xargs rm
3. 创建四个目录文件 
+ mkdir index
+ touch index.js App.css App.jsx reducers.js action.js store.js

4. 初始化index目录下的文件
5. 将index文件夹内容复制三份 cp -r index query
6. 将public目录下的index.html也复制三份 分别为 tickets.html