document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const addMessageBtn = document.getElementById('add-message-btn');
    const messageList = document.getElementById('message-list');

    // Función para guardar los mensajes en localStorage
    function saveMessages() {
        const messages = [];
        messageList.querySelectorAll('li').forEach(item => {
            // Obtiene solo el texto del mensaje, excluyendo el botón de la 'X'
            const messageText = item.textContent.replace('❌', '').trim();
            messages.push(messageText);
        });
        localStorage.setItem('loveMessages', JSON.stringify(messages));
    }

    // Función para crear un nuevo elemento de mensaje (<li>)
    function createMessageElement(messageText) {
        const listItem = document.createElement('li');
        listItem.textContent = messageText;

        // Crea el botón de eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.title = 'Eliminar mensaje';

        // Agrega el evento de clic al botón
        deleteBtn.addEventListener('click', () => {
            // Inicia la animación de desvanecimiento
            listItem.style.opacity = 0;
            // Elimina el elemento después de la animación (opcional, pero mejora el UX)
            setTimeout(() => {
                listItem.remove();
                saveMessages(); // Guarda los cambios
            }, 300); // Espera 300ms para la animación
        });

        // Añade el botón al elemento de la lista
        listItem.appendChild(deleteBtn);
        // Agrega el nuevo mensaje al principio de la lista
        messageList.prepend(listItem);
    }

    // Función para cargar los mensajes desde localStorage
    function loadMessages() {
        const storedMessages = localStorage.getItem('loveMessages');
        if (storedMessages) {
            const messages = JSON.parse(storedMessages);
            messages.forEach(messageText => createMessageElement(messageText));
        }
    }

    // Función para agregar un mensaje desde el input
    function addMessage() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            createMessageElement(messageText);
            saveMessages();
            messageInput.value = '';
            messageInput.focus();
        }
    }

    // Event listeners principales
    addMessageBtn.addEventListener('click', addMessage);
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            addMessage();
        }
    });

    // Carga los mensajes al iniciar la página
    loadMessages();

    // Lógica de los corazones
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
