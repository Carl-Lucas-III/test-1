
//variables
let addNameBtn = document.getElementById("addName");
let addThemeBtn = document.getElementById("addTheme");
let clearNameBtn = document.getElementById("clearName");
let clearThemeBtn = document.getElementById("clearTheme");
let deleteNameBtn = document.getElementById("deleteName");
let deleteThemeBtn = document.getElementById("deleteTheme");
let rndBtn = document.getElementById("rndBtn");


let dName = document.getElementById("display-name");
let dName2 = document.getElementById("display-name2");
let dTheme = document.getElementById("display-theme");
let list = document.getElementById("name-list");
let themeList = document.getElementById("theme-list");
let names = ["Lucas", "Linus"];
let themeNames = [
  "80-tal",
  "70-tal",
  "50-tal",
  "70-tal",
  "90-tal",
  "jazz",
  "superhjältar",
  "Antagonister",
  "rustikt och robust",
];
let history = [];
saveJSON();
loadJSON();

loadNameList();
loadThemeList();
//!--------------------------------------------------------- JSON/local storage -----------------------------------------------------------------

function saveJSON() {
  localStorage.setItem("names", JSON.stringify(names));
  localStorage.setItem("themeNames", JSON.stringify(themeNames));
  localStorage.setItem("history", JSON.stringify(history));
}

function loadJSON() {
  if (localStorage.names !== null || localStorage.names !== "null") {
    names = JSON.parse(localStorage.getItem("names"));
  }

  if (localStorage.themeNames !== null || localStorage.themeNames !== "null") {
    themeNames = JSON.parse(localStorage.getItem("themeNames"));
  }

  if (localStorage.history !== null || localStorage.history !== "null") {
    history = JSON.parse(localStorage.getItem("history"));
  }
}

//!--------------------------------------------------------- loads -----------------------------------------------------------------



function loadThemeList() {
  loadJSON();
  let list = document.getElementById("theme-list");
  themeNames.forEach((item) => {
      let li = document.createElement("li");
      li.innerText = item;
      list.appendChild(li);
  })
  saveJSON();
}



function loadNameList() {
  loadJSON();
  let list = document.getElementById("name-list")
  names.forEach((item) => {
      let li = document.createElement("li");
      li.innerText = item;
      list.appendChild(li);
  })
  saveJSON();
}

//!------------------------------------------------------------- add theme -----------------------------------------------------------------

// themeNames.forEach((item) => {
//   let li = document.createElement("li");
//   li.innerText = item;
//   themeList.appendChild(li);
// });

//& function for theme button V

function addThemes() {
  loadJSON();

  if (document.getElementById("theme").value == "") {
    alert("write themeName");
  }else if (themeNames.includes(document.getElementById("theme").value)) {
      alert("no duplicates")
  } else {

    while (themeList.firstChild) themeList.removeChild(themeList.firstChild);

    let theme = document.getElementById("theme").value;

    themeNames.push(theme);

    themeNames.forEach((item) => {
      let li = document.createElement("li");
      li.innerText = item;
      themeList.appendChild(li);
    });

    deleteThemeBtn.disabled = false;
    deleteThemeBtn.style.color = "black";
    saveJSON();

    document.getElementById("theme").value = "";
    console.log(themeNames);
  } 


}

//!------------------------------------------------------------- clear theme -----------------------------------------------------------------

function clearTheme() {
  loadJSON();

  while (themeList.firstChild) themeList.removeChild(themeList.firstChild);

  themeNames.length = 9;

  themeNames.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item;
    themeList.appendChild(li);
  });

  saveJSON();

  console.log(themeNames);
}

//!------------------------------------------------------------- delete latest theme -----------------------------------------------------------------

function deleteTheme() {
  loadJSON();

  if (themeNames.length <= 9) {
    deleteThemeBtn.disabled = true;
    deleteThemeBtn.style.color = "red";
    saveJSON();
  } else {

    themeNames.pop();

    while (themeList.firstChild) themeList.removeChild(themeList.firstChild);

    saveJSON();

    themeNames.forEach((item) => {
      let li = document.createElement("li");
      li.innerText = item;
      themeList.appendChild(li);
    });
    console.log(themeNames);
  }
}

//!------------------------------------------------------------- add name -----------------------------------------------------------------

// names.forEach((item) => {
//   let li = document.createElement("li");
//   li.innerText = item;
//   list.appendChild(li);
// });

//& function for name button V

function addNames() {
  loadJSON();

  if (document.getElementById("name").value == "") {
    alert("write a name");
  } else {

    while (list.firstChild) list.removeChild(list.firstChild);

    let name = document.getElementById("name").value;

    names.push(name);
    names.forEach((item) => {
      let li = document.createElement("li");
      li.innerText = item;
      list.appendChild(li);
    });

    saveJSON();

    document.getElementById("name").value = "";

    console.log(names);
  }
}

//!------------------------------------------------------------- clear name -----------------------------------------------------------------

function clearName() {
  loadJSON();

  while (list.firstChild) list.removeChild(list.firstChild);

  names.length = 0;

  saveJSON();
  console.log(names);
}

//!------------------------------------------------------------- delete latest name -----------------------------------------------------------------

function deleteName() {
  loadJSON();

  names.pop();

  while (list.firstChild) list.removeChild(list.firstChild);

  saveJSON();

  names.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
  console.log(names);
}

//!-------------------------------------------------------generate random name ----------------------------------------------------------------

function displayName() {
  let first;
  let second;

  first = Math.floor(Math.random() * names.length);

  do {
    second = Math.floor(Math.random() * names.length);
    console.log("i try man");
  } while (first == second);

  dName.innerText = names[first];
  dName2.innerText = names[second];
}
//!-------------------------------------------------------generate random theme ----------------------------------------------------------------

function rndTheme() {
  let f = Math.floor(Math.random() * themeNames.length);
  let randomTheme = themeNames[f];

  return randomTheme;
}

function displayTheme() {
  do {
    dTheme.innerText = rndTheme();
  } while (history.includes(dTheme.textContent));
}

//!-------------------------------------------------------display name and theme ----------------------------------------------------------------

function displayBoth() {
  if (names.length < 2 || themeNames.length == 0) {
    alert("add names to lists");
    console.log("add names");
  } else {
    displayName();
    displayTheme();
  }
}

//!------------------------------------------------------------- history ------------------------------------------------------------------------

function weekHistory() {
  loadJSON();

  if (history.length > 4) {
    history.shift();
    history.push(dTheme.textContent);
  } else {
    history.push(dTheme.textContent);
  }

  saveJSON();

  console.log(history);
}

// saveJSON();
//!------------------------------------------------------------- animation ------------------------------------------------------------------------


// function ani(){

//   document.getElementById('display-theme').className = 'classname';
// }

//!------------------------------------------------------------- Buttons ------------------------------------------------------------------------

addNameBtn.addEventListener("click", () => {
  addNames();
});

addThemeBtn.addEventListener("click", () => {
  addThemes();
});

clearThemeBtn.addEventListener("click", () => {
  clearTheme();
});

clearNameBtn.addEventListener("click", () => {
  clearName();
});

rndBtn.addEventListener("click", () => {
  weekHistory();
  displayBoth();
});

deleteNameBtn.addEventListener("click", () => {
  deleteName();
});

deleteThemeBtn.addEventListener("click", () => {
  deleteTheme();
});


