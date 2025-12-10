// Falling Flowers Animation
document.addEventListener('DOMContentLoaded', function() {
    const flowersContainer = document.getElementById('flowers-container');
    const flowers = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🌿', '🌱'];
    const hearts = ['💖', '💕', '💗', '💓', '💝', '💘', '💞', '💟'];
    
    function createFlower() {
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        
        // Random horizontal position
        flower.style.left = Math.random() * 100 + '%';
        
        // Random animation duration (3-8 seconds)
        const duration = Math.random() * 5 + 3;
        flower.style.animationDuration = duration + 's';
        
        // Random delay (0-2 seconds)
        const delay = Math.random() * 2;
        flower.style.animationDelay = delay + 's';
        
        flowersContainer.appendChild(flower);
        
        // Remove flower after animation completes
        setTimeout(() => {
            if (flower.parentNode) {
                flower.parentNode.removeChild(flower);
            }
        }, (duration + delay) * 1000);
    }
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'flower';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Random horizontal position
        heart.style.left = Math.random() * 100 + '%';
        
        // Random animation duration (3-8 seconds)
        const duration = Math.random() * 5 + 3;
        heart.style.animationDuration = duration + 's';
        
        // Random delay (0-2 seconds)
        const delay = Math.random() * 2;
        heart.style.animationDelay = delay + 's';
        
        flowersContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, (duration + delay) * 1000);
    }
    
    // Create flowers and hearts continuously
    function startFlowerFall() {
        createFlower();
        createHeart();
        // Create new elements every 300-800ms
        setTimeout(startFlowerFall, Math.random() * 500 + 300);
    }
    
    // Start the animation
    startFlowerFall();

    // Side banner hover effect
    const sideBanners = document.querySelectorAll('.side-banner');
    sideBanners.forEach((banner) => {
        banner.addEventListener('mouseenter', () => {
            banner.classList.add('expanded');
        });
        banner.addEventListener('mouseleave', () => {
            banner.classList.remove('expanded');
        });
    });

    // Contact icon click handler
    const contactIcon = document.querySelector('.contact-icon');
    const contactTrigger = document.querySelector('.contact-trigger');
    
    if (contactTrigger) {
        contactTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            contactIcon.classList.toggle('active');
        });
    }

    // Close contact popup when clicking outside
    document.addEventListener('click', (e) => {
        if (contactIcon && !contactIcon.contains(e.target)) {
            contactIcon.classList.remove('active');
        }
    });

    // Message icon click handler
    const messageIcon = document.querySelector('.message-icon');
    const messageTrigger = document.querySelector('.message-trigger');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    
    // Load existing messages from localStorage or initialize empty array
    let messages = JSON.parse(localStorage.getItem('messages') || '[]');
    
    if (messageTrigger) {
        messageTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            messageIcon.classList.toggle('active');
        });
    }

    // Close message popup when clicking outside
    document.addEventListener('click', (e) => {
        if (messageIcon && !messageIcon.contains(e.target)) {
            messageIcon.classList.remove('active');
        }
    });

    // Handle message form submission
    if (messageForm) {
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const contactName = document.getElementById('contactName').value.trim();
            const contactEmail = document.getElementById('contactEmail').value.trim();
            const contactPhone = document.getElementById('contactPhone').value.trim();
            const messageText = messageInput.value.trim();
            
            if (!contactName || !contactEmail || !messageText) {
                alert('Please fill in all required fields (Name, Email, and Message)!');
                return;
            }

            // Create message object with timestamp and contact details
            const message = {
                timestamp: new Date().toLocaleString(),
                name: contactName,
                email: contactEmail,
                phone: contactPhone || 'N/A',
                message: messageText
            };

            // Add to messages array
            messages.push(message);
            
            // Save to localStorage
            localStorage.setItem('messages', JSON.stringify(messages));

            // Generate and download Excel file
            saveToExcel();

            // Clear form and show success message
            messageForm.reset();
            alert('Message saved with contact details! Excel file downloaded.');
            messageIcon.classList.remove('active');
        });
    }

    // Function to save messages to Excel
    function saveToExcel() {
        // Prepare data for Excel
        const data = [
            ['Timestamp', 'Name', 'Email', 'Phone', 'Message'] // Header row
        ];

        // Add all messages
        messages.forEach(msg => {
            data.push([
                msg.timestamp,
                msg.name || '',
                msg.email || '',
                msg.phone || '',
                msg.message
            ]);
        });

        // Create workbook and worksheet
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Messages');

        // Generate Excel file and trigger download
        XLSX.writeFile(wb, 'messages.xlsx');
    }
});
