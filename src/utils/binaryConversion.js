export const textToBinary = (text, algorithmKey) => {
  if(['baconian','polybius'].includes(algorithmKey)){
    if(algorithmKey==='baconian') return text.split('').map(c => c==='A'?'0':c==='B'?'1':'0').join('');
    if(algorithmKey==='polybius') return text.split('').map(d=>d>='0' && d<='9'?parseInt(d,10).toString(2).padStart(3,'0'):'00').join('');
  }
  return text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8,'0')).join('');
};

export const binaryToText = (binary, algorithmKey) => {
  if(['baconian','polybius'].includes(algorithmKey)){
    if(algorithmKey==='baconian') return binary.split('').map(b => b==='0'?'A':'B').join('');
    if(algorithmKey==='polybius') {
      let result = '';
      for(let i=0; i<binary.length; i+=3){
        const chunk = binary.slice(i, i+3);
        result += parseInt(chunk, 2).toString();
      }
      return result;
    }
  }
  let result = '';
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.slice(i, i + 8);
    if (byte.length === 8) {
      result += String.fromCharCode(parseInt(byte, 2));
    }
  }
  return result;
};