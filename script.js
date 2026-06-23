document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. FUNCIONALIDADE: Modo de Acessibilidade (Alto Contraste / Modo Escuro)
       ========================================================================== */
    const themeButton = document.getElementById("toggle-theme");
    
    // Verifica se o usuário já tinha uma preferência salva no navegador
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        themeButton.setAttribute('aria-label', savedTheme === 'dark' ? "Alternar para modo claro" : "Alternar para modo escuro");
    }

    themeButton.addEventListener("click", () => {
        // Captura o tema atual do elemento raiz (HTML)
        const currentTheme = document.documentElement.getAttribute("data-theme");
        let newTheme = "light";

        if (currentTheme !== "dark") {
            newTheme = "dark";
        }

        // Aplica o novo tema e salva a escolha do usuário
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);

        // Atualiza a acessibilidade para leitores de tela
        themeButton.setAttribute('aria-label', newTheme === 'dark' ? "Alternar para modo claro" : "Alternar para modo escuro");
    });

    /* ==========================================================================
       2. FUNCIONALIDADE: Validador Interativo do Quiz Anti-Desinformação
       ========================================================================== */
    const quizForm = document.getElementById("quiz-form");
    const feedbackBox = document.getElementById("quiz-feedback");

    quizForm.addEventListener("submit", (event) => {
        // Impede que a página recarregue ao enviar o formulário
        event.preventDefault();

        // Captura a opção selecionada pelo usuário utilizando FormData
        const formData = new FormData(quizForm);
        const userAnswer = formData.get("quiz-answer");

        // Remove classes anteriores de feedback para resetar o estado visual
        feedbackBox.classList.remove("hidden", "success", "error");

        // Validação: Se o usuário não escolheu nenhuma alternativa
        if (!userAnswer) {
            feedbackBox.textContent = "⚠️ Por favor, selecione uma alternativa antes de verificar.";
            feedbackBox.classList.add("error");
            return;
        }

        // Processamento da resposta utilizando variáveis lógicas
        const correctAnswer = "deepfake";

        if (userAnswer === correctAnswer) {
            feedbackBox.textContent = "🎉 Resposta Correta! Elementos como falhas de sincronia de áudio, movimentos robóticos e cenários estáticos são fortes indícios de mídias sintetizadas por Inteligência Artificial (Deepfakes). Fique sempre atento!";
            feedbackBox.classList.add("success");
        } else {
            feedbackBox.textContent = "❌ Resposta Incorreta. Tente analisar os detalhes novamente! Lembre-se: anomalias estéticas e falhas na voz são marcas comuns de manipulações digitais automatizadas.";
            feedbackBox.classList.add("error");
        }
    });
});

