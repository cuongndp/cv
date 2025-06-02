// CV Skill Bars Animation
// Author: Nguyễn Văn Phong
// Description: Animate skill progress bars when page loads

// Wait for the DOM to fully load
window.addEventListener('load', function() {
    // Get all skill progress bars
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Animate each skill bar with staggered timing
    skillBars.forEach((bar, index) => {
        // Store the original width value
        const width = bar.style.width;
        
        // Reset the width to 0% initially
        bar.style.width = '0%';
        
        // Animate to the original width with delay
        setTimeout(() => {
            bar.style.width = width;
        }, 500 + (index * 100)); // Start after 500ms, then 100ms delay between each bar
    });
});

// Optional: Add additional interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Could add additional hover animations here
            // For example: pulse effect, color change, etc.
        });
    });
    
    // Add click to scroll functionality for sections
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        section.addEventListener('click', function() {
            // Smooth scroll or highlight effect could be added here
            this.style.transform = 'translateY(-5px)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 200);
        });
    });
});