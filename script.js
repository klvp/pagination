/** @format */
// import axios from "axios";

import users from "./users.js";

const users_data = users();

document.querySelector("body").innerHTML = `<div class="container">
      <h1 class="text-primary text-center">Data fetched from API</h1>
      <ul class="list-group"></ul>
      <div id="main-page"></div>
    </div>`;

// const api_url = "https://jsonplaceholder.typicode.com/posts";
const main = document.getElementById("main-page");
const ul = document.querySelector("ul");
window.addEventListener("onload", fetchData());

async function fetchData() {
  // const data = await axios.get(api_url);
  const response = users_data;
  const [listPerPage, listLength] = [10, response.length];
  const pages = listLength / listPerPage;

  let currentPage = 1;
  pagination(pages);
  let endList = listPerPage * currentPage;
  let startList = endList - listPerPage;
  displayContent(response.slice(startList, endList));
  const buttons = main.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      currentPage = +event.target.innerText;
      endList = listPerPage * currentPage;
      startList = endList - listPerPage;
      displayContent(response.slice(startList, endList));
    });
  });
}

function displayContent(data) {
  ul.innerHTML = "";
  data.forEach((post) => {
    const list = document.createElement("li");
    list.classList.add("list-group-item", "list-group-item-primary");
    list.innerHTML = `${post.id} ) ${post.name} ----> ${post.email} `;
    ul.append(list);
  });
}

function pagination(pages) {
  for (let i = 0; i < pages; i++) {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-outline-primary");
    button.setAttribute("value", i + 1);
    button.innerText = i + 1;
    main.append(button);
  }
}
