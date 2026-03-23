# Fincamp
 
App mòbil de quadern de camp digital per a agricultors de Catalunya.
 
## Instal·lació
 
```bash
npm install
```
 
## Executar
 
```bash
# Iniciar (escaneja el QR amb Expo Go)
npx expo start
 
# iOS
npx expo start --ios
 
# Android
npx expo start --android
```
 
## Comandos útils
 
```bash
# Corregir dependències
npx expo install --fix
 
# Netejar caché
npx expo start --clear
 
# Veure logs
npx expo start --dev-client
```
 
## Estructura
 
```
app/          # Pantalles (Expo Router)
components/   # Components reutilitzables
constants/    # Colors, llistes, dades demo
hooks/        # Lògica calendari i utils
store/        # Estat global (Zustand)
styles/       # Sistema d'estils
types/        # TypeScript interfaces
```
 
## Requisits
 
- Node.js 18+
- Expo Go al mòbil per fer proves
