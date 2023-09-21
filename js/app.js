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
const monButtonUpdate = document.getElementById('mon-button-update');
const firstCardHeader = document.querySelector('.first-card-header')
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
    notification(cardNotification, "Ajout de tache", "L'enregistrement s'est effectue avec succes");
    mettreAJourGraphique()

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
    mettreAJourGraphique()
    tache_id--;
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


// Ajouter un gestionnaire d'événements aux boutons "edit-button"
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('bi-pencil-fill')) {
        // Récupérer l'ID de la tâche à éditer depuis l'attribut data-id
        const idToEdit = parseInt(e.target.getAttribute('data-id'));
        
        // Récupérer les données de la tâche à partir du localStorage
        const tacheToEdit = JSON.parse(localStorage.getItem('tacheItems')).find(item => item.id === idToEdit);
        
        // Vérifier si tacheToEdit est définie avant de remplir les champs du formulaire
        if (tacheToEdit) {
            // Remplir les champs du formulaire avec les valeurs de la tâche
            inputTitre.value = tacheToEdit.titre;
            inputDate.value = tacheToEdit.date;
            selectCategorie.value = tacheToEdit.categorie;
            selectStatut.value = tacheToEdit.statut;
            textArea.value = tacheToEdit.area;
            
            // Mettre à jour l'ID dans le formulaire (s'il est nécessaire)
            tache_id = idToEdit;
            monButtonUpdate.style.display = 'block';
            monButtonAjouter.style.display = 'none';
            firstCardHeader.classList.add('update-bg')
            firstCardHeader.innerHTML = ` <h5 class="text-white">Mettre une tache a jour</h5>`
        } else {
            console.error("La tâche à éditer n'a pas été trouvée dans le localStorage.");
        }
    }
});

// Ajouter un gestionnaire d'événements au bouton de mise à jour (monButtonUpdate)
monButtonUpdate.addEventListener('click', () => {
    // Récupérer les données actuelles du localStorage
    const tacheItems = JSON.parse(localStorage.getItem('tacheItems'));
    
    // Trouver l'index de la tâche à mettre à jour dans la liste
    const indexToUpdate = tacheItems.findIndex(item => item.id === tache_id);
    
    if (indexToUpdate !== -1) {
        // Mettre à jour la tâche dans la liste
        tacheItems[indexToUpdate] = {
            titre: inputTitre.value,
            date: inputDate.value,
            categorie: selectCategorie.value,
            id: tache_id,
            statut: selectStatut.value,
            area: textArea.value
        };
        
        // Mettre à jour le localStorage avec la liste mise à jour
        localStorage.setItem('tacheItems', JSON.stringify(tacheItems));
        
        // Réinitialiser les champs du formulaire
        inputTitre.value = '';
        inputDate.value = '';
        selectCategorie.value = '';
        selectStatut.value = '';
        textArea.value = '';
        monButtonAjouter.style.display = 'block';
        monButtonUpdate.style.display = 'none';
        firstCardHeader.classList.remove('update-bg')
        firstCardHeader.innerHTML = ` <h5 class="text-white">Ajout de tache</h5>`
          // Mettre à jour l'affichage après la mise à jour
          afficherElementsDansListesDeTaches();
          notification(cardNotification, "Mise a jour", "Mise a jour effectue avec success")
    } else {
        console.error("La tâche à mettre à jour n'a pas été trouvée dans le localStorage.");
    }
});





// Ajoutez un gestionnaire d'événements aux boutons "voir-button"
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('bi-eye-fill')) {
        // Récupérer l'ID de la tâche à afficher depuis l'attribut data-id
        const idToDisplay = parseInt(e.target.getAttribute('data-id'));
        
        // Récupérer les données de la tâche à partir du localStorage
        const tacheToDisplay = JSON.parse(localStorage.getItem('tacheItems')).find(item => item.id === idToDisplay);
        
        // Vérifier si tacheToDisplay est définie avant d'afficher les informations
        if (tacheToDisplay) {
            // Appeler une fonction pour afficher les informations de la tâche
            afficherInformationsTache(tacheToDisplay);
        } else {
            console.error("La tâche à afficher n'a pas été trouvée dans le localStorage.");
        }
    }
});

// Fonction pour afficher les informations de la tâche sélectionnée au centre de la page
function afficherInformationsTache(tache) {
    // Créez une div pour afficher les informations
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('card');
    infoDiv.classList.add('p-0') // Ajoutez des styles CSS appropriés à cette classe
    
    // Remplissez la div avec les informations de la tâche
    infoDiv.innerHTML = `
    <div class="card-header text-center text-white ">
    <h2 class="card-header">Informations de la tâche</h2>          
    </div>
    <div class="card-body">
    <p><strong>Titre:</strong> ${tache.titre}</p>
    <p><strong>Date:</strong> ${tache.date}</p>
    <p><strong>Catégorie:</strong> ${tache.categorie}</p>
    <p><strong>Statut:</strong> ${tache.statut}</p>
    <p><strong>Description:</strong> ${tache.area}</p>
    </div>
        
    `;
    
    // Ajoutez la div au centre de la page
    document.body.appendChild(infoDiv);
    
   
    infoDiv.style.position = 'fixed';
    infoDiv.style.top = '50%';
    infoDiv.style.left = '50%';
    infoDiv.style.transform = 'translate(-50%, -50%)';
    infoDiv.style.backgroundColor = 'white';
    infoDiv.style.padding = '20px';
    infoDiv.style.border = '2px solid #ccc';
    infoDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    
    // Ajoutez un bouton pour fermer la div d'informations
    const cardCloseButton = document.createElement('div');
    cardCloseButton.classList.add('w-100')
    cardCloseButton.classList.add('d-flex');
    cardCloseButton.classList.add('justify-content-center');
    cardCloseButton.classList.add('p-2')
    const closeButton = document.createElement('button');
    cardCloseButton.appendChild(closeButton)
    closeButton.classList.add('close-button')
    closeButton.textContent = 'Fermer';
    closeButton.addEventListener('click', () => {
        // Supprimez la div d'informations lorsque le bouton est cliqué
        document.body.removeChild(infoDiv);
    });
    infoDiv.appendChild(cardCloseButton);
}




let myChart = document.getElementById('myDoughnutChart');
let myDoughnutChart = new Chart(myChart, {
    type: 'doughnut',
    data: {
        labels: [],
        datasets: [{
            label:['nouveau'],
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
    },

});

// Fonction pour mettre à jour le graphique Doughnut
function mettreAJourGraphique() {
    // Obtenez les données actuelles des tâches depuis le localStorage
    const tacheItems = JSON.parse(localStorage.getItem('tacheItems')) || [];

    // Calculez le nombre de statuts "Nouveau", "En cours" et "Terminé"
    const nombreNouveau = tacheItems.filter(item => item.statut === 'Nouveau').length;
    const nombreEnCours = tacheItems.filter(item => item.statut === 'En cours').length;
    const nombreTermine = tacheItems.filter(item => item.statut === 'Terminer').length;

    // Mettez à jour les données du graphique
    // myDoughnutChart.data.labels = ['Nouveau', 'En cours', 'Terminé'];
    myDoughnutChart.data.datasets[0].data = [nombreNouveau, nombreEnCours, nombreTermine];
    myDoughnutChart.data.datasets[0].backgroundColor.push(getRandomColor());
    // Mettez à jour le graphique
    myDoughnutChart.update();
}

// Appelez la fonction pour mettre à jour le graphique au chargement de la page
window.addEventListener('load', () => {
    mettreAJourGraphique();
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  