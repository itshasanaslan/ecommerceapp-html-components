document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    const chatBody = document.querySelector('.chat-body');
    const notificationSound = document.getElementById('notificationSound');
    const fileInput = document.getElementById('fileInput');
    const chatList = document.getElementById('chatList');
    const chatHeader = document.getElementById('chatHeader');
    const placeholderMessage = document.getElementById('placeholderMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');

    const sendMessage = () => {
        const message = messageInput.value.trim();
        if (message) {
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            let messages = document.getElementsByClassName("message-content");
            let lastMessage = messages[messages.length - 1];
            let lastMessageDate = lastMessage.querySelector("#messageDate").value;
            if (isDateEarlier(lastMessageDate)) {
                const dateSeparator = `
                <div class="date-separator">${formatDate(Date().toString())}</div>
                            `;
                chatBody.insertAdjacentHTML('beforeend', dateSeparator);
            }
            const messageHtml = `
                <div class="chat-message sent">
                    <div class="message-content sent" title="${currentTime}">
                        <p>${message}</p>
                        <small class="text-muted">${currentTime}</small>
                    </div>
                </div>
            `;
            chatBody.insertAdjacentHTML('beforeend', messageHtml);
            messageInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;
            notificationSound.play();
        }
    };
    
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const loadMessages = (chatId) => {
        loadingSpinner.style.display = 'block';
        messageInput.disabled = true;
        fileInput.disabled = true;
        sendButton.disabled = true;
        chatBody.innerHTML = '';

        fetch(`/Customer/Profile/Messages?chatId=${chatId}`)
            .then(response => response.json())
            .then(messages => {
                // Debugging log
                if (!Array.isArray(messages)) {
                    throw new Error("Invalid messages data");
                }

                loadingSpinner.style.display = 'none';
                if (messages.length === 0) {
                    placeholderMessage.textContent = 'This chat is empty. Start the conversation!';
                    chatBody.appendChild(placeholderMessage);
                } else {
                    let lastMessageDate = null;
                    messages.forEach((msg, index) => {
                        const messageDate = new Date(msg.timestamp).toLocaleDateString();
                        const messageTime = formatTime(msg.timestamp);

                        if (lastMessageDate !== messageDate) {
                            const dateSeparator = `
                                <div class="date-separator">${formatDate(msg.timestamp)}</div>
                            `;
                            chatBody.insertAdjacentHTML('beforeend', dateSeparator);
                            lastMessageDate = messageDate;
                        }

                        const messageHtml = `
                            <div class="chat-message ${msg.type}">
                                <div class="message-content ${msg.type}" title="${messageTime}">
                                    <p>${msg.content}</p>
                                    <small class="text-muted">${messageTime}</small>
                                    <input type="hidden" id="messageId" value="${msg.id}" name="messageId">
                                      <input type="hidden" id="messageDate" value="${messageDate}" name="messageDate">
                                </div>
                            </div>
                        `;
                        chatBody.insertAdjacentHTML('beforeend', messageHtml);
                    });
                    chatBody.scrollTop = chatBody.scrollHeight;
                }
                messageInput.disabled = false;
                fileInput.disabled = false;
                sendButton.disabled = false;
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
                loadingSpinner.style.display = 'none';
                chatBody.innerHTML = '<div class="text-danger">Error loading messages. Please try again later.</div>';
            });
    };

    chatList.addEventListener('click', (event) => {
        const chatItem = event.target.closest('.list-group-item');
        if (chatItem) {
            const chatId = chatItem.getAttribute('data-chat-id');
            chatHeader.textContent = chatItem.querySelector('h5').textContent;
            loadMessages(chatId);
        }
    });

    placeholderMessage.textContent = 'Click on a chat to see messages';
});


function parseDateString(dateStr) {
    // Regular expression to extract the day, month, and year
    const dateRegex = /(\d{2})\/(\d{2})\/(\d{4})/;
    const match = dateStr.match(dateRegex);

    if (match) {
        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10) - 1; // Month is 0-based in JS Date
        const year = parseInt(match[3], 10);

        // Create and return the Date object
        return new Date(year, month, day);
    }

    // Return null or handle invalid date formats
    return null;
}

function isDateEarlier(dateStr) {
    const parsedDate = parseDateString(dateStr);

    if (parsedDate) {
        const today = new Date();
        // Remove the time component from today's date for accurate comparison
        today.setHours(0, 0, 0, 0);

        return parsedDate < today;
    }

    throw new Error('Invalid date format');
}
