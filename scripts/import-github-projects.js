#!/usr/bin/env node

/**
 * GitHub项目批量导入脚本
 * 使用方法: node scripts/import-github-projects.js <github-username>
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const projectsFile = path.join(__dirname, '../data/projects.json');

// 获取GitHub用户的所有仓库
async function getGitHubRepos(username) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/users/${username}/repos?sort=updated&per_page=100`,
      headers: {
        'User-Agent': 'Research-Group-Website',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const repos = JSON.parse(data);
          resolve(repos);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// 读取现有项目数据
function loadProjects() {
  try {
    const data = fs.readFileSync(projectsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('读取项目文件失败:', error.message);
    return { projects: [] };
  }
}

// 保存项目数据
function saveProjects(data) {
  try {
    fs.writeFileSync(projectsFile, JSON.stringify(data, null, 2));
    console.log('✅ 项目数据已保存');
  } catch (error) {
    console.error('保存项目文件失败:', error.message);
  }
}

// 根据仓库信息推断项目分类
function inferCategory(repo) {
  const name = repo.name.toLowerCase();
  const description = (repo.description || '').toLowerCase();
  
  if (name.includes('framework') || name.includes('lib') || name.includes('tool')) {
    return 'framework';
  }
  if (name.includes('app') || name.includes('web') || name.includes('system')) {
    return 'application';
  }
  if (description.includes('research') || description.includes('paper') || description.includes('thesis')) {
    return 'research';
  }
  return 'research'; // 默认为研究项目
}

// 根据仓库信息推断技术栈
function inferTechnologies(repo) {
  const languages = Object.keys(repo.languages || {});
  const techMap = {
    'Python': ['python'],
    'JavaScript': ['javascript', 'js'],
    'TypeScript': ['typescript', 'ts'],
    'Java': ['java'],
    'C++': ['c++', 'cpp'],
    'C': ['c'],
    'Go': ['go'],
    'Rust': ['rust'],
    'PHP': ['php'],
    'Ruby': ['ruby'],
    'Swift': ['swift'],
    'Kotlin': ['kotlin'],
    'R': ['r'],
    'MATLAB': ['matlab'],
    'Shell': ['shell', 'bash'],
    'Dockerfile': ['docker'],
    'HTML': ['html'],
    'CSS': ['css'],
    'Vue': ['vue'],
    'React': ['react'],
    'Angular': ['angular'],
    'Node.js': ['node'],
    'PyTorch': ['pytorch'],
    'TensorFlow': ['tensorflow'],
    'Scikit-learn': ['scikit'],
    'Pandas': ['pandas'],
    'NumPy': ['numpy']
  };

  const technologies = [];
  for (const [tech, keywords] of Object.entries(techMap)) {
    if (keywords.some(keyword => 
      languages.some(lang => lang.toLowerCase().includes(keyword)) ||
      (repo.description || '').toLowerCase().includes(keyword)
    )) {
      technologies.push(tech);
    }
  }

  return technologies.length > 0 ? technologies : ['Python']; // 默认Python
}

// 主函数
async function main() {
  const username = process.argv[2];
  
  if (!username) {
    console.log('使用方法: node scripts/import-github-projects.js <github-username>');
    process.exit(1);
  }

  console.log(`🔍 正在获取 ${username} 的GitHub仓库...`);

  try {
    const repos = await getGitHubRepos(username);
    console.log(`📦 找到 ${repos.length} 个仓库`);

    const data = loadProjects();
    let addedCount = 0;

    for (const repo of repos) {
      // 跳过fork的仓库
      if (repo.fork) continue;

      // 检查是否已存在
      const existingProject = data.projects.find(p => p.github_url === repo.html_url);
      if (existingProject) continue;

      // 创建项目对象
      const project = {
        id: repo.name.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
        title: repo.name,
        description: repo.description || '暂无描述',
        category: inferCategory(repo),
        status: repo.archived ? 'archived' : 'active',
        github_url: repo.html_url,
        technologies: inferTechnologies(repo),
        year: new Date(repo.created_at).getFullYear(),
        authors: [username],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        created_at: repo.created_at,
        updated_at: repo.updated_at
      };

      data.projects.push(project);
      addedCount++;
      console.log(`✅ 添加项目: ${project.title}`);
    }

    if (addedCount > 0) {
      saveProjects(data);
      console.log(`\n🎉 成功添加 ${addedCount} 个项目！`);
    } else {
      console.log('\n📝 没有找到新的项目需要添加');
    }

  } catch (error) {
    console.error('❌ 导入失败:', error.message);
    process.exit(1);
  }
}

// 启动脚本
main();
