# 🪙 CryptoInvestment Frontend

Este es el frontend de la aplicación **CryptoInvestment**, que permite a los usuarios visualizar, seleccionar y hacer seguimiento al historial de precios de distintas criptomonedas en tiempo real, consumiendo datos desde CoinMarketCap y un backend en NestJS.

## 🛠️ Tecnologías Utilizadas

- **Vite** — Entorno de desarrollo rápido
- **React** — Biblioteca para interfaces de usuario
- **TypeScript** — Tipado estático
- **Tailwind CSS** — Framework de estilos utilitarios
- **Zustand** — Manejo global de estado
- **React Router DOM** — Enrutamiento de páginas
- **React Hook Form** — Manejo de formularios
- **TanStack React Table** — Renderizado eficiente de tablas
- **react-chartjs-2** — Gráficas interactivas
- **Sonner** — Alertas y notificaciones modernas
- **Hooks personalizados y componentes reusables** — Para mantener el código limpio y escalable

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/ronlab89/crypto-frontend.git
cd crypto-frontend
```

### 2. Instalar dependencias

```bash
yarn install
```

### 3. Iniciar el servidor de desarrollo

```bash
yarn dev
```

- Esto levantará el proyecto en http://localhost:5173

### 4. Variables de entorno

Crea un archivo .env en la raíz del proyecto con la siguiente configuración:

```
VITE_API_URL_BASE=http://localhost:3000/api/v1
```

---

### 5. 📁 Estructura del proyecto

```
src/
├── assets/css             # Archivos CSS personalizados
├── components/            # Componentes reusables.
├── icons/                 # Iconos personalizados
├── layouts/               # Layouts de páginas publico y privado
├── hooks/                 # Hooks personalizados
├── pages/                 # Vistas principales del proyecto.
├── router/                # Configuración de rutas
├── store/                 # Estados globales con Zustand
├── libs/
│   └── services/          # Lógica para conectar con API
│   └── utils/             # Funciones y utilidades
│   └── columns/           # Columnas para tablas
├── types/                 # Tipados TypeScript compartidos
├── App.tsx                # Componente raíz
└── main.tsx               # Punto de entrada
```

### 6. 🌙 Tema Claro / Oscuro

Se implementó un sistema de tema persistente claro/oscuro usando Zustand y Tailwind. El tema se guarda en localStorage y se puede alternar con un botón en el header.

### 7. Funcionalidades

- ✅ Registro y login de usuarios con validaciones

- ✅ Selección de criptomonedas favoritas

- ✅ Visualización en tabla con filtros y ordenamiento

- ✅ Gráficos de evolución de precios

- ✅ Almacenamiento del historial de precios en backend

- ✅ Notificaciones (Sonner)

- ✅ UI responsive y accesible
