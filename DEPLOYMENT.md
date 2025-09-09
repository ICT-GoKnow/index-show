# 🚀 部署指南

## 方案一：GitHub Pages（推荐）

### 1. 创建GitHub仓库
```bash
# 在GitHub上创建新仓库
# 仓库名建议：research-group-website 或 knowledge-computing-group

# 克隆到本地
git clone https://github.com/yourusername/research-group-website.git
cd research-group-website

# 复制网站文件到仓库
cp -r research-group-website/* .
```

### 2. 配置GitHub Pages
1. 进入仓库设置 (Settings)
2. 找到 "Pages" 部分
3. 选择 "GitHub Actions" 作为部署源
4. 网站将自动部署到 `https://yourusername.github.io/research-group-website`

### 3. 自定义域名（可选）
1. 在仓库根目录创建 `CNAME` 文件
2. 添加您的域名：`your-domain.com`
3. 在域名提供商处添加CNAME记录指向 `yourusername.github.io`

## 方案二：Netlify（推荐）

### 1. 连接GitHub仓库
1. 访问 [Netlify](https://netlify.com)
2. 点击 "New site from Git"
3. 选择您的GitHub仓库
4. 配置构建设置：
   - Build command: `echo "No build needed"`
   - Publish directory: `.`

### 2. 自动部署
- 每次推送到main分支都会自动部署
- 支持预览部署（Pull Request）
- 自动HTTPS证书

## 方案三：Vercel

### 1. 部署
```bash
# 安装Vercel CLI
npm i -g vercel

# 在项目目录中部署
vercel

# 生产部署
vercel --prod
```

## 🔧 项目管理集成

### 1. 导入现有GitHub项目

#### 方法A：批量导入
```bash
# 导入您的所有GitHub项目
node scripts/import-github-projects.js your-github-username
```

#### 方法B：手动添加
```bash
# 交互式添加单个项目
node scripts/add-project.js
```

#### 方法C：直接编辑配置文件
编辑 `data/projects.json` 文件，添加项目信息。

### 2. 项目配置示例

```json
{
  "id": "my-awesome-project",
  "title": "My Awesome Project",
  "description": "这是一个很棒的项目",
  "category": "research",
  "status": "active",
  "github_url": "https://github.com/yourusername/my-awesome-project",
  "paper_url": "https://arxiv.org/abs/2024.xxxxx",
  "demo_url": "https://yourusername.github.io/my-awesome-project",
  "technologies": ["Python", "PyTorch", "React"],
  "year": 2024,
  "authors": ["张三", "李四"],
  "conference": "ICML 2024",
  "stars": 100,
  "forks": 20
}
```

### 3. 项目分类说明

- **research**: 研究项目（论文、算法、模型）
- **framework**: 框架工具（库、工具包、平台）
- **application**: 应用系统（产品、服务、应用）

## 📊 自动化功能

### 1. GitHub统计自动更新
网站会自动显示：
- GitHub Stars数量
- Forks数量
- 最后更新时间

### 2. 项目状态管理
- 自动检测项目活跃度
- 支持项目归档
- 状态变更提醒

### 3. 内容同步
- 与GitHub仓库同步
- 自动更新项目信息
- 支持批量操作

## 🔗 集成现有项目的最佳实践

### 1. 项目组织建议
```
your-github-username/
├── research-group-website/     # 主网站
├── knowledge-graph-reasoning/  # 研究项目1
├── nlp-knowledge-enhanced/     # 研究项目2
├── big-data-extraction/        # 研究项目3
└── knowledge-computing-lib/    # 框架工具
```

### 2. 命名规范
- 项目ID使用小写字母和连字符
- 仓库名使用小写字母和连字符
- 保持一致的命名风格

### 3. 文档要求
每个项目应包含：
- README.md（项目说明）
- LICENSE（许可证）
- 示例代码
- API文档（如果是框架）

## 🎨 自定义配置

### 1. 修改主题
编辑 `css/style.css`：
```css
:root {
  --primary-color: #3498db;    /* 主色调 */
  --secondary-color: #2c3e50;  /* 次要色调 */
  --accent-color: #e74c3c;     /* 强调色 */
}
```

### 2. 添加新页面
1. 创建HTML文件
2. 在导航栏添加链接
3. 更新JavaScript路由

### 3. 修改内容
- 编辑对应的HTML文件
- 更新JSON配置文件
- 重新部署

## 📱 移动端优化

网站已包含响应式设计：
- 移动端友好的导航
- 触摸优化的交互
- 自适应布局

## 🔒 安全考虑

### 1. 内容安全
- 所有外部链接使用 `target="_blank"`
- 输入验证和过滤
- XSS防护

### 2. 隐私保护
- 不收集用户数据
- 使用HTTPS
- 符合GDPR要求

## 📈 性能优化

### 1. 加载速度
- 图片优化
- CSS/JS压缩
- CDN加速

### 2. SEO优化
- 语义化HTML
- Meta标签优化
- 结构化数据

## 🛠️ 维护和更新

### 1. 定期更新
- 项目信息更新
- 技术栈升级
- 内容刷新

### 2. 备份策略
- Git版本控制
- 定期备份
- 多平台部署

### 3. 监控
- 网站可用性监控
- 性能监控
- 错误日志

## 📞 技术支持

如有问题，请：
1. 查看GitHub Issues
2. 联系研究组邮箱
3. 提交Pull Request

---

**祝您部署成功！** 🎉

