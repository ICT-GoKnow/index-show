// 移动端导航菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // 点击菜单项时关闭移动端菜单
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 新闻筛选功能
    const newsFilterBtns = document.querySelectorAll('.news-filters .filter-btn');
    const newsItems = document.querySelectorAll('.news-item');

    newsFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // 更新按钮状态
            newsFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 筛选新闻项
            newsItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category') || '';
                if (filter === 'all' || itemCategory.includes(filter)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 活动筛选功能
    const eventFilterTabs = document.querySelectorAll('.events-filter .filter-tab');
    const eventCards = document.querySelectorAll('.event-card');

    eventFilterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // 更新标签状态
            eventFilterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // 筛选活动卡片
            eventCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category') || '';
                if (filter === 'all' || cardCategory.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 项目筛选功能
    let allProjects = []; // 存储所有项目数据
    let filteredProjects = []; // 存储过滤后的项目

    function initializeProjectFilters() {
        const projectFilterTabs = document.querySelectorAll('.projects-filter .filter-tab');
        
        projectFilterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // 更新标签状态
                projectFilterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // 过滤项目
                filterProjects(filter);
            });
        });
    }

    function filterProjects(filter) {
        if (filter === 'all') {
            filteredProjects = allProjects;
        } else {
            filteredProjects = allProjects.filter(project => {
                const category = project.category || '';
                const status = project.status || '';
                
                switch(filter) {
                    case 'ongoing':
                        return status === 'active';
                    case 'completed':
                        return status === 'completed';
                    case 'funded':
                        return project.paper_url || project.conference; // 有论文或会议的项目
                    case 'industry':
                        return category === 'application' || project.github_url.includes('github.com');
                    default:
                        return true;
                }
            });
        }
        
        // 更新统计数据
        updateProjectStats(filteredProjects);
        
        // 重新显示过滤后的项目
        displayProjects(filteredProjects);
    }

    // 成员筛选功能
    const peopleFilterTabs = document.querySelectorAll('.people-filter .filter-tab');
    const personCards = document.querySelectorAll('.person-card');

    peopleFilterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // 更新标签状态
            peopleFilterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // 筛选成员卡片
            personCards.forEach(card => {
                const cardCategory = card.classList.contains('faculty') ? 'faculty' : 
                                   card.classList.contains('student') ? 
                                   (card.getAttribute('data-category') || 'phd') : 
                                   card.getAttribute('data-category') || 'alumni';
                
                if (filter === 'all' || cardCategory === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // FAQ 折叠功能
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // 关闭其他打开的FAQ项
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 切换当前FAQ项
            item.classList.toggle('active');
        });
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 表单提交处理
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // 简单的表单验证
            if (!data.name || !data.email || !data.subject || !data.message) {
                alert('请填写所有必填字段');
                return;
            }
            
            // 模拟表单提交
            alert('感谢您的留言！我们会尽快回复您。');
            this.reset();
        });
    }

    // 活动报名表单处理
    const registrationForm = document.querySelector('.registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // 简单的表单验证
            if (!data.name || !data.email) {
                alert('请填写姓名和邮箱');
                return;
            }
            
            // 模拟表单提交
            alert('报名成功！我们会尽快与您联系。');
            this.reset();
        });
    }

    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#fff';
            navbar.style.backdropFilter = 'none';
        }
    });

    // 数字动画效果
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // 保持原始格式
                const originalText = stat.textContent;
                const hasPlus = originalText.includes('+');
                const hasMillion = originalText.includes('万');
                
                if (hasMillion) {
                    stat.textContent = Math.floor(current) + '万';
                } else if (hasPlus) {
                    stat.textContent = Math.floor(current) + '+';
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    // 当统计区域进入视口时触发动画
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.project-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // 卡片悬停效果增强
    const cards = document.querySelectorAll('.area-card, .news-card, .project-card, .person-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // 按钮点击效果
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 创建涟漪效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 添加涟漪效果样式
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // 分页功能
    const paginationBtns = document.querySelectorAll('.page-btn');
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('disabled')) {
                return;
            }
            
            // 更新按钮状态
            paginationBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 模拟分页加载
            const pageNumber = this.textContent.trim();
            if (!isNaN(pageNumber)) {
                console.log(`切换到第 ${pageNumber} 页`);
                // 这里可以添加实际的分页逻辑
                // 例如：加载对应页面的新闻数据
                simulatePageLoad(pageNumber);
            } else if (this.querySelector('.fa-chevron-left')) {
                // 上一页
                const currentPage = document.querySelector('.page-btn.active').textContent.trim();
                if (currentPage !== '1') {
                    const prevPage = parseInt(currentPage) - 1;
                    switchToPage(prevPage);
                }
            } else if (this.querySelector('.fa-chevron-right')) {
                // 下一页
                const currentPage = document.querySelector('.page-btn.active').textContent.trim();
                const nextPage = parseInt(currentPage) + 1;
                switchToPage(nextPage);
            }
        });
    });

    // 切换到指定页面
    function switchToPage(pageNumber) {
        const pageBtns = document.querySelectorAll('.page-btn');
        pageBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.trim() === pageNumber.toString()) {
                btn.classList.add('active');
            }
        });
        
        // 更新上一页/下一页按钮状态
        updatePaginationButtons(pageNumber);
        
        console.log(`切换到第 ${pageNumber} 页`);
        simulatePageLoad(pageNumber);
    }

    // 更新分页按钮状态
    function updatePaginationButtons(currentPage) {
        const prevBtn = document.querySelector('.page-btn .fa-chevron-left').parentElement;
        const nextBtn = document.querySelector('.page-btn .fa-chevron-right').parentElement;
        
        // 更新上一页按钮
        if (currentPage <= 1) {
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.classList.remove('disabled');
        }
        
        // 更新下一页按钮
        const totalPages = document.querySelectorAll('.page-btn').length - 2; // 减去左右箭头按钮
        if (currentPage >= totalPages) {
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.classList.remove('disabled');
        }
    }

    // 模拟页面加载
    function simulatePageLoad(pageNumber) {
        // 显示加载指示器
        const loadingIndicator = document.querySelector('.pagination-loading');
        if (loadingIndicator) {
            loadingIndicator.classList.add('show');
        }
        
        // 显示加载效果
        const newsItems = document.querySelectorAll('.news-item');
        newsItems.forEach(item => {
            item.classList.add('loading');
        });
        
        // 模拟加载延迟
        setTimeout(() => {
            // 隐藏加载指示器
            if (loadingIndicator) {
                loadingIndicator.classList.remove('show');
            }
            
            // 恢复新闻项显示
            newsItems.forEach(item => {
                item.classList.remove('loading');
            });
            
            // 滚动到顶部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 800);
    }

    // 项目数据加载功能
    async function loadProjects() {
        console.log('开始加载项目数据...');
        const loadingIndicator = document.getElementById('loading-indicator');
        const container = document.getElementById('projects-container');
        
        // 显示加载指示器
        if (loadingIndicator) {
            loadingIndicator.classList.remove('hidden');
        }
        
        try {
            const response = await fetch('data/projects.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('项目数据加载成功:', data);
            
            // 隐藏加载指示器
            if (loadingIndicator) {
                loadingIndicator.classList.add('hidden');
            }
            
            // 存储所有项目数据
            allProjects = data.projects;
            filteredProjects = allProjects;
            
            // 更新统计数据
            updateProjectStats(allProjects);
            
            // 显示所有项目
            displayProjects(allProjects);
            
            // 初始化过滤功能
            initializeProjectFilters();
            
        } catch (error) {
            console.error('加载项目数据失败:', error);
            
            // 隐藏加载指示器
            if (loadingIndicator) {
                loadingIndicator.classList.add('hidden');
            }
            
            // 如果加载失败，显示默认项目
            displayDefaultProjects();
        }
    }

    // 显示项目
    function displayProjects(projects) {
        const container = document.getElementById('projects-container');
        const noProjects = document.getElementById('no-projects');
        const projectCountDisplay = document.getElementById('project-count-display');
        
        if (!container) return;

        // 更新项目计数
        if (projectCountDisplay) {
            projectCountDisplay.textContent = `${projects.length} project${projects.length !== 1 ? 's' : ''}`;
        }

        // 显示/隐藏无项目提示
        if (noProjects) {
            noProjects.style.display = projects.length === 0 ? 'block' : 'none';
        }

        if (projects.length === 0) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = projects.map(project => `
            <div class="project-card ${project.status === 'completed' ? 'completed' : 'ongoing'}" data-category="${project.category}">
                <div class="project-image">
                    <i class="fas ${getProjectIcon(project.category)}"></i>
                </div>
                <div class="project-content">
                    <div class="project-header">
                        <h3>${project.title}</h3>
                        <div class="project-status ${project.status}">${getStatusText(project.status)}</div>
                    </div>
                    ${project.conference ? `<p class="project-funding">${project.conference}</p>` : ''}
                    <p class="project-description">${project.description}</p>
                    <div class="project-details">
                        <div class="detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>${project.year}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-github"></i>
                            <span>${project.stars || 0} stars</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-code-branch"></i>
                            <span>${project.forks || 0} forks</span>
                        </div>
                    </div>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-actions">
                        ${project.demo_url ? `<a href="${project.demo_url}" class="btn btn-primary" target="_blank" title="View Demo">View Demo</a>` : ''}
                        <a href="${project.github_url}" class="btn btn-outline" target="_blank" title="GitHub">GitHub</a>
                        ${project.paper_url ? `<a href="${project.paper_url}" class="btn btn-outline" target="_blank" title="Paper">Paper</a>` : ''}
                        ${project.documentation_url ? `<a href="${project.documentation_url}" class="btn btn-outline" target="_blank" title="Documentation">Docs</a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 获取项目图标
    function getProjectIcon(category) {
        const icons = {
            'research': 'fa-project-diagram',
            'framework': 'fa-brain',
            'application': 'fa-database'
        };
        return icons[category] || 'fa-code';
    }

    // 获取状态文本
    function getStatusText(status) {
        const statusMap = {
            'active': 'Ongoing',
            'completed': 'Completed',
            'archived': 'Archived'
        };
        return statusMap[status] || status;
    }

    // 更新项目统计数据
    function updateProjectStats(projects) {
        console.log('更新项目统计数据:', projects);
        const totalProjects = document.getElementById('total-projects');
        const ongoingProjects = document.getElementById('ongoing-projects');
        const completedProjects = document.getElementById('completed-projects');
        const totalStars = document.getElementById('total-stars');

        console.log('统计元素:', {
            totalProjects: totalProjects,
            ongoingProjects: ongoingProjects,
            completedProjects: completedProjects,
            totalStars: totalStars
        });

        if (totalProjects) {
            totalProjects.textContent = projects.length;
            console.log('总项目数:', projects.length);
        }

        if (ongoingProjects) {
            const ongoing = projects.filter(p => p.status === 'active').length;
            ongoingProjects.textContent = ongoing;
            console.log('进行中项目数:', ongoing);
        }

        if (completedProjects) {
            const completed = projects.filter(p => p.status === 'completed').length;
            completedProjects.textContent = completed;
            console.log('已完成项目数:', completed);
        }

        if (totalStars) {
            const stars = projects.reduce((sum, p) => sum + (p.stars || 0), 0);
            totalStars.textContent = stars.toLocaleString();
            console.log('总星数:', stars);
        }
    }

    // 显示默认项目（当JSON加载失败时）
    function displayDefaultProjects() {
        console.log('显示默认项目数据');
        const container = document.getElementById('projects-container');
        if (!container) return;

        // 创建默认项目数据
        const defaultProjects = [
            {
                id: 'knowledge-graph-reasoning',
                title: 'Knowledge Graph Reasoning',
                description: '基于图神经网络的知识图谱推理系统，支持多种推理任务和知识图谱补全。',
                category: 'research',
                status: 'active',
                github_url: 'https://github.com/yourusername/knowledge-graph-reasoning',
                conference: 'WWW 2024',
                technologies: ['Python', 'PyTorch', 'GNN'],
                year: 2024,
                stars: 45,
                forks: 12
            },
            {
                id: 'nlp-knowledge-enhanced',
                title: 'Knowledge-Enhanced NLP',
                description: '知识增强的自然语言处理框架，结合知识图谱提升NLP任务性能。',
                category: 'research',
                status: 'active',
                github_url: 'https://github.com/yourusername/nlp-knowledge-enhanced',
                conference: 'ACL 2024',
                technologies: ['Python', 'Transformers', 'Knowledge Graphs'],
                year: 2024,
                stars: 32,
                forks: 8
            },
            {
                id: 'medical-ai-diagnosis',
                title: 'Medical AI Diagnosis System',
                description: '基于知识图谱的医学影像AI诊断系统，获得国家科技进步二等奖。',
                category: 'application',
                status: 'completed',
                github_url: 'https://github.com/yourusername/medical-ai-diagnosis',
                conference: 'ICML 2024',
                technologies: ['Python', 'PyTorch', 'Medical Imaging'],
                year: 2023,
                stars: 89,
                forks: 23
            }
        ];

        // 存储默认项目数据
        allProjects = defaultProjects;
        filteredProjects = defaultProjects;

        // 更新统计数据
        updateProjectStats(defaultProjects);

        // 显示项目
        displayProjects(defaultProjects);

        // 初始化过滤功能
        initializeProjectFilters();
    }

    // 页面加载完成后的初始化
    console.log('智能计算研究组网站已加载完成');
    console.log('当前页面路径:', window.location.pathname);
    
    // 如果是项目页面，加载项目数据
    if (window.location.pathname.includes('projects.html')) {
        console.log('检测到项目页面，开始加载项目数据');
        
        // 先设置默认值，防止显示NaN
        const defaultStats = [
            { id: 'total-projects', value: '0' },
            { id: 'ongoing-projects', value: '0' },
            { id: 'completed-projects', value: '0' },
            { id: 'total-stars', value: '0' }
        ];
        
        defaultStats.forEach(stat => {
            const element = document.getElementById(stat.id);
            if (element) {
                element.textContent = stat.value;
            }
        });
        
        loadProjects();
    } else {
        console.log('非项目页面，跳过项目数据加载');
    }

    // 论文卡片点击功能
    const clickableCards = document.querySelectorAll('.clickable-card');
    clickableCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 如果点击的是按钮，不触发卡片点击
            if (e.target.closest('.btn')) {
                return;
            }
            
            const url = this.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank');
            }
        });
    });
});
