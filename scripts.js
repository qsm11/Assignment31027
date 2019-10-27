const PLANETS = "planets/";
let planetPageNo = 1;

const btn = document.getElementById("btn");
btn.addEventListener("click", nextPage);

function nextPage() {
  if (planetPageNo < 2) {
    planetPageNo++;
    console.log(planetPageNo);
    showPlanets();
  } else {
    console.log("no more pages");
    btn.classList.add("unavailable");
  }
}

async function showPlanets() {
  const response = await fetch(
    `https://swapi.co/api/${PLANETS}?page=${planetPageNo}`
  );
  const json = await response.json();
  const planets = json.results;

  const planetContainer = document.getElementById("planets");
  const ul = document.createElement("ul");

  planets.forEach(planet => {
    const li = document.createElement("li");
    li.innerText = planet.name;
    li.id = planet.name;
    ul.appendChild(li);

    li.addEventListener("click", showInfo);

    function showInfo() {
      if (li.childNodes.length === 1) {
        const span = document.createElement("span");
        span.innerText = `climate: ${planet.climate}\r terrain: ${
          planet.terrain
        }, `;
        li.appendChild(span);
      } else {
        console.log("...");
        window.location.reload(false);
      }
    }
  });
  planetContainer.appendChild(ul);
}

window.onload = showPlanets();
