"use strict";

import { breedArr, renderBreed } from "./breed.js";
import { formatDate } from "./Components/formatDate.js";
import { renderFormTableSearch } from "./Components/pet-management/renderTable.js";
import {
  tBody,
  inputId,
  inputName,
  inputType,
  inputBreed,
  inputVaccinated,
  inputDewormed,
  inputSterilized,
  btnFind,
} from "./Components/pet-management/getInput.js";
import { petArr } from "../script.js";
import { checkSearchResults } from "./Components/pet-management/validPet.js";
console.log("🚀 ~ file: search.js:6 ~ petArr:", petArr);

renderBreed(breedArr);

renderFormTableSearch(petArr);

btnFind.addEventListener("click", function () {
  checkSearchResults();
});
