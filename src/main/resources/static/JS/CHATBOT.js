document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('chatbot-toggle');
    const closeButton = document.getElementById('chatbot-close');
    const chatWindow = document.getElementById('chatbot-window');
    const chatBody = document.querySelector('.chatbot-body');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('chat-send');

    // Función para abrir/cerrar la ventana del chat
    toggleButton.addEventListener('click', function() {
        chatWindow.classList.toggle('d-none');
        if (!chatWindow.classList.contains('d-none')) {
            chatInput.focus();
        }
    });

    // Función para cerrar la ventana del chat
    closeButton.addEventListener('click', function() {
        chatWindow.classList.add('d-none');
    });

    // --- Lógica de Envío de Mensajes ---

    function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (userMessage === "") return;

        // 1. Mostrar mensaje del usuario
        appendMessage(userMessage, 'user');
        chatInput.value = '';

        // 2. Obtener la respuesta instantáneamente desde la lógica JS
        getChatbotResponse(userMessage);
    }
    
    // Función para mostrar mensajes (MANTENIDA)
    function appendMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        
        if (sender === 'user') {
            messageDiv.classList.add('user-message');
            messageDiv.textContent = text;
            messageDiv.style.marginLeft = 'auto'; 
            messageDiv.style.backgroundColor = '#dcf8c6';
            messageDiv.style.color = '#000';
        } else { // Bot
            messageDiv.classList.add('bot-message');
            messageDiv.textContent = text;
        }

        chatBody.appendChild(messageDiv);
        // Desplazarse automáticamente al último mensaje
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // *** LA NUEVA FUNCIÓN: Lógica de Reglas en JS ***
    function getChatbotResponse(message) {
        const lowerCaseMessage = message.toLowerCase();
        let response;

        if (lowerCaseMessage.includes("test") || lowerCaseMessage.includes("vocacional")) {
            response = "El Test Vocacional te ayuda a descubrir tus áreas de interés. Haz clic en el botón 'Test Vocacional' en la barra de navegación para empezar.";
        } else if (lowerCaseMessage.includes("universidad") || lowerCaseMessage.includes("estudiar")) {
            response = "Puedes usar los filtros avanzados a la izquierda para encontrar universidades por tipo, ubicación o presupuesto.";
        } else if (lowerCaseMessage.includes("becas") || lowerCaseMessage.includes("promociones")) {
            response = "Actualmente tenemos becas en la sección 'Ranking & Tendencias Universitarias'. ¡Revisa las promociones destacadas!";
        } else if (lowerCaseMessage.includes("hola") || lowerCaseMessage.includes("ayuda")) {
            response = "¡Hola! Soy ELIJEPE, tu asistente. Pregúntame sobre el Test, filtros de universidades o becas.";
        } else {
            response = "Lo siento, soy un asistente básico y solo puedo resolver dudas sobre el Test Vocacional, becas o universidades.";
        }
        
        // Simular un pequeño retraso para que se vea más natural
        setTimeout(() => {
            appendMessage(response, 'bot');
        }, 500); 
    }
    // **********************************************

    // Eventos para enviar el mensaje
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});