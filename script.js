// Banco de dados com suporte a mídias estruturadas e URLs reais
const bancoPerguntas = [
    {
        fase: "Fase 1: Veracidade Facial",
        tipo: "imagem",
        urlMidia: "assets/imagens/deepfake_rosto.jpg", // Caminho da sua imagem no repositório
        texto: "Analise os olhos e as bordas do rosto na foto. Trata-se de uma imagem real ou gerada por IA?",
        ehReal: false,
        explicacao: "Fake! Os reflexos nos olhos estão desalinhados e as bordas ao redor do cabelo apresentam borrões sintéticos típicos de IA."
    },
    {
        fase: "Fase 2: Veracidade de Voz",
        tipo: "audio",
        urlMidia: "assets/audios/clonagem_voz.mp3", // Caminho do seu áudio no repositório
        texto: "Ouça o áudio com atenção. Essa voz robótica simulando um pedido de ajuda é confiável?",
        ehReal: false,
        explicacao: "Fake! O áudio possui cadência artificial e ruídos metálicos que denunciam uma clonagem de voz por inteligência artificial."
    },
    {
        fase: "Fase 3: Veracidade de Links",
        tipo: "link",
        urlMidia: "https://banc0-b0as-compras.com.br",
        texto: "Examine a URL acima cuidadosamente. Esse endereço de site é seguro para navegação?",
        ehReal: false,
        explicacao: "Fake! O link usa caracteres substitutos ('0' no lugar da letra 'o') para enganar você através de Phishing."
    },
    {
        fase: "Fase 4: Mural de Notícias",
        tipo: "noticia",
        urlMidia: "📰 'Urgente: Nova IA lê pensamentos humanos a quilômetros de distância via satélite, aponta blog desconhecido.'",
        texto: "Essa manchete jornalística compartilhada em massa é verídica?",
        ehReal: false,
        explicacao: "Fake! Notícias bombásticas sem referências científicas ou canais oficiais de imprensa são desinformação pura."
    }
];

let faseAtual = 0;
let pontuacaoTotal = 0;
let comboAcertos = 1;

function inicializarFase() {
    const dadosFase = bancoPerguntas[faseAtual];
    document.getElementById("fase-titulo").innerText = dadosFase.fase;
    document.getElementById("fase-progresso").innerText = `Questão ${faseAtual + 1} de ${bancoPerguntas.length}`;
    document.getElementById("pergunta-texto").innerText = dadosFase.texto;
    
    const display = document.getElementById("pergunta-midia");
    display.innerHTML = ""; // Limpa mídia anterior

    // Renderiza a mídia correspondente ao tipo de forma real
    if (dadosFase.tipo === "imagem") {
        display.innerHTML = `<img src="${dadosFase.urlMidia}" alt="Análise Facial para o Quiz">`;
    } else if (dadosFase.tipo === "audio") {
        display.innerHTML = `🔊 <audio controls><source src="${dadosFase.urlMidia}" type="audio/mpeg">Seu navegador não suporta áudio.</audio>`;
    } else if (dadosFase.tipo === "link") {
        display.innerHTML = `<span class="link-highlight">${dadosFase.urlMidia}</span>`;
    } else if (dadosFase.tipo === "noticia") {
        display.innerHTML = `<div class="link-highlight" style="background:#e2e8f0; color:#2d3748; border-color:#cbd5e1;">${dadosFase.urlMidia}</div>`;
    }
    
    document.getElementById("feedback").className = "feedback-box hidden";
}

function verificarResposta(respostaUsuario) {
    const dadosFase = bancoPerguntas[faseAtual];
    const itemFeedback = document.getElementById("feedback");
    
    if (respostaUsuario === dadosFase.ehReal) {
        let pontosGanhos = 100 * comboAcertos;
        pontuacaoTotal += pontosGanhos;
        itemFeedback.innerHTML = `🎉 Correto! +${pontosGanhos} pts.<br><small>${dadosFase.explicacao}</small>`;
        itemFeedback.className = "feedback-box correct-ans";
        comboAcertos++; // Aumenta o multiplicador de streak
    } else {
        itemFeedback.innerHTML = `❌ Incorreto!<br><small>${dadosFase.explicacao}</small>`;
        itemFeedback.className = "feedback-box wrong-ans";
        comboAcertos = 1; // Reseta o multiplicador
    }

    // Atualiza placar na tela
    document.getElementById("game-score").innerText = pontuacaoTotal;
    document.getElementById("game-streak").innerText = `${comboAcertos}x`;

    setTimeout(() => {
        faseAtual++;
        if (faseAtual < bancoPerguntas.length) {
            inicializarFase();
        } else {
            finalizarJogo();
        }
    }, 5000);
}

function finalizarJogo() {
    document.getElementById("quiz-card").innerHTML = `
        <h3>🏆 Desafio Concluído!</h3>
        <p>Sua pontuação final foi de <strong>${pontuacaoTotal}</strong> pontos.</p>
        <p>Você demonstrou ótimos critérios de cidadania e proteção digital!</p>
        <button onclick="location.reload()" class="btn-game" style="background:#007bff; color:white; margin-top:15px;">Jogar Novamente</button>
    `;
}

// Inicia o motor do jogo
window.addEventListener("DOMContentLoaded", inicializarFase);
</script>
function verificarResposta(tipo) {
    alert("Você clicou no botão: " + tipo);
    // Aqui dentro vai a lógica para somar pontos ou mudar de questão
}

