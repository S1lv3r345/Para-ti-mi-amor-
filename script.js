document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const addMessageBtn = document.getElementById('add-message-btn');
    const messageList = document.getElementById('message-list');

    // Función para crear y agregar un mensaje a la lista
    function addMessage() {
        const messageText = messageInput.value.trim();

        if (messageText !== '') {
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
                });
            });

            listItem.appendChild(deleteBtn);
            messageList.prepend(listItem); // Agrega el mensaje al principio de la lista

            // Animación de aparición
            listItem.classList.add('new-message');
            
            // Limpia el input
            messageInput.value = '';
            
            // Haz que el área de texto vuelva a estar enfocada
            messageInput.focus();
        }
    }

    // Agrega el mensaje al hacer clic en el botón
    addMessageBtn.addEventListener('click', addMessage);

    // Agrega el mensaje al presionar Enter en el textarea
    messageInput.addEventListener('keydown', (event) => {
        // Verifica si la tecla presionada es Enter y no Shift+Enter
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Evita que se agregue un salto de línea
            addMessage();
        }
    });
});