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

export function clearInput() {
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
