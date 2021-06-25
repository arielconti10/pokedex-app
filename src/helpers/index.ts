export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getAttributeShortName = (attribute: string) => {
  switch (attribute) {
    case 'attack':
      return 'AKT';
    case 'defense':
      return 'DEF';
    case 'special-attack':
      return 'SATK';
    case 'special-defense':
      return 'SDEF';
    case 'speed':
      return 'SPD';
    default:
  }
  return attribute;
};

export const getPokemonId = (pokemonData: any) => {
  let pokemonId;
  if (pokemonData) {
    pokemonId = pokemonData.id.toString();
    if (pokemonData.id < 10) {
      pokemonId = '00' + pokemonId;
    } else if (pokemonData.id >= 10 && pokemonData.id < 100) {
      pokemonId = '0' + pokemonId;
    }
  }

  return pokemonId;
};
