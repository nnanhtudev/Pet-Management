"use strict";
import { breedArr, renderBreed } from "./script/breed.js";
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
const btnSubmit = document.getElementById("submit-btn");
const btnShowPetHealthy = document.getElementById("healthy-btn");
const tBody = document.getElementById("tbody");
const btnCalculateBMI = document.getElementById("btn-calculate-bmi");

//1. Bổ sung Animation cho Sidebar
const sidebar = document.getElementById("sidebar");
let id, Name, age, type, weight, length, color, breed, vaccinated, dewormed, sterilized, date;
let buttonCalculate = false;
let petArr = [];
const storedData = getFromStorage("petArr");

if (storedData) {
  console.log(storedData);
  try {
    petArr = JSON.parse(storedData);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}

let healthyCheck = false;
let healthyPetArr = [
  {
    id: "2",
    Name: "Jony",
    age: "15",
    type: "Cat",
    weight: "5",
    length: "15",
    color: "#a83434",
    breed: "Mixed Breed",
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    date: "2023-09-29T17:21:16.926Z",
  },
];

function calculateBmiPet(pet) {
  if (pet.type === "Dog") {
    return (pet.weight * 703) / pet.length ** 2;
  } else {
    return (pet.weight * 886) / pet.length ** 2;
  }
}
function getDataPet() {
  id = inputId.value;
  Name = inputName.value;
  age = inputAge.value;
  type = inputType.value;
  console.log("🚀 ~ file: script.js:68 ~ getDataPet ~ type:", type);
  weight = inputWeight.value;
  length = inputLength.value;
  color = inputColor1.value;
  breed = inputBreed.value;
  console.log("🚀 ~ file: script.js:73 ~ getDataPet ~ breed:", breed);
  vaccinated = inputVaccinated.checked;
  dewormed = inputDewormed.checked;
  sterilized = inputSterilized.checked;
  date = new Date();
  return {
    id,
    Name,
    age,
    type,
    weight,
    length,
    color,
    breed,
    vaccinated,
    dewormed,
    sterilized,
    date,
  };
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", options);
}

function validateFormPet() {
  const formData = getDataPet();
  if (
    formData.id === "" ||
    formData.Name === "" ||
    formData.age === "" ||
    formData.type === "" ||
    formData.weight === "" ||
    formData.length === "" ||
    formData.color === "" ||
    formData.breed === "" ||
    !(formData.vaccinated || formData.dewormed || formData.sterilized)
  ) {
    alert("There are no fields with missing data.");
    return;
  } else if (petArr.some((pet) => pet.id === formData.id)) {
    alert("ID must be unique!");
    return;
  } else if (!isNaN(formData.Name)) {
    alert("Name cannot be a number!");
    return;
  } else if (!(formData.age >= 1 && formData.age <= 15)) {
    alert("Age must be between 1 and 15!");
    return;
  } else if (!(formData.weight >= 1 && formData.weight <= 15)) {
    alert("Weight must be between 1 and 15!");
    return;
  } else if (!(formData.length >= 1 && formData.length <= 100)) {
    alert('"Length must be between 1 and 100!"');
    return;
  } else if (formData.type === "Select Type") {
    alert("Please select Type!");
    return;
  } else if (formData.breed === "Select Breed") {
    alert("Please select Breed!");
    return;
  } else if (formData.dewormed === true && formData.sterilized === true && formData.sterilized === true) {
    healthyPetArr.push(formData);
    console.log("Arr Pet Healthy:", healthyPetArr);
  }
  petArr.push(formData);
  clearInput();
  saveToStorage("petArr", petArr);
  console.log(saveToStorage(petArr));
  renderFormTable([formData]);
  console.log("petArr", petArr);
}

function checkHealthyPet() {
  healthyCheck = !healthyCheck;
  console.log(healthyCheck);
  clearTable(tBody);
  btnShowPetHealthy.textContent = healthyCheck ? "Show All" : "Show Healthy Pet";
  if (healthyCheck === true) {
    renderFormTable(healthyPetArr);
    console.log(healthyPetArr);
  } else {
    renderFormTable(petArr);
  }
}
function clearInput() {
  inputId.value = "";
  inputName.value = "";
  inputAge.value = "";
  inputType.value = "";
  inputWeight.value = "";
  inputLength.value = "";
  inputColor1.value = "";
  inputBreed.value = "";
  inputVaccinated.checked = false;
  inputDewormed.checked = false;
  inputSterilized.checked = false;
}

window.location.pathname === "./index.html" && renderFormTable(petArr);
function renderFormTable(petArr) {
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
      <td><button type="button" data-pet-id=${pet.id} data-pet-healthy-id=${
      healthyPetArr.id
    } class="btn btn-danger">Delete</button></td>`;
    tBody.appendChild(newRow);
    const deleteButton = newRow.querySelector(".btn-danger");
    deleteButton.addEventListener("click", function () {
      const petId = deleteButton.getAttribute("data-pet-id");
      const healthyPetId = deleteButton.getAttribute("data-pet-healthy-id");
      deletePetById(petId);
      deletePetById(healthyPetId);
    });
  });
}
function deletePetById(id) {
  const index = petArr.findIndex((pet) => pet.id === id);
  const indexHealthyPet = healthyPetArr.findIndex((healthyPet) => healthyPet.id === id);
  if (index !== -1) {
    petArr.splice(index, 1);
    saveToStorage("petArr", petArr);
  } else {
    console.log(`Pet with ID ${id} not found in petArr.`);
  }
  if (indexHealthyPet !== -1) {
    healthyPetArr.splice(indexHealthyPet, 1);
    saveToStorage("petArr", petArr);
  } else {
    console.log(`Pet with ID ${id} not found in healthyPetArr.`);
  }
}
function clearTable(key) {
  key.innerHTML = "";
}

btnSubmit.addEventListener("click", function () {
  validateFormPet();
});

btnShowPetHealthy.addEventListener("click", function () {
  checkHealthyPet();
});

btnCalculateBMI.addEventListener("click", function () {
  buttonCalculate = !buttonCalculate;
  if (buttonCalculate) {
    clearTable(tBody);
    calculateBmiPet(petArr);
    renderFormTable(petArr);
  }
});

sidebar.addEventListener("click", function () {
  if (sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
  } else {
    sidebar.classList.toggle("active");
  }
});

inputType.addEventListener("change", function () {
  // Lọc danh sách Breed theo loại đã chọn
  const selectedType = inputType.value;
  const filteredBreedsType = breedArr.filter((breed) => breed.type === selectedType);
  console.log("🚀 ~ file: script.js:255 ~ filteredBreeds:", selectedType);
  clearTable(inputBreed);
  // Gọi hàm renderBreed để hiển thị danh sách Breed tương ứng
  renderBreed(filteredBreedsType);
});
