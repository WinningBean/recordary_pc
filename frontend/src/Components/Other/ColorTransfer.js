// 16진수 -> 10진수
const hexToDec = (hex) => {
  return parseInt(hex, 16);
};

// 10진수 -> 16진수
const componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
};

// 10진수 r, g, b -> 16진수 컬러코드
const rgbToHex = (r, g, b) => {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

// 백그라운드에 따라서 폰트컬러색상 변경
const colorContrast = (hexColor) => {
  var red = hexToDec(hexColor.substr(1, 2));
  var green = hexToDec(hexColor.substr(3, 2));
  var blue = hexToDec(hexColor.substr(5, 2));

  var contrast = Math.sqrt(red * red * 0.241 + green * green * 0.691 + blue * blue * 0.068);

  if (contrast > 130) {
    return '#000000';
  } else {
    return '#FFF';
  }
};

export { hexToDec, componentToHex, rgbToHex, colorContrast };
