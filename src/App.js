import React, { useState } from 'react';
import { Download } from 'lucide-react';

// Encryption Functions
const encryptCaesar = (text, shift = 3) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + shift) % 26) + 65);
    if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + shift) % 26) + 97);
    return char;
  }).join('');
};

const encryptXOR = (text, key = 'SECRET') => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  const utf8Bytes = new TextEncoder().encode(result);
  const binary = Array.from(utf8Bytes).map(b => String.fromCharCode(b)).join('');
  return btoa(binary);
};

const encryptVigenere = (text, key = 'KEY') => {
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

const encryptROT13 = (text) => encryptCaesar(text, 13);

const encryptAtbash = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCharCode(90 - (code - 65));
    if (code >= 97 && code <= 122) return String.fromCharCode(122 - (code - 97));
    return char;
  }).join('');
};

const encryptReverse = (text) => text.split('').reverse().join('');

const encryptBase64 = (text) => {
  const utf8Bytes = new TextEncoder().encode(text);
  const binary = Array.from(utf8Bytes).map(b => String.fromCharCode(b)).join('');
  return btoa(binary);
};

const encryptSimpleSubstitution = (text) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const cipher = 'qwertyuiopasdfghjklzxcvbnm';
  return text.split('').map(char => {
    const lower = char.toLowerCase();
    const index = alphabet.indexOf(lower);
    if (index !== -1) return char === char.toUpperCase() ? cipher[index].toUpperCase() : cipher[index];
    return char;
  }).join('');
};

const encryptRailFence = (text, rails = 3) => {
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

const encryptPlayfair = (text, key = 'KEYWORD') => {
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

// New Ciphers
const encryptBaconian = (text) => {
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
    return map[upper] || '00000'; // fallback for non-letters
  }).join('');
};

const encryptPolybius = (text) => {
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
    return '000000'; // fallback for non-letters
  }).join('');
};


const encryptAutokey = (text, key='KEY') => {
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

// All Algorithms
const algorithms = {
  caesar: { name: 'Caesar Cipher', fn: encryptCaesar },
  xor: { name: 'XOR Cipher', fn: encryptXOR },
  vigenere: { name: 'Vigenère Cipher', fn: encryptVigenere },
  rot13: { name: 'ROT13', fn: encryptROT13 },
  atbash: { name: 'Atbash Cipher', fn: encryptAtbash },
  reverse: { name: 'Reverse', fn: encryptReverse },
  base64: { name: 'Base64', fn: encryptBase64 },
  substitution: { name: 'Simple Substitution', fn: encryptSimpleSubstitution },
  railfence: { name: 'Rail Fence', fn: encryptRailFence },
  playfair: { name: 'Playfair Cipher', fn: encryptPlayfair },
  baconian: { name: 'Baconian Cipher', fn: encryptBaconian },
  polybius: { name: 'Polybius Square', fn: encryptPolybius },
  autokey: { name: 'Autokey Cipher', fn: encryptAutokey }
};

// Convert to Binary (handles Baconian and Polybius)
const textToBinary = (text, algorithmKey) => {
  if(['baconian','polybius'].includes(algorithmKey)){
    // Baconian A=0,B=1; Polybius digits to binary
    if(algorithmKey==='baconian') return text.split('').map(c => c==='A'?'0':c==='B'?'1':'0').join('');
    if(algorithmKey==='polybius') return text.split('').map(d=>d>='0' && d<='9'?parseInt(d,10).toString(2).padStart(3,'0'):'00').join('');
  }
  // Default ASCII binary
  return text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8,'0')).join('');
};

const KnittingChart = () => {
  const [message, setMessage] = useState('');
  const [algorithm, setAlgorithm] = useState('caesar');
  const [encrypted, setEncrypted] = useState('');
  const [binary, setBinary] = useState('');
  const [chart, setChart] = useState([]);
  const [repeatPattern, setRepeatPattern] = useState(false);
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 });

  const handleEncrypt = () => {
    if (!message) return;
    
    const encryptedText = algorithms[algorithm].fn(message);
    setEncrypted(encryptedText);
    
    const binaryStr = textToBinary(encryptedText);
    setBinary(binaryStr);
    
    let paddedBinary = binaryStr;
    let rows, cols;
    
    if (repeatPattern) {
      // Create grid with repetition, ensuring at least 2 full iterations
      const minGridSize = 10000; // 100x100
      const messageBits = binaryStr.length;
      
      let gridSizeTotal;
      
      // Calculate how many full iterations fit in 100x100
      const iterationsFitIn100x100 = Math.floor(minGridSize / messageBits);
      
      if (iterationsFitIn100x100 >= 2) {
        // Message fits at least 2 times in 100x100, use standard grid
        gridSizeTotal = minGridSize;
        rows = 100;
        cols = 100;
      } else {
        // Need to scale up to fit at least 2 full iterations
        const iterationsNeeded = 2;
        const totalNeeded = messageBits * iterationsNeeded;
        const gridSide = Math.ceil(Math.sqrt(totalNeeded));
        gridSizeTotal = gridSide * gridSide;
        rows = gridSide;
        cols = gridSide;
      }
      
      // Repeat the pattern to fill the grid
      while (paddedBinary.length < gridSizeTotal) {
        paddedBinary += binaryStr;
      }
      paddedBinary = paddedBinary.slice(0, gridSizeTotal);
    } else {
      // Single iteration - create grid based on message size
      const totalBits = binaryStr.length;
      cols = Math.ceil(Math.sqrt(totalBits));
      rows = Math.ceil(totalBits / cols);
      
      // Pad to fill the last row if needed
      while (paddedBinary.length < rows * cols) {
        paddedBinary += '0';
      }
    }
    
    // Convert to 2D array
    const newChart = [];
    for (let i = 0; i < rows; i++) {
      newChart.push(paddedBinary.slice(i * cols, (i + 1) * cols).split(''));
    }
    setChart(newChart);
    setGridSize({ rows, cols });
  };

  const exportToPDF = () => {
    const canvas = document.createElement('canvas');
    const cellSize = 8;
    canvas.width = gridSize.cols * cellSize;
    canvas.height = gridSize.rows * cellSize;
    const ctx = canvas.getContext('2d');
    
    for (let row = 0; row < gridSize.rows; row++) {
      for (let col = 0; col < gridSize.cols; col++) {
        const bit = chart[row][col];
        ctx.fillStyle = bit === '1' ? '#000000' : '#ffffff';
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
    
    const imageData = canvas.toDataURL('image/png');
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Knitting Chart - ${algorithms[algorithm].name}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 20px;
              max-width: 900px;
              margin: 0 auto;
            }
            h1 { font-size: 24px; margin-bottom: 10px; }
            .info { margin-bottom: 20px; font-size: 14px; }
            .info p { margin: 5px 0; }
            .chart-container {
              margin: 20px 0;
              text-align: center;
            }
            .chart-image {
              border: 3px solid #000;
              max-width: 100%;
              height: auto;
            }
            .legend {
              margin-top: 20px;
              padding: 15px;
              background: #f5f5f5;
              border-radius: 8px;
            }
            .legend h2 {
              margin-top: 0;
              font-size: 18px;
            }
            .legend p {
              margin: 8px 0;
            }
            @media print {
              body { padding: 10px; }
            }
          </style>
        </head>
        <body>
          <h1>Cryptographic Knitting Chart</h1>
          <div class="info">
            <p><strong>Algorithm:</strong> ${algorithms[algorithm].name}</p>
            <p><strong>Original Message:</strong> ${message}</p>
            <p><strong>Encrypted:</strong> ${encrypted}</p>
            <p><strong>Pattern Type:</strong> ${repeatPattern ? 'Repeated Pattern' : 'Single Iteration'}</p>
            <p><strong>Binary Length:</strong> ${binary.length} bits</p>
          </div>
          <div class="chart-container">
            <img src="${imageData}" alt="Knitting Chart" class="chart-image" />
          </div>
          <div class="legend">
            <h2>Knitting Instructions</h2>
            <p><strong>White Square (0):</strong> Knit stitch (or Color A)</p>
            <p><strong>Black Square (1):</strong> Purl stitch (or Color B)</p>
            <p><strong>Pattern:</strong> ${gridSize.cols} stitches wide × ${gridSize.rows} rows tall</p>
            <p><strong>Direction:</strong> Read chart from bottom to top, right to left on odd rows (RS), left to right on even rows (WS)</p>
          </div>
          <script>
            window.onload = () => {
              setTimeout(() => window.print(), 100);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2 pb-1">
            🧶 Cryptographic Knitting Chart Generator
          </h1>
          <p className="text-gray-600 mb-6">Transform your secret messages into beautiful knitting patterns</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Secret Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message here..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                rows="3"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Encryption Algorithm
              </label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              >
                {Object.entries(algorithms).map(([key, { name }]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pattern Size
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="patternSize"
                    checked={!repeatPattern}
                    onChange={() => setRepeatPattern(false)}
                    className="mr-2"
                  />
                  <span className="text-sm">Single Iteration (exact message size)</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="patternSize"
                    checked={repeatPattern}
                    onChange={() => setRepeatPattern(true)}
                    className="mr-2"
                  />
                  <span className="text-sm">Repeated Pattern (100×100 or larger)</span>
                </label>
              </div>
            </div>

            {encrypted && binary.length > 10000 && (
              <div className="p-3 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>Note:</strong> Your encrypted message is {binary.length} bits, which exceeds 100×100 (10,000 bits). 
                  {repeatPattern && " The grid will automatically scale up to show repeated patterns."}
                  {!repeatPattern && " Single iteration will show the exact size needed."}
                </p>
              </div>
            )}
            
            <button
              onClick={handleEncrypt}
              disabled={!message}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              🔐 Encrypt & Generate Chart
            </button>
          </div>
          
          {encrypted && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Encrypted Text:</p>
              <p className="font-mono text-sm break-all">{encrypted}</p>
              <p className="text-sm text-gray-600 mt-3 mb-1">Binary ({binary.length} bits):</p>
              <p className="font-mono text-xs break-all max-h-32 overflow-y-auto">{binary}</p>
            </div>
          )}
        </div>
        
        {chart.length > 0 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Your Knitting Chart ({gridSize.cols}×{gridSize.rows})
              </h2>
              <button
                onClick={exportToPDF}
                className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-all"
              >
                <Download size={20} />
                Export to PDF
              </button>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <div className="flex gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white border-2 border-gray-400"></div>
                  <span>0 = Knit (Color A)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-black border-2 border-gray-400"></div>
                  <span>1 = Purl (Color B)</span>
                </div>
              </div>
            </div>
            
            <div className="border-4 border-gray-800 inline-block overflow-auto max-w-full">
              <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${gridSize.cols}, 6px)` }}>
                {chart.map((row, i) => (
                  row.map((cell, j) => (
                    <div
                      key={`${i}-${j}`}
                      className={`w-[6px] h-[6px] ${cell === '1' ? 'bg-black' : 'bg-white'} border border-gray-200`}
                      title={`Row ${i + 1}, Stitch ${j + 1}: ${cell === '1' ? 'Purl' : 'Knit'}`}
                    />
                  ))
                ))}
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <h3 className="font-bold text-blue-900 mb-2">📝 Knitting Instructions</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Pattern size: {gridSize.cols} stitches wide × {gridSize.rows} rows tall</li>
                <li>• White squares = Knit stitches (or Color A in colorwork)</li>
                <li>• Black squares = Purl stitches (or Color B in colorwork)</li>
                <li>• Read chart from bottom to top</li>
                <li>• RS rows (odd): read right to left | WS rows (even): read left to right</li>
                {!repeatPattern && <li>• This is a single iteration pattern - knit once for the complete message</li>}
                {repeatPattern && binary.length <= 10000 && <li>• This is a repeated pattern - the message repeats to fill the 100×100 grid</li>}
                {repeatPattern && binary.length > 10000 && <li>• This pattern was scaled up to fit your message with 2 full repetitions</li>}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnittingChart;