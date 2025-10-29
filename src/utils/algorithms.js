import * as encrypt from './encryptionFunctions';
import * as decrypt from './decryptionFunctions';

export const algorithms = {
  caesar: { 
    name: 'Caesar Cipher', 
    code: 'C1', 
    encrypt: encrypt.encryptCaesar, 
    decrypt: decrypt.decryptCaesar, 
    description: 'Shifts each letter by a fixed number of positions in the alphabet (default 3). Simple but historically significant.' 
  },
  xor: { 
    name: 'XOR Cipher', 
    code: 'C2', 
    encrypt: encrypt.encryptXOR, 
    decrypt: decrypt.decryptXOR,
    description: 'Uses XOR operation with a secret key. Each character is combined with the key using bitwise XOR.' 
  },
  vigenere: { 
    name: 'Vigenère Cipher', 
    code: 'C3', 
    encrypt: encrypt.encryptVigenere, 
    decrypt: decrypt.decryptVigenere,
    description: 'Uses a keyword to shift letters by different amounts. More secure than Caesar cipher.' 
  },
  rot13: { 
    name: 'ROT13', 
    code: 'C4', 
    encrypt: encrypt.encryptROT13, 
    decrypt: decrypt.decryptROT13,
    description: 'Special case of Caesar cipher with a shift of 13. Applying it twice returns the original text.' 
  },
  atbash: { 
    name: 'Atbash Cipher', 
    code: 'C5', 
    encrypt: encrypt.encryptAtbash, 
    decrypt: decrypt.decryptAtbash,
    description: 'Reverses the alphabet (A↔Z, B↔Y, etc.). Ancient Hebrew cipher.' 
  },
  reverse: { 
    name: 'Reverse', 
    code: 'C6', 
    encrypt: encrypt.encryptReverse, 
    decrypt: decrypt.decryptReverse,
    description: 'Simply reverses the entire message. Very simple obfuscation method.' 
  },
  base64: { 
    name: 'Base64', 
    code: 'C7', 
    encrypt: encrypt.encryptBase64, 
    decrypt: decrypt.decryptBase64,
    description: 'Encodes data using 64 printable ASCII characters. Commonly used for data transmission.' 
  },
  substitution: { 
    name: 'Simple Substitution', 
    code: 'C8', 
    encrypt: encrypt.encryptSimpleSubstitution, 
    decrypt: decrypt.decryptSimpleSubstitution,
    description: 'Each letter is replaced by another fixed letter. Can be broken with frequency analysis.' 
  },
  railfence: { 
    name: 'Rail Fence', 
    code: 'C9', 
    encrypt: encrypt.encryptRailFence, 
    decrypt: decrypt.decryptRailFence,
    description: 'Writes the message in a zigzag pattern across multiple rails, then reads row by row.' 
  },
  playfair: { 
    name: 'Playfair Cipher', 
    code: 'C10', 
    encrypt: encrypt.encryptPlayfair, 
    decrypt: decrypt.decryptPlayfair,
    description: 'Uses a 5×5 grid of letters and encrypts pairs of letters (digraphs). Used in WWI.' 
  },
  baconian: { 
    name: 'Baconian Cipher', 
    code: 'C11', 
    encrypt: encrypt.encryptBaconian, 
    decrypt: decrypt.decryptBaconian,
    description: 'Encodes each letter as a 5-bit pattern using only A and B. Can be hidden in text formatting.' 
  },
  polybius: { 
    name: 'Polybius Square', 
    code: 'C12', 
    encrypt: encrypt.encryptPolybius, 
    decrypt: decrypt.decryptPolybius,
    description: 'Uses a 5×5 grid where each letter is represented by its row and column coordinates.' 
  },
  autokey: { 
    name: 'Autokey Cipher', 
    code: 'C13', 
    encrypt: encrypt.encryptAutokey, 
    decrypt: decrypt.decryptAutokey,
    description: 'Like Vigenère but uses the message itself (after the key) as the key. More secure.' 
  },
  // NEW MODERN ENCRYPTION ALGORITHMS
  aes: {
    name: 'AES (Advanced Encryption Standard)',
    code: 'C14',
    encrypt: encrypt.encryptAES,
    decrypt: decrypt.decryptAES,
    description: 'Modern symmetric encryption standard used worldwide. Uses substitution-permutation network with multiple rounds. Simplified educational version.'
  },
  des: {
    name: 'DES (Data Encryption Standard)',
    code: 'C15',
    encrypt: encrypt.encryptDES,
    decrypt: decrypt.decryptDES,
    description: 'Classic block cipher using Feistel network structure. Was the federal standard from 1977-2005. Simplified educational version.'
  },
  blowfish: {
    name: 'Blowfish Cipher',
    code: 'C16',
    encrypt: encrypt.encryptBlowfish,
    decrypt: decrypt.decryptBlowfish,
    description: 'Fast block cipher using key-dependent S-boxes and Feistel network. Designed by Bruce Schneier in 1993. Simplified version.'
  },
  chacha20: {
    name: 'ChaCha20',
    code: 'C17',
    encrypt: encrypt.encryptChaCha20,
    decrypt: decrypt.decryptChaCha20,
    description: 'Modern stream cipher using ARX operations (Add-Rotate-XOR). Fast and secure, used in TLS. Simplified educational version.'
  },
  rc4: {
    name: 'RC4 Stream Cipher',
    code: 'C18',
    encrypt: encrypt.encryptRC4,
    decrypt: decrypt.decryptRC4,
    description: 'Variable-key-size stream cipher. Simple and fast, historically used in SSL/TLS and WEP. Simplified educational implementation.'
  }
};