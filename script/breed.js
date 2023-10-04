"use strict";

const btnSubmit = document.getElementById("submit-btn");
const inputName = document.getElementById("input-breed");
const inputType = document.getElementById("input-type");

export let breedArr = [];
let idCounter = 1;

function getDataBreed() {
  let name = inputName.value;
  let type = inputType.value;
  return {
    id: idCounter++,
    name,
    type,
  };
}

export function renderBreed(breeds) {
  const getBreed = getFromStorage("breedArr");
  if (getBreed) {
    console.log(getBreed);
    try {
      breedArr = JSON.parse(getBreed);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }
  const inputBreed = document.getElementById("input-breed");
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.textContent = breed.name;
    inputBreed.appendChild(option);
  });
}

if (window.location.pathname === "/page/breed.html") {
  function validateFormPetal() {
    let formData = getDataBreed();
    if (formData.name == "" || formData.type == "Select Type") {
      alert("Name and Type cannot be empty");
      return;
    } else if (!isNaN(formData.name)) {
      alert("Do not enter numbers in Name");
      return;
    }
    breedArr.push(formData);
    clearInput();
    console.log(breedArr);
    renderBreedTableIndex(breedArr);
    saveToStorage("breedArr", breedArr);
  }

  function clearInput() {
    inputName.value = "";
    inputType.value = "Select Type";
  }
  renderBreedTableIndex(breedArr);
  function renderBreedTableIndex(breedArr) {
    const tbodyBreed = document.getElementById("tbody");
    tbodyBreed.innerHTML = "";
    breedArr.forEach((breed) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
      <td>${breed.id}</td>
      <td>${breed.name}</td>
      <td>${breed.type}</td>
      <td><button type="button" data-breed-id=${breed.id}  class="btn btn-danger">Delete</button></td>
      `;
      tbodyBreed.appendChild(newRow);
      const deleteButton = newRow.querySelector(".btn-danger");
      deleteButton.addEventListener("click", function () {
        const breedId = deleteButton.getAttribute("data-breed-id");
        console.log(breedId);
        deleteBreedById(breedId);
      });
    });
  }
  function deleteBreedById(id) {
    const index = breedArr.findIndex((breed) => breed.id == id);
    if (confirm("Are you sure you want to delete")) {
      if (index !== -1) {
        breedArr.splice(index, 1);
        saveToStorage("breedArr", breedArr);
        renderBreedTableIndex(breedArr);
      } else {
        console.log(`Breed with ID ${id} not found in BreedArr.`);
      }
    }
  }
  btnSubmit.addEventListener("click", function () {
    validateFormPetal();
    console.log("Submit success");
  });
}
