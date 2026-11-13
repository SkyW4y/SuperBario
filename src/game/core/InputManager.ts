// **************** SkyW4y ****************
// Синглтон менеджер обработки надатий для
// 1. Init в ядре 1 раз
// 2. clearBuffer - очистка накоплений обязательна в update.
// ****************************************


export class InputManager {
    private keys: Map<string, boolean> = new Map();
    private justPressed: Set<string> = new Set();
    
    constructor() {
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    
    public init(): void {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        window.addEventListener('blur', this.handleBlur);
    }

    private handleKeyDown(e: KeyboardEvent): void {
        const code = e.code;
        
        if (!this.keys.get(code)) {
            this.justPressed.add(code);
        }
        
        this.keys.set(code, true);
        
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(code)) {
            e.preventDefault();
        }
    }
    
    private handleKeyUp(e: KeyboardEvent): void {
        this.keys.set(e.code, false);
    }
    
    private handleBlur(): void {
        this.keys.clear();
        this.justPressed.clear();
    }
    
    // === Публичные методы ===
    
    // Зажатая клавиша(не отпущена)
    public isKeyDown(code: string): boolean {
        return this.keys.get(code) ?? false;
    }
    // Одиночное срабатываение(нажата)
    public isJustPressed(code: string): boolean {
        return this.justPressed.has(code);
    }
    
    // Очистка нажатых клавиш накопленных за кадр
    public clearBuffer(): void {
        this.justPressed.clear();
    }
    
    public destroy(): void {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
        window.removeEventListener('blur', this.handleBlur);
        this.keys.clear();
        this.justPressed.clear();
    }
}

export const inputManager = new InputManager();