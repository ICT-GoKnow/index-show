#!/usr/bin/env node

/**
 * 项目添加脚本
 * 使用方法: node scripts/add-project.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const projectsFile = path.join(__dirname, '../data/projects.json');

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

// 询问用户输入
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// 主函数
async function main() {
  console.log('🚀 项目添加工具');
  console.log('================\n');

  const data = loadProjects();
  
  console.log('请输入项目信息：\n');

  const project = {
    id: await askQuestion('项目ID (唯一标识): '),
    title: await askQuestion('项目名称: '),
    description: await askQuestion('项目描述: '),
    category: await askQuestion('项目分类 (research/framework/application): '),
    status: await askQuestion('项目状态 (active/completed/archived): '),
    github_url: await askQuestion('GitHub链接: '),
    paper_url: await askQuestion('论文链接 (可选，直接回车跳过): ') || null,
    demo_url: await askQuestion('演示链接 (可选，直接回车跳过): ') || null,
    documentation_url: await askQuestion('文档链接 (可选，直接回车跳过): ') || null,
    technologies: (await askQuestion('技术栈 (用逗号分隔): ')).split(',').map(t => t.trim()),
    year: parseInt(await askQuestion('年份: ')),
    authors: (await askQuestion('作者 (用逗号分隔): ')).split(',').map(a => a.trim()),
    conference: await askQuestion('会议/期刊 (可选，直接回车跳过): ') || null,
    award: await askQuestion('获奖信息 (可选，直接回车跳过): ') || null,
    stars: parseInt(await askQuestion('GitHub Stars数量: ')) || 0,
    forks: parseInt(await askQuestion('GitHub Forks数量: ')) || 0
  };

  // 验证必填字段
  if (!project.id || !project.title || !project.github_url) {
    console.log('❌ 项目ID、名称和GitHub链接是必填项');
    rl.close();
    return;
  }

  // 检查ID是否已存在
  const existingProject = data.projects.find(p => p.id === project.id);
  if (existingProject) {
    console.log('❌ 项目ID已存在');
    rl.close();
    return;
  }

  // 添加项目
  data.projects.push(project);
  saveProjects(data);

  console.log('\n✅ 项目添加成功！');
  console.log(`项目ID: ${project.id}`);
  console.log(`项目名称: ${project.title}`);
  console.log(`GitHub链接: ${project.github_url}`);

  // 询问是否继续添加
  const continueAdding = await askQuestion('\n是否继续添加其他项目？(y/n): ');
  if (continueAdding.toLowerCase() === 'y') {
    main();
  } else {
    rl.close();
  }
}

// 启动脚本
main().catch(console.error);
