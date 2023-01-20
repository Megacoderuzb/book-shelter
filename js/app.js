//location
let logoutBtn = document.querySelector(".logout-btn");
let user = localStorage.getItem("token");
if (!user) {
  location.replace("../login.html");
}
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace("../login.html");
  localStorage.clear();
  user = false;
});
//location end
let input = $(".input-i");
let select = $("#sel");
let saved = $(".saved");
//fns
function $(name) {
  return document.querySelector(name);
}
function $$(name) {
  return document.createElement(name);
}

let mainFunc = function (start) {
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${input.value}%7D&startIndex=${start}&maxResults=6&orderBy=${select.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      $(".count").textContent = data.totalItems;
      console.log(data);
      let books = data.items;
      let area = $(".cardsarea");
      area.innerHTML = "";
      if (data.totalItems == 0) {
        let nontxt = $$("h2");
        nontxt.style.position = "absolute";
        nontxt.style.top = "30%";
        nontxt.style.left = "40%";
        nontxt.style.zIndex = "999";
        nontxt.textContent = "Hech narsa topilmadi. 😣";
        area.append(nontxt);
      }

      console.log(input.value);

      books.forEach((element) => {
        let i = 0;
        let card = $$("div");
        card.classList.add(
          "card",
          "d-flex",
          "flex-column",
          "justify-content-between"
        );
        let cardImgTop = $$("div");
        cardImgTop.classList.add("card-img-top");
        let cardBody = $$("div");
        cardBody.classList.add(
          "card-body",
          "d-flex",
          "flex-column",
          "justify-content-between"
        );
        let cardTitle = $$("h5");
        cardTitle.classList.add("card-title");
        let titleTxt = element.volumeInfo.title;
        console.log(`${titleTxt} answer: ${titleTxt.length}`);
        cardTitle.textContent = titleTxt;
        if (titleTxt.length > 23) {
          cardTitle.style.height = "4rem";
          cardTitle.style.objectFit = "contain";
          cardTitle.style.overflow = "scroll";
        }
        let cardText = $$("p");
        let cardTxt = element.volumeInfo.authors;
        cardText.textContent = cardTxt;
        cardText.classList.add("card-text");
        cardText.style.matgin = "-2rem";
        let dateText = $$("p");
        dateText.classList.add("card-text");
        dateText.textContent = element.volumeInfo.publishedDate;
        if (cardTxt.length > 2) {
          cardText.style.height = "3rem";
          cardText.style.objectFit = "contain";
          cardText.style.overflow = "scroll";
        }
        if (element?.volumeInfo?.imageLinks?.smallThumbnail) {
          let img = document.createElement("img");
          img.setAttribute(
            "src",
            element.volumeInfo.imageLinks.smallThumbnail +
              `&orderBy=${select.value}`
          );
          img.setAttribute("alt", element.volumeInfo.title);
          console.log(img);
          cardImgTop.append(img);
        }
        let btnGr = $$("div");
        btnGr.classList.add("btn-gr");
        let bookmarkBtn = $$("button");
        bookmarkBtn.setAttribute("value", element.id);
        bookmarkBtn.classList.add("btn", "btn-warning", "bookmark-btn", "w-50");
        bookmarkBtn.addEventListener("click", (e) => {
          e.preventDefault();
          console.log(element.id);
          localStorage.setItem(element.id, element);

          if (localStorage.getItem(element.id)) {
            let miniCard = $$("div");
            localStorage.setItem(element.id + i, "ok");
            miniCard.classList.add(
              "d-flex",
              "justify-content-between",
              "rounded-3"
            );
            miniCard.setAttribute("value", element.id);
            let txts = $$("div");
            let icons = $$("div");
            icons.classList.add(
              "d-flex",
              "justify-content-between",
              "align-items-center"
            );
            let bookIcon = $$("a");
            bookIcon.setAttribute("href", element.volumeInfo.previewLink);
            bookIcon.setAttribute("target", "_blank");

            let iconik = $$("i");
            iconik.classList.add("bx", "bx-book-open");
            iconik.style.color = "#ccc";
            iconik.style.fontSize = "26px";
            bookIcon.append(iconik);
            let cancelIcon = $$("i");
            cancelIcon.setAttribute("value", element.id);
            cancelIcon.classList.add("fa-regular", "fa-rectangle-xmark");
            cancelIcon.style.color = "#f00";
            cancelIcon.style.fontSize = "24px";
            cancelIcon.addEventListener("click", (e) => {
              e.preventDefault();
              $(`#${element.id}`).classList.remove(
                "d-flex",
                "justify-content-between",
                "rounded-3"
              );
              $(`#${element.id}`).classList.add("d-none");
              localStorage.removeItem(element.id + i);
              localStorage.removeItem(element.id);
              saved.remove(miniCard);
            });
            icons.append(bookIcon, cancelIcon);
            let miniTitle = $$("h6");
            miniTitle.textContent = element.volumeInfo.title;
            let miniTxt = $$("p");
            miniTxt.textContent = element.volumeInfo.authors;
            txts.append(miniTitle, miniTxt);
            miniCard.append(txts, icons);
            if (localStorage.getItem(element.id + i)) {
              saved.append(miniCard);
            }
          }
        });
        let moreBtn = $$("button");
        moreBtn.classList.add("btn", "btn-outline-primary", "more-btn", "w-50");
        moreBtn.addEventListener("click", (e) => {
          e.preventDefault();
          let offcbg = $$("div");
          offcbg.classList.add("position-absolute");
          let offcanva = $$("div");
          offcanva.classList.add("offcanva");
          let offctop = $$("div");
          offctop.classList.add(
            "d-flex",
            "justify-content-between",
            "align-items-center"
          );
          let offctitle = $$("h4");
          offctitle.textContent = element.volumeInfo.title;
          let topicon = $$("i");
          topicon.classList.add("bx", "bx-x", "fa-2x");
          topicon.addEventListener("click", (e) => {
            e.preventDefault();
            offcanva.classList.remove("offcanva");
            offcanva.classList.add("d-none");
            offcbg.classList.remove("position-absolute");
          });
          let offcbody = $$("div");
          offcbody.classList.add(
            "d-flex",
            "flex-column",
            "justify-content-center",
            "g-5",
            "align-items-center"
          );
          let image = $$("img");

          image.setAttribute("src", element.volumeInfo.imageLinks.thumbnail);
          let text = $$("p");
          text.style.padding = "1rem 1.2rem";
          text.textContent =
            "Culpa nulla pariatur cupidatat nisi incididunt ea do ipsum. Incididunt quis mollit elit commodo cillum eiusmod reprehenderit labore irure. Cillum et incididunt et nostrud exercitation quis aute laboris non ut adipisicing. Laboris ad minim aute nulla proident deserunt velit anim sunt aliquip ut sit. Exercitation aliquip ullamco officia non aliqua. Sint deserunt aliquip veniam id eiusmod sit consectetur mollit ea aliqua officia consequat. Magna non mollit nisi est commodo voluptate aute id. Deserunt nostrud id do in nisi mollit deserunt non. Pariatur fugiat cillum irure elit sint nisi ad ipsum culpa deserunt cupidatat esse consequat laboris. Id aliquip non consectetur esse proident duis Lorem.";
          let offcfooter = $$("div");
          offcfooter.classList.add("d-flex", "justify-content-center", "g-4");
          let ul = $$("ul");
          ul.classList.add("text-decoration-none", "list-unstyled");
          let li1 = $$("li");
          let li2 = $$("li");
          let li3 = $$("li");
          let li4 = $$("li");
          let li5 = $$("li");
          let myText = $$("p");
          let myText2 = $$("p");
          let myText3 = $$("p");
          let myText4 = $$("p");
          let myText5 = $$("p");
          myText.textContent = "Author(s): ";
          myText2.textContent = "Published: ";
          myText3.textContent = "Publishers: ";
          myText4.textContent = "Categories: ";
          myText5.textContent = "Pages Count:  ";
          li1.append(myText);
          li2.append(myText2);
          li3.append(myText3);
          li4.append(myText4);
          li5.append(myText5);
          let ul2 = $$("ul");
          ul2.classList.add("text-decoration-none", "list-unstyled");
          let lie1 = $$("li");
          let lie2 = $$("li");
          let lie3 = $$("li");
          let lie4 = $$("li");
          let lie5 = $$("li");
          let Text1 = $$("p");
          let Text2 = $$("p");
          let Text3 = $$("p");
          let Text4 = $$("p");
          let Text5 = $$("p");
          Text1.textContent = element.volumeInfo.authors;
          Text2.textContent = element.volumeInfo.publishedDate;
          Text3.textContent = element.volumeInfo.publisher;
          Text4.textContent = element.volumeInfo.categories;
          Text5.textContent = element.volumeInfo.pageCount;
          console.log(element.volumeInfo.categories);
          lie1.append(Text1);
          lie2.append(Text2);
          lie3.append(Text3);
          lie4.append(Text4);
          lie5.append(Text5);
          ul.append(li1, li2, li3, li4, li5);
          ul2.append(lie1, lie2, lie3, lie4, lie5);
          let readOff = $$("a");
          readOff.setAttribute("href", element.volumeInfo.previewLink);
          readOff.setAttribute("target", "_blank");
          readOff.textContent = "Read";
          readOff.style.position = "absolute";
          readOff.style.right = "0";
          readOff.style.width = "60px";
          readOff.classList.add("text-decoration-none", "btn", "btn-secondary");
          offcfooter.append(ul, ul2);
          offcbody.append(image, text);
          offctop.append(offctitle, topicon);
          offcanva.append(offctop, offcbody, offcfooter, readOff);
          $(".container").append(offcbg, offcanva);
        });
        //
        let readBtn = $$("div");

        console.log(element.volumeInfo.previewLink);
        bookmarkBtn.textContent = "Bookmark";
        moreBtn.textContent = "More Info";
        readBtn.innerHTML = `<a href="${element.volumeInfo.previewLink}" class="btn btn-secondary read-btn w-100 h-100 text-decoration-none text-light" target="_blank" rel="noopener noreferrer">Read</a>`;
        btnGr.append(bookmarkBtn, moreBtn, readBtn);
        card.append(cardImgTop);
        card.append(cardBody);
        cardBody.append(cardTitle, cardText, dateText, btnGr);
        area.append(card);
        console.log(element.volumeInfo.title);
        console.log(element.volumeInfo.authors);
        console.log(element.volumeInfo.imageLinks.smallThumbnail);
        console.log(
          `https://www.googleapis.com/books/v1/volumes?q=${input.value}7D&startIndex=0&maxResults=6&orderBy=newest`
        );
        i++;
      });
    });
};
let theme = document.querySelector(".theme");
theme.classList.add("bxs-sun");
theme.classList.add("text-warning");
console.log(123);

theme.addEventListener("click", (e) => {
  e.preventDefault();
  theme.classList.remove("bxs-sun");
  theme.classList.add("bxs-moon");
  theme.classList.remove("text-warning");
  theme.classList.add("text-secondary");
  document.body.style.background = "#161718";
  document.body.style.color = "#fff";
});
theme.addEventListener("dblclick", (e) => {
  e.preventDefault();
  theme.classList.remove("bxs-moon");
  theme.classList.add("bxs-sun");
  theme.classList.remove("text-secondary");
  theme.classList.add("text-warning");
  document.body.style.background = "#fff";
  document.body.style.color = "#161718";
});

if (localStorage.getItem("ok")) {
  let mark = $(".bookmark-btn");
  mark.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.id) {
      localStorage.getItem(e.target.id);
      console.log(1233);
    }
  });
}
if (input.value == " ") {
  area.innerHTML = "";
}
let pageIndex = 0;
let leftBtn = $("#left-btn");
let st = $("#st");
st.textContent = 1 + pageIndex;
let nd = $("#nd");
nd.textContent = 2 + pageIndex;
let mid = $("#mid");
mid.textContent = 3 + pageIndex;
let nn = $("#nn");
nn.textContent = 4 + pageIndex;
let tn = $("#tn");
tn.textContent = 5 + pageIndex;
let rightBtn = $("#right-btn");
// tn.textContent = 5 + pageIndex;
if (pageIndex == 0) {
  leftBtn.setAttribute("disebled", "");
  // leftBtn.style.background = "#444";
  st.classList.add("btn-outline-primary");
}
leftBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (pageIndex > 0) {
    leftBtn.removeAttribute("disebled", "");
    leftBtn.style.background = "inset";
    mainFunc(0);
    pageIndex -= 1;
    st.textContent = 1 - pageIndex;
    nd.textContent = 2 - pageIndex;
    mid.textContent = 3 - pageIndex;
    nn.textContent = 4 - pageIndex;
    tn.textContent = 5 - pageIndex;
  }
});
rightBtn.addEventListener("click", (e) => {
  e.preventDefault();
  leftBtn.removeAttribute("disebled", "");
  leftBtn.style.background = "inset";
  mainFunc(6 * pageIndex);
  pageIndex += 1;
  st.textContent = 1 + pageIndex;
  nd.textContent = 2 + pageIndex;
  mid.textContent = 3 + pageIndex;
  nn.textContent = 4 + pageIndex;
  tn.textContent = 5 + pageIndex;
});

input.addEventListener("input", (e) => {
  e.preventDefault();
  if (input.value !== " ") {
    mainFunc(0);
    st.textContent = 1;
    nd.textContent = 2;
    mid.textContent = 3;
    nn.textContent = 4;
    tn.textContent = 5;
  }
});
select.addEventListener("click", (e) => {
  e.preventDefault();
  mainFunc(0);
  st.textContent = 1;
  nd.textContent = 2;
  mid.textContent = 3;
  nn.textContent = 4;
  tn.textContent = 5;
});
