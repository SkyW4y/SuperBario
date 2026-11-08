# Super Mario Clone

Учебный проект: мини-платформер на React + TypeScript + PixiJS

## Технологии

- React + TypeScript
- PixiJS (рендеринг)
- Howler.js (аудио)
- Vite (сборка)

## Установка

```bash
npm install
```

## Структура проекта(на рассмотрении)

```text
super-mario-clone/
├── node_modules/              
├── public/                    # Статические файлы (favicon, index.html)
│   └── assets/                # Игровые ресурсы
│       ├── sprites/           # Спрайт-листы (mario.png, goomba.png)
│       ├── audio/             # Звуки (jump.mp3, coin.mp3)
│       └── levels/            # JSON файлы уровней (level1.json)
├── src/
│   ├── game/                  # 🎮 GAME ENGINE (чистый TS + PixiJS)
│   │   ├── engine/            # Ядро движка
│   │   │   ├── GameEngine.ts  # Главный класс движка
│   │   │   ├── GameLoop.ts    # requestAnimationFrame логика
│   │   │   └── SceneManager.ts # Управление сценами/уровнями
│   │   ├── entities/          # Игровые объекты
│   │   │   ├── Entity.ts      # Базовый класс
│   │   │   ├── Player.ts      # Марио
│   │   │   ├── Enemy.ts       # Гумба
│   │   │   └── Platform.ts    # Кирпичи, земля
│   │   ├── physics/           # Физика и коллизии
│   │   │   ├── PhysicsSystem.ts
│   │   │   └── CollisionDetector.ts
│   │   ├── input/             # Обработка ввода
│   │   │   └── InputManager.ts
│   │   └── renderer/          # PixiJS обертка
│   │       └── PixiRenderer.ts
│   │
│   ├── ui/                    # 🎨 REACT UI
│   │   ├── components/        # React компоненты
│   │   │   ├── MainMenu.tsx
│   │   │   ├── GameCanvas.tsx # Компонент с <canvas>
│   │   │   ├── HUD.tsx        # Счетчик монет, жизни
│   │   │   └── GameOver.tsx
│   │   ├── hooks/             # Кастомные хуки
│   │   │   └── useGameEvents.ts # Подписка на события движка
│   │   └── App.tsx            # Главный компонент React
│   │
│   ├── shared/                # 🔗 ОБЩЕЕ (связь между game и ui)
│   │   ├── events/            # Event Bus
│   │   │   ├── EventBus.ts
│   │   │   └── EventTypes.ts  # Типы событий (COIN_COLLECTED, etc.)
│   │   ├── types/             # Общие TypeScript типы
│   │   │   ├── IEntity.ts
│   │   │   ├── ILevel.ts
│   │   │   └── GameEvents.ts
│   │   └── constants/         # Константы
│   │       └── gameConfig.ts  # Гравитация, скорость, размеры
│   │
│   ├── audio/                 # 🔊 АУДИО МЕНЕДЖЕР
│   │   └── AudioManager.ts    # Howler.js или Web Audio API
│   │
│   ├── index.tsx              # Точка входа React
│   └── index.css              # Глобальные стили
│
├── package.json
├── tsconfig.json
├── vite.config.ts             # Или webpack.config.js
└── README.md
```
