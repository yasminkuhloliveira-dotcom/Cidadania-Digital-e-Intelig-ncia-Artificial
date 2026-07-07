document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggle-dark-mode");
    const quizForm = document.getElementById("quiz-form");
    const quizResult = document.getElementById("quiz-result");

    // 1. Funcionalidade de Modo Escuro
    toggleButton.addEventListener("click", () => {
        const currentTheme = document.body.getAttribute("data-theme");
        if (currentTheme === "dark") {
            document.body.removeAttribute("data-theme");
        } else {
            document.body.setAttribute("data-theme", "dark");
        }
    });

    // 2. Validador do Quiz de Fake News
    quizForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const q1 = quizForm.elements["q1"].value;
        const q2 = quizForm.elements["q2"].value;

        // Verificação se o usuário respondeu todas as perguntas
        if (!q1 || !q2) {
            quizResult.textContent = "Por favor, responda todas as perguntas antes de enviar!";
            quizResult.className = "error";
            return;
        }

        // Validação das respostas
        if (q1 === "certo" && q2 === "certo") {
            quizResult.textContent = "Parabéns! Você acertou todas as questões e sabe como combater a desinformação! 🎉";
            quizResult.className = "success";
        } else {
            quizResult.textContent = "Algumas respostas estão incorretas. Atente-se aos sinais e tente novamente!";
            quizResult.className = "error";
        }
    });
});
