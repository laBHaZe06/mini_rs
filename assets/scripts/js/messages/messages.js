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
            conversations = await response.json();

            // Sauvegarder dans le localStorage pour persister les données
            localStorage.setItem('conversations', JSON.stringify(conversations));
            renderConversations();
        } catch (error) {
            console.error("Erreur lors du chargement des conversations:", error);
        }
    }

    // Afficher la liste des conversations
    function renderConversations() {
        convContainer.innerHTML = '';
        conversations.forEach(conv => {
            const convElement = document.createElement('div');
            convElement.classList.add('conversation');
            convElement.setAttribute('draggable', 'true'); // Rendre la conversation déplaçable
            convElement.dataset.id = conv.id; // Stocker l'ID dans les données

            convElement.innerHTML = `
                <div class="conversation-in-progress" id="${conv.id}">
                    <h2>${conv.name}</h2>
                    <p>Dernier message : ${conv.messages[conv.messages.length - 1].content}</p>
                </div>
            `;

            // Ajouter les événements pour le drag and drop
            convElement.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', convElement.dataset.id); // Stocker l'ID de la conversation
                e.target.classList.add('dragging'); // Ajouter une classe pour le style
            });

            convElement.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging'); // Retirer la classe après le drag
            });

            convElement.addEventListener('click', () => {
                console.log("Conversation cliquée :", conv.id); // Log de la conversation cliquée
                showConversation(conv); // Affiche la conversation
            });

            // Ajout de l'élément conversation au conteneur
            convContainer.appendChild(convElement);
        });

        // Gérer le drag over pour permettre le drop
        convContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        // Gérer le drop
        convContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text/plain'); // Récupérer l'ID de la conversation déplacée
            const draggedConvIndex = conversations.findIndex(c => c.id === parseInt(id));
            const targetConvIndex = Array.from(convContainer.children).indexOf(e.target.closest('.conversation'));

            if (draggedConvIndex !== -1 && targetConvIndex !== -1 && draggedConvIndex !== targetConvIndex) {
                // Réorganiser la liste des conversations
                const [draggedConv] = conversations.splice(draggedConvIndex, 1); // Supprimer la conversation déplacée
                conversations.splice(targetConvIndex, 0, draggedConv); // Insérer à la nouvelle position
                console.log("Conversations réorganisées :", conversations);

                // Mettre à jour l'affichage
                renderConversations();
            }
        });
    }

    // Afficher les messages d'une conversation
    function showConversation(conv) {
        const chatWindow = document.getElementById('chatWindow');
        chatWindow.innerHTML = '';

        conv.messages.forEach(msg => {
            const messageElement = document.createElement('p');
            messageElement.innerHTML = `<strong>${msg.sender}:</strong> ${msg.content} <em>(${msg.time})</em>`;
            chatWindow.appendChild(messageElement);
        });

        // Stocker l'ID de la conversation active
        messageBox.dataset.activeConvId = conv.id; // Attribuer l'ID
        console.log("ID de la conversation active (dans showConversation) :", messageBox.dataset.activeConvId);
    }

    // Fonction pour envoyer un nouveau message
    sendButton.addEventListener('click', function() {
        const messageContent = messageBox.value.trim();
        const activeConvId = messageBox.dataset.activeConvId; // Récupérer l'ID de la conversation active
        
        console.log("Contenu du message :", messageContent);
        console.log("ID de la conversation active (dans l'envoi du message) :", activeConvId);

        if (messageContent === '') {
            alert('Le message est vide.');
            return;
        }

        if (!activeConvId) {
            alert('Aucune conversation active.'); // Alerte si aucune conversation
            return;
        }

        // Trouver la conversation active
        const conv = conversations.find(c => c.id === parseInt(activeConvId));

        if (conv) {
            console.log("Conversation trouvée :", conv);

            // Créer un nouveau message
            const newMessage = {
                sender: 'Moi',
                content: messageContent,
                time: new Date().toLocaleTimeString()
            };

            // Ajouter le message à la conversation
            conv.messages.push(newMessage);
            console.log("Nouveau message ajouté :", newMessage);

            // Mettre à jour le localStorage
            localStorage.setItem('conversations', JSON.stringify(conversations));

            // Mettre à jour l'affichage
            showConversation(conv);
            messageBox.value = ''; 
        } else {
            console.error("Aucune conversation active trouvée pour cet ID :", activeConvId);
        }
    });

    // Charger les conversations au chargement de la page
    loadConversations();
}

// Assurer que la fonction displayMessage est exposée globalement
window.displayMessage = displayMessage;
