const splitString = (str) => {
  const string = str;
  const regex = /\((.*?)\)/;
  const lonlat = string.match(regex)[1];

  const arrayOfStrings = lonlat.split(',');
  return arrayOfStrings;
};

export default splitString;
