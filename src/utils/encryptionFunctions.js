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

// NEW MODERN ENCRYPTION METHODS

export const encryptAES = (text, key = 'CRYPTOKEY2024') => {
  // Simplified AES-like encryption for educational purposes
  // Uses multiple rounds of substitution and permutation
  const expandKey = (k) => {
    let expanded = k;
    while (expanded.length < 32) {
      expanded += k;
    }
    return expanded.slice(0, 32);
  };
  
  const expandedKey = expandKey(key);
  let result = '';
  
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    // Round 1: XOR with key
    charCode ^= expandedKey.charCodeAt(i % expandedKey.length);
    // Round 2: Byte substitution (S-box simulation)
    charCode = ((charCode * 7 + 13) % 256);
    // Round 3: XOR with rotated key
    charCode ^= expandedKey.charCodeAt((i + 8) % expandedKey.length);
    result += String.fromCharCode(charCode);
  }
  
  const utf8Bytes = new TextEncoder().encode(result);
  const binary = Array.from(utf8Bytes).map(b => String.fromCharCode(b)).join('');
  return btoa(binary);
};

export const encryptDES = (text, key = 'DES8BYTE') => {
  // Simplified DES-like encryption (educational version)
  // Uses permutation and substitution boxes
  const expandKey = (k) => {
    while (k.length < 8) k += k;
    return k.slice(0, 8);
  };
  
  const key8 = expandKey(key);
  let result = '';
  
  // Process in 8-byte blocks
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    const keyByte = key8.charCodeAt(i % 8);
    
    // Initial permutation
    charCode = ((charCode << 1) | (charCode >> 7)) & 0xFF;
    // XOR with key
    charCode ^= keyByte;
    // S-box substitution
    charCode = ((charCode * 3 + 7) % 256);
    // Final permutation
    charCode = ((charCode << 3) | (charCode >> 5)) & 0xFF;
    
    result += String.fromCharCode(charCode);
  }
  
  const utf8Bytes = new TextEncoder().encode(result);
  const binary = Array.from(utf8Bytes).map(b => String.fromCharCode(b)).join('');
  return btoa(binary);
};

export const encryptBlowfish = (text, key = 'BLOWFISH') => {
  // Simplified Blowfish-like encryption
  // Uses key-dependent S-boxes
  const generateSBox = (k) => {
    let sbox = [];
    for (let i = 0; i < 256; i++) {
      sbox[i] = (i * k.charCodeAt(i % k.length)) % 256;
    }
    return sbox;
  };
  
  const sbox = generateSBox(key);
  let result = '';
  
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    const keyByte = key.charCodeAt(i % key.length);
    
    // Feistel network simulation
    let left = charCode >> 4;
    let right = charCode & 0x0F;
    
    // Round 1
    const f1 = sbox[(right + keyByte) % 256];
    left = left ^ (f1 & 0x0F);
    
    // Round 2
    const f2 = sbox[(left + keyByte) % 256];
    right = right ^ (f2 & 0x0F);
    
    charCode = ((left << 4) | right) ^ keyByte;
    result += String.fromCharCode(charCode);
  }
  
  const utf8Bytes = new TextEncoder().encode(result);
  const binary = Array.from(utf8Bytes).map(b => String.fromCharCode(b)).join('');
  return btoa(binary);
};

export const encryptChaCha20 = (text, key = 'CHACHA20KEY') => {
  // Simplified ChaCha20-like stream cipher
  // Uses quarter-round operations
  const expandKey = (k) => {
    let expanded = k;
    while (expanded.length < 32) {
      expanded += k;
    }
    return expanded.slice(0, 32);
  };
  
  const expandedKey = expandKey(key);
  let result = '';
  
  // Generate keystream
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    
    // Quarter round simulation
    let a = expandedKey.charCodeAt(i % 32);
    let b = expandedKey.charCodeAt((i + 8) % 32);
    let c = expandedKey.charCodeAt((i + 16) % 32);
    let d = i % 256;
    
    // ChaCha quarter-round operations (simplified)
    a = (a + b) % 256; d ^= a; d = ((d << 4) | (d >> 4)) & 0xFF;
    c = (c + d) % 256; b ^= c; b = ((b << 3) | (b >> 5)) & 0xFF;
    a = (a + b) % 256; d ^= a; d = ((d << 2) | (d >> 6)) & 0xFF;
    
    charCode ^= d;
    result += String.fromCharCode(charCode);
  }
  
  const utf8Bytes = new TextEncoder().encode(result);
  const binary = Array.from(utf8Bytes).map(b => String.fromCharCode(b)).join('');
  return btoa(binary);
};

export const encryptRC4 = (text, key = 'RC4KEY') => {
  // Simplified RC4 stream cipher
  // Uses key scheduling algorithm (KSA) and pseudo-random generation algorithm (PRGA)
  
  // Key Scheduling Algorithm
  const ksa = (k) => {
    const S = Array.from({ length: 256 }, (_, i) => i);
    let j = 0;
    
    for (let i = 0; i < 256; i++) {
      j = (j + S[i] + k.charCodeAt(i % k.length)) % 256;
      [S[i], S[j]] = [S[j], S[i]]; // Swap
    }
    return S;
  };
  
  const S = ksa(key);
  let result = '';
  let i = 0, j = 0;
  
  // Pseudo-Random Generation Algorithm
  for (let idx = 0; idx < text.length; idx++) {
    i = (i + 1) % 256;
    j = (j + S[i]) % 256;
    [S[i], S[j]] = [S[j], S[i]]; // Swap
    
    const K = S[(S[i] + S[j]) % 256];
    const charCode = text.charCodeAt(idx) ^ K;
    result += String.fromCharCode(charCode);
  }
  
  const utf8Bytes = new TextEncoder().encode(result);
  const binary = Array.from(utf8Bytes).map(b => String.fromCharCode(b)).join('');
  return btoa(binary);
};