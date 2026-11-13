// **************** SkyW4y ****************
// Все что ниже, созданно для инкапсуляции библитечных методов
// дабы можно было легко заменить рендер и двигаться далььше, 
// либо откатится. PixiRenderer замеяет PIXI
// ****************************************

import * as PIXI from 'pixi.js';


export interface RenderConfig {
    width: number;
    height: number;
    backgroundColor: number;
    canvas: HTMLCanvasElement;
}

// Инкапсуляция рендера
export class Renderer {
    private app: PIXI.Application;
    private isInitialized: boolean = false;
    
    constructor() {
        this.app = new PIXI.Application();
    }
    
    public async init(config: RenderConfig): Promise<void> {
        if (this.isInitialized) {
            throw new Error('Renderer already initialized');
        }
        
        await this.app.init({
        canvas: config.canvas,
        width: config.width,
        height: config.height,
        backgroundColor: config.backgroundColor,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        });
        
        this.isInitialized = true;
    }
    
    //Временно для теста
    public get appp(): PIXI.Application {
        return this.app;
    }

    public get stage(): PIXI.Container {
        return this.app.stage;
    }
    
    public get ticker(): PIXI.Ticker {
        return this.app.ticker;
    }
    
    public resize(width: number, height: number): void {
        this.app.renderer.resize(width, height);
    }
    
    public destroy(): void {
        this.app.destroy(true, { children: true });
        this.isInitialized = false;
    }
    
    // Методы для работы со спрайтами
    public createSprite(texture: PIXI.Texture): PIXI.Sprite {
        return new PIXI.Sprite(texture);
    }
    
    public async loadTexture(url: string): Promise<PIXI.Texture> {
        return PIXI.Assets.load(url);
    }
}