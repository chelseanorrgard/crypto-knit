import * as encrypt from './encryptionFunctions';
import * as decrypt from './decryptionFunctions';

export const algorithms = {
  caesar: { 
    name: 'Caesar Cipher', 
    code: 'C1', 
    encrypt: encrypt.encryptCaesar, 
    decrypt: decrypt.decryptCaesar, 
    description: 'Moves each letter forward by 3 spots in the alphabet. Named after Julius Caesar who used it to send secret military messages. Simple to understand but easy to crack!',
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
    description: 'Mixes your message with a secret word using computer math. Each letter gets scrambled based on the secret word, making it harder to crack than simple letter shifting.',
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
    description: 'Like Caesar cipher, but uses a keyword so each letter shifts by a different amount. This changing pattern makes it much trickier to decode!',
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
    description: 'Shifts each letter exactly 13 places in the alphabet. Fun trick: doing it twice gets you back to the original message! Often used to hide spoilers online.',
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
    description: 'Flips the alphabet backwards - A becomes Z, B becomes Y, and so on. One of the oldest ciphers ever, used in ancient Hebrew texts over 2,000 years ago!',
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
    description: 'The simplest method - just writes your message backwards! Great for quick hiding, though anyone can read it with a mirror. Sometimes simple is sneaky!',
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
    description: 'Converts your message into a special computer-friendly format using only safe characters. Not really encryption, but commonly used to prepare data for sending over the internet.',
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
    description: 'Creates a secret alphabet where each letter is swapped for another. Like having a decoder ring! Can be cracked by looking at which letters appear most often.',
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
    description: 'Writes your message in a zigzag pattern on multiple lines, then reads it line by line. Imagine writing while bouncing up and down on a fence rail!',
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
    description: 'Uses a 5×5 grid to encrypt letter pairs instead of single letters. Soldiers used this in World War I because it was harder to crack than other ciphers of its time.',
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
    description: 'Turns each letter into a 5-character code using only A and B. Clever trick: you can hide this by making some words bold or italic - the pattern becomes invisible!',
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
    description: 'Arranges the alphabet in a 5×5 grid (like a bingo card) and replaces each letter with its grid coordinates. Invented by an ancient Greek historian!',
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
    description: 'Similar to Vigenère, but uses your own message as part of the encryption key! The message helps hide itself, making it more secure than regular keyword ciphers.',
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
    description: 'The encryption used by governments and banks worldwide to protect top-secret information. Your message gets scrambled through multiple rounds of mixing and shuffling. (This is a simplified teaching version!)',
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
    description: 'The official U.S. government encryption from 1977 to 2005. Protected everything from military secrets to banking data before computers got fast enough to crack it. (This is a simplified teaching version!)',
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
    description: 'A fast and flexible cipher designed in 1993. Creates a custom scrambling pattern based on your password, making each encryption unique. Still used in some password managers today! (This is a simplified teaching version!)',
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
    description: 'A super-fast modern cipher that protects your web browsing right now! When you see the lock icon on websites, there\'s a good chance ChaCha20 is keeping your data safe. (This is a simplified teaching version!)',
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
    description: 'A simple but clever cipher that was popular in early internet security (1990s-2000s). Creates a continuous stream of scrambling numbers. Now retired from serious use, but great for learning! (This is a simplified teaching version!)',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We created a 256-number scrambling sequence from the password`,
      `Generated a unique pattern that changes for every letter`,
      `Mixed each letter with its pattern number`,
      `Final scrambled result: "${encrypted.substring(0, 20)}..."`
    ]
  }
};