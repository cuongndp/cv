document.addEventListener('DOMContentLoaded', function() {
            // Navigation functionality
            setupNavigation();
            
            // Check profile image
            checkProfileImage();
            
            // Smooth animations
            setupAnimations();
            
            // Interactive effects
            setupInteractiveEffects();
        });

        // Navigation Setup
        function setupNavigation() {
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('.section');

            // Click navigation
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
                    const sectionHeight = section.clientHeight;
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

        // Profile Image Check
        function checkProfileImage() {
            const profileImg = document.getElementById('profileImg');
            const profileImage = document.getElementById('profileImage');
            
            if (profileImg && profileImg.src && profileImg.src !== '' && !profileImg.src.endsWith('/')) {
                profileImg.style.display = 'block';
                profileImage.classList.add('has-image');
            } else {
                profileImg.style.display = 'none';
                profileImage.classList.remove('has-image');
            }

            // Observer for src changes
            if (profileImg) {
                const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
                            checkProfileImage();
                        }
                    });
                });
                
                observer.observe(profileImg, {
                    attributes: true,
                    attributeFilter: ['src']
                });
            }
        }

        // Scroll Animations
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
                        
                        // Stagger animations for grid items
                        const gridItems = entry.target.querySelectorAll('.skill-card, .hobby-card, .contact-card, .timeline-item');
                        gridItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                    }
                });
            }, observerOptions);

            // Observe sections and their children
            document.querySelectorAll('.section').forEach(section => {
                observer.observe(section);
                
                // Pre-set grid items for stagger animation
                const gridItems = section.querySelectorAll('.skill-card, .hobby-card, .contact-card, .timeline-item');
                gridItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                    item.style.transition = 'all 0.6s ease';
                });
            });
        }

        // Interactive Effects
        function setupInteractiveEffects() {
            // Add click effects to cards
            document.querySelectorAll('.skill-card, .hobby-card, .timeline-card, .project-card').forEach(card => {
                card.addEventListener('click', function() {
                    this.style.transform += ' scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = this.style.transform.replace(' scale(0.95)', '');
                    }, 150);
                });
            });

            // Profile image click effect
            const profileImage = document.querySelector('.profile-image');
            if (profileImage) {
                profileImage.addEventListener('click', function() {
                    this.style.transform = 'translateY(-20px) scale(1.1) rotate(360deg)';
                    setTimeout(() => {
                        this.style.transform = 'translateY(-20px) scale(1) rotate(0deg)';
                    }, 600);
                });
            }

            // Typing effect for name
            const nameElement = document.querySelector('.profile-name');
            if (nameElement) {
                const nameText = nameElement.textContent;
                nameElement.textContent = '';
                
                function typeWriter(text, element, speed = 100) {
                    let i = 0;
                    function type() {
                        if (i < text.length) {
                            element.textContent += text.charAt(i);
                            i++;
                            setTimeout(type, speed);
                        }
                    }
                    type();
                }
                
                setTimeout(() => {
                    typeWriter(nameText, nameElement, 120);
                }, 1000);
            }

            // Random color changes for skill cards
            setInterval(() => {
                document.querySelectorAll('.skill-card').forEach(card => {
                    const hue = Math.random() * 360;
                    card.style.filter = `hue-rotate(${hue}deg)`;
                    setTimeout(() => {
                        card.style.filter = 'hue-rotate(0deg)';
                    }, 2000);
                });
            }, 5000);

            // Parallax effect for backgrounds
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const sections = document.querySelectorAll('.section');
                
                sections.forEach((section, index) => {
                    const rate = scrolled * -0.5;
                    if (section.style.backgroundPosition !== undefined) {
                        section.style.backgroundPosition = `center ${rate}px`;
                    }
                });
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            const sections = ['profile', 'education', 'projects', 'skills', 'certificates', 'hobbies', 'contact'];
            const currentSection = document.querySelector('.nav-link.active').getAttribute('href').substring(1);
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

        // Easter egg: Konami code
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

        document.addEventListener('keydown', function(e) {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                // Activate easter egg
                document.body.style.animation = 'rainbow 2s linear infinite';
                
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes rainbow {
                        0% { filter: hue-rotate(0deg); }
                        100% { filter: hue-rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
                
                setTimeout(() => {
                    document.body.style.animation = '';
                    if (style.parentNode) {
                        style.parentNode.removeChild(style);
                    }
                }, 10000);
            }
        });