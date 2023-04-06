
const pokeApi = {}

function convertPokesApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.id;
    if(pokemon.number >= 100){
        pokemon.number = `${pokemon.number}`;
    } else if (pokemon.number  >= 10){
        pokemon.number = `0${pokemon.number}`;
    } else {
        pokemon.number = `00${pokemon.number}`;
    }

    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokesApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails);
}

pokeApi.getPokemon = (offset = 0, limit = 1) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemon) => pokemon.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails);
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();

    pokemon.number = pokeDetail.id;
    if(pokemon.number >= 100){
        pokemon.number = `${pokemon.number}`;
    } else if (pokemon.number  >= 10){
        pokemon.number = `0${pokemon.number}`;
    } else {
        pokemon.number = `00${pokemon.number}`;
    }

    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.height = +pokeDetail.height/10;
    pokemon.weight = +pokeDetail.weight/10;

    const abilities = pokemon.abilities = pokeDetail.abilities.map((ability) => ability.ability.name);
    const [ability] = abilities;
    pokemon.ability = ability

    let skills = pokeDetail.moves.map((moveSlot) => moveSlot.move.name);
    skills = skills.slice(0,4);
    pokemon.skills = skills;
    return pokemon;
}