import { useState } from 'react';
import { GameCanvas } from './components/GameCanvas';

function App() {
  const [isGameRunning, setIsGameRunning] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Super Bario Clone</h1>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        {!isGameRunning ? (
          <button 
            onClick={() => setIsGameRunning(true)}
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
          >
            Start Game
          </button>
        ) : (
          <button 
            onClick={() => setIsGameRunning(false)}
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', background: '#ff4444', color: 'white' }}
          >
            Stop Game (Return to Menu)
          </button>
        )}
      </div>

      {isGameRunning && (
        <GameCanvas 
          width={800} 
          height={600} 
          onEngineReady={() => console.log("Engine is ready and running!")}
        />
      )}
      
      {isGameRunning && (
        <div style={{ marginTop: '10px', color: '#666' }}>
          <p>React UI is active. The red square is rendered by PixiJS inside the Canvas.</p>
          <p>Try clicking "Stop Game" to see the cleanup in action (check console).</p>
        </div>
      )}
    </div>
  );
}

export default App;