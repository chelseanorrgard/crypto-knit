import { encryptCaesar, encryptROT13, encryptAtbash, encryptReverse } from './encryptionFunctions';

export const decryptCaesar = (text, shift = 3) => encryptCaesar(text, 26 - shift);

export const decryptXOR = (text, key = 'SECRET') => {
  try {
    const decoded = atob(text);
    const bytes = new Uint8Array(decoded.split('').map(c => c.charCodeAt(0)));
    const xorResult = new TextDecoder().decode(bytes);
    let result = '';
    for (let i = 0; i < xorResult.length; i++) {
      result += String.fromCharCode(xorResult.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  } catch { return '[Decryption failed]'; }
};

export const decryptVigenere = (text, key = 'KEY') => {
  key = key.toUpperCase();
  let result = '', keyIndex = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i], code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      const shift = key.charCodeAt(keyIndex % key.length) - 65;
      result += String.fromCharCode(((code - 65 - shift + 26) % 26) + 65); keyIndex++;
    } else if (code >= 97 && code <= 122) {
      const shift = key.charCodeAt(keyIndex % key.length) - 65;
      result += String.fromCharCode(((code - 97 - shift + 26) % 26) + 97); keyIndex++;
    } else result += char;
  }
  return result;
};

export const decryptROT13 = (text) => encryptROT13(text);
export const decryptAtbash = (text) => encryptAtbash(text);
export const decryptReverse = (text) => encryptReverse(text);

export const decryptBase64 = (text) => {
  try {
    const decoded = atob(text);
    const bytes = new Uint8Array(decoded.split('').map(c => c.charCodeAt(0)));
    return new TextDecoder().decode(bytes);
  } catch { return '[Decryption failed]'; }
};

export const decryptSimpleSubstitution = (text) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const cipher = 'qwertyuiopasdfghjklzxcvbnm';
  return text.split('').map(char => {
    const lower = char.toLowerCase();
    const index = cipher.indexOf(lower);
    if (index !== -1) return char === char.toUpperCase() ? alphabet[index].toUpperCase() : alphabet[index];
    return char;
  }).join('');
};

export const decryptRailFence = (text, rails = 3) => {
  if (rails <= 1) return text;
  const fence = Array.from({ length: rails }, () => []);
  const pattern = [];
  let rail = 0, direction = 1;
  for (let i = 0; i < text.length; i++) {
    pattern.push(rail);
    rail += direction;
    if (rail === 0 || rail === rails - 1) direction *= -1;
  }
  const counts = Array(rails).fill(0);
  pattern.forEach(r => counts[r]++);
  let idx = 0;
  for (let r = 0; r < rails; r++) {
    fence[r] = text.slice(idx, idx + counts[r]).split('');
    idx += counts[r];
  }
  let result = '';
  const pointers = Array(rails).fill(0);
  pattern.forEach(r => {
    result += fence[r][pointers[r]++];
  });
  return result;
};

export const decryptPlayfair = (text, key = 'KEYWORD') => {
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
  const keySquare = [...new Set((key + alphabet).toUpperCase().replace(/J/g, 'I'))].slice(0, 25);
  const findPos = (char) => {
    const index = keySquare.indexOf(char);
    return [Math.floor(index / 5), index % 5];
  };
  let result = '';
  for (let i = 0; i < text.length; i += 2) {
    let a = text[i], b = text[i + 1] || 'X';
    const [r1, c1] = findPos(a), [r2, c2] = findPos(b);
    if (r1 === r2) { result += keySquare[r1 * 5 + (c1 + 4) % 5]; result += keySquare[r2 * 5 + (c2 + 4) % 5]; }
    else if (c1 === c2) { result += keySquare[((r1 + 4) % 5) * 5 + c1]; result += keySquare[((r2 + 4) % 5) * 5 + c2]; }
    else { result += keySquare[r1 * 5 + c2]; result += keySquare[r2 * 5 + c1]; }
  }
  return result;
};

export const decryptBaconian = (text) => {
  const map = {
    'AAAAA': 'A', 'AAAAB': 'B', 'AAABA': 'C', 'AAABB': 'D', 'AABAA': 'E',
    'AABAB': 'F', 'AABBA': 'G', 'AABBB': 'H', 'ABAAA': 'I', 'ABAAB': 'J',
    'ABABA': 'K', 'ABABB': 'L', 'ABBAA': 'M', 'ABBAB': 'N', 'ABBBA': 'O',
    'ABBBB': 'P', 'BAAAA': 'Q', 'BAAAB': 'R', 'BAABA': 'S', 'BAABB': 'T',
    'BABAA': 'U', 'BABAB': 'V', 'BABBA': 'W', 'BABBB': 'X', 'BBAAA': 'Y',
    'BBAAB': 'Z'
  };
  let result = '';
  for (let i = 0; i < text.length; i += 5) {
    const chunk = text.slice(i, i + 5);
    result += map[chunk] || '?';
  }
  return result;
};

export const decryptPolybius = (text) => {
  const square = [
    ['A','B','C','D','E'],
    ['F','G','H','I','K'],
    ['L','M','N','O','P'],
    ['Q','R','S','T','U'],
    ['V','W','X','Y','Z']
  ];
  let result = '';
  for (let i = 0; i < text.length; i += 6) {
    const rowBin = text.slice(i, i + 3);
    const colBin = text.slice(i + 3, i + 6);
    const row = parseInt(rowBin, 2) - 1;
    const col = parseInt(colBin, 2) - 1;
    if (row >= 0 && row < 5 && col >= 0 && col < 5) {
      result += square[row][col];
    } else result += '?';
  }
  return result;
};

export const decryptAutokey = (text, key='KEY') => {
  key = key.toUpperCase();
  let result = '', keyIndex = 0;
  for(let char of text){
    const code = char.charCodeAt(0);
    if(code>=65 && code<=90){
      const shift = (keyIndex < key.length) ? key.charCodeAt(keyIndex) - 65 : result.charCodeAt(keyIndex - key.length) - 65;
      result += String.fromCharCode(((code - 65 - shift + 26) % 26)+65);
      keyIndex++;
    } else if(code>=97 && code<=122){
      const shift = (keyIndex < key.length) ? key.charCodeAt(keyIndex) - 65 : result.toUpperCase().charCodeAt(keyIndex - key.length) - 65;
      result += String.fromCharCode(((code - 97 - shift + 26) % 26)+97);
      keyIndex++;
    } else result += char;
  }
  return result;
};