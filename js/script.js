let url = "https://api.genderize.io?name=";
let indonesia = "&country_id=ID"
let wrapper = document.getElementById("wrapper");
let predictGender = () => {
  let name = document.getElementById("name").value;
  let error = document.getElementById("error");
  let finalURL = url + name + indonesia;
  console.log(name);
  console.log(finalURL);
  wrapper.innerHTML = "";
  error.innerHTML = "";
  //Check if input field is not empty and the entered name does not contain anything but alphabets.
  if (name.length > 0 && /^[A-Za-z]+$/.test(name)) {
    fetch(finalURL)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        let div = document.createElement("div");
        div.setAttribute("id", "info");
        wrapper.append(div);
       let probability = data.probability * 100
        if (data.gender == "female") {
            div.innerHTML = `<h2 id="result-name">${data.name}</h2><img src="" id="gender-icon"/> <h1 id="gender">Cewek</h1><h4 id="prob">Kemungkinan: ${probability}%</h4>`;
          div.classList.add("female");
          if(data.probability == 1) {
            div.innerHTML = `<h2 id="result-name">${data.name}</h2><img src="" id="gender-icon"/> <h1 id="gender">Cewek</h1><h4 id="prob">Kemungkinan: Sudah Pasti</h4>`;
        }
          document.getElementById("gender-icon")
          .setAttribute("src", "./img/female.jpg");
        } else {
          div.classList.add("male");
          div.innerHTML = `<h2 id="result-name">${data.name}</h2><img src="" id="gender-icon"/> <h1 id="gender">Cowok</h1><h4 id="prob">Kemungkinan: ${probability}%</h4>`;
          if(data.probability == 1) {
              div.innerHTML = `<h2 id="result-name">${data.name}</h2><img src="" id="gender-icon"/> <h1 id="gender">Cowok</h1><h4 id="prob">Kemungkinan: Sudah Pasti</h4>`;
          }
          document.getElementById("gender-icon")
            .setAttribute("src", "./img/male.jpg");
        }
      });
    document.getElementById("name").value = "";
  } else {
    error.innerHTML = "Masukan nama yang benar dan tanpa spasi";
  }
};


document.getElementById("submit").addEventListener("click", predictGender);
window.addEventListener("load", predictGender);