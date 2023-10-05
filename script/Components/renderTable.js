import { buttonCalculate } from "../../script.js";
import { formatDate } from "./formatDate.js";
import { tBody } from "./getInput.js";
import { calculateBmiPet } from "./pet-management/calculateBMI.js";
import { deletePetById } from "../../script.js";
import {
  inputId,
  inputName,
  inputAge,
  inputType,
  inputWeight,
  inputLength,
  inputColor1,
  inputBreed,
  inputVaccinated,
  inputDewormed,
  inputSterilized,
  mainFormTable,
} from "./getInput.js";

export function renderFormTable(petArr) {
  petArr.forEach((pet) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <th scope="row">${pet.id}</th>
      <td>${pet.Name}</td>
      <td>${pet.age}</td>
      <td>${pet.type}</td>
      <td>${pet.weight} kg </td>
      <td>${pet.length} cm</td>
      <td>${pet.breed}</td>
      <td>
        <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
      </td>
      <td>${pet.vaccinated ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'}</td>
      <td>${pet.dewormed ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'}</td>
      <td>${pet.sterilized ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'}</td>
      <td>${buttonCalculate ? calculateBmiPet(pet).toFixed(2) : "?"}</td>
      <td>${formatDate(pet.date)}</td>
      <td><button type="button" data-pet-id=${pet.id} class="btn btn-danger" id="btn-button">Delete</button></td>`;
    tBody.appendChild(newRow);
    const deleteButton = newRow.querySelector(".btn-danger");
    deleteButton.addEventListener("click", function () {
      const petId = deleteButton.getAttribute("data-pet-id");
      deletePetById(petId);
      newRow.remove();
    });
  });
}

export function renderFormTableEdit(getPet) {
  getPet.forEach((item) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <th scope="row">${item.id}</th>
      <td>${item.Name}</td>
      <td>${item.age}</td>
      <td>${item.type}</td>
      <td>${item.weight} kg </td>
      <td>${item.length} cm</td>
      <td>${item.breed}</td>
      <td>
        <i class="bi bi-square-fill" style="color: ${item.color}"></i>
      </td>
      <td>${item.vaccinated ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'}</td>
      <td>${item.dewormed ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'}</td>
      <td>${item.sterilized ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'}</td>
      <td>?</td>
      <td>${formatDate(item.date)}</td>
      <td>
      <button type="button" class="btn btn-warning" data-get-id=${item.id} id="edit-btn-button">Edit</button>
      </td>
    `;
    tBody.appendChild(newRow);
    const editButton = newRow.querySelector("#edit-btn-button");
    editButton.addEventListener("click", function () {
      const getId = editButton.getAttribute("data-get-id");
      const petToEdit = getPet.find((pet) => pet.id === getId);
      console.log("🚀 ~ file: edit.js:52 ~ petToEdit:", petToEdit);
      if (petToEdit) {
        inputId.value = getId;
        inputName.value = petToEdit.Name;
        inputAge.value = petToEdit.age;
        inputType.value = petToEdit.type;
        inputWeight.value = petToEdit.weight;
        inputLength.value = petToEdit.length;
        inputBreed.value = petToEdit.breed;
        console.log("🚀 ~ file: edit.js:61 ~  petToEdit.breed:", petToEdit.breed);
        inputColor1.value = petToEdit.color;
        inputVaccinated.checked = petToEdit.vaccinated;
        inputDewormed.checked = petToEdit.dewormed;
        inputSterilized.checked = petToEdit.sterilized;
        mainFormTable.style.display = "block";
        inputId.disabled = true;
      }
    });
  });
}
