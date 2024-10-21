function displayMessage() {
    const convContainer = document.getElementById('conversations');
    const messageBox = document.getElementById('messageBox');
    const sendButton = document.getElementById('sendButton');
  
    let conversations = [];

    // Charger les conversations initiales
    async function loadConversations() {
        try {
            const response = await fetch("data/messages/messages.json");
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des messages");
            }
            conversations = await response.json(); // On attend que la réponse soit convertie en JSON

            // Sauvegarder dans le localStorage pour persister les données
            localStorage.setItem('conversations', JSON.stringify(conversations));
            renderConversations(); // Appeler cette fonction une fois les conversations chargées
        } catch (error) {
            console.error("Erreur lors du chargement des conversations:", error);
        }
    }

    // Afficher la liste des conversations
    function renderConversations() {
        convContainer.innerHTML = ''; // On nettoie la zone des conversations

        conversations.forEach(conv => {
            const convElement = document.createElement('div');
            convElement.classList.add('conversation');
            convElement.innerHTML = `
                <h2>${conv.name}</h2>
                <p>Dernier message : ${conv.messages[conv.messages.length - 1].content}</p>
            `;
            convElement.addEventListener('click', () => showConversation(conv));
            convContainer.appendChild(convElement);
        });
    }

    // Afficher les messages d'une conversation
    function showConversation(conv) {
        const chatWindow = document.getElementById('chatWindow');
        chatWindow.innerHTML = ''; // Vider la fenêtre de discussion

        conv.messages.forEach(msg => {
            const messageElement = document.createElement('p');
            messageElement.innerHTML = `<strong>${msg.sender}:</strong> ${msg.content} <em>(${msg.time})</em>`;
            chatWindow.appendChild(messageElement);
        });

        // Stocker l'ID de la conversation active pour l'ajout de nouveaux messages
        messageBox.dataset.activeConvId = conv.id;
    }

    // Fonction pour envoyer un nouveau message
    sendButton.addEventListener('click', function() {
        const messageContent = messageBox.value.trim();
        const activeConvId = messageBox.dataset.activeConvId;

        if (messageContent === '') {
            alert('Le message est vide.');
            return;
        }

        // Trouver la conversation active
        const conv = conversations.find(c => c.id === parseInt(activeConvId));

        if (conv) {
            // Créer un nouveau message
            const newMessage = {
                sender: 'Moi',
                content: messageContent,
                time: new Date().toLocaleTimeString() // Horodatage du message
            };

            // Ajouter le message à la conversation
            conv.messages.push(newMessage);

            // Sauvegarder dans le localStorage
            localStorage.setItem('conversations', JSON.stringify(conversations));

            // Mettre à jour l'affichage
            showConversation(conv);
            messageBox.value = '';  // Vider la zone de texte
        }
    });

    // Charger les conversations au chargement de la page
    loadConversations();
}

// Assurer que la fonction displayMessage est exposée globalement
window.displayMessage = displayMessage;