import React, { useState } from 'react';
import { Download, Lock, Unlock, Info, ChevronDown, ChevronUp } from 'lucide-react';
import QRCode from 'qrcode';
import { algorithms } from './utils/algorithms';
import { textToBinary, binaryToText } from './utils/binaryConversion';

const KnittingChart = () => {
  const [mode, setMode] = useState('encrypt');
  const [message, setMessage] = useState('');
  const [algorithm, setAlgorithm] = useState('caesar');
  const [encrypted, setEncrypted] = useState('');
  const [binary, setBinary] = useState('');
  const [chart, setChart] = useState([]);
  const [repeatPattern, setRepeatPattern] = useState(false);
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 });
  const [craftType, setCraftType] = useState('knitting');
  const [knittingDirection, setKnittingDirection] = useState('flat');
  
  const [decryptBinary, setDecryptBinary] = useState('');
  const [decryptCode, setDecryptCode] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  
  const [showHowToUse, setShowHowToUse] = useState(false);
  const [showEncryptionInfo, setShowEncryptionInfo] = useState(false);
  const [showCraftInfo, setShowCraftInfo] = useState(false);

  // URL parameter handling for QR code functionality
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const decryptParam = urlParams.get('decrypt');
    
    if (decryptParam) {
      setMode('decrypt');
      setDecryptCode(decryptParam);
    }
  }, []);

  const handleEncrypt = () => {
    if (!message) return;
    
    const encryptedText = algorithms[algorithm].encrypt(message);
    setEncrypted(encryptedText);
    
    const binaryStr = textToBinary(encryptedText, algorithm);
    setBinary(binaryStr);
    
    let paddedBinary = binaryStr;
    let rows, cols;
    
    if (repeatPattern) {
      const minGridSize = 10000;
      const messageBits = binaryStr.length;
      let gridSizeTotal;
      const iterationsFitIn100x100 = Math.floor(minGridSize / messageBits);
      
      if (iterationsFitIn100x100 >= 2) {
        gridSizeTotal = minGridSize;
        rows = 100;
        cols = 100;
      } else {
        const iterationsNeeded = 2;
        const totalNeeded = messageBits * iterationsNeeded;
        const gridSide = Math.ceil(Math.sqrt(totalNeeded));
        gridSizeTotal = gridSide * gridSide;
        rows = gridSide;
        cols = gridSide;
      }
      
      while (paddedBinary.length < gridSizeTotal) {
        paddedBinary += binaryStr;
      }
      paddedBinary = paddedBinary.slice(0, gridSizeTotal);
    } else {
      const totalBits = binaryStr.length;
      cols = Math.ceil(Math.sqrt(totalBits));
      rows = Math.ceil(totalBits / cols);
      
      while (paddedBinary.length < rows * cols) {
        paddedBinary += '0';
      }
    }
    
    const newChart = [];
    for (let i = 0; i < rows; i++) {
      newChart.push(paddedBinary.slice(i * cols, (i + 1) * cols).split(''));
    }
    setChart(newChart);
    setGridSize({ rows, cols });
  };

  const handleDecrypt = () => {
    if (!decryptBinary || !decryptCode) return;
    
    const algoKey = Object.keys(algorithms).find(key => algorithms[key].code === decryptCode.toUpperCase());
    if (!algoKey) {
      setDecryptedMessage('[Invalid cipher code]');
      return;
    }
    
    const cleanBinary = decryptBinary.replace(/[^01]/g, '');
    const encryptedText = binaryToText(cleanBinary, algoKey);
    const decrypted = algorithms[algoKey].decrypt(encryptedText);
    setDecryptedMessage(decrypted);
  };

    const exportToPDF = async () => {
      // Dynamic cell sizing for PDF - but constrained to fit on page
      const maxDimension = Math.max(gridSize.cols, gridSize.rows);
      
      // Calculate ideal cell size based on chart dimensions
      let idealCellSize;
      if (maxDimension <= 20) idealCellSize = 24;
      else if (maxDimension <= 30) idealCellSize = 18;
      else if (maxDimension <= 50) idealCellSize = 12;
      else if (maxDimension <= 100) idealCellSize = 8;
      else idealCellSize = 6;
      
      // Constrain to maximum page size (roughly 800px for printable area)
      const maxPrintSize = 800;
      const maxCellSize = Math.floor(maxPrintSize / Math.max(gridSize.cols, gridSize.rows));
      const cellSize = Math.min(idealCellSize, maxCellSize);
      
      // Dynamic spacing and font size based on cell size
      const numberSpace = cellSize >= 12 ? 30 : cellSize >= 8 ? 25 : 20;
      const fontSize = cellSize >= 12 ? 12 : cellSize >= 8 ? 10 : 8;
      
      // Create canvas with extra space for numbers
      const canvas = document.createElement('canvas');
      canvas.width = gridSize.cols * cellSize + numberSpace;
      canvas.height = gridSize.rows * cellSize + numberSpace;
      const ctx = canvas.getContext('2d');
    
    // Fill background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the grid
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
    
    // Add row numbers on the right
    ctx.fillStyle = '#000000';
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'left';
    for (let row = 0; row < gridSize.rows; row++) {
      const yOffset = cellSize >= 12 ? 4 : 3;
      ctx.fillText((gridSize.rows - row).toString(), gridSize.cols * cellSize + 4, row * cellSize + cellSize / 2 + yOffset);
    }

    // Add column numbers at the bottom
    ctx.textAlign = 'center';
    for (let col = 0; col < gridSize.cols; col++) {
      const stitchNumber = gridSize.cols - col;
      const yOffset = cellSize >= 12 ? 15 : 12;
      ctx.fillText(stitchNumber.toString(), col * cellSize + cellSize / 2, gridSize.rows * cellSize + yOffset);
    }
    
    const imageData = canvas.toDataURL('image/png');
    
    let qrCodeDataURL = '';
    try {
      const qrURL = `https://crypto-knit.vercel.app/?decrypt=${algorithms[algorithm].code}`;
      qrCodeDataURL = await QRCode.toDataURL(qrURL, {
        width: 150,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
    } catch (err) {
      console.error('QR code generation failed:', err);
    }
    
    const stitchZero = craftType === 'knitting' 
      ? (knittingDirection === 'flat' ? 'Knit (RS) / Purl (WS)' : 'Knit stitch') 
      : 'Single Crochet (sc)';
    const stitchOne = craftType === 'knitting' 
      ? (knittingDirection === 'flat' ? 'Purl (RS) / Knit (WS)' : 'Purl stitch') 
      : 'Double Crochet (dc)';
    
    const directionText = knittingDirection === 'flat' 
      ? 'Read chart from bottom to top, right to left on odd rows (RS), left to right on even rows (WS)'
      : 'Read chart from bottom to top, always right to left (no WS rows)';
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${craftType === 'knitting' ? 'Knitting' : 'Crochet'} Chart - ${algorithms[algorithm].name}</title>
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
            .cipher-code-section {
              display: flex;
              align-items: center;
              gap: 20px;
              margin: 15px 0;
              padding: 15px;
              background: #dbeafe;
              border: 3px solid #60a5fa;
              border-radius: 8px;
            }
            .cipher-code-box {
              flex: 1;
            }
            .cipher-code-box h3 {
              margin: 0 0 5px 0;
              font-size: 14px;
              color: #666;
            }
            .cipher-code-box .code {
              font-size: 32px;
              font-weight: bold;
              color: #1e40af;
              font-family: monospace;
            }
            .qr-code {
              flex-shrink: 0;
            }
            .qr-code img {
              display: block;
              border: 2px solid #000;
            }
            .qr-label {
              text-align: center;
              font-size: 11px;
              color: #666;
              margin-top: 5px;
            }
            .chart-container {
              margin: 20px 0;
              text-align: center;
            }
            .chart-image {
              border: 3px solid #000;
              max-width: 100%;
              height: auto;
            }
            .binary-section {
              margin: 20px 0;
              padding: 15px;
              background: #f9f9f9;
              border: 2px solid #ddd;
              border-radius: 8px;
            }
            .binary-section h3 {
              margin-top: 0;
              font-size: 16px;
            }
            .binary-text {
              font-family: monospace;
              font-size: 10px;
              word-break: break-all;
              line-height: 1.4;
              max-height: 200px;
              overflow-y: auto;
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
            .decrypt-info {
              margin-top: 15px;
              padding: 10px;
              background: #dbeafe;
              border: 2px solid #60a5fa;
              border-radius: 8px;
            }
            @media print {
              body { padding: 10px; }
            }
          </style>
        </head>
        <body>
          <h1>Cryptographic ${craftType === 'knitting' ? 'Knitting' : 'Crochet'} Chart</h1>
          <div class="info">
            <p><strong>Algorithm:</strong> ${algorithms[algorithm].name}</p>
            <p><strong>Original Message:</strong> ${message}</p>
            <p><strong>Encrypted:</strong> ${encrypted}</p>
            <p><strong>Pattern Type:</strong> ${repeatPattern ? 'Repeated Pattern' : 'Single Iteration'}</p>
            <p><strong>Binary Length:</strong> ${binary.length} bits</p>
            <p><strong>${craftType === 'knitting' ? 'Knitting' : 'Crochet'} Direction:</strong> ${knittingDirection === 'flat' ? 'Flat (RS/WS)' : 'In the Round'}</p>
          </div>
          
          <div class="cipher-code-section">
            <div class="cipher-code-box">
              <h3>CIPHER CODE:</h3>
              <div class="code">${algorithms[algorithm].code}</div>
              <p style="font-size: 12px; color: #666; margin-top: 5px;">Keep this code safe - you'll need it to decrypt!</p>
            </div>
            ${qrCodeDataURL ? `
              <div class="qr-code">
                <img src="${qrCodeDataURL}" alt="QR Code for ${algorithms[algorithm].code}" width="150" height="150" />
                <div class="qr-label">Scan for cipher code</div>
              </div>
            ` : ''}
          </div>
          
          <div class="binary-section">
            <h3>📋 Binary String (for decryption):</h3>
            <div class="binary-text">${binary}</div>
          </div>
          
          <div class="chart-container">
            <img src="${imageData}" alt="${craftType === 'knitting' ? 'Knitting' : 'Crochet'} Chart" class="chart-image" />
          </div>
          
          <div class="legend">
            <h2>${craftType === 'knitting' ? 'Knitting' : 'Crochet'} Instructions</h2>
            <p><strong>White Square (0):</strong> ${stitchZero} (or Color A)</p>
            <p><strong>Black Square (1):</strong> ${stitchOne} (or Color B)</p>
            <p><strong>Pattern:</strong> ${gridSize.cols} stitches wide × ${gridSize.rows} rows tall</p>
            <p><strong>Direction:</strong> ${directionText}</p>
            ${craftType === 'knitting' && knittingDirection === 'flat' ? '<p><strong>Important:</strong> Chart shows RS appearance. On WS rows, work opposite stitches (0=Purl, 1=Knit).</p>' : ''}
          </div>
          
          <div class="decrypt-info">
            <h3>🔓 How to Decrypt:</h3>
            <p>1. Scan the QR code above (opens decrypt screen with cipher code pre-filled)</p>
            <p>2. Manually convert your ${craftType === 'knitting' ? 'knitted' : 'crocheted'} piece back to binary (0s and 1s)</p>
            <p>3. Paste the binary string into the app</p>
            <p>4. Click "Decrypt Message"</p>
            <p style="margin-top: 10px;"><em>Or manually enter cipher code: <strong>${algorithms[algorithm].code}</strong></em></p>
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-purple-100 rounded-2xl shadow-2xl p-8 mb-8">
          <div className="text-center mb-4">
            <img src="/logo.png" alt="Logo" className="h-44 w-44 object-contain mx-auto mb-3" />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 pb-1">
              Cryptographic {craftType === 'knitting' ? 'Knitting' : 'Crochet'} Chart Generator
            </h1>
            <p className="text-gray-700">Transform your secret messages into beautiful {craftType === 'knitting' ? 'knitting' : 'crochet'} patterns</p>
          </div>

          {/* How to Use Section */}
          <div className="mb-6">
            <button
              onClick={() => setShowHowToUse(!showHowToUse)}
              className="w-full flex items-center justify-between p-4 bg-blue-100 hover:bg-blue-200 rounded-lg transition-all border-2 border-blue-300"
            >
              <div className="flex items-center gap-2">
                <Info size={20} className="text-blue-600" />
                <span className="font-semibold text-blue-900">How to Use This Tool</span>
              </div>
              {showHowToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {showHowToUse && (
              <div className="p-4 bg-white border-2 border-blue-200 rounded-lg mt-2">
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Encrypting a Message:</h4>
                    <ol className="list-decimal ml-5 space-y-1">
                      <li>Choose between Knitting or Crochet mode</li>
                      <li>Select the Encrypt tab</li>
                      <li>Type your secret message in the text box</li>
                      <li>Choose an encryption algorithm from the dropdown</li>
                      <li>Select your craft direction (Flat or In the Round)</li>
                      <li>Choose pattern size (Single iteration for exact size, or Repeated for 100×100 grid)</li>
                      <li>Click "Encrypt & Generate Chart"</li>
                      <li>Save your Cipher Code (displayed in blue box)</li>
                      <li>Click "Export to PDF" to print your chart</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Decrypting a Message:</h4>
                    <ol className="list-decimal ml-5 space-y-1">
                      <li>Select the Decrypt tab</li>
                      <li><strong>If you have a QR code:</strong> Scan it first (this will open the decrypt screen with the cipher code pre-filled)</li>
                      <li>Convert your finished craft piece back to binary (0s and 1s) by reading the chart</li>
                      <li>Paste the binary string into the text box</li>
                      <li><strong>If you don't have a QR code:</strong> Manually enter the Cipher Code from your PDF</li>
                      <li>Click "Decrypt Message" to reveal the original text</li>
                    </ol>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 border-2 border-yellow-300 rounded">
                    <p className="font-semibold text-yellow-900 mb-1">⚠️ Important Note:</p>
                    <p className="text-yellow-800 text-xs">
                      Some encryption methods modify messages during the process. For example, Playfair Cipher removes spaces and special characters, 
                      converts to uppercase, and may add padding. A message like "Hello!" might decrypt as "HELXOX". 
                      This is normal behavior for these historical ciphers and not an error.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Craft Type Toggle */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setCraftType('knitting')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                craftType === 'knitting'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-200 text-gray-700 hover:bg-purple-300'
              }`}
            >
              Knitting
            </button>
            <button
              onClick={() => setCraftType('crochet')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                craftType === 'crochet'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-200 text-gray-700 hover:bg-purple-300'
              }`}
            >
              Crochet
            </button>
          </div>
          
          {/* Mode Toggle */}
          <div className="flex gap-4 mb-6 border-b-2 border-purple-300">
            <button
              onClick={() => setMode('encrypt')}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
                mode === 'encrypt'
                  ? 'text-purple-700 border-b-4 border-purple-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Lock size={20} />
              Encrypt
            </button>
            <button
              onClick={() => setMode('decrypt')}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
                mode === 'decrypt'
                  ? 'text-purple-700 border-b-4 border-purple-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Unlock size={20} />
              Decrypt
            </button>
          </div>

          {mode === 'encrypt' ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Secret Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message here..."
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none bg-white"
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
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none bg-white"
                >
                  {Object.entries(algorithms).map(([key, { name, code }]) => (
                    <option key={key} value={key}>{name} ({code})</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {craftType === 'knitting' ? 'Knitting' : 'Crochet'} Direction
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="direction"
                      checked={knittingDirection === 'flat'}
                      onChange={() => setKnittingDirection('flat')}
                      className="mr-2"
                    />
                    <span className="text-sm">Flat (RS/WS rows)</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="direction"
                      checked={knittingDirection === 'round'}
                      onChange={() => setKnittingDirection('round')}
                      className="mr-2"
                    />
                    <span className="text-sm">In the Round</span>
                  </label>
                </div>
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
                    <strong>Note:</strong> Your encrypted message is {binary.length} bits, which exceeds 100×100 (10,000 bits). 
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
                Encrypt & Generate Chart
              </button>
              
              {encrypted && (
                <div className="mt-6 p-4 bg-white rounded-lg border-2 border-purple-200">
                  <div className="mb-4 p-3 bg-blue-100 border-2 border-blue-400 rounded-lg">
                    <p className="text-sm font-semibold text-blue-900 mb-1">Your Cipher Code:</p>
                    <p className="text-2xl font-bold text-blue-900">{algorithms[algorithm].code}</p>
                    <p className="text-xs text-blue-800 mt-1">Save this code - you'll need it to decrypt!</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Encrypted Text:</p>
                  <p className="font-mono text-sm break-all">{encrypted}</p>
                  <p className="text-sm text-gray-600 mt-3 mb-1">Binary ({binary.length} bits):</p>
                  <p className="font-mono text-xs break-all max-h-32 overflow-y-auto">{binary}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>How to decrypt:</strong> If you have a QR code, scan it first (which opens this page with cipher code pre-filled). You can also manually enter the cipher code from your PDF. Then convert your {craftType === 'knitting' ? 'knitted' : 'crocheted'} chart or piece back to binary (0=white/{craftType === 'knitting' ? 'knit' : 'sc'}, 1=black/{craftType === 'knitting' ? 'purl' : 'dc'}), 
                  paste the binary string below, and click decrypt.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Binary String from Chart
                </label>
                <textarea
                  value={decryptBinary}
                  onChange={(e) => setDecryptBinary(e.target.value)}
                  placeholder="Paste binary string here (e.g., 01101000011001010110110001101100011011110...)"
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none font-mono text-xs bg-white"
                  rows="6"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cipher Code (from PDF or QR code)
                </label>
                <input
                  type="text"
                  value={decryptCode}
                  onChange={(e) => setDecryptCode(e.target.value)}
                  placeholder="e.g., C1, C2, C3..."
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none font-mono text-lg bg-white"
                />
              </div>
              
              <button
                onClick={handleDecrypt}
                disabled={!decryptBinary || !decryptCode}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Decrypt Message
              </button>
              
              {decryptedMessage && (
                <div className="mt-6 p-4 bg-green-50 border-2 border-green-300 rounded-lg">
                  <p className="text-sm text-green-800 mb-2 font-semibold">Decrypted Message:</p>
                  <p className="text-lg font-mono">{decryptedMessage}</p>
                </div>
              )}
            </div>
          )}
          
          {/* Info Sections */}
          <div className="mt-8 space-y-4">
            <button
              onClick={() => setShowEncryptionInfo(!showEncryptionInfo)}
              className="w-full flex items-center justify-between p-4 bg-purple-200 hover:bg-purple-300 rounded-lg transition-all border-2 border-purple-400"
            >
              <div className="flex items-center gap-2">
                <Info size={20} className="text-purple-700" />
                <span className="font-semibold text-purple-900">How Do These Encryptions Work?</span>
              </div>
              {showEncryptionInfo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {showEncryptionInfo && (
              <div className="p-4 bg-white border-2 border-purple-200 rounded-lg space-y-3">
                {Object.entries(algorithms).map(([key, { name, code, description }]) => (
                  <div key={key} className="pb-3 border-b border-gray-200 last:border-0">
                    <p className="font-semibold text-gray-900">{name} ({code})</p>
                    <p className="text-sm text-gray-600">{description}</p>
                  </div>
                ))}
              </div>
            )}
            
            <button
              onClick={() => setShowCraftInfo(!showCraftInfo)}
              className="w-full flex items-center justify-between p-4 bg-pink-100 hover:bg-pink-200 rounded-lg transition-all border-2 border-pink-300"
            >
              <div className="flex items-center gap-2">
                <Info size={20} className="text-pink-600" />
                <span className="font-semibold text-pink-900">{craftType === 'knitting' ? 'Knitting' : 'Crochet'} Chart Reading Guide</span>
              </div>
              {showCraftInfo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {showCraftInfo && (
              <div className="p-4 bg-white border-2 border-pink-200 rounded-lg space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">How to Read the Chart</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li><strong>Start at the Bottom:</strong> Always begin reading the chart in the bottom right corner, which represents the first stitch and row.</li>
                    <li><strong>Work from Bottom to Top:</strong> Each row of squares represents a row of {craftType === 'knitting' ? 'knitting' : 'crochet'}, so you move row by row from the bottom to the top of the chart.</li>
                    {craftType === 'knitting' && (
                      <>
                        <li><strong>Flat Knitting (RS/WS):</strong>
                          <ul className="ml-4 mt-1 space-y-1">
                            <li>• Right-Side (RS) Rows (odd numbers): Read from right to left. Chart shows RS appearance: 0=Knit, 1=Purl</li>
                            <li>• Wrong-Side (WS) Rows (even numbers): Read from left to right. Work opposite stitches: 0=Purl, 1=Knit</li>
                            <li>• The chart shows how the fabric will look from the RS. On WS rows, you work the opposite stitch to create that appearance.</li>
                          </ul>
                        </li>
                        <li><strong>Knitting in the Round:</strong> You never turn your work, so there are no WS rows. Read every row from right to left. Always work 0=Knit, 1=Purl.</li>
                      </>
                    )}
                    {craftType === 'crochet' && (
                      <>
                        <li><strong>Flat Crochet (RS/WS):</strong>
                          <ul className="ml-4 mt-1 space-y-1">
                            <li>• Right-Side (RS) Rows (odd numbers): Read from right to left</li>
                            <li>• Wrong-Side (WS) Rows (even numbers): Read from left to right</li>
                          </ul>
                        </li>
                        <li><strong>Crochet in the Round:</strong> Read every row from right to left, working in a continuous spiral.</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Stitch Key</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>White Square (0):</strong> {craftType === 'knitting' ? 'Knit stitch' : 'Single Crochet (sc)'} or Color A for colorwork</li>
                    <li>• <strong>Black Square (1):</strong> {craftType === 'knitting' ? 'Purl stitch' : 'Double Crochet (dc)'} or Color B for colorwork</li>
                    {craftType === 'knitting' && <li>• <strong>For Flat Knitting:</strong> Remember to work opposite stitches on WS rows (0=Purl, 1=Knit) to match the chart appearance</li>}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Recommendations</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Yarn Weight:</strong> DK or worsted weight works well for readable patterns</li>
                    <li>• <strong>Needle/Hook Size:</strong> Use recommended size for your yarn</li>
                    <li>• <strong>Gauge:</strong> For texture patterns, aim for 20-24 stitches per 4 inches</li>
                    <li>• <strong>Colorwork:</strong> Use high-contrast colors for easy reading</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {chart.length > 0 && mode === 'encrypt' && (
          <div className="bg-purple-100 rounded-2xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Your {craftType === 'knitting' ? 'Knitting' : 'Crochet'} Chart ({gridSize.cols}×{gridSize.rows})
              </h2>
              <button
                onClick={exportToPDF}
                className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-all"
              >
                <Download size={20} />
                Export to PDF
              </button>
            </div>
            
            <div className="bg-white p-4 rounded-lg mb-4 border-2 border-purple-200">
              {craftType === 'knitting' && knittingDirection === 'flat' ? (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Stitch Key (varies by row):</p>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <p className="font-semibold text-gray-600 mb-1">RS Rows (odd):</p>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-white border-2 border-gray-400"></div>
                        <span>0 = Knit</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-black border-2 border-gray-400"></div>
                        <span>1 = Purl</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600 mb-1">WS Rows (even):</p>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-white border-2 border-gray-400"></div>
                        <span>0 = Purl</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-black border-2 border-gray-400"></div>
                        <span>1 = Knit</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white border-2 border-gray-400"></div>
                    <span>0 = {craftType === 'knitting' ? 'Knit' : 'SC'} (Color A)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-black border-2 border-gray-400"></div>
                    <span>1 = {craftType === 'knitting' ? 'Purl' : 'DC'} (Color B)</span>
                  </div>
                </div>
              )}
            </div>
            
            <div 
              className="inline-block cursor-pointer"
              onClick={() => {
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
                modal.onclick = () => modal.remove();
                
                // Dynamic cell sizing for modal
                const maxDimension = Math.max(gridSize.cols, gridSize.rows);
                const modalCellSize = maxDimension <= 20 ? 32 : maxDimension <= 30 ? 24 : maxDimension <= 50 ? 16 : maxDimension <= 100 ? 10 : 6;
                const modalFontSize = modalCellSize >= 16 ? 12 : modalCellSize >= 10 ? 10 : 8;
                
                const chartClone = document.createElement('div');
                chartClone.className = 'bg-white p-4 rounded max-h-[90vh] overflow-auto';
                chartClone.innerHTML = `
                  <div style="display: inline-block; position: relative; padding: 25px 25px 20px 25px;">
                    <div style="display: grid; grid-template-columns: repeat(${gridSize.cols}, ${modalCellSize}px); gap: 0; border: 3px solid #000;">
                      ${chart.map(row => row.map(cell => 
                        `<div style="width: ${modalCellSize}px; height: ${modalCellSize}px; background: ${cell === '1' ? '#000' : '#fff'}; border: 0.5px solid #ddd;"></div>`
                      ).join('')).join('')}
                    </div>
                    <div style="position: absolute; right: 0; top: 25px; display: flex; flex-direction: column; font-size: ${modalFontSize}px; font-weight: bold; padding-left: 4px;">
                      ${Array.from({length: gridSize.rows}, (_, i) => `<div style="height: ${modalCellSize}px; display: flex; align-items: center;">${gridSize.rows - i}</div>`).join('')}
                    </div>
                    <div style="position: absolute; bottom: 0; left: 25px; display: flex; font-size: ${modalFontSize}px; font-weight: bold; padding-top: 2px;">
                      ${Array.from({length: gridSize.cols}, (_, i) => {
                        const stitchNumber = gridSize.cols - i;
                        return `<div style="width: ${modalCellSize}px; text-align: center;">${stitchNumber}</div>`;
                      }).join('')}
                    </div>
                  </div>
                `;
                modal.appendChild(chartClone);
                document.body.appendChild(modal);
              }}
            >
              {(() => {
                  // Dynamic cell sizing for preview
                  const maxDimension = Math.max(gridSize.cols, gridSize.rows);
                  const previewCellSize = maxDimension <= 20 ? 20 : maxDimension <= 30 ? 16 : maxDimension <= 50 ? 12 : maxDimension <= 100 ? 8 : 5;
                  const previewFontSize = previewCellSize >= 12 ? 10 : previewCellSize >= 8 ? 8 : 7;
                  const previewPadding = previewCellSize >= 12 ? 35 : 30;
                  
                  return (
                    <div style={{ display: 'inline-block', position: 'relative', padding: `0 ${previewPadding}px 25px 0` }}>
                      <div className="border-4 border-gray-800" style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize.cols}, ${previewCellSize}px)`, gap: 0 }}>
                        {chart.map((row, i) => (
                          row.map((cell, j) => (
                            <div
                              key={`${i}-${j}`}
                              style={{ width: `${previewCellSize}px`, height: `${previewCellSize}px` }}
                              className={`${cell === '1' ? 'bg-black' : 'bg-white'} border border-gray-200`}
                              title={`Row ${gridSize.rows - i}, Stitch ${gridSize.cols - j}: ${cell === '1' ? (craftType === 'knitting' ? 'Purl' : 'DC') : (craftType === 'knitting' ? 'Knit' : 'SC')}`}
                            />
                          ))
                        ))}
                      </div>
                      <div style={{ position: 'absolute', right: '5px', top: 0, display: 'flex', flexDirection: 'column', fontSize: `${previewFontSize}px`, fontWeight: 'bold' }}>
                        {Array.from({length: gridSize.rows}, (_, i) => (
                          <div key={i} style={{ height: `${previewCellSize}px`, display: 'flex', alignItems: 'center' }}>
                            {gridSize.rows - i}
                          </div>
                        ))}
                      </div>
                      <div style={{ position: 'absolute', bottom: '0', left: 0, display: 'flex', fontSize: `${previewFontSize}px`, fontWeight: 'bold', paddingTop: '2px' }}>
                        {Array.from({length: gridSize.cols}, (_, i) => {
                          const stitchNumber = gridSize.cols - i;
                          return (
                            <div key={i} style={{ width: `${previewCellSize}px`, textAlign: 'center' }}>
                              {stitchNumber}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
            </div>
            
            <p className="text-xs text-gray-600 mt-2 italic">Click chart to view larger</p>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <h3 className="font-bold text-blue-900 mb-2">{craftType === 'knitting' ? 'Knitting' : 'Crochet'} Instructions</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Pattern size: {gridSize.cols} stitches wide × {gridSize.rows} rows tall</li>
                {craftType === 'knitting' && knittingDirection === 'flat' ? (
                  <>
                    <li>• RS rows (odd): 0=Knit, 1=Purl | WS rows (even): 0=Purl, 1=Knit</li>
                    <li>• Chart squares show RS appearance - work opposite on WS rows</li>
                  </>
                ) : (
                  <>
                    <li>• White squares = {craftType === 'knitting' ? 'Knit stitches' : 'Single Crochet (sc)'} (or Color A in colorwork)</li>
                    <li>• Black squares = {craftType === 'knitting' ? 'Purl stitches' : 'Double Crochet (dc)'} (or Color B in colorwork)</li>
                  </>
                )}
                <li>• Read chart from bottom to top</li>
                {knittingDirection === 'flat' && <li>• RS rows (odd): read right to left | WS rows (even): read left to right</li>}
                {knittingDirection === 'round' && <li>• In the round: always read right to left (no WS rows)</li>}
                {!repeatPattern && <li>• This is a single iteration pattern - {craftType === 'knit' ? 'knit' : 'crochet'} once for the complete message</li>}
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