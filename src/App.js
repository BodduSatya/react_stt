import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const App = () => {

  const [message, setMessage] = useState('')

  const commands = [
    {
      command: 'I would like to order *',
      callback: (food) => setMessage(`Your order is for: ${food}`)
    },
    {
      command: 'The weather is :condition today',
      callback: (condition) => setMessage(`Today, the weather is ${condition}`)
    },
    {
      command: 'My top sports are * and *',
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
    },
    {
      command: 'Pass the salt (please)',
      callback: () => setMessage('My pleasure')
    },
    {
      command: ['Hello', 'Hi'],
      callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
      matchInterim: true
    },
    {
      command: 'Beijing',
      callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2
    },
    {
      command: ['eat', 'sleep', 'leave'],
      callback: (command) => setMessage(`Best matching command: ${command}`),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true
    },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript()
    },
    {
      command: 'open *',
      callback: (site) => { window.open('https://' + site) }
    },
    {
      command: 'change background to *',
      callback: (color) => {
        document.body.style.background = color;
      }
    }
  ]

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands })


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <form>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })}>Start</button>
      <button onClick={(e) => {
        e.preventDefault();
        SpeechRecognition.stopListening();
      }
      }>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{message}</p>
      <textarea value={transcript} cols="100" rows="10"></textarea>
      {/* <p>{transcript}</p> */}
      </form>
    </div>
  );
};
export default App;
