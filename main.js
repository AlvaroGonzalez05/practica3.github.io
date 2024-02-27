const listaPkmn = document.querySelector("#listaPkmn");
let URL = "https://pokeapi.co/api/v2/pokemon/";
const botonesHeader = document.querySelectorAll(".btn-header");
const input = document.querySelector('.buscador');
let listaNombres = [];

for (let i = 1; i <= 1025; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then(data => {
        mostrarPkmn(data);
        listaNombres.push({ name: data.name, element: listaPkmn.lastChild });
      })
    .catch(error => console.log('Hubo un problema con la petición Fetch: ', error));
}

function mostrarPkmn(data) {
  let tiposh = data.types.map(type =>
      `<p class="${type.type.name} tipo">${type.type.name}</p>`
  );
  tiposh = tiposh.join('');

  let pokeID = data.id.toString();
  if(pokeID.length === 1){
    pokeID = "00" + pokeID;
  }
  else if(pokeID.length === 2){
    pokeID = "0" + pokeID;
  }

  const div = document.createElement("div");
  div.classList.add("pkmn");
  div.innerHTML =`
    <p class="pkmn-id-back">#${pokeID}</p>
    <div class="pkmn-imagen">
      <img src="${data.sprites.other['official-artwork'].front_default}" alt="Sprite ${data.name}">
    </div>
    <div class="pkmn-info">
      <div class="nombre-contenedor">
        <p class="pkmn-id">#${pokeID}</p>
        <h2 class="pkmn-nombre">${data.name}</h2>
      </div>
      <div class="pkmn-tipo">
        ${tiposh}
      </div>
      <div class="pkmn-stats">
        <p class="stat">${data.height / 10}m</p>
        <p class="stat">${data.weight / 10}kg</p>
      </div>
    </div>`;
  listaPkmn.appendChild(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
  const botonID = event.currentTarget.id;

  listaPkmn.innerHTML = "";

  for (let i = 1; i <= 1025; i++) {
    fetch(URL + i)
      .then((response) => response.json())
      .then(data => {
        if(botonID === "ver-todos"){
            mostrarPkmn(data)
        }
        else{
            const tiposh = data.types.map(type => type.type.name);
            if(tiposh.some(tipo => tipo.includes(botonID))){
              mostrarPkmn(data);
            }
        }
      })
      .catch(error => console.log('Hubo un problema con la petición Fetch: ', error));
  }
}));

input.addEventListener('input', function() {
  const inputValue = input.value.trim().toLowerCase();
  listaNombres.forEach(pokemon => {
    const visible = pokemon.name.toLowerCase().includes(inputValue);
    pokemon.element.classList.toggle("hide",!visible);
  });
});