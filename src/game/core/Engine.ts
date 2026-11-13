// **************** SkyW4y ****************
// Ядро игры, инициализируется, запускает игровой цикл
// ****************************************

import { Renderer } from '../renderer/Renderer';

export interface EngineConfig {
    width: number;
    height: number;
    backgroundColor?: number;
}

export class GameEngine {
    private renderer: Renderer;
    private canvas: HTMLCanvasElement;
    private config: EngineConfig;
  
    // Фиксированный шаг времени
    private readonly TIME_PER_FRAME = 1 / 60;
    private timeAccumulator = 0;
    private lastTime = 0;
  
    constructor(canvas: HTMLCanvasElement, config: EngineConfig) {
        this.canvas = canvas;
        this.config = config;
        this.renderer = new Renderer();
    }
  
    public async start(): Promise<void> {
        await this.renderer.init({
            canvas: this.canvas,
            width: this.config.width,
            height: this.config.height,
            backgroundColor: this.config.backgroundColor ?? 0x5c94fc,
        });
    
        await this.loadAssets();
        
        this.renderer.ticker.autoStart = false;
        this.renderer.ticker.stop();
        
        this.lastTime = performance.now();
        this.renderer.ticker.add(this.fixedStepGameLoop.bind(this));
        this.renderer.ticker.start();
        
        console.log('Engine started!');
    }

    private async loadAssets(): Promise<void> {
        
    }

    private fixedStepGameLoop(): void {
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        
        this.timeAccumulator += deltaTime;
        
        if (this.timeAccumulator > 0.25) {
            this.timeAccumulator = 0.25;
        }
        
        while (this.timeAccumulator >= this.TIME_PER_FRAME) {
            this.update(this.TIME_PER_FRAME);
            this.timeAccumulator -= this.TIME_PER_FRAME;
        }
    }
  
    private update(deltaTime: number): void {    
        const a = 10;
        console.log(a + deltaTime);
    }
  
    public stop(): void {
        this.renderer.ticker.stop();
        this.renderer.ticker.destroy();
        this.renderer.destroy();
    }
}