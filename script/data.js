"use strict";
import { healthyPetArr, petArr } from "../script.js";
import { saveToStorage } from "./storage.js";
const btnExport = document.querySelector("#export-btn");
const btnImport = document.querySelector("#import-btn");
const inputImportFile = document.querySelector("#input-file");

btnExport.addEventListener("click", function () {
  // Chuyển đổi danh sách petArr thành JSON
  var jsonData = JSON.stringify(petArr);
  // Tạo một Blob từ dữ liệu JSON
  var blob = new Blob([jsonData], { type: "application/json" });
  // Tạo tên tệp dựa trên thời gian
  var fileName = "data_export_" + new Date().toISOString() + ".json";
  // Sử dụng FileSaver.js để tải tệp JSON về máy tính
  saveAs(blob, fileName);
});

btnImport.addEventListener("click", function () {
  // Lấy danh sách các tệp được chọn để import (thường là chỉ một tệp)
  var files = inputImportFile.files;

  if (files.length === 0) {
    alert("Please select a JSON file to import.");
    return;
  }

  var selectedFile = files[0];

  // Tạo một FileReader để đọc tệp JSON
  var reader = new FileReader();

  reader.onload = function (event) {
    try {
      // Đọc nội dung tệp JSON và chuyển đổi thành một đối tượng JavaScript
      var importedData = JSON.parse(event.target.result);

      // Lưu importedData vào petArr (chú ý rằng nếu có ID trùng thì giá trị sẽ được ghi đè)
      importedData.forEach((importedPet) => {
        var existingPetIndex = petArr.findIndex((pet) => pet.id === importedPet.id);
        if (existingPetIndex !== -1) {
          petArr[existingPetIndex] = importedPet;
        } else {
          petArr.push(importedPet);
        }
      });

      // Lọc ra các thú cưng healthy và lưu vào healthyPetArr
      var healthyPets = petArr.filter((pet) => {
        if (pet.dewormed === true && pet.vaccinated === true && pet.sterilized === true) {
          return true;
        }
        return false;
      });

      healthyPetArr.length = 0; // Xóa toàn bộ dữ liệu cũ trong healthyPetArr
      Array.prototype.push.apply(healthyPetArr, healthyPets); // Thêm dữ liệu mới

      // Lưu danh sách các thú cưng healthy vào localStorage
      saveToStorage("healthyPetArr", healthyPetArr);

      // Sau khi import, bạn có thể cập nhật giao diện hiển thị danh sách thú cưng
      // bằng cách gọi hàm renderFormTableSearch hoặc tương tự

      alert("Data imported successfully.");
      saveToStorage("petArr", petArr); // Lưu cập nhật petArr
    } catch (error) {
      alert("An error occurred while importing data: " + error.message);
    }
  };

  reader.readAsText(selectedFile);
});
