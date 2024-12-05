from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
from transformers import pipeline

# Cargar el modelo de spaCy para el análisis de coherencia en español
nlp = spacy.load("es_core_news_sm")

# Cargar el modelo de Hugging Face para profundidad conceptual (resumen)
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

app = Flask(__name__)
CORS(app)
# Ruta principal para análisis
@app.route('/analyzer', methods=['POST'])
def analizar_texto():
    data = request.json
    texto = data.get("texto", "")

    if not texto:
        return jsonify({"error": "No se proporcionó texto para analizar."}), 400

    # Análisis de coherencia (simples características lingüísticas)
    doc = nlp(texto)
    num_oraciones = len(list(doc.sents))
    num_tokens = len(doc)
    coherencia = "Alta" if num_oraciones > 1 and num_tokens / num_oraciones > 10 else "Baja"

    # Profundidad conceptual usando un resumen breve
    resumen = summarizer(texto, max_length=50, min_length=25, do_sample=False)
    profundidad = "Alta" if len(resumen[0]['summary_text'].split()) < len(texto.split()) / 2 else "Media"

    resultado = {
        "coherencia": coherencia,
        "profundidad_conceptual": profundidad,
        "resumen": resumen[0]['summary_text']
    }

    return jsonify(resultado)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
