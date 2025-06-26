document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const addMessageBtn = document.getElementById('add-message-btn');
    const messageList = document.getElementById('message-list');

    // Función para guardar los mensajes en localStorage
    function saveMessages() {
        const messages = [];
        // Recorre todos los elementos <li> de la lista y guarda su texto
        messageList.querySelectorAll('li').forEach(item => {
            // El texto del mensaje es el contenido del nodo, sin el botón de eliminar
            messages.push(item.childNodes[0].textContent.trim());
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

        // **Esta es la parte crucial que hace que la 'X' funcione:**
        deleteBtn.addEventListener('click', () => {
            listItem.classList.add('fade-out'); // Agrega la clase para la animación de salida
            listItem.addEventListener('animationend', () => {
                listItem.remove(); // Elimina el elemento del DOM después de la animación
                saveMessages(); // ¡Importante! Guarda los cambios para que se borre permanentemente
            });
        });

        listItem.appendChild(deleteBtn);
        messageList.prepend(listItem); // Agrega el mensaje al principio de la lista
    }

    // Función para cargar los mensajes desde localStorage
    function loadMessages() {
        const storedMessages = localStorage.getItem('loveMessages');
        if (storedMessages) {
            const messages = JSON.parse(storedMessages);
            // Itera sobre el array y agrega cada mensaje a la lista en la página
            messages.forEach(messageText => {
                createMessageElement(messageText);
            });
        }
    }
    
    // Función para agregar un mensaje desde el input
    function addMessage() {
        const messageText = messageInput.value.trim();

        if (messageText !== '') {
            createMessageElement(messageText); // Crea y agrega el elemento
            saveMessages(); // ¡Importante! Guarda el nuevo mensaje
            
            // Limpia el input y enfoca
            messageInput.value = '';
            messageInput.focus();
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

    // Carga los mensajes al iniciar la página
    loadMessages();

    // --- Generador de corazones para la animación ---
    const heartContainer = document.querySelector('.heart-container');
    if (heartContainer) {
        function createHeart() {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.textContent = '❤️'; // El emoji del corazón
            
            // Posición aleatoria en el eje X
            heart.style.left = `${Math.random() * 100}vw`; 
            // Duración de la animación aleatoria
            heart.style.animationDuration = `${Math.random() * 5 + 5}s`; 
            // Retraso de la animación para que no aparezcan todos al mismo tiempo
            heart.style.animationDelay = `-${Math.random() * 5}s`; 
            
            heartContainer.appendChild(heart);
            
            // Elimina el corazón una vez que la animación termina para no sobrecargar el DOM
            setTimeout(() => {
                heart.remove();
            }, 10000); // 10000 ms = 10 segundos
        }

        // Genera un corazón cada 300 milisegundos
        setInterval(createHeart, 300);
    }
});
