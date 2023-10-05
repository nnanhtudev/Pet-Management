"use strict";

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function getFromStorage(key, defaultVal) {
  return localStorage.getItem(key) ?? defaultVal;
}
