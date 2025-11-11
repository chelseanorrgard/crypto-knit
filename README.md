# 🧶 Crypto-Knit 🕵️‍♀️  
*Where cryptography meets cozy crafts*

---

### Encrypted Yarn Message  

*Encoded via various ciphers → binary → knit/purl pattern*

---

## 🧵 Introduction

Ever wanted to hide your secrets in a scarf? Or send encrypted intel through a tasteful cardigan?  
**Crypto-Knit** is a modern twist on WWII steganography, turning encrypted messages into knitting patterns using contemporary cryptographic practices and web tech.  

This is part thesis project, part spycraft, part grandma-approved chaos.

---

## 🎯 What Is This?

**Crypto-Knit** takes a text message, encrypts it using one of 18 different cipher algorithms, and transforms that ciphertext into a knitting or crochet-friendly pattern. Think of it as secret messaging—except your decoder ring is a pair of knitting needles or a crochet hook.

Whether you're protecting state secrets or passive-aggressively crafting a sweater that says "I know everything," we've got you covered.

---

## 🧵 Features

### 🔐 18 Encryption Algorithms
- **Classical Ciphers** (C1-C13): Caesar, XOR, Vigenère, ROT13, Atbash, Reverse, Base64, Simple Substitution, Rail Fence, Playfair, Baconian, Polybius Square, Autokey
- **Modern Ciphers** (C14-C18): AES, DES, Blowfish, ChaCha20, RC4 (simplified educational implementations)

### 🧶 Dual Craft Support
- **Knitting Mode**: Converts encrypted messages to knit/purl stitch patterns
- **Crochet Mode**: Converts encrypted messages to single/double crochet patterns
- Both support flat (RS/WS) and in-the-round construction methods

### 📊 Smart Chart Sizing
- Dynamic cell sizing based on message length (small messages = bigger cells, large messages = smaller cells)
- Single iteration mode for exact message size
- Repeated pattern mode for 100×100 grids (or larger for long messages)
- Charts automatically scale to fit on one printed page

### 📋 Educational Features
- Step-by-step transformation explanations for each cipher
- See exactly how your message was encrypted in plain language
- Learn cryptography while crafting!

### 📄 Advanced Export Features
- **PDF Generation** with complete instructions
- **QR Code Integration**: Each PDF includes a QR code with the cipher code
- Scan the QR code to auto-fill the decryption screen
- Numbered rows and columns for easy chart reading
- Comprehensive stitch keys and reading directions

### 🔓 Decryption Support
- Full encrypt/decrypt cycle for all algorithms
- Paste binary string from your knitted/crocheted piece
- Enter cipher code manually or scan QR code
- Instant message recovery

### 📱 User-Friendly Interface
- Collapsible help sections
- Interactive chart preview (click to enlarge)
- Detailed craft reading guides
- Responsive design for all screen sizes

---

## 🧬 Tech Stack

- **React** – the UI engine behind your espionage textiles  
- **Tailwind CSS** – because spies deserve aesthetic UIs  
- **Lucide-React** – crisp icons for clandestine clicking  
- **QRCode.js** – generating scannable cipher codes
- **Custom encryption implementations** – educational versions of industry-standard algorithms
- **Canvas API** – for high-quality chart rendering

---   

## 🧩 Future Ideas

- Progressive Web App (PWA) for mobile installation
- Color palette customization for charts
- Multiplayer knitting espionage (Secret Scarf Ops)
- Pattern library/sharing community
- Support for additional cipher algorithms
- Integration with popular knitting/crochet apps
- Cipher/text decoder from completed knit pieces  
- Colorwork encryption modes (fair isle anyone?)  

---

## 🐑 Contribute?

If you:  
- Knit
- Crochet  
- Code  
- Encrypt  
- Or panic-knit during deadlines  

…then you are spiritually part of this project already.

---

## 🚀 Getting Started from Git

Follow these steps to clone the project and run it locally:

### 1️⃣ Clone the repository
```bash
git clone https://github.com/chelseanorrgard/crypto-knit
cd crypto-knit
```

### 2️⃣ Install Dependencies
```bash
npm install
npm install lucide-react
npm install -D tailwindcss@3 postcss autoprefixer
npm install qrcode
```

### 3️⃣ Ensure Tailwind config files exist

If not already included, create these in the **root** folder:

**tailwind.config.js**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**postcss.config.js**
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 4️⃣ Update CSS

Make sure **src/index.css** includes Tailwind’s base styles.

**src/index.css**
```javascript
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5️⃣ Start the development server
```bash
npm start
```

The app should now run at **http://localhost:3000/**.
You can view, encrypt messages, export your knitting patterns to PDF, and decrypt messages.

---

## 🔍 How to Use

### Encrypting a Message:
1. Choose between Knitting or Crochet mode
2. Select the Encrypt tab
3. Type your secret message
4. Choose an encryption algorithm (C1-C18)
5. Select craft direction (Flat or In the Round)
6. Choose pattern size (Single iteration or Repeated)
7. Click "Encrypt & Generate Chart"
8. Save your Cipher Code (displayed in blue box)
9. Review the transformation steps to see how your message was encrypted
10. Click "Export to PDF" to get your printable pattern

### Decrypting a Message:
1. Select the Decrypt tab
2. If you have a QR code, scan it to auto-fill the cipher code
3. Convert your finished craft piece back to binary (0s and 1s)
4. Paste the binary string into the text box
5. Enter or verify the Cipher Code
6. Click "Decrypt Message" to reveal the original text

---

## 🧣 License

Crypto-Knit is dual-licensed to protect both its code and its creative content:

- **Code** is licensed under the [GNU Affero General Public License v3.0 (AGPL-3.0)](https://www.gnu.org/licenses/agpl-3.0.html)  
  This ensures that any modifications or deployments — including web-based versions — must remain open source under the same license.

- **Creative and educational content** (e.g., stitch charts, PDFs, documentation, visuals) is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)  
  You may remix, adapt, and share non-commercially, with attribution and under the same license.

Please use this project responsibly and knit with love, not war.
