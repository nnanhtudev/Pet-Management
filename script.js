"use strict";
import { breedArr, renderBreed } from "./script/breed.js";
import { validateFormAddPet } from "./script/Components/pet-management/validPet.js";
import { inputType, inputBreed } from "./script/Components/pet-management/getInput.js";
import { getFromStorage, saveToStorage } from "./script/storage.js";
import { renderFormTable } from "./script/Components/pet-management/renderTable.js";
import { btnSubmit, btnShowPetHealthy, tBody } from "./script/Components/pet-management/getInput.js";
import { calculateBmiPet } from "./script/Components/pet-management/calculateBMI.js";
import { clearTable } from "./script/Components/clearTable.js";

export const btnCalculateBMI = document.getElementById("btn-calculate-bmi");
export let buttonCalculate = false;
export let petArr = [];
let healthyCheck = false;
export let healthyPetArr = [];
const dataHealthyPetArr = getFromStorage("healthyPetArr");
export const storedData = getFromStorage("petArr");
if (storedData) {
  console.log("🚀 ~ file: script.js:27 ~ storedData:", storedData);

  try {
    petArr = JSON.parse(storedData);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}
if (dataHealthyPetArr) {
  console.log("🚀 ~ file: script.js:27 ~ dataHealthyPetArr:", dataHealthyPetArr);
  try {
    healthyPetArr = JSON.parse(dataHealthyPetArr);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}
window.location.pathname === "/index.html" && renderFormTable(petArr);
export function deletePetById(id) {
  if (confirm("Are you sure you want to delete")) {
    const petIndex = petArr.findIndex((pet) => pet.id === id);
    const healthyPetIndex = healthyPetArr.findIndex((pet) => pet.id === id);
    if (petIndex !== -1) {
      petArr.splice(petIndex, 1);
      saveToStorage("petArr", petArr);
    } else {
      console.log(`Pet with ID ${id} not found in petArr.`);
    }
    if (healthyPetIndex !== -1) {
      healthyPetArr.splice(healthyPetIndex, 1);
      saveToStorage("healthyPetArr", healthyPetArr);
    } else {
      console.log(`Pet with ID ${id} not found in healthyPetArr.`);
    }
    // Sau khi xóa, vẽ lại bảng
    clearTable(tBody);
    renderFormTable(healthyCheck ? healthyPetArr : petArr);
  }
}
function checkHealthyPet() {
  healthyCheck = !healthyCheck;
  clearTable(tBody);
  btnShowPetHealthy.textContent = healthyCheck ? "Show All" : "Show Healthy Pet";
  if (healthyCheck === true) {
    renderFormTable(healthyPetArr);
  } else {
    renderFormTable(petArr);
  }
}
if (btnSubmit) {
  // Sử dụng btnSubmit ở đây chỉ khi nó tồn tại
  btnSubmit.addEventListener("click", function () {
    window.location.pathname === "/index.html" && validateFormAddPet();
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
  inputType.addEventListener("change", function () {
    // Lọc danh sách Breed theo loại đã chọn
    const selectedType = inputType.value;
    const filteredBreedsType = breedArr.filter((breed) => breed.type === selectedType);
    console.log("🚀 ~ file: script.js:255 ~ filteredBreeds:", selectedType);
    clearTable(inputBreed);
    // Gọi hàm renderBreed để hiển thị danh sách Breed tương ứng
    renderBreed(filteredBreedsType);
  });
} else {
  console.log("btnSubmit not is.");
}

sidebar.addEventListener("click", function () {
  if (sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
  } else {
    sidebar.classList.toggle("active");
  }
});
