import { getDataPet } from "./getDataPet.js";
import { clearInput } from "./clearInput.js";
import { clearTable } from "./clearTable.js";
import { mainFormTable } from "./getInput.js";
import { petArr, healthyPetArr } from "../../script.js";
import { renderFormTable, renderFormTableEdit } from "./renderTable.js";
import { saveToStorage } from "../storage.js";
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
  tBody,
} from "./getInput.js";
export function validateFormAddPet() {
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
  } else if (formData.dewormed === true && formData.vaccinated === true && formData.sterilized === true) {
    healthyPetArr.push(formData);
    saveToStorage("healthyPetArr", healthyPetArr);
  }
  petArr.push(formData);
  clearInput();
  saveToStorage("petArr", petArr);
  renderFormTable([formData]);
}
export function validateFormEditPet() {
  const formData = getDataPet();
  if (
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
  }
  const idToEdit = inputId.value; // Lấy ID của bản ghi cần chỉnh sửa
  const petToEditIndex = petArr.findIndex((pet) => pet.id === idToEdit); // Tìm chỉ mục của bản ghi trong mảng
  if (petToEditIndex !== -1) {
    // Kiểm tra xem bản ghi có tồn tại không
    // Cập nhật dữ liệu từ các trường nhập liệu
    petArr[petToEditIndex].Name = inputName.value;
    petArr[petToEditIndex].age = inputAge.value;
    petArr[petToEditIndex].type = inputType.value;
    petArr[petToEditIndex].weight = inputWeight.value;
    petArr[petToEditIndex].length = inputLength.value;
    petArr[petToEditIndex].breed = inputBreed.value;
    petArr[petToEditIndex].color = inputColor1.value;
    petArr[petToEditIndex].vaccinated = inputVaccinated.checked;
    petArr[petToEditIndex].dewormed = inputDewormed.checked;
    petArr[petToEditIndex].sterilized = inputSterilized.checked;

    // Lưu lại dữ liệu đã cập nhật vào localStorage
    saveToStorage("petArr", JSON.stringify(petArr));
    clearTable(tBody);
    renderFormTableEdit(petArr);
    alert(`You have successfully updated the pet with id: ${idToEdit}`);
    // Sau khi cập nhật xong, bạn có thể ẩn form chỉnh sửa hoặc làm gì đó khác
    mainFormTable.style.display = "none";
  }
}
