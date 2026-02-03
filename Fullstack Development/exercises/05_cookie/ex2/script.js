function setCookies() {
  // TODO: Get form values. getElementById() might be useful here.
const text1 = document.getElementById("text1").value;
const text2 = document.getElementById("text2").value;
const checkbox = document.getElementById("checkbox").checked ? 'true' : 'false';

document.cookie = `text1=${encodeURIComponent(text1)}; path=/`;
document.cookie = `text2=${encodeURIComponent(text2)}; path=/`;
document.cookie = `checkbox=${checkbox}; path=/`;
  // TODO: Set cookie for each form value.
  console.log('Cookies set:', document.cookie);
}