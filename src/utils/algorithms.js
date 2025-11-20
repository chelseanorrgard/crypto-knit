import * as encrypt from './encryptionFunctions';
import * as decrypt from './decryptionFunctions';

export const algorithms = {
  caesar: { 
    name: 'Caesar Cipher', 
    code: 'C1', 
    encrypt: encrypt.encryptCaesar, 
    decrypt: decrypt.decryptCaesar, 
    description: 'Named after Julius Caesar who used this method to send secret military messages to his generals around 58 BC. Each letter shifts forward by a fixed number of positions in the alphabet (we use 3). So "A" becomes "D", "B" becomes "E", and so on. It\'s one of the oldest and simplest ciphers, making it perfect for learning, but also very easy to crack - there are only 25 possible shifts to try!',
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
    description: 'This cipher uses a mathematical operation called XOR (exclusive OR) to scramble your message with a secret word. Each letter in your message gets mixed with the corresponding letter in the secret word "SECRET" using computer math. The beauty of XOR is that applying it twice with the same key brings you back to the original - it\'s its own reverse! The result is then converted to Base64 format to make it safe for transmission. Widely used in modern computing and forms the basis of many encryption systems.',
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
    description: 'Invented in the 16th century, this cipher was once called "le chiffre indéchiffrable" (the indecipherable cipher) because it was so hard to crack. It works like the Caesar cipher, but instead of shifting every letter by the same amount, it uses a keyword (we use "KEY") that repeats throughout your message. Each letter in the keyword determines how far to shift the corresponding letter in your message. This varying pattern makes it much more secure than Caesar\'s simple shift. It remained unbroken for over 300 years!',
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
    description: 'ROT13 is a special case of the Caesar cipher where each letter is shifted exactly 13 positions. Since the alphabet has 26 letters, shifting by 13 means doing it twice gets you back to where you started - it\'s perfectly symmetrical! This makes it wonderfully simple: the same operation both encrypts and decrypts. Originally used in ancient Rome, it became popular on the internet for hiding spoilers, punchlines, and puzzle solutions. Not secure, but perfect for casual obscuring of text where you want people to be able to decode it easily if they choose to.',
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
    description: 'One of the oldest ciphers known to humanity, dating back over 2,500 years to ancient Hebrew texts. The name "Atbash" comes from the first, last, second, and second-to-last letters of the Hebrew alphabet. The concept is beautifully simple: flip the alphabet so A becomes Z, B becomes Y, C becomes X, and so on. It appears in the Bible (Book of Jeremiah) where "Babel" was encoded as "Sheshach". Like ROT13, it\'s its own inverse - encrypting twice returns the original message. While not secure by modern standards, it\'s a fascinating piece of cryptographic history!',
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
    description: 'The absolute simplest obfuscation method - just write your message backwards! While this offers virtually no security (anyone can read backwards or use a mirror), it\'s surprisingly effective for quick, casual hiding of information. Leonardo da Vinci famously wrote his notes in mirror writing, possibly to protect his ideas or simply because he was left-handed and it was more comfortable. In the digital age, it\'s often used for simple text challenges and puzzles. Sometimes the most obvious hiding place is the best one because people overlook it!',
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
    description: 'Base64 isn\'t actually encryption - it\'s an encoding method that converts any data into text using only 64 safe characters (A-Z, a-z, 0-9, +, and /). Why is this useful? Computers store everything as binary (1s and 0s), but some systems can only handle text safely. Base64 acts as a translator, converting your binary data into text that can travel safely through email, web pages, and other text-based systems. You\'ve seen it in action when images are embedded directly in web pages or when email attachments are sent. While it looks scrambled, it\'s easily reversible and provides no security - think of it as packaging, not locking!',
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
    description: 'Imagine creating your own secret alphabet where every letter is replaced by a different letter - that\'s a substitution cipher! Our version maps the standard alphabet to "qwertyuiopasdfghjklzxcvbnm" (based on a keyboard layout). This means "a" always becomes "q", "b" always becomes "w", and so on. It\'s like the decoder rings you might have had as a kid! While this seems secure (there are 400 septillion possible substitutions!), it\'s actually vulnerable to "frequency analysis" - in English, certain letters like E, T, and A appear much more often than others, so patterns start to emerge. Still, it\'s a fun and historically important cipher that teaches core cryptography concepts.',
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
    description: 'This cipher gets its name from how you\'d write a message: imagine writing along the top rail of a fence, then diagonally down to the bottom rail, then diagonally back up - creating a zigzag pattern across multiple lines (we use 3 rails). Once your message is written in this bouncing pattern, you read it off line by line instead of in zigzag order. This scrambles the letter positions without changing the letters themselves. It\'s a "transposition cipher" rather than a "substitution cipher" - meaning letters are rearranged rather than replaced. Used historically during the American Civil War, it\'s simple but surprisingly effective for short messages!',
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
    description: 'Invented in 1854 by Charles Wheatstone but promoted by Lord Playfair, this cipher was revolutionary because it encrypts pairs of letters (digraphs) instead of individual letters. First, the alphabet is arranged in a 5×5 grid using a keyword (J and I share a space). Then, letter pairs are encrypted based on their positions in the grid: if they\'re in the same row, column, or form a rectangle, specific rules apply. This pairing makes frequency analysis much harder. It became the first literal "digraph substitution cipher" used officially by militaries, seeing action in the Boer War, WWI, and WWII. The British used it so heavily that captured German officers were taught to recognize it!',
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
    description: 'Created by Francis Bacon in 1605, this cipher is brilliantly sneaky. Each letter of the alphabet is represented by a unique 5-character sequence using only A and B (like A=AAAAA, B=AAAAB, C=AAABA). The genius part? These A\'s and B\'s can be hidden in plain sight using two different typefaces, font weights, or even different plants in a garden! For example, in the phrase "HELLO WORLD", you could make some letters bold and others regular - the pattern of bold/regular spells out a secret message in binary. Bacon himself may have used this for steganography (hiding messages in innocent-looking text). It\'s not about making text unreadable, but making it invisible!',
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
    description: 'Invented by the ancient Greek historian Polybius around 150 BC, this system arranges the alphabet in a 5×5 grid (combining I and J to fit). Each letter is then replaced by its row and column coordinates. So if "A" is in row 1, column 1, it becomes "11". Polybius originally designed this for long-distance communication using torches - soldiers could hold up different numbers of torches to transmit the coordinates! It\'s one of the earliest examples of converting letters to numbers, a concept that\'s fundamental to all modern digital encryption. While not secure alone, it\'s often combined with other ciphers for added complexity. Our version outputs the coordinates in binary format for knitting compatibility.',
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
    description: 'The Autokey cipher is a brilliant improvement on the Vigenère cipher, invented in 1586 by Blaise de Vigenère himself. Instead of repeating a short keyword over and over (which creates patterns attackers can exploit), the Autokey uses the keyword once, then uses the message itself as the rest of the key! For example, with keyword "KEY" and message "HELLO", the full key becomes "KEYHELLO". This means the key is as long as the message and doesn\'t repeat, making pattern analysis nearly impossible. It\'s like the message helps encrypt itself - a clever bit of cryptographic recursion! This remained one of the most secure hand ciphers until modern times.',
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
    description: 'AES is the gold standard of modern encryption, adopted by the U.S. government in 2001 after a 5-year competition among the world\'s top cryptographers. It\'s what protects your passwords, credit card information, classified government documents, and military communications. The cipher works by scrambling data through multiple "rounds" of complex mathematical operations - mixing, substituting, and permuting bytes in ways that are computationally infeasible to reverse without the key. Banks, hospitals, and tech companies all rely on AES. Even with the world\'s most powerful supercomputers, properly implemented AES-256 would take billions of years to crack by brute force. (Note: This is a simplified educational version for learning - not suitable for real security!)',
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
    description: 'DES was the official U.S. government encryption standard from 1977 to 2005, protecting everything from banking transactions to military communications during the Cold War era. It works by splitting data into blocks and running them through 16 rounds of complex permutations and substitutions. In its time, DES was considered unbreakable - but as computers became more powerful, weaknesses emerged. In 1999, a distributed computing project cracked DES in just 22 hours, proving it was no longer secure. It was replaced by AES, but DES remains important in cryptography history as the first publicly accessible cipher approved for government use. Today, 3DES (triple DES) is still used in some legacy systems. (This is a simplified teaching version!)',
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
    description: 'Designed by renowned cryptographer Bruce Schneier in 1993, Blowfish was created as a fast, free alternative to existing commercial encryption algorithms. Its clever design uses "key-dependent S-boxes" - essentially, your password creates a unique lookup table that\'s used to scramble your data. This makes every encryption with a different password use a completely different scrambling pattern. Blowfish can handle keys from 32 bits to 448 bits in length, making it very flexible. It\'s still used today in password management tools, secure file transfer software, and backup programs. Fun fact: Schneier placed Blowfish in the public domain, explicitly stating "use it freely for whatever you want." (This is a simplified educational version for learning!)',
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
    description: 'ChaCha20 is one of the most modern ciphers in active use today, designed by Daniel J. Bernstein in 2008. It\'s blazingly fast (especially on mobile devices) while being incredibly secure. The name comes from the salsa dance - the cipher performs operations called "quarter rounds" that mix data through addition, rotation, and XOR operations (ARX for short). Google chose ChaCha20 to protect Chrome browser traffic on Android devices because it\'s faster than AES on processors without special encryption hardware. When you see that padlock icon and "https" in your browser, there\'s a good chance ChaCha20 is protecting your connection! It\'s also used in SSH, OpenVPN, and Signal messenger. (This is a simplified teaching version that demonstrates the concepts!)',
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
    description: 'RC4 (Rivest Cipher 4) was designed by Ron Rivest in 1987 and kept as a trade secret until it was leaked in 1994. Despite this, it became one of the most widely-used ciphers in the world during the 1990s and early 2000s. Its beauty lies in simplicity - it generates a continuous stream of pseudo-random bytes and XORs them with your message. This made it incredibly fast, perfect for the limited computing power of early internet connections. RC4 protected early WiFi (WEP), secure web browsing (SSL/TLS), and even PDF encryption. However, researchers discovered vulnerabilities over time, and it\'s now deprecated for security use - but it remains an excellent teaching tool for understanding stream ciphers! (This is a simplified educational implementation.)',
    transformation: (original, encrypted) => [
      `Your original message: "${original}"`,
      `We created a 256-number scrambling sequence from the password`,
      `Generated a unique pattern that changes for every letter`,
      `Mixed each letter with its pattern number`,
      `Final scrambled result: "${encrypted.substring(0, 20)}..."`
    ]
  }
};