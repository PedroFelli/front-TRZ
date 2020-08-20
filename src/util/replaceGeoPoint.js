const splitString = (str) => {
  const regex = /\((.*?)\)/;
  const lonlat = str.match(regex)[1];

  const arrayOfStrings = lonlat.split(',');
  return arrayOfStrings;
};

export default splitString;
