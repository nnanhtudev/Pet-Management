// Calculate BMI Pet
export function calculateBmiPet(pet) {
  if (pet.type === "Dog") {
    return (pet.weight * 703) / pet.length ** 2;
  } else {
    return (pet.weight * 886) / pet.length ** 2;
  }
}
