7# Panel de Administración de Exámenes

## Descripción
Panel completo para la gestión de exámenes de nivelación y evaluación del sistema de inglés. Permite crear, editar, eliminar y administrar exámenes con sus respectivas preguntas y opciones de respuesta.

## Características

### 🎯 Funcionalidades Principales
- ✅ **Gestión de Exámenes**: Crear, editar y eliminar exámenes
- ✅ **Gestión de Preguntas**: Agregar, modificar y eliminar preguntas
- ✅ **Opciones Múltiples**: Manejo de respuestas con 4 opciones cada una
- ✅ **Niveles de Dificultad**: Asociación con diferentes niveles de inglés
- ✅ **Estados de Activación**: Activar/desactivar exámenes
- ✅ **Búsqueda y Filtros**: Buscar exámenes por nombre o nivel
- ✅ **Vista Previa**: Visualización detallada de exámenes
- ✅ **Interfaz Intuitiva**: Diseño moderno con tabs y formularios organizados

### 🎨 Interfaz de Usuario
- **Diseño Responsivo**: Compatible con dispositivos móviles y escritorio
- **Navegación por Tabs**: Separación entre información general y preguntas
- **Formularios Inteligentes**: Validación en tiempo real
- **Feedback Visual**: Toasts para confirmación de acciones
- **Estados de Carga**: Indicadores visuales durante operaciones

### 📊 Gestión de Datos
- **Listado Completo**: Tabla con todos los exámenes disponibles
- **Información Detallada**: Contador de preguntas, estado, fecha
- **Acciones Rápidas**: Menú dropdown con opciones contextuales
- **Persistencia**: Guardado automático en base de datos PostgreSQL

## Estructura de Archivos

```
src/
├── app/
│   ├── admin/
│   │   ├── examenes/
│   │   │   └── page.tsx              # Página principal del panel
│   │   └── page.tsx                  # Dashboard con acceso rápido
│   └── api/
│       └── admin/
│           └── examenes/
│               ├── route.ts          # API: GET (listar), POST (crear)
│               └── [id]/
│                   └── route.ts      # API: GET, PUT, DELETE por ID
```

## APIs Disponibles

### GET `/api/admin/examenes`
Obtiene la lista completa de exámenes con sus preguntas.

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Examen de Nivelación",
    "level": "Nivel Básico",
    "active": true,
    "createdAt": "30/06/2025",
    "questions": [
      {
        "id": 1,
        "question": "What is your name?",
        "options": ["My name is John", "I am John", "John is my name", "All of the above"],
        "correct": 3
      }
    ]
  }
]
```

### POST `/api/admin/examenes`
Crea un nuevo examen con sus preguntas.

**Body:**
```json
{
  "name": "Nuevo Examen",
  "level": "Nivel Básico",
  "active": true,
  "questions": [
    {
      "question": "Pregunta de ejemplo",
      "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
      "correct": 0
    }
  ]
}
```

### PUT `/api/admin/examenes/[id]`
Actualiza un examen existente.

### DELETE `/api/admin/examenes/[id]`
Elimina un examen y todas sus preguntas asociadas.

### GET `/api/admin/examenes/[id]`
Obtiene los detalles de un examen específico.

## Uso del Panel

### 1. Acceso al Panel
- Navega a `/admin` desde el panel principal
- Haz clic en "Gestionar Exámenes" en las acciones rápidas
- O accede directamente a `/admin/examenes`

### 2. Crear Nuevo Examen
1. Clic en "Nuevo Examen"
2. Completar información general:
   - Nombre del examen
   - Seleccionar nivel
   - Estado activo/inactivo
3. Cambiar a la pestaña "Preguntas"
4. Agregar preguntas una por una:
   - Escribir la pregunta
   - Agregar 4 opciones de respuesta
   - Seleccionar la respuesta correcta
   - Clic en "Agregar Pregunta"
5. Clic en "Crear Examen"

### 3. Editar Examen Existente
1. Buscar el examen en la tabla
2. Clic en el menú de acciones (⋯)
3. Seleccionar "Editar"
4. Modificar la información necesaria
5. Clic en "Actualizar Examen"

### 4. Gestión de Preguntas
- **Agregar**: Usar el formulario en la pestaña "Preguntas"
- **Editar**: Clic en el botón de editar en cada pregunta
- **Eliminar**: Clic en el botón de eliminar
- **Vista Previa**: Las preguntas se muestran con la respuesta correcta destacada en verde

## Validaciones

### Examen
- ✅ Nombre requerido
- ✅ Nivel requerido
- ✅ Mínimo 1 pregunta

### Pregunta
- ✅ Texto de pregunta requerido
- ✅ Todas las opciones requeridas
- ✅ Respuesta correcta seleccionada

## Notificaciones
- ✅ Confirmación de creación exitosa
- ✅ Confirmación de actualización
- ✅ Confirmación de eliminación
- ❌ Errores de validación
- ❌ Errores de servidor

## Base de Datos
El panel interactúa con las siguientes tablas:
- `examen`: Información principal del examen
- `pregunta`: Preguntas asociadas al examen
- `respuesta`: Opciones de respuesta para cada pregunta
- `nivel`: Niveles de inglés disponibles

## Próximas Mejoras
- [ ] Importar/Exportar exámenes en formato JSON/CSV
- [ ] Plantillas de exámenes predefinidas
- [ ] Banco de preguntas reutilizables
- [ ] Estadísticas de rendimiento por examen
- [ ] Programación de exámenes
- [ ] Notificaciones automáticas
- [ ] Duplicar exámenes existentes
- [ ] Historial de cambios

## Tecnologías Utilizadas
- **Frontend**: Next.js 15, React, TypeScript
- **UI Components**: Radix UI, Tailwind CSS, Lucide Icons
- **Backend**: Next.js API Routes
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Validación**: Validación del lado cliente y servidor
