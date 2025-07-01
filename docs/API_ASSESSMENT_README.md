# API de Examen de Nivelación

Esta API permite gestionar el examen de nivelación de inglés, incluyendo la obtención de preguntas, envío de resultados y consulta del historial.

## Endpoints Disponibles

### 1. Obtener Preguntas del Examen
```
GET /api/assessment/questions
```

**Respuesta:**
```json
{
  "examId": 1,
  "questions": [
    {
      "id": 1,
      "question": "What is your name?",
      "options": ["My name is John", "I am John", "John is my name", "All of the above"],
      "correct": 3
    }
  ]
}
```

### 2. Enviar Resultados del Examen
```
POST /api/assessment/submit
```

**Body:**
```json
{
  "studentId": 1,
  "examId": 1,
  "score": 8,
  "totalQuestions": 10,
  "answers": [0, 1, 0, 0, 2, 1, 1, 0, 0, 1]
}
```

**Respuesta:**
```json
{
  "resultId": 1,
  "score": 8,
  "totalQuestions": 10,
  "percentage": "80.00",
  "level": "C1 - Advanced",
  "message": "Resultado guardado exitosamente"
}
```

### 3. Obtener Niveles Disponibles
```
GET /api/assessment/levels
```

**Respuesta:**
```json
[
  {
    "id_nivel": 1,
    "nombre": "Nivel Básico",
    "b_activo": true
  }
]
```

### 4. Obtener Historial de un Estudiante
```
GET /api/assessment/history/[studentId]
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "examName": "Examen de Nivelación",
    "score": 80.00,
    "date": "2025-06-28T00:00:00.000Z",
    "level": "C1 - Advanced"
  }
]
```

### 5. Poblar Base de Datos con Preguntas (Solo para desarrollo)
```
POST /api/assessment/seed
```

**Respuesta:**
```json
{
  "message": "Examen de nivelación creado exitosamente",
  "examId": 1,
  "questionsCreated": 10
}
```

## Configuración de la Base de Datos

Antes de usar la API, asegúrate de:

1. **Migrar la base de datos:**
   ```bash
   npx prisma migrate dev
   ```

2. **Generar el cliente de Prisma:**
   ```bash
   npx prisma generate
   ```

3. **Poblar la base de datos con preguntas de prueba:**
   ```bash
   curl -X POST http://localhost:3000/api/assessment/seed
   ```

## Niveles de Inglés

La API clasifica automáticamente los resultados según el Marco Común Europeo:

- **90-100%**: C2 - Proficiency
- **80-89%**: C1 - Advanced  
- **70-79%**: B2 - Upper Intermediate
- **60-69%**: B1 - Intermediate
- **50-59%**: A2 - Elementary
- **40-49%**: A1 - Beginner
- **0-39%**: Pre-A1 - Starter

## Uso en el Frontend

El componente de assessment ya está configurado para usar esta API. Simplemente navega a `/assessment` para ver el examen en funcionamiento.

### Características del Examen:
- ⏱️ Tiempo límite de 15 minutos
- 📊 Cálculo automático del nivel
- 💾 Guardado automático de resultados
- 🔄 Opción de repetir el examen
- 📱 Diseño responsive

## Variables de Entorno

Asegúrate de tener configurada la variable de entorno:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_bd"
```

## Estructura de la Base de Datos

La API utiliza las siguientes tablas del schema de Prisma:

- `examen`: Almacena información de los exámenes
- `pregunta`: Preguntas de cada examen
- `respuesta`: Opciones de respuesta para cada pregunta
- `resultado_examen`: Resultados de los estudiantes
- `estudiante`: Información de los estudiantes
- `nivel`: Niveles de inglés disponibles

## Próximas Mejoras

- [ ] Autenticación de usuarios
- [ ] Preguntas con imágenes/audio
- [ ] Exámenes adaptativos
- [ ] Reportes detallados
- [ ] Múltiples tipos de examen
- [ ] Integración con cursos
