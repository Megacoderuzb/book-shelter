let mail = document.querySelector("#exampleInputEmail1");
let pascode = document.querySelector("#exampleInputPassword1");
let btn = document.querySelector(".form-submit");
let mainFn = function () {
  let user = localStorage.getItem("token");
  if (user) {
    window.location.replace("./index.html");
    console.log(user);
  }
};
// mainFn();

btn.addEventListener("click", function (e) {
  e.preventDefault();
  fetch(
    `https://reqres.in/api/login?q=${mail.value}&password=${pascode.value}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: mail.value,
        password: pascode.value,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data) {
        localStorage.setItem("token", data.token);
        // mainFn();
      }
    })
    .catch((err) => console.log(err.error));
    mainFn();
  });
