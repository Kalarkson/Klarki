import { appWindow } from '@tauri-apps/api/window';
import { eel } from '../src/vosk/main'; // Import eel from your Python file

appWindow.on('load', () => {
  // Call the Python function to start listening
  eel.listen().then((text) => {
    console.log(`Recognized text: ${text}`);
  });
});