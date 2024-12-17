let characters = [];
let charactersStatus = [];

const newCharacter = {
  name: charactersNameTO,
  initiative: charactersInitTO,
  status: null,
  turn: null,
  deleteButton: null,
};

const addCharacterTO = () => {
  //RECUPERATION DES INPUTS
  const charactersNameTOInput = document.getElementById(
    "charactersNameTOInput"
  );
  const charactersNameTO = charactersNameTOInput.value;
  const charactersInitTOInput = document.getElementById(
    "charactersInitTOInput"
  );
  const charactersInitTO = parseInt(charactersInitTOInput.value.trim(), 10);

  // SECURISATION DES input

  if (charactersNameTO === "" || isNaN(charactersInitTO)) {
    alert("Veuillez rentrer un nom et une initiative valide");
    return;
  }

  // Mise à jour de l'objet et ajout du Character dans le tableau characters

  const newCharacter = {
    name: charactersNameTO,
    initiative: charactersInitTO,
    status: null,
    turn: null,
    deleteButton: true,
  };
  characters.push(newCharacter);

  // TRI du tableau

  characters.sort((a, b) => b.initiative - a.initiative);

  // Récupération des listes et des blocs
  const charactersNameTOList = document.getElementById("charactersNameTOList");
  const charactersInitTOList = document.getElementById("charactersInitTOList");
  const turnTrackerTOList = document.getElementById("turnTrackerTOList");
  const charactersDeleteTOList = document.getElementById(
    "charactersDeleteTOList"
  );
  const charactersStatusNameList = document.getElementById(
    "charactersStatusNameList"
  );
  const charactersStatusList = document.getElementById("charactersStatusList");
  const originalStatusTemplate = document.getElementById("statusTemplate");

  // Réinitialisation des listes
  charactersNameTOList.innerHTML = "";
  charactersInitTOList.innerHTML = "";
  charactersDeleteTOList.innerHTML = "";
  charactersStatusNameList.innerHTML = "";
  charactersStatusList.innerHTML = "";
  turnTrackerTOList.innerHTML = "";

  characters.forEach((character, index) => {
    // Ajout du nom du personnage à la TOList
    const newCharacterName = document.createElement("li");
    newCharacterName.textContent = character.name;
    charactersNameTOList.appendChild(newCharacterName);

    // Ajout du même nom au charactersStatusNameList

    const newCharacterNameStatusList = document.createElement("li");
    newCharacterNameStatusList.textContent = character.name;
    charactersStatusNameList.appendChild(newCharacterNameStatusList);

    // Ajout de l'initiative à la liste
    const newCharacterInit = document.createElement("li");
    newCharacterInit.textContent = character.initiative;
    charactersInitTOList.appendChild(newCharacterInit);

    //Ajout de l'espace pour le turnTracker

    const newTurnTrackerSpace = document.createElement("li");
    newTurnTrackerSpace.textContent = "";
    turnTrackerTOList.appendChild(newTurnTrackerSpace);

    if (newCharacter.deleteButton === true) {
      // Ajout du bouton supprimer (fonction imbriquée)
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Effacer";
      deleteButton.classList.add("delete-btn");

      // Ajoute le bouton dans la liste des suppressions
      const newCharacterDelete = document.createElement("li");
      newCharacterDelete.appendChild(deleteButton);
      charactersDeleteTOList.appendChild(newCharacterDelete);

      deleteButton.addEventListener("click", () => {
        // Supprime le personnage du tableau
        characters.splice(index, 1);

        // Supprime les éléments associés dans le DOM
        newCharacterName.remove();
        newCharacterInit.remove();
        newTurnTrackerSpace.remove();
        deleteButton.remove();
      });
    }
    //récupération du template et clone de ce dernier dans la fonction addCharacterTO()
    // Crée le clone
    const newStatusClone = originalStatusTemplate.content.cloneNode(true);
    newStatusClone.querySelector("select").classList.add("statusType");
    newStatusClone.querySelector("select").setAttribute("data-index", index);

    // Ajout de l'évènement après avoir ajouté le clone au DOM
    newStatusClone
      .querySelector("select")
      .addEventListener("change", (event) => {
        const selectedStatus = event.target.value;
        characters[index].status = selectedStatus;
        console.log(
          `Statut mis à jour pour ${characters[index].name}:`,
          selectedStatus
        );
      });

    // Ajoute le clone à la liste
    charactersStatusList.appendChild(newStatusClone);
  });
};
//WORK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Changement de Status
document.addEventListener("change", (event) => {
  if (event.target.classList.contains("statusType")) {
    const selectedStatus = event.target.value;
    const characterIndex = event.target.getAttribute("data-index");
    characters[characterIndex].status = selectedStatus;
    console.log("Statut mis à jour :", characters);
  }
});

//faire bouger le TurnOrder

const trackerFollower = document.getElementById("follower");
const trackerPrevious = document.getElementById("previous");
const tokenTrackerTOList = document.getElementById("turnTrackerTOList");

const nextTurn = () => {
  const first = document.getElementById("first");
  first.innerHTML =
    '<img src="../IMG/sword.gif" id="tokenTracker" alt="épée combat">';
};

const backTurn = () => {
  const first = document.getElementById("first");
  first.innerHTML = "";
};
trackerFollower.onclick = nextTurn;
trackerPrevious.onclick = backTurn;
