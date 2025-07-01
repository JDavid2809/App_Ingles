# Panel de Administración - Sistema de Enseñanza de Inglés

## Descripción General

El panel de administración proporciona una interfaz completa para gestionar todos los aspectos del sistema de enseñanza de inglés, incluyendo estudiantes, profesores, cursos, pagos y exámenes.

## Funcionalidades Implementadas

### 🎯 Dashboard Principal
- **Resumen estadístico**: Vista general con métricas clave del sistema
- **Actividad reciente**: Últimos pagos e inscripciones
- **Gráficos analíticos**: Tendencias de pagos y distribución de estudiantes

### 👥 Gestión de Estudiantes
- **Lista completa**: Visualización paginada de todos los estudiantes
- **Búsqueda avanzada**: Filtrado por nombre, email o teléfono
- **Crear estudiante**: Registro de nuevos estudiantes con validación
- **Editar información**: Actualización de datos personales
- **Vista detallada**: Información completa incluyendo:
  - Datos personales
  - Cursos inscritos
  - Historial de pagos
  - Historial académico
- **Inscripción a cursos**: Asignación directa de estudiantes a cursos
- **Gestión de estado**: Activar/desactivar estudiantes

### 👨‍🏫 Gestión de Profesores
- **Lista de profesores**: Vista completa del personal docente
- **Registro de profesores**: Creación de nuevos perfiles docentes
- **Información detallada**: Datos personales, académicos y laborales
- **Asignaciones de cursos**: Visualización de cursos asignados
- **Gestión de estado**: Control de profesores activos/inactivos

### 📚 Gestión de Cursos
- **Catálogo de cursos**: Lista completa con filtros por modalidad
- **Creación de cursos**: Nuevos cursos con configuración de fechas
- **Información detallada**: 
  - Profesores asignados
  - Estudiantes inscritos
  - Modalidad (Presencial/En línea)
  - Fechas de inicio y fin
- **Gestión de inscripciones**: Control de estudiantes por curso

### 💰 Gestión de Pagos
- **Historial completo**: Registro detallado de todos los pagos
- **Registro de pagos**: Captura manual de nuevos pagos
- **Estadísticas financieras**: 
  - Ingresos mensuales
  - Número de pagos
  - Pagos pendientes
- **Filtros avanzados**: Por estudiante, fecha o tipo de pago
- **Generación de recibos**: Vista detallada para impresión

### 📝 Gestión de Exámenes
- **Catálogo de exámenes**: Lista de todos los exámenes disponibles
- **Creación de exámenes**: Editor completo con:
  - Información básica (nombre, nivel)
  - Editor de preguntas interactivo
  - Opciones múltiples con respuesta correcta
- **Edición avanzada**: Modificación de exámenes existentes
- **Duplicación**: Creación rápida basada en exámenes existentes
- **Gestión de estado**: Activar/desactivar exámenes

## APIs Implementadas

### Estudiantes
- `GET /api/admin/students` - Lista paginada con filtros
- `POST /api/admin/students` - Crear nuevo estudiante
- `GET /api/admin/students/[id]` - Detalle completo del estudiante
- `PUT /api/admin/students/[id]` - Actualizar información
- `DELETE /api/admin/students/[id]` - Desactivar estudiante

### Profesores
- `GET /api/admin/teachers` - Lista paginada de profesores
- `POST /api/admin/teachers` - Crear nuevo profesor

### Cursos
- `GET /api/admin/courses` - Lista de cursos con filtros
- `POST /api/admin/courses` - Crear nuevo curso

### Pagos
- `GET /api/admin/payments` - Historial de pagos
- `POST /api/admin/payments` - Registrar nuevo pago

### Inscripciones
- `POST /api/admin/enrollments` - Inscribir estudiante a curso
- `DELETE /api/admin/enrollments` - Remover estudiante de curso

### Dashboard
- `GET /api/admin/dashboard` - Estadísticas y métricas generales

### Categorías de Edad
- `GET /api/admin/age-categories` - Lista de categorías
- `POST /api/admin/age-categories` - Crear nueva categoría

## Estructura de Archivos

```
src/
├── app/
│   └── admin/
│       ├── layout.tsx              # Layout principal con sidebar
│       ├── page.tsx               # Dashboard principal
│       ├── students/
│       │   └── page.tsx          # Página de gestión de estudiantes
│       ├── teachers/
│       │   └── page.tsx          # Página de gestión de profesores
│       ├── courses/
│       │   └── page.tsx          # Página de gestión de cursos
│       ├── payments/
│       │   └── page.tsx          # Página de gestión de pagos
│       └── examenes/
│           └── page.tsx          # Página de gestión de exámenes
├── components/
│   └── admin/
│       ├── AdminDashboard.tsx     # Componente principal del dashboard
│       ├── AdminSidebar.tsx       # Barra lateral de navegación
│       ├── StudentsManagement.tsx # Gestión de estudiantes
│       ├── TeachersManagement.tsx # Gestión de profesores
│       ├── CoursesManagement.tsx  # Gestión de cursos
│       ├── PaymentsManagement.tsx # Gestión de pagos
│       └── ExamsManagement.tsx    # Gestión de exámenes
└── app/api/admin/
    ├── students/                  # APIs de estudiantes
    ├── teachers/                  # APIs de profesores
    ├── courses/                   # APIs de cursos
    ├── payments/                  # APIs de pagos
    ├── enrollments/               # APIs de inscripciones
    ├── dashboard/                 # APIs de estadísticas
    └── age-categories/            # APIs de categorías
```

## Características Técnicas

### Seguridad
- **Autenticación requerida**: Todas las rutas verifican sesión válida
- **Autorización por rol**: Solo usuarios con rol 'ADMIN' pueden acceder
- **Validación de datos**: Verificación en frontend y backend

### Interfaz de Usuario
- **Responsive Design**: Adaptable a diferentes tamaños de pantalla
- **Componentes reutilizables**: Uso de shadcn/ui para consistencia
- **Navegación intuitiva**: Sidebar colapsible con iconos descriptivos
- **Feedback visual**: Toasts para confirmaciones y errores

### Rendimiento
- **Paginación**: Carga de datos por páginas para mejor rendimiento
- **Búsqueda optimizada**: Filtros en tiempo real
- **Carga lazy**: Componentes cargados según necesidad

### Base de Datos
- **Integridad referencial**: Relaciones bien definidas entre tablas
- **Soft delete**: Desactivación en lugar de eliminación física
- **Auditoría**: Campos de fecha para seguimiento de cambios

## Rutas de Acceso

- `/admin` - Dashboard principal
- `/admin/students` - Gestión de estudiantes
- `/admin/teachers` - Gestión de profesores
- `/admin/courses` - Gestión de cursos
- `/admin/payments` - Gestión de pagos
- `/admin/examenes` - Gestión de exámenes

## Requisitos de Acceso

- **Rol requerido**: ADMIN
- **Autenticación**: Sesión válida con NextAuth
- **Permisos**: Acceso completo a todas las funcionalidades

## Próximas Mejoras Sugeridas

1. **Reportes avanzados**: Exportación a PDF/Excel
2. **Notificaciones**: Sistema de alertas automáticas
3. **Calendario**: Vista de horarios y eventos
4. **Comunicación**: Mensajería interna
5. **Configuración**: Panel de ajustes del sistema
6. **Backup**: Sistema de respaldo de datos
7. **Logs de actividad**: Registro de acciones administrativas

## Notas de Desarrollo

- Utiliza Next.js 13+ con App Router
- Implementa shadcn/ui para componentes
- Base de datos PostgreSQL con Prisma ORM
- Autenticación con NextAuth.js
- TypeScript para type safety
- Tailwind CSS para estilos
