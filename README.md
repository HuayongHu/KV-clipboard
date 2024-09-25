# web端云剪切板项目搭建指南

## 项目概述

本项目是一个云剪切板服务，允许用户将文本保存到云端，并在任何地方访问。项目包含前端的HTML/CSS/JavaScript代码和后端的Cloudflare Workers代码。

## 搭建步骤

### 前端设置

1. 下载或克隆项目代码到本地。
2. 打开`index.html`文件，确保所有路径正确无误。

### 后端设置

#### 部署Cloudflare Workers

1. 如果你还没有Cloudflare账户，请先注册一个。
2. 登录到Cloudflare控制台。
3. 在左侧菜单选择`Workers` > `Overview`。
4. 点击`Create a Worker`。

#### 上传Workers代码

1. 打开项目中的`Workers代码`文件夹。
2. 将worker.js文件内容复制到Cloudflare Workers编辑器中。
3. 保存并部署Worker。

#### 创建KV命名空间

1. 在Cloudflare控制台中，选择`Storage` > `KV Namespaces`。
2. 点击`Create namespace`。
3. 输入名称，例如`clipboard-data`，然后点击`Create`。

#### 将KV与Workers连接

1. 在部署的Worker详情页面，找到`Variables`部分。
2. 点击`Add Variable`。
3. 设置变量名，即`MY_KV_NAMESPACE`，在值字段中输入你的KV命名空间ID。
4. 保存变量。

#### 配置路由

1. 在Worker详情页面，找到`Routes`部分。
2. 设置路由，例如`yourdomain.com/*`，以匹配所有请求。
3. 保存路由设置。

### 测试服务

1. 在浏览器中访问你的Worker路由，例如`https://yourdomain.com`。
2. 尝试使用前端界面保存和加载文本。

## 常见问题解答

- **如何更新Workers代码？**
  回到Cloudflare Workers编辑器，修改代码后保存并重新部署。

- **如何查看KV存储中的数据？**
  在Cloudflare控制台中，选择`Storage` > `KV Namespaces`，然后点击你的命名空间旁边的`Manage`。

## 支持与贡献

本项目欢迎任何形式的贡献。如果你遇到问题或有改进建议，请提交一个issue或直接发起pull request。

---

感谢使用云剪切板服务！
