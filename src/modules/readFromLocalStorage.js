export function readFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
