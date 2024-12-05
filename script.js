document.getElementById("consulta-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const pregunta = document.getElementById("pregunta").value;
    const respuestaDiv = document.getElementById("respuesta");
    const analisisDiv = document.getElementById("analisis");

    // Limpia el contenido anterior antes de iniciar una nueva consulta
    respuestaDiv.textContent = "Procesando respuesta...";
    analisisDiv.textContent = "";

    try {
        // Enviar la pregunta al endpoint de LM Studio
        const responseLM = await fetch("http://localhost:1234/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "llama3",
                messages: [{ role: "user", content: pregunta }],
                max_tokens: 200
            })
        });

        if (!responseLM.ok) {
            throw new Error(`Error en LM Studio: ${responseLM.statusText}`);
        }

        const dataLM = await responseLM.json();
        const respuestaTexto = dataLM.choices[0].message.content;
        respuestaDiv.textContent = respuestaTexto;  // Solo la respuesta de LM Studio
        console.log(respuestaTexto)
        // Enviar la respuesta obtenida para análisis
        const responseAnalisis = await fetch("http://ec2-54-204-164-85.compute-1.amazonaws.com:10000/analyzer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ texto: respuestaTexto })
        });

        if (!responseAnalisis.ok) {
            throw new Error(`Error en análisis: ${responseAnalisis.statusText}`);
        }

        const dataAnalisis = await responseAnalisis.json();
        analisisDiv.innerHTML = `
            <p><strong>Coherencia:</strong> ${dataAnalisis.coherencia}</p>
            <p><strong>Profundidad Conceptual:</strong> ${dataAnalisis.profundidad_conceptual}</p>
            <p><strong>Resumen:</strong> ${dataAnalisis.resumen}</p>
        `;

    } catch (error) {
        // Muestra el error en el div correcto según el proceso que falle
        if (error.message.includes("LM Studio")) {
            respuestaDiv.textContent = `Error en LM Studio: ${error.message}`;
        } else {
            analisisDiv.textContent = `Error en análisis: ${error.message}`;
        }
    }
});
