
# Proyecto de Análisis de Coherencia y Profundidad Conceptual con Modelos de Lenguaje

Este proyecto utiliza **Flask**, **spaCy** y **Hugging Face Transformers** para analizar textos en español, determinando su coherencia y profundidad conceptual. El análisis incluye la verificación de la coherencia lingüística y la generación de resúmenes de los textos para evaluar su complejidad conceptual.

## Descripción del Proyecto

El objetivo de este proyecto es ofrecer una herramienta de análisis de textos que pueda proporcionar dos métricas clave sobre un texto en español:
- **Coherencia**: Se evalúa según el número de oraciones y la distribución de tokens.
- **Profundidad Conceptual**: Se mide en base a un resumen generado del texto, proporcionando una indicación de su complejidad conceptual.

## Estructura de Archivos

El proyecto está organizado con los siguientes archivos:

- `analyzer.py`: El servidor Flask que maneja las peticiones de análisis.
- `Dockerfile`: Archivo de configuración para crear una imagen de Docker del proyecto.
- `index.html`: Página web principal para interactuar con el análisis.
- `requirements.txt`: Dependencias del proyecto.
- `script.js`: Archivo JavaScript para la interacción con el frontend.
- `styles.css`: Estilos de la interfaz web.

## Instalación

### Requisitos Previos

1. Python 3.7 o superior.
2. Docker (si prefieres ejecutar el proyecto en un contenedor).

### Pasos para la Instalación Local

1. **Clona el repositorio:**

   ```bash
   git clone <url-del-repositorio>
   cd <directorio-del-proyecto>
   ```

2. **Instala las dependencias:**

   Utilizando `pip`:

   ```bash
   pip install -r requirements.txt
   ```

   Las dependencias necesarias son:

   - Flask
   - Flask-CORS
   - spaCy
   - transformers
   - torch

3. **Descarga el modelo de spaCy:**

   ```bash
   python -m spacy download es_core_news_sm
   ```

4. **Ejecuta el servidor Flask:**

   Para correr la aplicación de forma local:

   ```bash
   python analyzer.py
   ```

   Esto levantará el servidor en `http://0.0.0.0:5000`.

5. **Interfaz Web (Opcional)**

   Para acceder a la interfaz web, abre `index.html` en tu navegador. Puedes enviar peticiones POST con texto al endpoint `/analyzer` para recibir el análisis.

## Docker

Si prefieres ejecutar el proyecto utilizando Docker, sigue estos pasos:

1. **Construir la imagen de Docker:**

   ```bash
   docker build -t analyzer-api .
   ```

2. **Ejecutar el contenedor Docker:**

   ```bash
   docker run -p 10000:5000 analyzer-api
   ```

   Esto iniciará el servidor Flask dentro del contenedor Docker, accesible en `http://localhost:5000`.

## Uso del Endpoint `/analyzer`

El endpoint `/analyzer` está diseñado para recibir peticiones `POST` con un cuerpo JSON que contiene un texto en el campo `texto`. El servidor analizará el texto y devolverá un JSON con los resultados del análisis de coherencia y profundidad conceptual.

### Ejemplo de Petición

```json
{
  "texto": "La inteligencia artificial general representa un avance significativo..."
}
```

### Ejemplo de Respuesta

```json
{
  "coherencia": "Alta",
  "profundidad_conceptual": "Media",
  "resumen": "La AGI representa un avance en la inteligencia artificial..."
}
```

## Despliegue y Arquitectura

En este proyecto también se encuentra el archivo architecture.png con la arquitectura recomendada para balancear actividades al momento de analizar un Llm, como se ve acontinuación

![architecture](https://github.com/user-attachments/assets/9526a0b2-edb4-48cf-ae2f-5086f26f5d6d)

Para el despliegue de esta aplicación se tiene en cuenta lo siguiente

- Acceso AWS Aplify
- Acceso AWS EC2
- Docker
- Aplicación de LM Studio
- Modelo Llama 3.2 B Instruct

## Pruebas

A continuación se presentan algunas preguntas de prueba que puedes usar para evaluar el comportamiento de la herramienta:

- **Baja:** ¿Cuál es la capital del mundo?

![image](https://github.com/user-attachments/assets/479c7195-2fac-4a08-9c57-2041d949fe5c)

- **Media:** ¿Qué es AGI?

![image](https://github.com/user-attachments/assets/e2758a20-1be6-4c01-be0a-879af44d81f4)

- **Alta:** ¿Qué implicaciones éticas y tecnológicas tiene el desarrollo de la inteligencia artificial general (AGI) en la sociedad del futuro?

![image](https://github.com/user-attachments/assets/d7660b5d-ab49-49b6-9d33-bcfc56afce4e)












