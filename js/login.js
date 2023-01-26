let form = document.querySelector("form");
let mail = document.getElementById("exampleInputEmail1");
let passcode = document.getElementById("exampleInputPassword1");
let error = document.getElementById("errorTxt");
error.style.display = "none";
form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email: mail.value,
      password: passcode.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
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
