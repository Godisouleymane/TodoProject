const selectCategorie = document.getElementById('select-categorie');
const inputTitre = document.getElementById('input-titre');
const inputDate = document.getElementById('input-date');
const textArea = document.getElementById('text-area');
const selectStatut = document.getElementById('select-statut');
const monButtonAjouter = document.getElementById('mon-button');
const allTaches = document.querySelector('.allTaches')
const tBody = document.getElementById('tbody');
const maTable = document.getElementById('table');
const cardNotification = document.querySelector('.card-notification');
let tache_id = 1;



function saveToLocalStorage() {


    const selectCategorieValue = selectCategorie.value;
    const inputTitreValue = inputTitre.value;
    const inputDateValue = inputDate.value;
    const textAreaValue = textArea.value;
    const selectStatutValue = selectStatut.value;
    // verifier si les cartItems sont deja stocker dans le localStorage 
    let getItems = JSON.parse(localStorage.getItem('tacheItems')) || [];

    // Créer un nouvel objet représentant la tache
    const newTachesItems = {
        titre: inputTitreValue,
        date: inputDateValue,
        categorie: selectCategorieValue,
        id: tache_id,
        statut: selectStatutValue,
        area: textAreaValue
    };

    // Ajouter le nouvel objet à la liste des cartItems
    getItems.push(newTachesItems);

    // Enregistrer la liste mise à jour dans le localStorage
    localStorage.setItem('tacheItems', JSON.stringify(getItems));

}

function notification(element, title, message) {
    element.classList.remove('hidden');
    element.innerHTML = `
    <div class="card-header text-white text-center fw-bolder">
        <h5 class="text-center">${title}</h5>
    </div>
    <div class="card-body">
        <h5 class="text-center">${message}</h5>
    </div>`;
setTimeout(() => {
    element.classList.add('hidden')
}, 2000);
}


const afficherElementsDansListesDeTaches = () => {
    tBody.innerHTML = '';
    let tacheItems = JSON.parse(localStorage.getItem('tacheItems')) || [];
    tacheItems.forEach(item => {
        const tacheItem = document.createElement('tr');
        tacheItem.innerHTML = `
            <th scope="row">${item.id}</th>
            <td>${item.date}</td>
            <td>${item.titre}</td>
            <td>${item.categorie}</td>
            <td>
                <div class="operation-button gap-1 d-flex justify-content-center">
                    <span class="voir-button">
                        <i class="bi bi-eye-fill" data-id="${item.id}"></i>
                    </span>
                    <span class="edit-button">
                        <i class="bi bi-pencil-fill" data-id="${item.id}"></i>
                    </span>
                    <span class="delete-button">
                        <i class="bi bi-trash" data-id="${item.id}"></i>
                    </span>
                </div>
            </td>
        `;
        
        tBody.appendChild(tacheItem);
        maTable.appendChild(tBody)
        allTaches.appendChild(maTable)
    });
}

afficherElementsDansListesDeTaches();

window.addEventListener('load', () => {
    // Récupérer la dernière valeur d'ID stockée dans le localStorage
    const lastTacheId = parseInt(localStorage.getItem('lastTacheId')) || 0;
    
    // Initialiser tache_id avec la dernière valeur d'ID + 1 ou 1 par défaut
    tache_id = lastTacheId === 0 ? 1 : lastTacheId;
    
    // Afficher les éléments dans la liste des taches
    afficherElementsDansListesDeTaches();
});



function viderLesInputs() {
   
    selectCategorie.value = "";
    selectStatut.value = "";
    inputDate.value = "";
    inputTitre.value = "";
    textArea.value = "";
}


monButtonAjouter.addEventListener('click', () => {
    saveToLocalStorage();
    afficherElementsDansListesDeTaches()
    tache_id++
    // Mettre à jour la dernière valeur d'ID stockée dans le localStorage
    localStorage.setItem('lastTacheId', tache_id);
    viderLesInputs();
    notification(cardNotification, "Ajout de tache", "L'enregistrement s'est effectue avec succes")

})


// Fonction pour supprimer une tâche par ID
function supprimerTacheParId(id) {
    let tacheItems = JSON.parse(localStorage.getItem('tacheItems')) || [];
    
    // Filtrer les tâches pour exclure celle avec l'ID spécifié
    tacheItems = tacheItems.filter(item => item.id !== id);
    
    // Mettre à jour le localStorage avec la nouvelle liste de tâches
    localStorage.setItem('tacheItems', JSON.stringify(tacheItems));
    
    // Mettre à jour la dernière valeur d'ID dans le localStorage
    const lastTacheId = tacheItems.length > 0 ? tacheItems[tacheItems.length - 1].id : 0;
    localStorage.setItem('lastTacheId', lastTacheId);
    
    // Mettre à jour l'affichage
    afficherElementsDansListesDeTaches();
}


// Ajoutez un gestionnaire d'événements aux boutons "delete-button"
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('bi-trash')) {
        // Récupérer l'ID de la tâche à supprimer depuis l'attribut data-id
        const idToDelete = parseInt(e.target.getAttribute('data-id'));
        
        // Appeler la fonction pour supprimer la tâche par ID
        supprimerTacheParId(idToDelete);
    }
});

















































































































let myChart = document.getElementById('myDoughnutChart');
let myDoughnutChart = new Chart(myChart, {
    type: 'doughnut',
    data: {
        labels: [],
        datasets: [{
            data: [100, 20, 49],
            backgroundColor: ['red', 'green', 'blue'],
            borderColor: [],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
    },

});