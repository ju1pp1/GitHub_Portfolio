// TODO: Copy the setCookies function from the previous exercise
function setCookies() {
  const text1 = document.getElementById("text1").value;
  const text2 = document.getElementById("text2").value;
  const checkbox = document.getElementById("checkbox").checked ? 'true' : 'false';

  document.cookie = `text1=${encodeURIComponent(text1)}; path=/`;
  document.cookie = `text2=${encodeURIComponent(text2)}; path=/`;
  document.cookie = `checkbox=${checkbox}; path=/`;
}

// TODO: Implement the getCookie function. It should take a cookie name as an argument and return the cookie value.
function getCookie(name) {
  const cookieArray = document.cookie.split("; ");
  for(let cookie of cookieArray) {
    const [cookieName, cookieValue] = cookie.split("=");
    if(cookieName === name) {
      return decodeURIComponent(cookieValue)
    }
  }
  return "";
}


// DO NOT MODIFY BELOW THIS LINE
document.getElementById('submitButton').addEventListener('click', function() {
  setCookies();
  displayCookies();
});

function displayCookies() {
  document.getElementById('text1Cookie').textContent = "Text1: " + getCookie('text1');
  document.getElementById('text2Cookie').textContent = "Text2: " + getCookie('text2');
  document.getElementById('checkboxCookie').textContent = "Checkbox: " + getCookie('checkbox');
}