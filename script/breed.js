"use strict";

const btnSubmit = document.getElementById("submit-btn");
const inputName = document.getElementById("input-breed");
const inputType = document.getElementById("input-type");

export let breedArr = [];

/* This code is retrieving the value stored in the "breedArr" key from the storage using the
`getFromStorage` function. If a value is retrieved successfully, it is logged to the console. Then,
it tries to parse the retrieved value as JSON and assigns it to the `breedArr` variable. If there is
an error while parsing the JSON, it is caught and logged to the console. */
const getBreed = getFromStorage("breedArr");
if (getBreed) {
  console.log("🚀 ~ file: breed.js:12 ~ getBreed:", getBreed);
  try {
    breedArr = JSON.parse(getBreed);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}
function findEmptyId(breedArr) {
  for (let i = 1; i <= breedArr.length + 1; i++) {
    /* The code `if (!breedArr.some((item) => item.id === i))` is checking if there is no element in
    the `breedArr` array that has an `id` property equal to `i`. */
    if (!breedArr.some((item) => item.id === i)) {
      return i;
    }
  }
  return breedArr.length + 1;
}
function getDataBreed() {
  let name = inputName.value;
  let type = inputType.value;
  const newId = findEmptyId(breedArr);
  return {
    id: newId,
    name,
    type,
  };
}

export function renderBreed(breeds) {
  const inputBreed = document.getElementById("input-breed");
  /* The code is iterating over each element in the `breeds` array and creating an `<option>` element for
each breed. The `textContent` property of the `<option>` element is set to the `name` property of
the current breed. Finally, the `<option>` element is appended as a child to the `inputBreed`
element, which is a select dropdown input. This code is dynamically populating the select dropdown
with options based on the breeds in the `breeds` array. */
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.textContent = breed.name;
    inputBreed.appendChild(option);
  });
}
function clearInput() {
  inputName.value = "";
  inputType.value = "Select Type";
}
window.location.pathname === "/page/breed.html" && renderBreedTableIndex(breedArr);

//renderBreedTableIndex id tbody
function renderBreedTableIndex(breedArr) {
  const tbodyBreed = document.getElementById("tbody");
  tbodyBreed.innerHTML = "";
  /* The code `breedArr.sort((a, b) => a.id - b.id);` is sorting the `breedArr` array in ascending
  order based on the `id` property of each element. */
  breedArr.sort((a, b) => a.id - b.id);
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
      deleteBreedById(breedId);
      alert(`Delete ${breedId} success`);
    });
  });
}
// deleteBreedById(id)
function deleteBreedById(id) {
  const index = breedArr.findIndex((breed) => breed.id == id);
  if (confirm("Are you sure you want to delete")) {
    /* The code block `if (index !== -1) { breedArr.splice(index, 1); saveToStorage("breedArr",
   breedArr); renderBreedTableIndex(breedArr);` is responsible for deleting a breed from the
   `breedArr` array. */
    if (index !== -1) {
      breedArr.splice(index, 1);
      saveToStorage("breedArr", breedArr);
      renderBreedTableIndex(breedArr);
    } else {
      console.log(`Breed with ID ${id} not found in BreedArr.`);
    }
  }
}

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
  /* The code `window.location.pathname === "/page/breed.html" && renderBreedTableIndex(breedArr);` is
  checking if the current URL path is "/page/breed.html". If it is, then it calls the
  `renderBreedTableIndex` function with the `breedArr` array as an argument. This code is
  conditionally rendering the breed table only on the "/page/breed.html" page. */
  window.location.pathname === "/page/breed.html" && renderBreedTableIndex(breedArr);
  saveToStorage("breedArr", breedArr);
}

btnSubmit.addEventListener("click", function () {
  window.location.pathname === "/page/breed.html" && validateFormPetal();
});
