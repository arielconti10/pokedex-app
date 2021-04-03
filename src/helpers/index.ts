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
