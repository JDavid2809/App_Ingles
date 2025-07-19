# Esquema de Colores Unificado - Triunfando con el Inglés

## Paleta de Colores Principal

### Colores Institucionales
- **Rojo Principal**: `#e30f28` - Color principal de la marca
- **Azul Principal**: `#00246a` - Color secundario institucional

### Variables CSS Globales
```css
:root {
  --primary-red: #e30f28;
  --primary-blue: #00246a;
}
```

## Aplicación en Componentes

### 1. AdminSidebar
- **Header**: Gradiente de `#e30f28/5` a `#00246a/5`
- **Logo**: Fondo `#e30f28`
- **Usuario**: Avatar `#00246a`
- **Items activos**: Fondo `#e30f28`, texto blanco
- **Items hover**: Fondo `#e30f28/10`, texto `#e30f28`
- **Barras de progreso**: Gradiente de `#e30f28` a `#00246a`

### 2. Student Sidebar
- **Header**: Logo `#e30f28`
- **Usuario**: Avatar `#00246a`
- **Items activos**: Fondo `#e30f28`, iconos `#00246a`
- **Barras de progreso**: Gradiente de `#e30f28` a `#00246a`

### 3. Página de Login
- **Fondo**: Gradiente de `#e30f28/5` a `#00246a/5`
- **Elementos decorativos**: Gradientes con `#e30f28` y `#00246a`
- **Tabs activos**: 
  - Login: Gradiente de `#e30f28` a `#00246a`
  - Register: Gradiente de `#00246a` a `#e30f28`
- **Formularios**: 
  - Headers: Gradiente de `#e30f28` a `#00246a`
  - Focus states: `#e30f28` con opacity
  - Botones principales: Gradiente institucional

### 4. Hero Section
- **Textos**: `#00246a` para títulos, `#e30f28` para palabras dinámicas
- **Botones**: 
  - Primario: `#e30f28`
  - Secundario: Border `#00246a`, hover fill `#00246a`
- **Estadísticas**: Color `#00246a`
- **Elementos decorativos**: Gradientes con ambos colores

### 5. Componente Method
- **Badge**: Fondo `#00246a/10`, texto `#00246a`
- **Título**: Color `#00246a`
- **Steps activos**: 
  - Fondo: Gradiente de `#e30f28/10` a `#00246a/10`
  - Número: Fondo `#e30f28`
  - Título: Color `#e30f28`
- **Elementos decorativos**: Ambos colores con opacity

## Clases Utilitarias Personalizadas

### En globals.css
```css
.bg-primary { background-color: var(--primary-red); }
.bg-secondary { background-color: var(--primary-blue); }
.text-primary { color: var(--primary-red); }
.text-secondary { color: var(--primary-blue); }
.border-primary { border-color: var(--primary-red); }
.border-secondary { border-color: var(--primary-blue); }
.bg-gradient-primary { 
  background: linear-gradient(135deg, var(--primary-red), var(--primary-blue)); 
}
.bg-gradient-primary-light { 
  background: linear-gradient(135deg, rgba(227, 15, 40, 0.1), rgba(0, 36, 106, 0.1)); 
}
```

## Convenciones de Uso

### Estados Interactivos
- **Estados normales**: Usar colores base
- **Estados hover**: Usar color primario con 10-20% opacity para fondos
- **Estados activos**: Usar color primario sólido
- **Estados focus**: Usar `#e30f28` con ring/outline

### Gradientes
- **Principal**: De `#e30f28` a `#00246a`
- **Invertido**: De `#00246a` a `#e30f28`
- **Sutiles**: Usar con 5-10% opacity para fondos

### Consistencia Visual
1. **Siempre usar** las variables CSS en lugar de valores hardcodeados
2. **Mantener jerarquía**: Rojo para acciones principales, azul para secundarias
3. **Aplicar opacity** de manera consistente: 5% para fondos sutiles, 10% para hover, 20% para elementos más prominentes
4. **Usar gradientes** para elementos destacados como headers y botones principales

## Archivos Actualizados

### Componentes principales
- ✅ `src/app/globals.css` - Variables globales y clases utilitarias
- ✅ `src/components/admin/AdminSidebar.tsx`
- ✅ `src/app/Student/Sidebar.tsx`
- ✅ `src/app/Login/page.tsx`
- ✅ `src/components/Login/login-form.tsx`
- ✅ `src/components/Register/register-form.tsx`
- ✅ `src/components/ui/hero.tsx`
- ✅ `src/components/ui/Method.tsx`
- ✅ `src/components/admin/AdminDashboard.tsx`

### Componentes UI actualizados
- ✅ `src/components/ui/button.tsx` - Botones con colores institucionales
- ✅ `src/components/ui/input.tsx` - Inputs con bordes y fondos institucionales
- ✅ `src/components/ui/badge.tsx` - Badges con variantes institucionales
- ✅ `src/components/ui/card.tsx` - Cards con gradientes institucionales
- ✅ `src/components/ui/tabs.tsx` - Tabs con colores institucionales
- ✅ `src/components/ui/select.tsx` - Selects con estilos institucionales
- ✅ `src/components/ui/textarea.tsx` - Textareas con colores institucionales
- ✅ `src/components/ui/alert.tsx` - Alertas con variantes mejoradas
- ✅ `src/components/ui/progress.tsx` - Barras de progreso con gradiente institucional
- ✅ `src/components/ui/switch.tsx` - Switches con gradiente institucional

## Componentes UI - Detalles de Implementación

### Button
- **Default**: Fondo `#e30f28`, hover `#e30f28/90`
- **Secondary**: Fondo `#00246a`, hover `#00246a/90`
- **Outline**: Border `#e30f28`, hover `#e30f28/10`
- **Ghost**: Texto `#e30f28`, hover `#e30f28/10`
- **Focus**: Ring `#e30f28`

### Input & Textarea
- **Border**: `#e30f28/30`, focus `#e30f28`
- **Background**: Gradiente de `#e30f28/5` a `#00246a/5`
- **Text**: `#00246a`
- **Hover**: Border `#e30f28/50`, fondo más intenso

### Card
- **Border**: `#e30f28/20`, hover `#e30f28/40`
- **Background**: Gradiente sutil institucional
- **Title**: Texto con gradiente de `#e30f28` a `#00246a`
- **Header/Footer**: Gradientes con colores institucionales

### Badge
- **Default**: Fondo `#e30f28`
- **Secondary**: Fondo `#00246a`
- **Rainbow**: Gradiente de `#e30f28` a `#00246a`
- **Outline**: Border y texto `#e30f28`

### Tabs
- **TabsList**: Gradiente de `#e30f28/10` a `#00246a/10`
- **Active Tab**: Gradiente de `#e30f28` a `#00246a`
- **TabsContent**: Fondo con gradiente sutil

### Select
- **Trigger**: Similar a Input con colores institucionales
- **Content**: Fondo con gradiente institucional
- **Items**: Focus `#e30f28/10`

### Progress
- **Background**: Gris neutro
- **Indicator**: Gradiente de `#e30f28` a `#00246a`

### Switch
- **Checked**: Gradiente de `#e30f28` a `#00246a`
- **Unchecked**: Gris neutro
- **Focus**: Ring `#e30f28`

### Alert
- **Default**: Gradiente sutil institucional
- **Info**: Colores `#00246a`
- **Success/Warning/Error**: Colores estándar respectivos

La aplicación ahora mantiene una paleta de colores uniforme y profesional basada en los colores institucionales de la marca en TODOS los componentes UI.
