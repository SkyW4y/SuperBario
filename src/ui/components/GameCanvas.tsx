import { useEffect, useRef, useState } from 'react';
import { GameEngine } from '../../game/core/Engine';

interface GameCanvasProps {
    width?: number;
    height?: number;
    onEngineReady?: () => void;
}

export function GameCanvas({ 
    width = 800, 
    height = 600, 
    onEngineReady 
}: GameCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<GameEngine | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initGame = async () => {
        if (!canvasRef.current) {
            setError("Canvas element not found");
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            
            engineRef.current = new GameEngine(canvasRef.current, {
                width,
                height,
                backgroundColor: 0x5c94fc,
            });

            await engineRef.current.start();
            
            setIsLoading(false);
            onEngineReady?.();
            
        } catch (err) {
            console.error("Failed to start game engine:", err);
            setError(err instanceof Error ? err.message : "Unknown error");
            setIsLoading(false);
        }
        };

        initGame();

        return () => {
        if (engineRef.current) {
            console.log("Unmounting: stopping game engine...");
            engineRef.current.stop();
            engineRef.current = null;
        }
        };
    }, [width, height, onEngineReady]);

    return (
        <div style={{ position: 'relative', width, height }}>
        <canvas 
            ref={canvasRef} 
            width={width} 
            height={height}
            style={{ display: 'block', border: '2px solid #333' }}
        />
        
        {(isLoading || error) && (
            <div style={{ 
            position: 'absolute', 
            top: 0, left: 0, width: '100%', height: '100%', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            background: 'rgba(0,0,0,0.7)', color: 'white', fontSize: '20px' 
            }}>
            {error ? `Error: ${error}` : 'Loading Game Engine...'}
            </div>
        )}
        </div>
    );
}