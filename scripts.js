        // Smooth scrolling
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

        // Navigation scroll effect
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(15, 15, 15, 0.98)';
                nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
            } else {
                nav.style.background = 'rgba(15, 15, 15, 0.95)';
                nav.style.boxShadow = 'none';
            }
        });

        // FAQ toggle
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function() {
                const item = this.parentElement;
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(faq => {
                    faq.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    
                    // Track FAQ interaction
                    if (typeof gtag !== 'undefined') {
                        const questionText = this.querySelector('span').textContent;
                        gtag('event', 'faq_click', {
                            'event_category': 'engagement',
                            'event_label': questionText
                        });
                    }
                }
            });
        });
        
        // Track social links clicks
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('click', function(e) {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'social_click', {
                        'event_category': 'engagement',
                        'event_label': 'footer_social'
                    });
                }
            });
        });
        
        // Track play button clicks in portfolio
        document.querySelectorAll('.play-button').forEach(button => {
            button.addEventListener('click', function() {
                const songTitle = this.closest('.portfolio-item').querySelector('.portfolio-title').textContent;
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'play_demo', {
                        'event_category': 'engagement',
                        'event_label': songTitle
                    });
                }
            });
        });

        // Modal functions
        function openModal(packageType = '') {
            document.getElementById('orderModal').style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            if (packageType) {
                document.getElementById('package').value = packageType;
            }
            
            // Google Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click_order_button', {
                    'event_category': 'engagement',
                    'event_label': packageType || 'general',
                    'value': packageType === 'basic' ? 50 : packageType === 'premium' ? 150 : 0
                });
            }
        }

        function closeModal() {
            document.getElementById('orderModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('orderModal');
            if (event.target === modal) {
                closeModal();
            }
        });

        // Form submission
        document.getElementById('orderForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Calculate total price
            let total = 0;
            const packagePrices = {
                'basic': 50,
                'premium': 150,
                'wedding': 300,
                'business': 800
            };
            
            total += packagePrices[data.package] || 0;
            if (data.rights) total += 500;
            if (data.rush) total += 50;
            
            // Google Analytics tracking for conversion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'event_category': 'conversion',
                    'event_label': data.package,
                    'value': total,
                    'currency': 'USD'
                });
                
                // Track as conversion
                gtag('event', 'conversion', {
                    'send_to': 'G-XXXXXXXXXX/conversion_id', // Додайте ваш conversion ID
                    'value': total,
                    'currency': 'USD',
                    'transaction_id': Date.now().toString()
                });
            }
            
            // Here you would normally send to your payment processor
            alert(`Thank you! Your order total is ${total}. You'll be redirected to secure payment.`);
            
            // In production, redirect to Stripe or your payment processor
            // window.location.href = `your-payment-url?amount=${total}&package=${data.package}`;
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        // Track important section views
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && typeof gtag !== 'undefined') {
                    const sectionId = entry.target.id;
                    gtag('event', 'view_section', {
                        'event_category': 'engagement',
                        'event_label': sectionId
                    });
                    
                    // Track pricing view specifically
                    if (sectionId === 'pricing') {
                        gtag('event', 'view_pricing', {
                            'event_category': 'engagement',
                            'event_label': 'pricing_section'
                        });
                    }
                    
                    // Unobserve after tracking
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        // Observe main sections
        document.querySelectorAll('#pricing, #portfolio, #process').forEach(section => {
            sectionObserver.observe(section);
        });

        // Add some dynamic stats animation
        function animateStats() {
            const stats = document.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                const increment = target / 50;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    if (stat.textContent.includes('+')) {
                        stat.textContent = Math.floor(current) + '+';
                    } else if (stat.textContent.includes('h')) {
                        stat.textContent = Math.floor(current) + 'h';
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 30);
            });
        }

        // Trigger stats animation when in view
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        });

        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            statsObserver.observe(heroStats);
        }
