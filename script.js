document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const addMessageBtn = document.getElementById('add-message-btn');
    const messageList = document.getElementById('message-list');

    // ** Reemplaza esta URL con la que te dio Railway **
    const BACKEND_URL = 'https://love-backend-vom7.onrender.com'; 

    // Función para cargar los mensajes desde el backend
    async function loadMessages() {
        try {
            const response = await fetch(`${BACKEND_URL}/messages`);
            const messages = await response.json();

            // Limpia la lista actual antes de cargar los mensajes
            messageList.innerHTML = ''; 

            // Crea los elementos de la lista a partir de los mensajes del backend
            messages.forEach(msg => createMessageElement(msg));
        } catch (error) {
            console.error('Error al cargar los mensajes:', error);
        }
    }

    // Función para crear un nuevo elemento de mensaje (<li>)
    function createMessageElement(message) {
        const listItem = document.createElement('li');
        listItem.textContent = message.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.title = 'Eliminar mensaje';

        deleteBtn.addEventListener('click', async () => {
            try {
                await fetch(`${BACKEND_URL}/messages/${message.id}`, { method: 'DELETE' });
                listItem.remove();
            } catch (error) {
                console.error('Error al eliminar el mensaje:', error);
            }
        });

        listItem.appendChild(deleteBtn);
        messageList.appendChild(listItem);
    }

    // Función para agregar un mensaje al backend
    async function addMessage() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            try {
                const response = await fetch(`${BACKEND_URL}/messages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text: messageText })
                });
                const newMessage = await response.json();

                // Agrega el nuevo mensaje al principio de la lista y lo crea con el ID del backend
                createMessageElement(newMessage);
                messageInput.value = '';
                messageInput.focus();
            } catch (error) {
                console.error('Error al guardar el mensaje:', error);
            }
        }
    }

    // Event listeners
    addMessageBtn.addEventListener('click', addMessage);
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            addMessage();
        }
    });

    // Carga los mensajes al iniciar la página desde el backend
    loadMessages();

    // Lógica de los corazones (asegúrate de que este código también esté presente)
    const heartContainer = document.querySelector('.heart-container');
    if (heartContainer) {
        function createHeart() {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.textContent = '❤️'; 
            heart.style.left = `${Math.random() * 100}vw`; 
            heart.style.animationDuration = `${Math.random() * 5 + 5}s`; 
            heart.style.animationDelay = `-${Math.random() * 5}s`; 
            heartContainer.appendChild(heart);
            setTimeout(() => heart.remove(), 10000); 
        }
        setInterval(createHeart, 300);
    }
});
