let characters = [{ name: "", initiative: null, status: "" }];
let charactersStatus = [];

//AJOUT de Name et Init DANS L'ARRAY Characters
const addCharacterTO = () => {
  //RECUPERATION DES INPUTS
  const charactersNameTOInput = document.getElementById(
    "charactersNameTOInput"
  );
  const charactersInitTOInput = document.getElementById(
    "charactersInitTOInput"
  );

  const charactersNameTO = charactersNameTOInput.value;
  const charactersInitTO = parseInt(charactersInitTOInput.value.trim(), 10);

  // SECURISATION DES input

  if (charactersNameTO === "" || isNaN(charactersInitTO)) {
    alert("Veuillez rentrer un nom et une initiative valide");
    return;
  }
  // Mise à jour de l'objet et ajout du Character dans le tableau

  const newCharacter = {
    name: charactersNameTO,
    initiative: charactersInitTO,
    status: charactersStatus,
  };

  characters.push(newCharacter);

  //Mise dans l'ordre d'initiative décroissante

  characters.sort((a, b) => b.initiative - a.initiative);
  updateCharacterList();
};

// Mise a jour de l'array et renvoie HTML
//Recupération des Listes
const updateCharacterList = () => {
  // Récupération des listes
  const charactersNameTOList = document.getElementById("charactersNameTOList");
  const charactersInitTOList = document.getElementById("charactersInitTOList");
  const charactersDeleteTOList = document.getElementById(
    "charactersDeleteTOList"
  );
  const charactersStatusNameList = document.getElementById(
    "charactersStatusNameList"
  );
  const charactersStatusList = document.getElementById("charactersStatusList");

  // Réinitialisation des listes
  charactersNameTOList.innerHTML = "";
  charactersInitTOList.innerHTML = "";
  charactersDeleteTOList.innerHTML = "";
  charactersStatusNameList.innerHTML = "";
  charactersStatusList.innerHTML = "";

  characters.forEach((character, index) => {
    // Ajout du nom du personnage à la TOList
    const newCharacterName = document.createElement("li");
    newCharacterName.textContent = character.name;
    charactersNameTOList.appendChild(newCharacterName);

    // Ajout du même nom au charactersStatusNameList
    const newCharacterNameStatusList = document.createElement("li");
    newCharacterNameStatusList.textContent = character.name;
    charactersStatusNameList.appendChild(newCharacterNameStatusList);

    //Ajout de la ligne de status

    const newCharacterStatusList = document.createElement("li");
    const statusTemplate = document.getElementById("statusTemplate");
    charactersStatusList.appendChild(newCharacterStatusList);

    const newStatus = document.createElement("li");
    newStatus.classList.add("statusList");
    newStatus.innerHTML = `
        <select class="statusType" data-index="${index}">
          <option></option>
          <option value="blind" ${
            character.status === "blind" ? "selected" : ""
          }>Aveuglé</option>
          <option value="stun" ${
            character.status === "stun" ? "selected" : ""
          }>Etourdi</option>
          <option value="Immobilized" ${
            character.status === "Immobilized" ? "selected" : ""
          }>Immobilisé</option>
          <option value="paralyzed" ${
            character.status === "paralyzed" ? "selected" : ""
          }>Paralysé</option>
          <option value="slowed" ${
            character.status === "slowed" ? "selected" : ""
          }>Ralenti</option>
          <option value="overturned" ${
            character.status === "overturned" ? "selected" : ""
          }>Renversé</option>
          <option value="suprised" ${
            character.status === "suprised" ? "selected" : ""
          }>Surpris</option>
      </select>
      <input id="statusDuration" type="number" placeholder="durée">
      <div id="charactersStatusDescription">
          <ul id ="charactersStatusDescriptionList">
              <li></li>
          </ul>
        </div>
        <button class ="add" id="addStatus">+</button>     
  `;
    newCharacterStatusList.appendChild(newStatus);

    // Ajout de l'initiative à la liste
    const newCharacterInit = document.createElement("li");
    newCharacterInit.textContent = character.initiative;
    charactersInitTOList.appendChild(newCharacterInit);

    // Ajout du bouton supprimer
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Effacer";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = (() => {
      return function () {
        characters.splice(index, 1); // Supprime l'entrée
        updateCharacterList(); // Met à jour la liste
      };
    })();

    const newCharacterDelete = document.createElement("li");
    newCharacterDelete.appendChild(deleteButton);
    charactersDeleteTOList.appendChild(newCharacterDelete);
  });
};
