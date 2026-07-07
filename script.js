/**
 * Projeto: Cidadania Digital & Inteligência Artificial
 * Componente: Lógica Interativa e Controle de Acessibilidade
 */

document.addEventListener("DOMContentLoaded", () => {
    // Seleção de elementos do DOM
    const toggleButton = document.getElementById("toggle-dark-mode");
    const themeText = document.getElementById("theme-text");
    const quizForm = document.getElementById("quiz-form");
    const quizResult = document.getElementById("quiz-result");

    /* ==========================================================================
       1. SISTEMA DE TEMA ESCURO (PERSISTENTE E ACESSÍVEL)
       ========================================================================== */
    const applyTheme = (theme) => {
        if (theme === "dark") {
            document.body.setAttribute("data-theme", "dark");
            themeText.textContent = "Modo Claro";
            toggleButton.setAttribute("aria-label", "Ativar modo claro");
        } else {
            document.body.removeAttribute("data-theme");
            themeText.textContent = "Modo Escuro";
            toggleButton.setAttribute("aria-label", "Ativar modo escuro");
        }
    };

    // Inicializa o tema com base na escolha prévia guardada no navegador
    const savedTheme = localStorage.getItem("app-theme") || "light";
    applyTheme(savedTheme);

    toggleButton.addEventListener("click", () => {
        const isDark = document.body.getAttribute("data-theme") === "dark";
        const newTheme = isDark ? "light" : "dark";
        localStorage.setItem("app-theme", newTheme);
        applyTheme(newTheme);
    });

    /* ==========================================================================
       2. MOTOR GAMIFICADO DO QUIZ (VALIDAÇÃO INDIVIDUAL POR ELEMENTO)
       ========================================================================== */
    quizForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const questions = ["q1", "q2"];
        let score = 0;
        let allAnswered = true;

        // Reset inicial de feedbacks anteriores para novas tentativas
        resetQuizFeedbacks();

        // Primeira checagem: verificar se tudo foi respondido
        questions.forEach(q => {
            const selected = quizForm.querySelector(`input[name="${q}"]:checked`);
            if (!selected) {
                allAnswered = false;
            }
        });

        if (!allAnswered) {
            showResult("⚠️ Atenção! Por favor, selecione uma alternativa em cada questão para prosseguir.", "error");
            return;
        }

        // Processamento da correção individual por pergunta
        questions.forEach(q => {
            const formGroup = quizForm.querySelector(`[data-question="${q}"]`);
            const feedbackBadge = formGroup.querySelector(".feedback-badge");
            const selectedRadio = quizForm.querySelector(`input[name="${q}"]:checked`);
            
            // Pinta a borda da alternativa selecionada pelo usuário
            const selectedLabel = selectedRadio.closest(".radio-label");

            if (selectedRadio.value === "certo") {
                score++;
                selectedLabel.classList.add("correct-answer");
                feedbackBadge.classList.add("correct");
            } else {
                selectedLabel.classList.add("wrong-answer");
                feedbackBadge.classList.add("wrong");
                
                // Engenharia de Usabilidade: Destaca sutilmente a alternativa correta para ensinar o usuário
                const correctRadio = formGroup.querySelector(`input[value="certo"]`);
                correctRadio.closest(".radio-label").classList.add("correct-answer");
            }
        });
        // Apresentação do feedback final consolidado
        if (score === questions.length) {
            showResult(`🎉 Perfeito! Você acertou todas as questões (${score} de ${questions.length}). Seu senso crítico digital está excelente!`, "success");
        } else {
            showResult(`❌ Você acertou ${score} de ${questions.length} questões. Analise as respostas destacadas em verde para compreender os conceitos de segurança.`, "error");
        }
    });

    /**
     * Limpa todas as classes de acerto e erro do formulário
     */
    function resetQuizFeedbacks() {
        // Limpa bordas coloridas dos labels
        const allLabels = quizForm.querySelectorAll(".radio-label");
        allLabels.forEach(label => {
            label.classList.remove("correct-answer", "wrong-answer");
        });

        // Limpa badges (emojis) das perguntas
        const allBadges = quizForm.querySelectorAll(".feedback-badge");
        allBadges.forEach(badge => {
            badge.classList.remove("correct", "wrong");
        });
    }
    /**
     * Gerencia a caixa de resultado final
     */
    function showResult(message, state) {
        quizResult.textContent = message;
        quizResult.className = `result-box ${state}`; // Remove a classe 'hidden' automaticamente
        
        // Coloca o foco do teclado no resultado para que leitores de tela leiam imediatamente (Acessibilidade)
        quizResult.focus();
    }
});
