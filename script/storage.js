"use strict";

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getFromStorage(key, defaultVal) {
  return localStorage.getItem(key) ?? defaultVal;
}
