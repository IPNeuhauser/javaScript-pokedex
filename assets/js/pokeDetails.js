const pokemonSection = document.querySelector("#pokemonSelected");
const pokemonContainer = document.querySelector("#pokemonList");

pokemonContainer.addEventListener('click', function (element) {
    const pokemonSelected = element.target.closest('li');
    const pokemonSelectedId = +pokemonSelected.querySelector('.number').innerText.substr(1,2);
    const limit = 1;

    if(pokemonSelectedId !== ''){
        pokeApi.getPokemon(pokemonSelectedId-1, limit)
            .then((pokemon = []) => {
                // console.log(pokemon[0])
                const newHtml = addPokemonDetails(pokemon[0]);
                pokemonSection.innerHTML = newHtml;
            });
    } 
});


function addPokemonDetails(pokemon){
    return `
    <div class="pokemonSelected ${pokemon.type}">
        <ol>
            <li><span class="name">${pokemon.name}</span></li>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </ol>              
    </div>
    <div class="information">
        <span class="title">Status</span>
        <ol class="grade">
            <li class="dados ${pokemon.type}"><strong>Id:</strong> #${pokemon.number}</li>
            <li class="dados ${pokemon.type}"><strong>Height:</strong> ${pokemon.height} m</li>
            <li class="dados ${pokemon.type}"><strong>Weight:</strong> ${pokemon.weight} kg</li>
            <li class="dados ${pokemon.type}"><strong>abilities:</strong> ${pokemon.ability}</li>
        </ol>
        <span class="title">Skills</span>
        <ol class="grade">
            ${pokemon.skills.map((skill) => `<li class="skill ${pokemon.type}">${skill}</li>`).join("")}
        </ol>
    </div> 
    `
};
