document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    const parallaxBackgrounds = document.querySelectorAll('.parallax-bg');

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Parallax Effect on Scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxBackgrounds.forEach(bg => {
            const speed = bg.getAttribute('data-speed') || 0.5;
            const parent = bg.parentElement;
            const parentOffset = parent.offsetTop;
            const relativeScroll = scrolled - parentOffset;

            // Only animate if the section is in view (approx)
            if (parentOffset < scrolled + window.innerHeight && parentOffset + parent.offsetHeight > scrolled) {
                const yPos = -(relativeScroll * speed);
                bg.style.transform = `translateY(${yPos}px)`;
            }
        });
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu
            const menuToggle = document.getElementById('menu-toggle');
            if (menuToggle) menuToggle.checked = false;

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cursor Effect (Optional - adds premium feel)
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        // Style the cursor in JS
        Object.assign(cursor.style, {
            width: '40px',
            height: '40px',
            border: '1px solid #d4af37',
            borderRadius: '50%',
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: '9999',
            transition: 'transform 0.1s ease, background 0.3s ease',
            transform: 'translate(-50%, -50%)',
            mixBlendMode: 'difference'
        });

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, .btn, .slab-card').forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
            });
            link.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = 'transparent';
            });
        });
    }
});
