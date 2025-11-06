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

// NEW MODERN DECRYPTION METHODS

export const decryptAES = (text, key = 'CRYPTOKEY2024') => {
  try {
    const decoded = atob(text);
    const bytes = new Uint8Array(decoded.split('').map(c => c.charCodeAt(0)));
    const encrypted = new TextDecoder().decode(bytes);
    
    const expandKey = (k) => {
      let expanded = k;
      while (expanded.length < 32) {
        expanded += k;
      }
      return expanded.slice(0, 32);
    };
    
    const expandedKey = expandKey(key);
    let result = '';
    
    for (let i = 0; i < encrypted.length; i++) {
      let charCode = encrypted.charCodeAt(i);
      // Reverse Round 3: XOR with rotated key
      charCode ^= expandedKey.charCodeAt((i + 8) % expandedKey.length);
      // Reverse Round 2: Inverse byte substitution
      // Find inverse of: charCode = ((original * 7 + 13) % 256)
      for (let original = 0; original < 256; original++) {
        if (((original * 7 + 13) % 256) === charCode) {
          charCode = original;
          break;
        }
      }
      // Reverse Round 1: XOR with key
      charCode ^= expandedKey.charCodeAt(i % expandedKey.length);
      result += String.fromCharCode(charCode);
    }
    
    return result;
  } catch { return '[Decryption failed]'; }
};

export const decryptDES = (text, key = 'DES8BYTE') => {
  try {
    const decoded = atob(text);
    const bytes = new Uint8Array(decoded.split('').map(c => c.charCodeAt(0)));
    const encrypted = new TextDecoder().decode(bytes);
    
    const expandKey = (k) => {
      while (k.length < 8) k += k;
      return k.slice(0, 8);
    };
    
    const key8 = expandKey(key);
    let result = '';
    
    for (let i = 0; i < encrypted.length; i++) {
      let charCode = encrypted.charCodeAt(i);
      const keyByte = key8.charCodeAt(i % 8);
      
      // Reverse final permutation
      charCode = ((charCode << 5) | (charCode >> 3)) & 0xFF;
      // Reverse S-box substitution
      for (let original = 0; original < 256; original++) {
        if (((original * 3 + 7) % 256) === charCode) {
          charCode = original;
          break;
        }
      }
      // Reverse XOR with key
      charCode ^= keyByte;
      // Reverse initial permutation
      charCode = ((charCode << 7) | (charCode >> 1)) & 0xFF;
      
      result += String.fromCharCode(charCode);
    }
    
    return result;
  } catch { return '[Decryption failed]'; }
};

export const decryptBlowfish = (text, key = 'BLOWFISH') => {
  try {
    const decoded = atob(text);
    const bytes = new Uint8Array(decoded.split('').map(c => c.charCodeAt(0)));
    const encrypted = new TextDecoder().decode(bytes);
    
    const generateSBox = (k) => {
      let sbox = [];
      for (let i = 0; i < 256; i++) {
        sbox[i] = (i * k.charCodeAt(i % k.length)) % 256;
      }
      return sbox;
    };
    
    const sbox = generateSBox(key);
    let result = '';
    
    for (let i = 0; i < encrypted.length; i++) {
      let charCode = encrypted.charCodeAt(i);
      const keyByte = key.charCodeAt(i % key.length);
      
      // Reverse the final XOR
      charCode ^= keyByte;
      
      // Extract left and right from encrypted value
      let left = charCode >> 4;
      let right = charCode & 0x0F;
      
      // Reverse Round 2 (was: right = right ^ (f2 & 0x0F))
      const f2 = sbox[(left + keyByte) % 256];
      right = right ^ (f2 & 0x0F);
      
      // Reverse Round 1 (was: left = left ^ (f1 & 0x0F))
      const f1 = sbox[(right + keyByte) % 256];
      left = left ^ (f1 & 0x0F);
      
      // Reconstruct original character
      charCode = (left << 4) | right;
      result += String.fromCharCode(charCode);
    }
    
    return result;
  } catch { return '[Decryption failed]'; }
};

export const decryptChaCha20 = (text, key = 'CHACHA20KEY') => {
  try {
    const decoded = atob(text);
    const bytes = new Uint8Array(decoded.split('').map(c => c.charCodeAt(0)));
    const encrypted = new TextDecoder().decode(bytes);
    
    const expandKey = (k) => {
      let expanded = k;
      while (expanded.length < 32) {
        expanded += k;
      }
      return expanded.slice(0, 32);
    };
    
    const expandedKey = expandKey(key);
    let result = '';
    
    // Stream cipher - decryption is same as encryption
    for (let i = 0; i < encrypted.length; i++) {
      let charCode = encrypted.charCodeAt(i);
      
      // Generate same keystream
      let a = expandedKey.charCodeAt(i % 32);
      let b = expandedKey.charCodeAt((i + 8) % 32);
      let c = expandedKey.charCodeAt((i + 16) % 32);
      let d = i % 256;
      
      // ChaCha quarter-round operations (same as encryption)
      a = (a + b) % 256; d ^= a; d = ((d << 4) | (d >> 4)) & 0xFF;
      c = (c + d) % 256; b ^= c; b = ((b << 3) | (b >> 5)) & 0xFF;
      a = (a + b) % 256; d ^= a; d = ((d << 2) | (d >> 6)) & 0xFF;
      
      charCode ^= d;
      result += String.fromCharCode(charCode);
    }
    
    return result;
  } catch { return '[Decryption failed]'; }
};

export const decryptRC4 = (text, key = 'RC4KEY') => {
  try {
    const decoded = atob(text);
    const bytes = new Uint8Array(decoded.split('').map(c => c.charCodeAt(0)));
    const encrypted = new TextDecoder().decode(bytes);
    
    // Key Scheduling Algorithm (same as encryption)
    const ksa = (k) => {
      const S = Array.from({ length: 256 }, (_, i) => i);
      let j = 0;
      
      for (let i = 0; i < 256; i++) {
        j = (j + S[i] + k.charCodeAt(i % k.length)) % 256;
        [S[i], S[j]] = [S[j], S[i]];
      }
      return S;
    };
    
    const S = ksa(key);
    let result = '';
    let i = 0, j = 0;
    
    // PRGA - stream cipher so decryption is same as encryption
    for (let idx = 0; idx < encrypted.length; idx++) {
      i = (i + 1) % 256;
      j = (j + S[i]) % 256;
      [S[i], S[j]] = [S[j], S[i]];
      
      const K = S[(S[i] + S[j]) % 256];
      const charCode = encrypted.charCodeAt(idx) ^ K;
      result += String.fromCharCode(charCode);
    }
    
    return result;
  } catch { return '[Decryption failed]'; }
};