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
} from "./getInput.js";

export function getDataPet() {
  let id, Name, age, type, weight, length, color, breed, vaccinated, dewormed, sterilized, date;
  id = inputId.value;
  Name = inputName.value;
  age = inputAge.value;
  type = inputType.value;
  weight = inputWeight.value;
  length = inputLength.value;
  color = inputColor1.value;
  breed = inputBreed.value;
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
