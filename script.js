document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggle-dark-mode");
    const quizForm = document.getElementById("quiz-form");
    const quizResult = document.getElementById("quiz-result");

    // 1. Persistência Inteligente do Modo Escuro
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.setAttribute("data-theme", "dark");
    }

    toggleButton.addEventListener("click", () => {
        const isDark = document.body.getAttribute("data-theme") === "dark";
        if (isDark) {
            document.body.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
        } else {
            document.body.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        }
    });

    // 2. Validação Avançada do Quiz com Feedback Visual
    quizForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Captura segura das opções selecionadas
        const q1Data = quizForm.querySelector('input[name="q1"]:checked');
        const q2Data = quizForm.querySelector('input[name="q2"]:checked');

        // Exibe erro se alguma questão ficou em branco
        if (!q1Data || !q2Data) {
            showFeedback("⚠️ Ops! Responda a todas as perguntas para simular o resultado.", "error");
            return;
        }

        // Validação lógica
        if (q1Data.value === "certo" && q2Data.value === "certo") {
            showFeedback("🎉 Excelente! Você demonstrou forte senso crítico contra as Fake News!", "success");
        } else {
            showFeedback("❌ Atenção! Algumas escolhas podem te expor a riscos digitais. Revise os cards informativos.", "error");
        }
    });

    // Função auxiliar para exibição e controle de classes CSS
    function showFeedback(message, type) {
        quizResult.textContent = message;
        quizResult.className = `result-box ${type}`; // remove a classe 'hidden' automaticamente
    }
});
