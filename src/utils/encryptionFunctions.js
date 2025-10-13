export const encryptCaesar = (text, shift = 3) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + shift) % 26) + 65);
    if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + shift) % 26) + 97);
    return char;
  }).join('');
};

export const encryptXOR = (text, key = 'SECRET') => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  const utf8Bytes = new TextEncoder().encode(result);
  const binary = Array.from(utf8Bytes).map(b => String.fromCharCode(b)).join('');
  return btoa(binary);
};

export const encryptVigenere = (text, key = 'KEY') => {
  key = key.toUpperCase();
  let result = '', keyIndex = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i], code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      const shift = key.charCodeAt(keyIndex % key.length) - 65;
      result += String.fromCharCode(((code - 65 + shift) % 26) + 65); keyIndex++;
    } else if (code >= 97 && code <= 122) {
      const shift = key.charCodeAt(keyIndex % key.length) - 65;
      result += String.fromCharCode(((code - 97 + shift) % 26) + 97); keyIndex++;
    } else result += char;
  }
  return result;
};

export const encryptROT13 = (text) => encryptCaesar(text, 13);

export const encryptAtbash = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCharCode(90 - (code - 65));
    if (code >= 97 && code <= 122) return String.fromCharCode(122 - (code - 97));
    return char;
  }).join('');
};

export const encryptReverse = (text) => text.split('').reverse().join('');

export const encryptBase64 = (text) => {
  const utf8Bytes = new TextEncoder().encode(text);
  const binary = Array.from(utf8Bytes).map(b => String.fromCharCode(b)).join('');
  return btoa(binary);
};

export const encryptSimpleSubstitution = (text) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const cipher = 'qwertyuiopasdfghjklzxcvbnm';
  return text.split('').map(char => {
    const lower = char.toLowerCase();
    const index = alphabet.indexOf(lower);
    if (index !== -1) return char === char.toUpperCase() ? cipher[index].toUpperCase() : cipher[index];
    return char;
  }).join('');
};

export const encryptRailFence = (text, rails = 3) => {
  if (rails <= 1 || text.length <= rails) return text;
  const fence = Array.from({ length: rails }, () => []);
  let rail = 0, direction = 1;
  for (let char of text) {
    fence[rail].push(char);
    rail += direction;
    if (rail === 0 || rail === rails - 1) direction *= -1;
  }
  return fence.map(row => row.join('')).join('');
};

export const encryptPlayfair = (text, key = 'KEYWORD') => {
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
  const keySquare = [...new Set((key + alphabet).toUpperCase().replace(/J/g, 'I'))].slice(0, 25);
  const findPos = (char) => {
    const index = keySquare.indexOf(char);
    return [Math.floor(index / 5), index % 5];
  };
  let prepared = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
  let digraphs = [];
  for (let i = 0; i < prepared.length; i++) {
    let a = prepared[i], b = prepared[i + 1];
    if (a === b || !b) { b = 'X'; i++; } else i++;
    digraphs.push([a, b]);
  }
  let result = '';
  for (let [a, b] of digraphs) {
    const [r1, c1] = findPos(a), [r2, c2] = findPos(b);
    if (r1 === r2) { result += keySquare[r1 * 5 + (c1 + 1) % 5]; result += keySquare[r2 * 5 + (c2 + 1) % 5]; }
    else if (c1 === c2) { result += keySquare[((r1 + 1) % 5) * 5 + c1]; result += keySquare[((r2 + 1) % 5) * 5 + c2]; }
    else { result += keySquare[r1 * 5 + c2]; result += keySquare[r2 * 5 + c1]; }
  }
  return result;
};

export const encryptBaconian = (text) => {
  const map = {
    A: 'AAAAA', B: 'AAAAB', C: 'AAABA', D: 'AAABB', E: 'AABAA',
    F: 'AABAB', G: 'AABBA', H: 'AABBB', I: 'ABAAA', J: 'ABAAB',
    K: 'ABABA', L: 'ABABB', M: 'ABBAA', N: 'ABBAB', O: 'ABBBA',
    P: 'ABBBB', Q: 'BAAAA', R: 'BAAAB', S: 'BAABA', T: 'BAABB',
    U: 'BABAA', V: 'BABAB', W: 'BABBA', X: 'BABBB', Y: 'BBAAA',
    Z: 'BBAAB'
  };
  return text.split('').map(c => {
    const upper = c.toUpperCase();
    return map[upper] || '00000';
  }).join('');
};

export const encryptPolybius = (text) => {
  const square = [
    ['A','B','C','D','E'],
    ['F','G','H','I','K'],
    ['L','M','N','O','P'],
    ['Q','R','S','T','U'],
    ['V','W','X','Y','Z']
  ];
  return text.toUpperCase().replace(/J/g, 'I').split('').map(c => {
    for (let r = 0; r < 5; r++) {
      for (let col = 0; col < 5; col++) {
        if (square[r][col] === c) {
          const rowBin = (r + 1).toString(2).padStart(3, '0');
          const colBin = (col + 1).toString(2).padStart(3, '0');
          return rowBin + colBin;
        }
      }
    }
    return '000000';
  }).join('');
};

export const encryptAutokey = (text, key='KEY') => {
  key = key.toUpperCase();
  let result = '', extendedKey = key + text.toUpperCase(), keyIndex = 0;
  for(let char of text){
    const code = char.charCodeAt(0);
    if(code>=65 && code<=90){
      const shift = extendedKey.charCodeAt(keyIndex) - 65;
      result += String.fromCharCode(((code - 65 + shift) % 26)+65);
      keyIndex++;
    } else if(code>=97 && code<=122){
      const shift = extendedKey.charCodeAt(keyIndex) - 65;
      result += String.fromCharCode(((code - 97 + shift) % 26)+97);
      keyIndex++;
    } else result += char;
  }
  return result;
};