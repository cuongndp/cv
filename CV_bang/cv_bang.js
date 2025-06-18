// Loading Screen
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1500);
});

// Smooth Scrolling
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

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Skill Progress Animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress-fill');
            progressBars.forEach(bar => {
                const level = bar.getAttribute('data-level');
                setTimeout(() => {
                    bar.style.width = level + '%';
                }, Math.random() * 500);
            });
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Theme Toggle (Color Variations)
const themeToggle = document.getElementById('themeToggle');
const themes = [
    {
        primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        accent: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
        primary: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
        secondary: 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)',
        accent: 'linear-gradient(135deg, #48dbfb 0%, #0abde3 100%)'
    },
    {
        primary: 'linear-gradient(135deg, #1dd1a1 0%, #10ac84 100%)',
        secondary: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
        accent: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)'
    }
];

let currentTheme = 0;
themeToggle.addEventListener('click', () => {
    currentTheme = (currentTheme + 1) % themes.length;
    const theme = themes[currentTheme];
    
    document.documentElement.style.setProperty('--primary-gradient', theme.primary);
    document.documentElement.style.setProperty('--secondary-gradient', theme.secondary);
    document.documentElement.style.setProperty('--accent-gradient', theme.accent);
    
    // Add rotation animation to toggle button
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// Active Navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        alert(`Cảm ơn ${name}! Tin nhắn của bạn đã được gửi thành công.`);
        this.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Success animation
        submitBtn.style.background = 'linear-gradient(45deg, #1dd1a1, #10ac84)';
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Đã gửi!';
        
        setTimeout(() => {
            submitBtn.style.background = 'var(--primary-gradient)';
            submitBtn.innerHTML = originalText;
        }, 3000);
    }, 2000);
});

// Download CV as Text File (Simple Solution)
function downloadCV() {
    const cvContent = `
CV - LÊ HẢI BẰNG
================

THÔNG TIN CÁ NHÂN
-----------------
Họ tên: Lê Hải Bằng
Ngày sinh: 18/11/2005
Vị trí: Full Stack Developer
Email: banglh1811@ut.edu.vn
Điện thoại: +84 769 408 725
Địa chỉ: Quận 1, TP. Hồ Chí Minh
Giới tính: Nam
Quốc tịch: Việt Nam
Tình trạng: Độc thân
Ngôn ngữ: Tiếng Việt, Tiếng Anh
Kinh nghiệm: 3+ năm

GIỚI THIỆU
----------
Tôi là một Full Stack Developer trẻ tuổi với đam mê mãnh liệt dành cho công nghệ và lập trình. 
Hiện đang theo học ngành Công nghệ Thông tin tại Đại học Giao thông vận tải TP.HCM, luôn tìm tòi 
và học hỏi những công nghệ mới nhất. Với hơn 3 năm kinh nghiệm phát triển ứng dụng web, có khả năng 
làm việc với nhiều công nghệ từ frontend đến backend, database và cloud services.

MỤC TIÊU NGHỀ NGHIỆP
--------------------
Trở thành một Full Stack Developer chuyên nghiệp, có khả năng phát triển các ứng dụng web quy mô lớn 
và đóng góp vào việc chuyển đổi số của doanh nghiệp. Mong muốn làm việc trong môi trường năng động, 
có cơ hội học hỏi và phát triển kỹ năng liên tục.

KỸ NĂNG CHÍNH
-------------
• Frontend: HTML/CSS (95%), JavaScript (90%), React.js (85%)
• Backend: Java (85%), Python (75%), PHP (70%)
• Database: MySQL (85%), Git (90%), Docker (75%)

HỌC VẤN
-------
• Cử nhân Công nghệ Thông tin - Đại học Giao thông vận tải TP.HCM (2023-hiện tại)
  - Năm thứ 2, GPA: 3.2/4.0
  - Học bổng khuyến học, Top 10% lớp
• Tốt nghiệp THPT Trần Quốc Tuấn, Phú Yên (2020-2023)
  - Tốt nghiệp loại Giỏi, điểm TB: 8.5/10
  - Học sinh giỏi, Câu lạc bộ Tin học

SỞ THÍCH
--------
• Lập trình: Tham gia open source, coding challenges
• Đọc sách: Công nghệ, AI/ML, phát triển bản thân
• Gaming: Game chiến thuật, puzzle games
• Nhiếp ảnh: Landscape, street photography
• Du lịch: Khám phá văn hóa, công nghệ các nước
• Thể thao: Gym, chạy bộ để duy trì sức khỏe

DỰ ÁN NỔI BẬT
-------------
1. Portfolio Website - HTML5, CSS3, JavaScript
2. Hệ thống Quản lý Đào tạo - Java, Spring Boot, MySQL
3. E-Commerce Platform - React.js, Node.js, MongoDB

LIÊN HỆ
-------
Email: banglh1811@ut.edu.vn
LinkedIn: linkedin.com/in/le-hai-bang
GitHub: github.com/le-hai-bang
    `;
    
    const blob = new Blob([cvContent], { type: 'text/plain; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CV_LeHaiBang_Developer.txt';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Print to PDF Function (Using Browser Print)
function downloadCVPDF() {
    const downloadBtn = event.target.closest('.btn');
    const originalText = downloadBtn.innerHTML;
    
    // Show loading state
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang chuẩn bị...';
    downloadBtn.disabled = true;
    
    // Add print styles
    const printStyle = document.createElement('style');
    printStyle.id = 'print-styles';
    printStyle.innerHTML = `
        @media print {
            * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
            
            body {
                margin: 0;
                padding: 0;
                background: white !important;
                color: #333 !important;
                font-size: 12pt;
            }
            
            .bg-animation,
            nav,
            .theme-toggle,
            .loading,
            .footer,
            .contact-form {
                display: none !important;
            }
            
            .container {
                max-width: none !important;
                margin: 0 !important;
                padding: 20px !important;
            }
            
            .hero {
                padding: 20px 0 !important;
            }
            
            .hero::before {
                display: none !important;
            }
            
            .section {
                margin-bottom: 30px !important;
                page-break-inside: avoid;
            }
            
            .glass-card {
                background: #f8f9fa !important;
                border: 1px solid #dee2e6 !important;
                backdrop-filter: none !important;
                box-shadow: none !important;
                page-break-inside: avoid;
            }
            
            .section-title {
                color: #667eea !important;
                -webkit-text-fill-color: #667eea !important;
                font-size: 24pt !important;
            }
            
            .hero h1 {
                color: #667eea !important;
                -webkit-text-fill-color: #667eea !important;
                font-size: 32pt !important;
            }
            
            .profile-image {
                border: 3px solid #667eea !important;
                background: #667eea !important;
            }
            
            .tech-tag,
            .badge {
                background: #667eea !important;
                color: white !important;
            }
            
            .skill-progress-fill {
                background: #667eea !important;
            }
            
            .hobby-icon,
            .contact-icon {
                background: #667eea !important;
            }
            
            .timeline-date {
                background: #667eea !important;
            }
            
            .timeline-item::before {
                background: #667eea !important;
            }
            
            .education-timeline::before {
                background: #667eea !important;
            }
            
            .about-container {
                grid-template-columns: 1fr !important;
            }
            
            .timeline-item {
                width: 100% !important;
                left: 0 !important;
            }
            
            .education-timeline::before {
                left: 20px !important;
            }
            
            .timeline-item::before {
                left: 0 !important;
            }
        }
    `;
    
    document.head.appendChild(printStyle);
    
    setTimeout(() => {
        // Reset button first
        downloadBtn.innerHTML = '<i class="fas fa-print"></i> In CV';
        downloadBtn.disabled = false;
        
        // Show instructions
        const instruction = confirm(
            'Để tải CV dạng PDF:\n\n' +
            '1. Nhấn OK để mở cửa sổ in\n' +
            '2. Chọn "Save as PDF" hoặc "Microsoft Print to PDF"\n' +
            '3. Nhấn "Save" để lưu file PDF\n\n' +
            'Nhấn OK để tiếp tục'
        );
        
        if (instruction) {
            // Open print dialog
            window.print();
        }
        
        // Clean up print styles after printing
        setTimeout(() => {
            const printStyleElement = document.getElementById('print-styles');
            if (printStyleElement) {
                printStyleElement.remove();
            }
            downloadBtn.innerHTML = originalText;
        }, 2000);
        
    }, 1000);
}

// Alternative: Create a better downloadable format
function downloadCVHTML() {
    const downloadBtn = event.target.closest('.btn');
    const originalText = downloadBtn.innerHTML;
    
    // Show loading state
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tạo file...';
    downloadBtn.disabled = true;
    
    // Get CV content and create a standalone HTML
    const cvContent = document.getElementById('cv-content').outerHTML;
    const styles = document.querySelector('link[href*="style.css"]')?.outerHTML || '<style>/* Add your CSS here */</style>';
    
    const htmlContent = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV - Lê Hải Bằng</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
    ${styles}
    <style>
        body { margin: 0; padding: 20px; }
        .bg-animation, nav, .theme-toggle { display: none !important; }
        .container { padding-top: 0 !important; }
    </style>
</head>
<body>
    ${cvContent}
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CV_LeHaiBang_Portfolio.html';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Reset button
    setTimeout(() => {
        downloadBtn.innerHTML = '<i class="fas fa-check"></i> Đã tải xuống!';
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }, 2000);
    }, 1000);
}

// Floating Animation for Cards
const cards = document.querySelectorAll('.glass-card');
cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    
    // Add subtle mouse movement effect
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
});

// Particle Effect (Simple)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(102, 126, 234, 0.6)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        { transform: 'translateY(0px)', opacity: 1 },
        { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'linear'
    });
    
    animation.onfinish = () => {
        particle.remove();
    };
}

// Create particles periodically
setInterval(createParticle, 300);

// Add typing effect to hero description
const description = document.querySelector('.hero .description');
if (description) {
    const text = description.textContent;
    description.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            description.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    };

    // Start typing effect after page load
    setTimeout(typeWriter, 2000);
}

// Add active styles for navigation
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        background: var(--primary-gradient);
        color: white;
        box-shadow: var(--glow);
    }
`;
document.head.appendChild(style);