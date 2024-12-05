# Usa una imagen base de Python
FROM python:3.12-slim

# Instalar dependencias del sistema para compilar paquetes nativos
RUN apt-get update && apt-get install -y \
    build-essential \
    libsndfile1 \
    python3-dev \
    libatlas3-base \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo de requisitos y el código al contenedor
COPY requirements.txt /app/requirements.txt
COPY analyzer.py /app/analyzer.py

# Instalar las dependencias de Python
RUN pip install --no-cache-dir -r /app/requirements.txt

# Descargar el modelo de idioma español de spaCy
RUN python -m spacy download es_core_news_sm

# Exponer el puerto 5000
EXPOSE 5000

# Ejecutar el script que ejecutará el servidor (usando Flask por ejemplo)
CMD ["python", "analyzer.py"]
