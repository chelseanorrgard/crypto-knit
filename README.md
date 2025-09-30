# 🧶 Crypto-Knit 🕵️‍♀️  
*Where cryptography meets cozy crafts*

---

### Encrypted Yarn Message  

*Encoded via Caesar cipher → binary → knit/purl pattern*

---

## 🧵 Introduction

Ever wanted to hide your secrets in a scarf? Or send encrypted intel through a tasteful cardigan?  
**Crypto-Knit** is a modern twist on WWII steganography, turning encrypted messages into knitting patterns using contemporary cryptographic practices and web tech.  

This is part thesis project, part spycraft, part grandma-approved chaos.

---

## 🎯 What Is This?

**Crypto-Knit** takes a text message, encrypts it using modern cryptography, and transforms that ciphertext into a knitting-friendly pattern. Think of it as secret messaging—except your decoder ring is a pair of knitting needles.

Whether you're protecting state secrets or passive-aggressively knitting a sweater that says “I know everything,” we’ve got you covered.

---

## 🧵 Features

- Converts messages into knitting patterns  
- Modern cryptography for secure encoding  
- PDF export of knitting patterns for easy printing and knitting

---

## 🧬 Tech Stack

- **React** – the UI engine behind your espionage textiles  
- **Tailwind CSS** – because spies deserve aesthetic UIs  
- **Lucide-React** – crisp icons for clandestine clicking  
- **Custom configs** – Tailwind + PostCSS goodness

---  

## 🧩 Future Ideas

- Cipher/text decoder from completed knit pieces  
- Colorwork encryption modes (fair isle anyone?)  
- Multiplayer knitting espionage (Secret Scarf Ops)

---

## 🐑 Contribute?

If you:  
- Knit  
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
You can view, encrypt messages, and export your knitting patterns to PDF.

---

## 🧣 License

This project is licensed under the **MIT License**, but we recommend using it responsibly and knitting with love, not war.
