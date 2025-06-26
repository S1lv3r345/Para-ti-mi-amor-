document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const addMessageBtn = document.getElementById('add-message-btn');
    const messageList = document.getElementById('message-list');

    // Función para guardar los mensajes en localStorage
    function saveMessages() {
        const messages = [];
        // Recorre todos los elementos <li> de la lista y guarda su texto
        messageList.querySelectorAll('li').forEach(item => {
            // El último hijo es el botón de eliminar, así que tomamos el texto del primer nodo
            const messageText = item.childNodes[0].textContent; 
            messages.push(messageText);
        });
        // Guarda la lista de mensajes como una cadena de texto JSON
        localStorage.setItem('loveMessages', JSON.stringify(messages));
    }

    // Función para cargar los mensajes desde localStorage
    function loadMessages() {
        const storedMessages = localStorage.getItem('loveMessages');
        if (storedMessages) {
            // Convierte la cadena de texto de vuelta a un array de mensajes
            const messages = JSON.parse(storedMessages);
            // Itera sobre el array y agrega cada mensaje a la lista en la página
            messages.forEach(messageText => {
                createMessageElement(messageText);
            });
        }
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

        deleteBtn.addEventListener('click', () => {
            listItem.classList.add('fade-out'); // Agrega la clase para la animación
            listItem.addEventListener('animationend', () => {
                listItem.remove(); // Elimina el elemento después de la animación
                saveMessages(); // ¡Importante! Guarda los cambios después de eliminar
            });
        });

        listItem.appendChild(deleteBtn);
        messageList.prepend(listItem); // Agrega el mensaje al principio de la lista

        // Animación de aparición
        // Nota: Solo la usamos para nuevos mensajes, no para los que se cargan
        // listItem.classList.add('new-message');
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

    // ¡Carga los mensajes al iniciar la página!
    loadMessages();
});
