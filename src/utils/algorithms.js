import * as encrypt from './encryptionFunctions';
import * as decrypt from './decryptionFunctions';

export const algorithms = {
  caesar: { 
    name: 'Caesar Cipher', 
    code: 'C1', 
    encrypt: encrypt.encryptCaesar, 
    decrypt: decrypt.decryptCaesar, 
    description: 'Shifts each letter by a fixed number of positions in the alphabet (default 3). Simple but historically significant.',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We moved each letter 3 spots forward in the alphabet`,
      `Like counting: h becomes k, e becomes h, l becomes o`,
      `Final encrypted message: "${encrypted}"`
    ]
  },
  xor: { 
    name: 'XOR Cipher', 
    code: 'C2', 
    encrypt: encrypt.encryptXOR, 
    decrypt: decrypt.decryptXOR,
    description: 'Uses XOR operation with a secret key. Each character is combined with the key using bitwise XOR.',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We mixed it with the secret word "SECRET"`,
      `Each letter gets scrambled using math operations`,
      `Then converted to a safe text format (Base64)`,
      `Final result: "${encrypted.substring(0, 20)}..."`
    ]
  },
  vigenere: { 
    name: 'Vigenère Cipher', 
    code: 'C3', 
    encrypt: encrypt.encryptVigenere, 
    decrypt: decrypt.decryptVigenere,
    description: 'Uses a keyword to shift letters by different amounts. More secure than Caesar cipher.',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We used the keyword "KEY" (repeating: K-E-Y-K-E-Y...)`,
      `Each letter shifts by a different amount based on the keyword`,
      `This makes the pattern harder to spot than Caesar cipher`,
      `Final encrypted message: "${encrypted}"`
    ]
  },
  rot13: { 
    name: 'ROT13', 
    code: 'C4', 
    encrypt: encrypt.encryptROT13, 
    decrypt: decrypt.decryptROT13,
    description: 'Special case of Caesar cipher with a shift of 13. Applying it twice returns the original text.',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We moved each letter exactly 13 spots in the alphabet`,
      `Fun fact: Doing this twice brings you back to the start!`,
      `It's like flipping the alphabet in half`,
      `Final encrypted message: "${encrypted}"`
    ]
  },
  atbash: { 
    name: 'Atbash Cipher', 
    code: 'C5', 
    encrypt: encrypt.encryptAtbash, 
    decrypt: decrypt.decryptAtbash,
    description: 'Reverses the alphabet (A↔Z, B↔Y, etc.). Ancient Hebrew cipher.',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We swapped each letter with its opposite (A→Z, B→Y, C→X)`,
      `It's like reading the alphabet backwards`,
      `Ancient method used thousands of years ago`,
      `Final encrypted message: "${encrypted}"`
    ]
  },
  reverse: { 
    name: 'Reverse', 
    code: 'C6', 
    encrypt: encrypt.encryptReverse, 
    decrypt: decrypt.decryptReverse,
    description: 'Simply reverses the entire message. Very simple obfuscation method.',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We simply wrote it backwards`,
      `The first letter becomes the last, and so on`,
      `Very simple but surprisingly effective for quick hiding`,
      `Final encrypted message: "${encrypted}"`
    ]
  },
  base64: { 
    name: 'Base64', 
    code: 'C7', 
    encrypt: encrypt.encryptBase64, 
    decrypt: decrypt.decryptBase64,
    description: 'Encodes data using 64 printable ASCII characters. Commonly used for data transmission.',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We converted your text into computer numbers (binary)`,
      `Then regrouped those numbers into a special format`,
      `This makes it safe to send over the internet`,
      `Final encoded message: "${encrypted}"`
    ]
  },
  substitution: { 
    name: 'Simple Substitution', 
    code: 'C8', 
    encrypt: encrypt.encryptSimpleSubstitution, 
    decrypt: decrypt.decryptSimpleSubstitution,
    description: 'Each letter is replaced by another fixed letter. Can be broken with frequency analysis.',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We replaced each letter with a different one (a→q, b→w, c→e...)`,
      `It's like having a secret alphabet decoder ring`,
      `Each letter always becomes the same replacement`,
      `Final encrypted message: "${encrypted}"`
    ]
  },
  railfence: { 
    name: 'Rail Fence', 
    code: 'C9', 
    encrypt: encrypt.encryptRailFence, 
    decrypt: decrypt.decryptRailFence,
    description: 'Writes the message in a zigzag pattern across multiple rails, then reads row by row.',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We wrote your message in a zigzag pattern on 3 lines`,
      `Imagine writing up and down like a bouncing ball`,
      `Then we read it line by line instead of zigzag`,
      `Final encrypted message: "${encrypted}"`
    ]
  },
  playfair: { 
    name: 'Playfair Cipher', 
    code: 'C10', 
    encrypt: encrypt.encryptPlayfair, 
    decrypt: decrypt.decryptPlayfair,
    description: 'Uses a 5×5 grid of letters and encrypts pairs of letters (digraphs). Used in WWI.',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We made everything uppercase and grouped letters into pairs`,
      `Using a 5×5 grid, we found where each pair appears`,
      `Then followed special rules to encrypt each pair together`,
      `Used by soldiers in World War I! Final result: "${encrypted}"`
    ]
  },
  baconian: { 
    name: 'Baconian Cipher', 
    code: 'C11', 
    encrypt: encrypt.encryptBaconian, 
    decrypt: decrypt.decryptBaconian,
    description: 'Encodes each letter as a 5-bit pattern using only A and B. Can be hidden in text formatting.',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We replaced each letter with a pattern of 5 A's and B's`,
      `For example: A=AAAAA, B=AAAAB, C=AAABA`,
      `Can be hidden by making some letters bold or italic`,
      `Final result: "${encrypted.substring(0, 25)}..." (${encrypted.length} characters total)`
    ]
  },
  polybius: { 
    name: 'Polybius Square', 
    code: 'C12', 
    encrypt: encrypt.encryptPolybius, 
    decrypt: decrypt.decryptPolybius,
    description: 'Uses a 5×5 grid where each letter is represented by its row and column coordinates.',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We arranged the alphabet in a 5×5 grid (like a bingo card)`,
      `Each letter becomes its position in the grid (row, column)`,
      `Ancient Greek method of sending secret messages`,
      `Final result: "${encrypted.substring(0, 30)}..."`
    ]
  },
  autokey: { 
    name: 'Autokey Cipher', 
    code: 'C13', 
    encrypt: encrypt.encryptAutokey, 
    decrypt: decrypt.decryptAutokey,
    description: 'Like Vigenère but uses the message itself (after the key) as the key. More secure.',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We started with the keyword "KEY"`,
      `Then used your own message as the rest of the key!`,
      `It's like the message helps encrypt itself`,
      `This makes it much harder to crack. Result: "${encrypted}"`
    ]
  },
  // NEW MODERN ENCRYPTION ALGORITHMS
  aes: {
    name: 'AES (Advanced Encryption Standard)',
    code: 'C14',
    encrypt: encrypt.encryptAES,
    decrypt: decrypt.decryptAES,
    description: 'Modern symmetric encryption standard used worldwide. Uses substitution-permutation network with multiple rounds. Simplified educational version.',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We used a strong password to scramble your message`,
      `The computer did this in 3 rounds of mixing and shuffling`,
      `This is similar to how banks protect your data online`,
      `Final scrambled result: "${encrypted.substring(0, 20)}..."`
    ]
  },
  des: {
    name: 'DES (Data Encryption Standard)',
    code: 'C15',
    encrypt: encrypt.encryptDES,
    decrypt: decrypt.decryptDES,
    description: 'Classic block cipher using Feistel network structure. Was the federal standard from 1977-2005. Simplified educational version.',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We used an 8-character password for scrambling`,
      `Your message got shuffled, mixed, then shuffled again`,
      `This method protected government secrets from 1977-2005`,
      `Final scrambled result: "${encrypted.substring(0, 20)}..."`
    ]
  },
  blowfish: {
    name: 'Blowfish Cipher',
    code: 'C16',
    encrypt: encrypt.encryptBlowfish,
    decrypt: decrypt.decryptBlowfish,
    description: 'Fast block cipher using key-dependent S-boxes and Feistel network. Designed by Bruce Schneier in 1993. Simplified version.',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We created a custom scrambling table from the password`,
      `Split each letter in half and scrambled each part separately`,
      `Then mixed them back together in a new way`,
      `Final scrambled result: "${encrypted.substring(0, 20)}..."`
    ]
  },
  chacha20: {
    name: 'ChaCha20',
    code: 'C17',
    encrypt: encrypt.encryptChaCha20,
    decrypt: decrypt.decryptChaCha20,
    description: 'Modern stream cipher using ARX operations (Add-Rotate-XOR). Fast and secure, used in TLS. Simplified educational version.',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We generated a unique scrambling pattern from the password`,
      `Mixed your message with this pattern using math`,
      `Very fast and secure - used to protect internet traffic today`,
      `Final scrambled result: "${encrypted.substring(0, 20)}..."`
    ]
  },
  rc4: {
    name: 'RC4 Stream Cipher',
    code: 'C18',
    encrypt: encrypt.encryptRC4,
    decrypt: decrypt.decryptRC4,
    description: 'Variable-key-size stream cipher. Simple and fast, historically used in SSL/TLS and WEP. Simplified educational implementation.',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We created a 256-number scrambling sequence from the password`,
      `Generated a unique pattern that changes for every letter`,
      `Mixed each letter with its pattern number`,
      `Final scrambled result: "${encrypted.substring(0, 20)}..."`
    ]
  }
};