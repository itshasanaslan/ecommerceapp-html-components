/* script.js */
document.addEventListener('DOMContentLoaded', function () {
    const addItemForm = document.getElementById('addItemForm');
    const itemsList = document.getElementById('itemsList');
    const ordersList = document.getElementById('ordersList');
    const sendMessageForm = document.getElementById('sendMessageForm');
    const messagesList = document.getElementById('messagesList');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');

    // Function to show a specific section
    window.showSection = function(sectionId) {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => section.style.display = 'none');
        document.getElementById(sectionId).style.display = 'block';
    };

    // Handle add item form submission
    addItemForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const itemName = document.getElementById('itemName').value;
        const itemPrice = document.getElementById('itemPrice').value;
        const itemDescription = document.getElementById('itemDescription').value;

        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = `${itemName} - $${itemPrice} - ${itemDescription}`;
        itemsList.appendChild(listItem);

        addItemForm.reset();
    });

    // Handle send message form submission
    sendMessageForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const messageInput = document.getElementById('messageInput').value;
        
        const messageItem = document.createElement('div');
        messageItem.className = 'alert alert-secondary mt-2';
        messageItem.textContent = messageInput;
        messagesList.appendChild(messageItem);

        sendMessageForm.reset();
    });

    // Toggle sidebar collapse
    sidebarToggle.addEventListener('click', function () {
        sidebar.classList.toggle('collapse');
        if (sidebar.classList.contains('collapse')) {
            document.querySelector('.main-content').style.marginLeft = '0';
        } else {
            document.querySelector('.main-content').style.marginLeft = '200px';
        }
    });

    // Automatically collapse sidebar on window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth < 768) {
            sidebar.classList.add('collapse');
            document.querySelector('.main-content').style.marginLeft = '0';
        } else {
            sidebar.classList.remove('collapse');
            document.querySelector('.main-content').style.marginLeft = '200px';
        }
    });

    // Initially show the Add Items section
    showSection('addItems');

    // Check initial window size
    if (window.innerWidth < 768) {
        sidebar.classList.add('collapse');
        document.querySelector('.main-content').style.marginLeft = '0';
    } else {
        sidebar.classList.remove('collapse');
        document.querySelector('.main-content').style.marginLeft = '200px';
    }
});
