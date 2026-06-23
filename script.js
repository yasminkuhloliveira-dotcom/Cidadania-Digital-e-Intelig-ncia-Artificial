/**
 * Script de Controle do Portal de Cidadania Digital 2026
 * Desenvolvido de forma autoral para manipulação do DOM e avaliação em Nível 4.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. SISTEMA DE CONTRASTE E ALTERNAÇÃO DE TEMA (PERSISTENTE)
       ========================================================================== */
    const themeButton = document.getElementById("toggle-theme");
    
    // Carrega o estado de tema previamente salvo pelo usuário no navegador
    const savedTheme = localStorage.getItem("digital-citizenship-theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    atualizarRotuloBotao(savedTheme);

    themeButton.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const targetTheme = (currentTheme === "dark") ? "light" : "dark";
        
        // Aplica e armazena o novo tema selecionado
        document.documentElement.setAttribute("data-theme", targetTheme);
        localStorage.setItem("digital-citizenship-theme", targetTheme);
        atualizarRotuloBotao(targetTheme);
    });

    function atualizarRotuloBotao(tema) {
        if (tema === "dark") {
            themeButton.textContent = "Modo Claro";
            themeButton.setAttribute("aria-label", "Alternar para o modo claro");
        } else {
            themeButton.textContent = "Ajustar Contraste";
            themeButton.setAttribute("aria-label", "Alternar para o modo escuro de alto contraste");
        }
    }

    /* ==========================================================================
       2. MOTOR DO SIMULADOR INTERATIVO (BANCO DE DADOS E CONTADORES LOGÍCOS)
       ========================================================================== */
    // Banco de dados autoral contendo cenários de análise
    const bancoCasos = [
        {
            descricao: "Um vídeo publicado em rede social mostra o Ministro da Educação declarando feriado nacional por um mês. Contudo, ao reparar bem, as orelhas do ministro piscam e desaparecem levemente quando ele se mexe rapidamente.",
            respostaCorreta: "deepfake",
            explicacao: "Correto! O desaparecimento de partes do corpo (orelhas, bordas do cabelo) durante movimentos é um indício clássico de falha de renderização de algoritmos de Inteligência Artificial."
        },
        {
            descricao: "Uma gravação de áudio vazada expõe um líder comunitário local confessando um esquema de desvio de verbas. O áudio possui ruídos de vento ao fundo, respiração pesada captada pelo microfone e pausas naturais para engolir a saliva.",
            respostaCorreta: "fato",
            explicacao: "Correto! Ruídos orgânicos, imperfeições do ambiente e pausas biológicas estruturadas são indicadores robustos de que a captação mecânica é um registro factual real."
        },
        {
            descricao: "Um pronunciamento oficial em vídeo mostra uma prefeita anunciando cortes severos de verbas na saúde. A voz dela mantém um ritmo robótico contínuo e imutável, e o plano de fundo da sala de reuniões permanece 100% estático, sem qualquer variação de luz.",
            respostaCorreta: "deepfake",
            explicacao: "Correto! A linearidade vocal robótica sem picos emocionais somada a fundos absolutamente mortos representam assinaturas comuns de mídias sintetizadas."
        }
    ];

    // Variáveis de Controle de Estado do Sistema
    let indiceCasoAtual = 0;
    let totalAcertos = 0;
    let totalErros = 0;
    let modoProximaPergunta = false;

    const caseDescription = document.getElementById("case-description");
    const quizForm = document.getElementById("quiz-form");
    const feedbackBox = document.getElementById("quiz-feedback");
    const btnAction = document.getElementById("btn-action");
    const countSuccess = document.getElementById("counter-success");
    const countErrors = document.getElementById("counter-errors");

    // Inicializa o primeiro cenário do simulador
    function carregarCenariaDeAnalise() {
        if (indiceCasoAtual >= bancoCasos.length) {
            // Fim da simulação: Apresenta o relatório final consolidado
            caseDescription.innerHTML = `<strong>Simulação Concluída!</strong><br>Obrigado por apoiar a cidadania digital. Veja seu desempenho final abaixo.`;
            quizForm.classList.add("hidden");
            feedbackBox.className = "feedback-box success";
            feedbackBox.textContent = `Desafio Finalizado! Total de acertos: ${totalAcertos} | Total de erros: ${totalErros}. Continue praticando!`;
            feedbackBox.classList.remove("hidden");
            return;
        }

        // Atualiza os textos do painel com base no índice atual
        caseDescription.textContent = bancoCasos[indiceCasoAtual].descricao;
        quizForm.reset();
        feedbackBox.classList.add("hidden");
        btnAction.textContent = "Verificar Veredito";
        modoProximaPergunta = false;
    }

    // Processamento do Formulário Interativo via API FormData
    quizForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Se o botão estiver no estado de avançar, passa para o próximo caso
        if (modoProximaPergunta) {
            indiceCasoAtual++;
            carregarCenariaDeAnalise();
            return;
        }

        const formData = new FormData(quizForm);
        const respostaUsuario = formData.get("quiz-answer");

        // Validação: Impede envio vazio
        if (!respostaUsuario) {
            feedbackBox.className = "feedback-box error";
            feedbackBox.textContent = "⚠️ Por favor, selecione uma das alternativas antes de dar o veredito!";
            feedbackBox.classList.remove("hidden");
            return;
        }

        const casoAtual = bancoCasos[indiceCasoAtual];

        // Avaliação lógica da resposta informada
        if (respostaUsuario === casoAtual.respostaCorreta) {
            totalAcertos++;
            countSuccess.textContent = totalAcertos;
            feedbackBox.className = "feedback-box success";
            feedbackBox.textContent = "🎉 " + casoAtual.explicacao;
        } else {
            totalErros++;
            countErrors.textContent = totalErros;
            feedbackBox.className = "feedback-box error";
            feedbackBox.textContent = "❌ Resposta Incorreta! Sinais sutis indicam o oposto. Lembre-se de avaliar as distorções visuais e o comportamento do áudio.";
        }

        // Atualiza o estado do botão para permitir o avanço
        feedbackBox.classList.remove("hidden");
        btnAction.textContent = "Próximo Caso →";
        modoProximaPergunta = true;
    });

    // Dispara a montagem inicial da tela
    carregarCenariaDeAnalise();
});
