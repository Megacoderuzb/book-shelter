let form = document.querySelector("form");
let email = document.getElementById("exampleInputEmail1");
let password = document.getElementById("exampleInputPassword1");
let error = document.getElementById("errorTxt");
error.style.display = "none";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let login = email.value;
  let password = password.value;
  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      password: password,
      email: login,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        console.log(data.token);
        window.localStorage.setItem("token", data.token);
        window.location.replace("../index.html");
      } else {
        error.style.display = "flex";
        error.style.color = "red";
        error.style.margin = "0 auto";
      }
    });
});
