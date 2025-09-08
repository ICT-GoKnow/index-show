# 知识计算研究组网站

这是中国科学院计算技术研究所网络数据科学与技术重点实验室知识计算组的官方网站。

## 🚀 快速开始

### 本地运行
```bash
# 克隆仓库
git clone https://github.com/yourusername/research-group-website.git
cd research-group-website

# 启动本地服务器
python -m http.server 8000
# 或者使用Node.js
npx serve .

# 访问网站
open http://localhost:8000
```

### 部署到GitHub Pages
1. 将代码推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择"GitHub Actions"作为部署源
4. 网站将自动部署到 `https://yourusername.github.io/research-group-website`

## 📁 项目结构

```
research-group-website/
├── index.html              # 首页
├── research.html           # 研究领域页面
├── news.html              # 新闻页面
├── events.html            # 活动页面
├── projects.html          # 项目页面
├── people.html            # 团队成员页面
├── contact.html           # 联系我们页面
├── css/
│   └── style.css          # 样式文件
├── js/
│   └── script.js          # JavaScript文件
├── data/
│   └── projects.json      # 项目数据配置
└── .github/
    └── workflows/
        └── deploy.yml     # GitHub Actions部署配置
```

## 🔧 项目管理

### 添加新项目
1. 编辑 `data/projects.json` 文件
2. 在 `projects` 数组中添加新项目对象
3. 提交并推送更改

### 项目配置格式
```json
{
  "id": "project-unique-id",
  "title": "项目名称",
  "description": "项目描述",
  "category": "research|framework|application",
  "status": "active|completed|archived",
  "github_url": "https://github.com/username/repo",
  "paper_url": "https://arxiv.org/abs/xxxx.xxxxx",
  "demo_url": "https://demo-url.com",
  "documentation_url": "https://docs-url.com",
  "technologies": ["Python", "PyTorch", "React"],
  "year": 2024,
  "authors": ["作者1", "作者2"],
  "conference": "会议名称",
  "award": "获奖信息",
  "stars": 100,
  "forks": 20
}
```

### 项目分类
- **research**: 研究项目
- **framework**: 框架工具
- **application**: 应用系统

### 项目状态
- **active**: 进行中
- **completed**: 已完成
- **archived**: 已归档

## 🔗 集成现有GitHub项目

### 方法1：直接链接（推荐）
在 `data/projects.json` 中直接添加现有项目的GitHub链接：

```json
{
  "id": "existing-project",
  "title": "现有项目名称",
  "github_url": "https://github.com/yourusername/existing-project",
  "description": "项目描述",
  "category": "research",
  "status": "active"
}
```

### 方法2：Git子模块
```bash
# 添加现有项目作为子模块
git submodule add https://github.com/yourusername/existing-project.git projects/existing-project

# 更新子模块
git submodule update --init --recursive
```

### 方法3：GitHub组织管理
1. 创建GitHub组织（如 `knowledge-computing-group`）
2. 将所有相关项目转移到组织下
3. 在主网站中链接到组织页面

## 📊 项目统计

网站会自动显示项目的GitHub统计信息：
- Stars数量
- Forks数量
- 最后更新时间

## 🎨 自定义样式

### 修改主题颜色
编辑 `css/style.css` 中的CSS变量：

```css
:root {
  --primary-color: #3498db;
  --secondary-color: #2c3e50;
  --accent-color: #e74c3c;
}
```

### 添加新页面
1. 创建新的HTML文件
2. 在导航栏中添加链接
3. 更新 `js/script.js` 中的路由逻辑

## 📝 内容管理

### 新闻管理
- 编辑 `news.html` 添加新闻
- 使用 `data-category` 属性进行分类
- 支持过滤和搜索功能

### 活动管理
- 编辑 `events.html` 添加活动
- 支持活动分类和状态管理
- 自动显示即将举行的活动

### 团队成员管理
- 编辑 `people.html` 添加成员
- 使用 `data-category` 属性进行分类
- 支持按角色过滤

## 🚀 部署选项

### GitHub Pages（免费）
- 自动部署
- 自定义域名支持
- HTTPS支持

### Netlify（推荐）
- 更快的部署
- 表单处理
- 重定向规则

### Vercel
- 极快的部署
- 自动优化
- 边缘计算

## 📞 支持

如有问题，请：
1. 查看GitHub Issues
2. 联系研究组邮箱
3. 提交Pull Request

## 📄 许可证

本项目采用MIT许可证。详见 [LICENSE](LICENSE) 文件。