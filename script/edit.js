"use strict";

import { breedArr, renderBreed } from "./breed.js";
import { inputType, inputBreed, btnSubmit } from "./Components/getInput.js";
import { renderFormTableEdit } from "./Components/renderTable.js";
import { validateFormEditPet } from "./Components/validPet.js";
import { petArr } from "../script.js";

renderFormTableEdit(petArr);

inputType.addEventListener("change", function () {
  // Lọc danh sách Breed theo loại đã chọn
  const selectedType = inputType.value;
  const filteredBreedsType = breedArr.filter((breed) => breed.type === selectedType);
  console.log("🚀 ~ file: script.js:255 ~ filteredBreeds:", selectedType);
  inputBreed.innerHTML = "";
  // Gọi hàm renderBreed để hiển thị danh sách Breed tương ứng
  renderBreed(filteredBreedsType);
});
btnSubmit.addEventListener("click", function () {
  console.log("click success");
  validateFormEditPet();
});
