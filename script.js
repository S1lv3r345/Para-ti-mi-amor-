document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const addMessageBtn = document.getElementById('add-message-btn');
    const messageList = document.getElementById('message-list');

    // Función para guardar los mensajes en localStorage
    function saveMessages() {
        const messages = [];
        // Recorre todos los elementos <li> de la lista y guarda su texto
        messageList.querySelectorAll('li').forEach(item => {
            // Obtenemos el texto del mensaje excluyendo el botón de eliminar
            const messageText = item.childNodes[0].nodeValue.trim(); 
            messages.push(messageText);
        });
        // Guarda la lista de mensajes como una cadena de texto JSON
        localStorage.setItem('loveMessages', JSON.stringify(messages));
    }

    // Función para crear un nuevo elemento de mensaje (<li>)
    function createMessageElement(messageText) {
        const listItem = document.createElement('li');
        listItem.textContent = messageText;

        // Botón para eliminar el mensaje
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.title = 'Eliminar mensaje';

        // **Evento de clic para eliminar el mensaje**
        deleteBtn.addEventListener('click', () => {
            // Agrega una clase para la animación de salida
            listItem.classList.add('fade-out'); 
            // Elimina el elemento del DOM después de que la animación termine
            listItem.addEventListener('animationend', () => {
                listItem.remove(); 
                saveMessages(); // ¡Guarda los cambios!
            });
        });

        // Adjunta el botón de eliminar al elemento de la lista
        listItem.appendChild(deleteBtn);
        // Agrega el nuevo mensaje al inicio de la lista
        messageList.prepend(listItem); 
    }

    // Función para cargar los mensajes desde localStorage al iniciar
    function loadMessages() {
        const storedMessages = localStorage.getItem('loveMessages');
        if (storedMessages) {
            const messages = JSON.parse(storedMessages);
            // Itera sobre el array y crea cada mensaje
            messages.forEach(messageText => {
                createMessageElement(messageText);
            });
        }
    }

    // Función para agregar un mensaje desde el input
    function addMessage() {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            createMessageElement(messageText);
            saveMessages(); // Guarda el nuevo mensaje

            // Limpia el input
            messageInput.value = '';
            messageInput.focus();
        }
    }

    // Asigna los eventos de clic y tecla a los botones
    addMessageBtn.addEventListener('click', addMessage);
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            addMessage();
        }
    });

    // Llama a la función para cargar mensajes al iniciar la página
    loadMessages();

    // --- Generador de corazones (revisa que este código esté completo) ---
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

            setTimeout(() => {
                heart.remove();
            }, 10000); 
        }
        setInterval(createHeart, 300);
    }
});
