let characters = [{ name: "", initiative: null }];

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
  };

  characters.push(newCharacter);

  //Mise dans l'ordre d'initiative décroissante

  characters.sort((a, b) => b.initiative - a.initiative);
  updateCharacterList();
};

// Mise a jour de l'array

const updateCharacterList = () => {
  const charactersNameTOList = document.getElementById("charactersNameTOList");
  const charactersInitTOList = document.getElementById("charactersInitTOList");

  charactersNameTOList.innerHTML = "";
  charactersInitTOList.innerHTML = "";

  characters.forEach((character) => {
    // Ajout Nom de nouveau Charac
    const newCharacterName = document.createElement("li");
    newCharacterName.textContent = character.name;
    charactersNameTOList.appendChild(newCharacterName);

    //Ajout nouvelle Init Charac
    const newCharacterInit = document.createElement("li");
    newCharacterInit.textContent = character.initiative;
    charactersInitTOList.appendChild(newCharacterInit);
  });
};
