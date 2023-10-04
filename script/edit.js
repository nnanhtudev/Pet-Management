"use strict";
import { breedArr, renderBreed } from "./breed.js";
const inputId = document.getElementById("input-id");
const inputName = document.getElementById("input-name");
const inputAge = document.getElementById("input-age");
const inputType = document.getElementById("input-type");
const inputWeight = document.getElementById("input-weight");
const inputLength = document.getElementById("input-length");
const inputColor1 = document.getElementById("input-color-1");
const inputBreed = document.getElementById("input-breed");
const inputVaccinated = document.getElementById("input-vaccinated");
const inputDewormed = document.getElementById("input-dewormed");
const inputSterilized = document.getElementById("input-sterilized");
const mainFormTable = document.getElementById("main");

let getPet = JSON.parse(getFromStorage("petArr"));
console.log("🚀 ~ file: edit.js:4 ~ getPet:", getPet);
function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", options);
}
renderFormTable(getPet);
function renderFormTable(getPet) {
  const tBody = document.querySelector("#tbody");
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
inputType.addEventListener("change", function () {
  // Lọc danh sách Breed theo loại đã chọn
  const selectedType = inputType.value;
  const filteredBreedsType = breedArr.filter((breed) => breed.type === selectedType);
  console.log("🚀 ~ file: script.js:255 ~ filteredBreeds:", selectedType);
  inputBreed.innerHTML = "";
  // Gọi hàm renderBreed để hiển thị danh sách Breed tương ứng
  renderBreed(filteredBreedsType);
});
