const terrain = [
  {
    name: "Mountains",
    image: '<img src="/images/mountains.jpeg" width="200px" height="200px">',
  },
  {
    name: "Grassland",
    image: '<img src="/images/grassland.jpeg" width="200px" height="200px">',
  },
  {
    name: "Plains",
    image: '<img src="/images/plains.jpeg" width="200px" height="200px">',
  },
  {
    name: "Forrest",
    image: '<img src="/images/forrest.jpeg" width="200px" height="200px">',
  },
  {
    name: "Desert",
    image: '<img src="/images/desert.jpeg"width="200px" height="200px">',
  },
];

exports.getTerrain = () => {
  return terrain;
};
