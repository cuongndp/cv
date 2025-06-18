 document.addEventListener('DOMContentLoaded', function() {
            // Initialize all effects
            setupNavigation();
            setupScrollProgress();
            setupAnimations();
            setupParticles();
            setupMatrixRain();
            checkProfileImage();
            setupInteractiveEffects();
            
            // Remove loading screen
            setTimeout(() => {
                document.querySelector('.loading-screen').style.display = 'none';
            }, 2000);
        });

        // Custom Cursor
        function setupCursor() {
            const cursor = document.querySelector('.cursor');
            const follower = document.querySelector('.cursor-follower');
            
            // Always show cursor for desktop
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX - 10 + 'px';
                cursor.style.top = e.clientY - 10 + 'px';
                
                setTimeout(() => {
                    follower.style.left = e.clientX - 20 + 'px';
                    follower.style.top = e.clientY - 20 + 'px';
                }, 100);
            });

            // Cursor interactions
            document.querySelectorAll('a, button, .contact-card, .skill-card, .hobby-card').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'scale(1.5)';
                    follower.style.transform = 'scale(1.5)';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'scale(1)';
                    follower.style.transform = 'scale(1)';
                });
            });
        }

        // Navigation
        function setupNavigation() {
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('.section');

            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Active state on scroll
            window.addEventListener('scroll', function() {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (window.pageYOffset >= sectionTop - 200) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === current) {
                        link.classList.add('active');
                    }
                });
            });
        }

        // Scroll Progress Bar
        function setupScrollProgress() {
            const progressBar = document.querySelector('.scroll-progress');
            
            window.addEventListener('scroll', () => {
                const scrollTop = document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollPercent = (scrollTop / scrollHeight) * 100;
                progressBar.style.width = scrollPercent + '%';
            });
        }

        // Animations
        function setupAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Stagger animations
                        const items = entry.target.querySelectorAll('.skill-card, .hobby-card, .contact-card, .timeline-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, index * 150);
                        });
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.section').forEach(section => {
                observer.observe(section);
            });
        }

        // Floating Particles
        function setupParticles() {
            const container = document.querySelector('.bg-animation');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                container.appendChild(particle);
            }
        }

        // Matrix Rain Effect
        function setupMatrixRain() {
            const container = document.querySelector('.matrix-rain');
            const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
            
            for (let i = 0; i < 20; i++) {
                const column = document.createElement('div');
                column.className = 'matrix-column';
                column.style.left = Math.random() * 100 + '%';
                column.style.animationDelay = Math.random() * 8 + 's';
                
                let text = '';
                for (let j = 0; j < 20; j++) {
                    text += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
                }
                column.innerHTML = text;
                
                container.appendChild(column);
            }
        }

        // Profile Image Check
        function checkProfileImage() {
            const profileImg = document.getElementById('profileImg');
            const profileImage = document.getElementById('profileImage');
            
            if (profileImg && profileImg.src && !profileImg.src.endsWith('/')) {
                profileImg.style.display = 'block';
                profileImage.classList.add('has-image');
                document.querySelector('.avatar-placeholder').style.display = 'none';
            }
        }

        // Interactive Effects
        function setupInteractiveEffects() {
            // Card click effects
            document.querySelectorAll('.skill-card, .hobby-card, .timeline-card, .project-card').forEach(card => {
                card.addEventListener('click', function() {
                    this.style.transform += ' scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = this.style.transform.replace(' scale(0.95)', '');
                    }, 150);
                });
            });

            // Profile image special effect
            const profileImage = document.querySelector('.profile-image');
            if (profileImage) {
                profileImage.addEventListener('click', function() {
                    this.style.animation = 'none';
                    setTimeout(() => {
                        this.style.animation = 'gradientRotate 4s ease infinite, profileFloat 6s ease-in-out infinite';
                    }, 100);
                });
            }

            // Typewriter effect for name
            const nameElement = document.querySelector('.profile-name');
            if (nameElement) {
                const nameText = nameElement.textContent;
                nameElement.textContent = '';
                
                setTimeout(() => {
                    let i = 0;
                    const typeWriter = () => {
                        if (i < nameText.length) {
                            nameElement.textContent += nameText.charAt(i);
                            i++;
                            setTimeout(typeWriter, 100);
                        }
                    };
                    typeWriter();
                }, 1000);
            }

            // Random glow effects
            setInterval(() => {
                const cards = document.querySelectorAll('.skill-card, .hobby-card');
                cards.forEach(card => {
                    if (Math.random() > 0.7) {
                        card.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.6)';
                        setTimeout(() => {
                            card.style.boxShadow = '';
                        }, 1000);
                    }
                });
            }, 3000);
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            const sections = ['profile', 'education', 'projects', 'skills', 'certificates', 'hobbies', 'contact'];
            const currentSection = document.querySelector('.nav-link.active')?.getAttribute('href')?.substring(1) || 'profile';
            const currentIndex = sections.indexOf(currentSection);

            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % sections.length;
                document.getElementById(sections[nextIndex]).scrollIntoView({ behavior: 'smooth' });
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
                document.getElementById(sections[prevIndex]).scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Konami code easter egg
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

        document.addEventListener('keydown', function(e) {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                // Activate party mode
                document.body.style.animation = 'rainbow 1s linear infinite';
                
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 5000);
            }
        });

        // Performance optimization
        let ticking = false;
        function updateOnScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll-based animations here
                    ticking = false;
                });
                ticking = true;
            }
        }
        window.addEventListener('scroll', updateOnScroll);