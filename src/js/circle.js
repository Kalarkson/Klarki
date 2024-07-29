//------------------
circle = 20;
volume = 1000000;
maxDeformation = 7;
//------------------

const canvas = document.getElementById('waveform');
const ctx = canvas.getContext('2d');
const audioContext = new AudioContext();

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const source = audioContext.createMediaStreamSource(stream);

    const noiseFilter = audioContext.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(volume, audioContext.currentTime); 

    const analyzer = audioContext.createAnalyser();
    source.connect(noiseFilter).connect(analyzer);

    analyzer.fftSize = 256;
    const frequencyData = new Uint8Array(analyzer.frequencyBinCount);

    function drawWaveform() {
      analyzer.getByteFrequencyData(frequencyData);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = canvas.width / 2 - circle; 
      const smoothedFrequencyData = [];
      for (let i = 0; i < frequencyData.length; i++) {
        const prevValue = i === 0 ? frequencyData[frequencyData.length - 1] : frequencyData[i - 1];
        const nextValue = i === frequencyData.length - 1 ? frequencyData[0] : frequencyData[i + 1];
        smoothedFrequencyData.push((prevValue + frequencyData[i] + nextValue) / 3);
      }
      ctx.beginPath();
      ctx.moveTo(centerX + Math.cos(0 * 2) * (radius + smoothedFrequencyData[0] / 255 * maxDeformation * 2), 
                  centerY + Math.sin(0 * 2) * (radius + smoothedFrequencyData[0] / 255 * maxDeformation * 2));
      for (let i = 0; i < frequencyData.length; i++) {
        const angle = (i / frequencyData.length) * 17 * Math.PI;
        const deformationScale = smoothedFrequencyData[i] / 255 * maxDeformation; 
        const x = centerX + Math.cos(angle * 170) * (radius + deformationScale * 2);
        const y = centerY + Math.sin(angle * 170) * (radius + deformationScale * 2);
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      
      requestAnimationFrame(drawWaveform);
    }

    drawWaveform();
  })
  .catch(error => console.error('Error accessing microphone:', error));