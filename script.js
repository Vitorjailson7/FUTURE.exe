/* =========================================================
   PROJETO BELL ❤️
   JAVASCRIPT PRINCIPAL — VERSÃO INTERATIVA
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("=================================");
    console.log("PROJETO BELL ❤️");
    console.log("SISTEMA INICIADO");
    console.log("INTERACTIVE SYSTEM v3.0");
    console.log("=================================");


    /* =====================================================
       TELAS
    ===================================================== */

    const secretScreen =
        document.getElementById("secretEntryScreen");

    const welcomeScreen =
        document.getElementById("welcomeScreen");

    const terminalScreen =
        document.getElementById("terminalScreen");

    const connectionScreen =
        document.getElementById("connectionScreen");

    const developmentScreen =
        document.getElementById("developmentScreen");

    const databaseScreen =
        document.getElementById("databaseScreen");

    const futureScreen =
        document.getElementById("futureScreen");

    const letterScreen =
        document.getElementById("letterScreen");

    const finalScreen =
        document.getElementById("finalScreen");


    /* =====================================================
       BOTÕES
    ===================================================== */

    const startButton =
        document.getElementById("startButton");

    const continueButton =
        document.getElementById("continueButton");

    const nextStageButton =
        document.getElementById("nextStageButton");

    const continueDevelopmentButton =
        document.getElementById("continueDevelopmentButton");

    const futureContinueButton =
        document.getElementById("futureContinueButton");

    const letterContinueButton =
        document.getElementById("letterContinueButton");


    /* =====================================================
       SOM
       Nenhum arquivo externo necessário
    ===================================================== */

    let audioEnabled = true;
    let audioContext = null;

    function getAudioContext() {

        if (!audioContext) {

            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;

            if (AudioContext) {
                audioContext = new AudioContext();
            }
        }

        return audioContext;
    }


    function playSound(
        frequency = 440,
        duration = 0.08,
        type = "sine",
        volume = 0.035
    ) {

        if (!audioEnabled) {
            return;
        }

        try {

            const ctx = getAudioContext();

            if (!ctx) {
                return;
            }

            if (ctx.state === "suspended") {
                ctx.resume();
            }

            const oscillator =
                ctx.createOscillator();

            const gain =
                ctx.createGain();

            oscillator.type = type;
            oscillator.frequency.value = frequency;

            gain.gain.setValueAtTime(
                volume,
                ctx.currentTime
            );

            gain.gain.exponentialRampToValueAtTime(
                0.001,
                ctx.currentTime + duration
            );

            oscillator.connect(gain);
            gain.connect(ctx.destination);

            oscillator.start();
            oscillator.stop(
                ctx.currentTime + duration
            );

        } catch (error) {

            console.log(
                "Som indisponível:",
                error
            );

        }
    }


    function playSuccessSound() {

        playSound(520, 0.08);
        setTimeout(() => playSound(660, 0.12), 80);
        setTimeout(() => playSound(880, 0.16), 160);

    }


    function playErrorSound() {

        playSound(180, 0.12, "square", 0.025);

    }


    function playClickSound() {

        playSound(420, 0.045, "sine", 0.02);

    }


    /* =====================================================
       BOTÃO DE SOM
    ===================================================== */

    function createSoundButton() {

        if (document.getElementById("soundToggle")) {
            return;
        }

        const button =
            document.createElement("button");

        button.id = "soundToggle";
        button.type = "button";
        button.textContent = "🔊 SOUND: ON";

        button.style.position = "fixed";
        button.style.right = "20px";
        button.style.bottom = "20px";
        button.style.zIndex = "99999";
        button.style.padding = "9px 13px";
        button.style.background = "rgba(5,5,5,.75)";
        button.style.color = "#aaa";
        button.style.border = "1px solid rgba(255,77,109,.35)";
        button.style.fontFamily = '"Courier New", monospace';
        button.style.fontSize = "10px";
        button.style.letterSpacing = "1px";
        button.style.cursor = "pointer";
        button.style.backdropFilter = "blur(8px)";
        button.style.transition = ".3s";

        button.addEventListener("click", () => {

            audioEnabled = !audioEnabled;

            button.textContent =
                audioEnabled
                    ? "🔊 SOUND: ON"
                    : "🔇 SOUND: OFF";

            if (audioEnabled) {
                playSuccessSound();
            }

        });

        document.body.appendChild(button);
    }


    createSoundButton();


    /* =====================================================
       MOUSE INTERATIVO
    ===================================================== */

    function createMouseSystem() {

        if (document.querySelector(".cursor-dot")) {
            return;
        }

        const dot =
            document.createElement("div");

        dot.className = "cursor-dot";

        const ring =
            document.createElement("div");

        ring.className = "cursor-ring";

        document.body.appendChild(dot);
        document.body.appendChild(ring);

        let mouseX = 0;
        let mouseY = 0;

        let ringX = 0;
        let ringY = 0;

        document.addEventListener(
            "mousemove",
            (event) => {

                mouseX = event.clientX;
                mouseY = event.clientY;

                dot.style.left =
                    mouseX + "px";

                dot.style.top =
                    mouseY + "px";

            }
        );


        function animateRing() {

            ringX +=
                (mouseX - ringX) * 0.14;

            ringY +=
                (mouseY - ringY) * 0.14;

            ring.style.left =
                ringX + "px";

            ring.style.top =
                ringY + "px";

            requestAnimationFrame(
                animateRing
            );
        }


        animateRing();


        document.addEventListener(
            "click",
            (event) => {

                createClickHeart(
                    event.clientX,
                    event.clientY
                );

                playClickSound();

            }
        );


        document.addEventListener(
            "mouseover",
            (event) => {

                const target =
                    event.target.closest(
                        "button, a, .protocol-button, .property-button, .database-key, .future-option, .database-row"
                    );

                if (target) {

                    ring.classList.add(
                        "cursor-hover"
                    );

                }

            }
        );


        document.addEventListener(
            "mouseout",
            (event) => {

                const target =
                    event.target.closest(
                        "button, a, .protocol-button, .property-button, .database-key, .future-option, .database-row"
                    );

                if (target) {

                    ring.classList.remove(
                        "cursor-hover"
                    );

                }

            }
        );

    }


    function createClickHeart(x, y) {

        const heart =
            document.createElement("span");

        heart.className =
            "mouse-heart";

        heart.textContent =
            Math.random() > 0.5
                ? "♥"
                : "✦";

        heart.style.left =
            x + "px";

        heart.style.top =
            y + "px";

        document.body.appendChild(
            heart
        );

        setTimeout(() => {
            heart.remove();
        }, 1200);

    }


    createMouseSystem();


    /* =====================================================
       PARTÍCULAS DO FUNDO
    ===================================================== */

    function createParticles() {

        const container =
            document.createElement("div");

        container.className =
            "interactive-particles";

        document.body.appendChild(
            container
        );


        for (let i = 0; i < 28; i++) {

            const particle =
                document.createElement("span");

            particle.className =
                "interactive-particle";

            particle.style.left =
                Math.random() * 100 + "%";

            particle.style.top =
                Math.random() * 100 + "%";

            particle.style.animationDelay =
                Math.random() * 8 + "s";

            particle.style.animationDuration =
                (5 + Math.random() * 7) + "s";

            container.appendChild(
                particle
            );

        }

    }


    createParticles();


    /* =====================================================
       FUNÇÃO PARA TROCAR DE TELA
    ===================================================== */

    function showScreen(screen) {

        if (!screen) {

            console.error(
                "ERRO: tela não encontrada."
            );

            return;
        }

        console.log(
            "Abrindo tela:",
            screen.id
        );


        document.querySelectorAll(
            ".screen"
        ).forEach((item) => {

            item.classList.remove(
                "active"
            );

            item.style.display =
                "none";

            item.style.opacity =
                "0";

        });


        screen.classList.add(
            "active"
        );

        screen.style.display =
            "flex";

        screen.style.opacity =
            "1";


        document.body.dataset.screen =
            screen.id;


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        playClickSound();


        console.log(
            "Tela aberta:",
            screen.id
        );

    }


    /* =====================================================
       TEMA VISUAL POR TELA
    ===================================================== */

    function updateStageTheme(screen) {

        document.body.classList.remove(
            "stage-secret",
            "stage-welcome",
            "stage-terminal",
            "stage-connection",
            "stage-development",
            "stage-database",
            "stage-future",
            "stage-letter",
            "stage-final"
        );


        if (!screen) {
            return;
        }


        const themes = {

            secretEntryScreen:
                "stage-secret",

            welcomeScreen:
                "stage-welcome",

            terminalScreen:
                "stage-terminal",

            connectionScreen:
                "stage-connection",

            developmentScreen:
                "stage-development",

            databaseScreen:
                "stage-database",

            futureScreen:
                "stage-future",

            letterScreen:
                "stage-letter",

            finalScreen:
                "stage-final"

        };


        if (themes[screen.id]) {

            document.body.classList.add(
                themes[screen.id]
            );

        }

    }


    const originalShowScreen =
        showScreen;


    showScreen = function(screen) {

        originalShowScreen(screen);

        updateStageTheme(screen);

    };


    /* =====================================================
       ETAPA 0
       SITE SUPER SECRETO
    ===================================================== */

    if (
        secretScreen &&
        welcomeScreen
    ) {

        secretScreen.classList.add(
            "active"
        );

        welcomeScreen.classList.remove(
            "active"
        );

        welcomeScreen.style.display =
            "none";

    }


    const secretConsole =
        document.getElementById(
            "secretConsole"
        );

    const secretProgress =
        document.getElementById(
            "secretProgress"
        );

    const progressFill =
        document.getElementById(
            "secretProgressFill"
        );

    const percent =
        document.getElementById(
            "secretPercent"
        );

    const accessButton =
        document.getElementById(
            "secretAccessButton"
        );


    if (
        secretScreen &&
        secretConsole &&
        secretProgress &&
        progressFill &&
        percent &&
        accessButton
    ) {

        const secretLines = [

            "> Verificando conexão segura...",

            "> Criptografia: ATIVADA",

            "> Procurando destinatário...",

            "> Identidade encontrada: BELL",

            "> Verificando autorização...",

            "> Arquivo classificado como CONFIDENCIAL",

            "> Preparando sistema..."

        ];


        let currentLine = 0;


        function addSecretLine() {

            if (
                currentLine >=
                secretLines.length
            ) {

                startSecretProgress();

                return;

            }


            const line =
                document.createElement("div");

            line.textContent =
                secretLines[currentLine];

            secretConsole.appendChild(
                line
            );

            currentLine++;

            playSound(
                330,
                0.035,
                "square",
                0.012
            );


            setTimeout(
                addSecretLine,
                550
            );

        }


        function startSecretProgress() {

            secretProgress.style.display =
                "block";

            let value = 0;


            const interval =
                setInterval(() => {

                    value += 2;

                    progressFill.style.width =
                        value + "%";

                    percent.textContent =
                        value + "%";


                    if (value >= 100) {

                        clearInterval(
                            interval
                        );


                        const finalLine =
                            document.createElement(
                                "div"
                            );

                        finalLine.innerHTML =
                            "> ACESSO AUTORIZADO.";

                        finalLine.className =
                            "success";

                        finalLine.style.marginTop =
                            "10px";

                        secretConsole.appendChild(
                            finalLine
                        );


                        playSuccessSound();


                        setTimeout(() => {

                            accessButton.style.display =
                                "block";

                        }, 500);

                    }

                }, 35);

        }


        accessButton.addEventListener(
            "click",
            () => {

                showScreen(
                    welcomeScreen
                );

            }
        );


        setTimeout(
            addSecretLine,
            900
        );

    }


    /* =====================================================
       ETAPA 1
       WELCOME → TERMINAL
    ===================================================== */

    const terminalContent =
        document.getElementById(
            "terminalContent"
        );

    const terminalResult =
        document.getElementById(
            "terminalResult"
        );

    const terminalCursor =
        document.getElementById(
            "terminalCursor"
        );


    const terminalLines = [

        "> Inicializando projeto...",
        "> Carregando HTML...",
        "> Aplicando estilos CSS...",
        "> Executando JavaScript...",
        "> Analisando dados...",
        "> Procurando algo especial...",
        "",
        "> Resultado encontrado:",
        "",
        '> Pessoa Especial = "Bell" ♥'

    ];


    let terminalStarted = false;


    function startTerminal() {

        if (terminalStarted) {
            return;
        }

        terminalStarted = true;


        if (terminalContent) {
            terminalContent.textContent =
                "";
        }


        if (terminalResult) {
            terminalResult.classList.remove(
                "show"
            );
        }


        if (terminalCursor) {
            terminalCursor.style.display =
                "block";
        }


        let index = 0;


        function escreverLinha() {

            if (
                index >=
                terminalLines.length
            ) {

                if (terminalCursor) {
                    terminalCursor.style.display =
                        "none";
                }


                setTimeout(() => {

                    if (terminalResult) {

                        terminalResult.classList.add(
                            "show"
                        );

                    }


                    createTerminalCommands();


                    if (continueButton) {

                        continueButton.style.display =
                            "inline-block";

                        continueButton.style.visibility =
                            "visible";

                        continueButton.style.opacity =
                            "1";

                    }

                }, 500);

                return;
            }


            if (terminalContent) {

                terminalContent.textContent +=
                    terminalLines[index] +
                    "\n";

            }


            playSound(
                350,
                0.025,
                "square",
                0.01
            );


            index++;


            setTimeout(
                escreverLinha,
                350
            );

        }


        escreverLinha();

    }


    if (startButton) {

        startButton.addEventListener(
            "click",
            () => {

                showScreen(
                    terminalScreen
                );

                startTerminal();

            }
        );

    }


    /* =====================================================
       TERMINAL INTERATIVO
    ===================================================== */

    function createTerminalCommands() {

        if (
            document.getElementById(
                "terminalCommandBox"
            )
        ) {
            return;
        }


        if (!terminalScreen) {
            return;
        }


        const box =
            document.createElement("div");

        box.id =
            "terminalCommandBox";

        box.innerHTML = `

            <div class="command-title">
                TERMINAL INTERATIVO
            </div>

            <div class="command-help">
                Digite <b>help</b> para ver os comandos.
            </div>

            <div class="command-line">

                <span>BELL@SYSTEM:~$</span>

                <input
                    id="terminalCommandInput"
                    type="text"
                    autocomplete="off"
                    spellcheck="false"
                    placeholder="digite um comando..."
                >

            </div>

            <div
                id="terminalCommandOutput"
                class="command-output"
            ></div>

        `;


        const target =
            terminalScreen.querySelector(
                ".terminal-container"
            ) ||
            terminalScreen;


        target.appendChild(box);


        const input =
            document.getElementById(
                "terminalCommandInput"
            );

        const output =
            document.getElementById(
                "terminalCommandOutput"
            );


        if (!input) {
            return;
        }


        input.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key !==
                    "Enter"
                ) {
                    return;
                }


                const command =
                    input.value
                        .trim()
                        .toLowerCase();


                if (!command) {
                    return;
                }


                input.value = "";


                const response =
                    processTerminalCommand(
                        command
                    );


                output.innerHTML += `
                    <div>
                        <span class="command-user">
                            BELL@SYSTEM:~$
                        </span>
                        ${escapeHTML(command)}
                    </div>

                    <div class="command-response">
                        ${response}
                    </div>
                `;


                output.scrollTop =
                    output.scrollHeight;

            }
        );

    }


    function escapeHTML(text) {

        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function processTerminalCommand(
        command
    ) {

        playClickSound();


        switch (command) {

            case "help":

                return `
                    comandos disponíveis:<br><br>
                    <b>about</b> — informações do sistema<br>
                    <b>bell</b> — procurar Bell<br>
                    <b>connection</b> — verificar conexão<br>
                    <b>secret</b> — arquivo secreto<br>
                    <b>clear</b> — limpar terminal
                `;


            case "about":

                return `
                    Projeto: BELL<br>
                    Desenvolvedor: Vitor<br>
                    Tecnologia: HTML + CSS + JavaScript<br>
                    Status: EM EXECUÇÃO
                `;


            case "bell":

                playSuccessSound();

                return `
                    <span class="command-success">
                        IDENTIDADE ENCONTRADA ♥
                    </span><br><br>
                    Nome: Bell<br>
                    Status: pessoa especial<br>
                    Acesso: autorizado
                `;


            case "connection":

                return `
                    conexão detectada...<br>
                    protocolo: HTTPS<br>
                    segurança: ATIVA<br>
                    status: ESTÁVEL
                `;


            case "secret":

                return `
                    <span class="command-secret">
                        ARQUIVO CONFIDENCIAL
                    </span><br><br>
                    Algumas conexões não podem
                    ser previstas por código.
                `;


            case "clear":

                const output =
                    document.getElementById(
                        "terminalCommandOutput"
                    );

                if (output) {
                    output.innerHTML = "";
                }

                return "terminal limpo.";


            default:

                playErrorSound();

                return `
                    comando não encontrado.<br>
                    Digite <b>help</b>.
                `;

        }

    }


    /* =====================================================
       TERMINAL → CONEXÃO
    ===================================================== */

    if (continueButton) {

        continueButton.addEventListener(
            "click",
            () => {

                showScreen(
                    connectionScreen
                );

            }
        );

    }


    /* =====================================================
       ETAPA 2 — CONEXÃO
    ===================================================== */

    const scanButton =
        document.getElementById(
            "scanButton"
        );

    const scanOutput =
        document.getElementById(
            "scanOutput"
        );

    const connectionStatus =
        document.getElementById(
            "connectionStatus"
        );

    const dataPacket =
        document.getElementById(
            "dataPacket"
        );

    const protocolFeedback =
        document.getElementById(
            "protocolFeedback"
        );

    const protocolButtons =
        document.querySelectorAll(
            ".protocol-button"
        );


    let scanCompleted = false;
    let protocolCorrect = false;


    if (scanButton) {

        scanButton.addEventListener(
            "click",
            () => {

                if (scanCompleted) {
                    return;
                }


                scanCompleted = true;

                scanButton.disabled =
                    true;

                scanButton.textContent =
                    "Analisando conexão...";


                const lines = [

                    "> iniciando diagnóstico...",
                    "> procurando dispositivo remoto...",
                    "> dispositivo encontrado: BELL",
                    "> verificando disponibilidade...",
                    "> conexão detectada...",
                    "> analisando segurança...",
                    "> calculando estabilidade...",
                    "> aguardando protocolo..."

                ];


                if (scanOutput) {
                    scanOutput.innerHTML =
                        "";
                }


                let index = 0;


                function adicionarLinha() {

                    if (
                        index >=
                        lines.length
                    ) {

                        scanButton.textContent =
                            "Diagnóstico concluído ✓";

                        if (connectionStatus) {

                            connectionStatus.textContent =
                                "AGUARDANDO";

                        }

                        return;
                    }


                    const line =
                        document.createElement(
                            "div"
                        );

                    line.className =
                        "scan-line";

                    line.textContent =
                        lines[index];


                    if (scanOutput) {

                        scanOutput.appendChild(
                            line
                        );

                    }


                    playSound(
                        300,
                        0.025,
                        "square",
                        0.01
                    );


                    index++;


                    setTimeout(
                        adicionarLinha,
                        400
                    );

                }


                adicionarLinha();

            }
        );

    }


    /* =====================================================
       PROTOCOLOS
    ===================================================== */

    protocolButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const protocol =
                        button.dataset.protocol;


                    if (
                        protocol ===
                        "HTTPS"
                    ) {

                        protocolCorrect =
                            true;


                        playSuccessSound();


                        if (
                            protocolFeedback
                        ) {

                            protocolFeedback.className =
                                "protocol-feedback success";

                            protocolFeedback.innerHTML = `
                                ✓ CONEXÃO SEGURA ESTABELECIDA<br>
                                Criptografia: ATIVADA<br>
                                Comunicação: PROTEGIDA<br>
                                Destino: Bell ♥
                            `;

                        }


                        if (
                            connectionStatus
                        ) {

                            connectionStatus.textContent =
                                "CONECTADO ♥";

                            connectionStatus.classList.add(
                                "connected"
                            );

                        }


                        if (dataPacket) {

                            dataPacket.classList.add(
                                "animate"
                            );

                        }


                      


                        if (nextStageButton) {

                            nextStageButton.classList.add(
                                "show"
                            );

                            nextStageButton.style.display =
                                "inline-block";

                            nextStageButton.style.visibility =
                                "visible";

                            nextStageButton.style.opacity =
                                "1";

                        }


                    } else {

                        playErrorSound();


                        if (
                            protocolFeedback
                        ) {

                            protocolFeedback.className =
                                "protocol-feedback error";

                            protocolFeedback.textContent =
                                "✕ Protocolo incorreto. Tente novamente.";

                        }

                    }

                }
            );

        }
    );


    /* =====================================================
       ANÁLISE DA CONEXÃO
    ===================================================== */

    function runConnectionAnalysis() {

        if (
            document.getElementById(
                "connectionAnalysis"
            )
        ) {
            return;
        }


        if (!connectionScreen) {
            return;
        }


        const analysis =
            document.createElement("div");

        analysis.id =
            "connectionAnalysis";

        analysis.innerHTML = `

            <div class="analysis-header">
                CONNECTION ANALYSIS
            </div>

            <div class="analysis-row">
                <span>DISTÂNCIA</span>
                <span>DETECTADA</span>
            </div>

            <div class="analysis-row">
                <span>COMUNICAÇÃO</span>
                <span>ATIVA</span>
            </div>

            <div class="analysis-row">
                <span>SEGURANÇA</span>
                <span>HTTPS</span>
            </div>

            <div class="analysis-row">
                <span>COMPATIBILIDADE</span>
                <span>?</span>
            </div>

            <div class="analysis-row">
                <span>FUTURO</span>
                <span>DESCONHECIDO</span>
            </div>

            <div class="analysis-final">
                Algumas conexões não podem
                ser calculadas.
            </div>

        `;


        connectionScreen.appendChild(
            analysis
        );

    }


    /* =====================================================
       CONEXÃO → DESENVOLVIMENTO
    ===================================================== */

    if (nextStageButton) {

        nextStageButton.addEventListener(
            "click",
            () => {

                if (!protocolCorrect) {
                    return;
                }

                showScreen(
                    developmentScreen
                );

            }
        );

    }


    /* =====================================================
       ETAPA 3 — DESENVOLVIMENTO
    ===================================================== */

    const propertyButtons =
        document.querySelectorAll(
            ".property-button"
        );

    const propertyFeedback =
        document.getElementById(
            "propertyFeedback"
        );

    const secretCode =
        document.getElementById(
            "secretCode"
        );

    const runCodeButton =
        document.getElementById(
            "runCodeButton"
        );

    const codeResult =
        document.getElementById(
            "codeResult"
        );


    let propertyCorrect = false;


    propertyButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const property =
                        button.dataset.property;


                    if (
                        property ===
                        "sentimento"
                    ) {

                        propertyCorrect =
                            true;


                        playSuccessSound();


                        if (
                            propertyFeedback
                        ) {

                            propertyFeedback.className =
                                "property-feedback success";

                            propertyFeedback.textContent =
                                "✓ Propriedade correta encontrada.";

                        }


                        if (secretCode) {

                            secretCode.classList.add(
                                "show"
                            );

                            secretCode.style.display =
                                "block";

                        }


                    } else {

                        playErrorSound();


                        if (
                            propertyFeedback
                        ) {

                            propertyFeedback.className =
                                "property-feedback error";

                            propertyFeedback.textContent =
                                "✕ Essa propriedade não representa o momento atual da conexão.";

                        }

                    }

                }
            );

        }
    );


    if (runCodeButton) {

        runCodeButton.addEventListener(
            "click",
            () => {

                if (!propertyCorrect) {
                    return;
                }


                runCodeButton.disabled =
                    true;

                runCodeButton.textContent =
                    "Executando...";


                setTimeout(() => {

                    playSuccessSound();


                    runCodeButton.textContent =
                        "✓ Código executado";


                    if (codeResult) {

                        codeResult.classList.add(
                            "show"
                        );

                        codeResult.style.display =
                            "block";

                        codeResult.style.visibility =
                            "visible";

                        codeResult.style.opacity =
                            "1";

                    }


                    if (
                        continueDevelopmentButton
                    ) {

                        continueDevelopmentButton.classList.add(
                            "show"
                        );

                        continueDevelopmentButton.style.display =
                            "inline-block";

                        continueDevelopmentButton.style.visibility =
                            "visible";

                        continueDevelopmentButton.style.opacity =
                            "1";

                        continueDevelopmentButton.style.pointerEvents =
                            "auto";

                        continueDevelopmentButton.style.position =
                            "relative";

                        continueDevelopmentButton.style.zIndex =
                            "9999";

                        continueDevelopmentButton.disabled =
                            false;


                        setTimeout(() => {

                            continueDevelopmentButton.scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            });

                        }, 200);

                    }

                }, 900);

            }
        );

    }


    /* =====================================================
       DESENVOLVIMENTO → DATABASE
    ===================================================== */

    if (continueDevelopmentButton) {

        continueDevelopmentButton.addEventListener(
            "click",
            () => {

                continueDevelopmentButton.disabled =
                    true;

                showScreen(
                    databaseScreen
                );

            }
        );

    }


    /* =====================================================
       ETAPA 4 — DATABASE
    ===================================================== */

    const databaseRows =
        document.querySelectorAll(
            ".database-row"
        );

    const recordId =
        document.getElementById(
            "recordId"
        );

    const recordContent =
        document.getElementById(
            "recordContent"
        );

    const recordViewer =
        document.getElementById(
            "recordViewer"
        );

    const databaseChallenge =
        document.getElementById(
            "databaseChallenge"
        );

    const secretRecord =
        document.getElementById(
            "secretRecord"
        );

    const keyFeedback =
        document.getElementById(
            "keyFeedback"
        );

    const databaseKeys =
        document.querySelectorAll(
            ".database-key"
        );


    const records = {

        1: {
            title: "001 — Primeiro contato",
            content:
`> registro encontrado...

Primeiro contato detectado.
Início da conexão entre Vitor e Bell.

Status: CONEXÃO INICIAL`
        },

        2: {
            title: "002 — Conversas",
            content:
`> analisando comunicação...

Conversas detectadas.
Comunicação aumentando gradualmente.

Status: COMUNICAÇÃO ATIVA`
        },

        3: {
            title: "003 — Risadas",
            content:
`> analisando momentos...

Momentos divertidos encontrados.
Experiência positiva detectada.

Status: EXPERIÊNCIA POSITIVA`
        },

        4: {
            title: "004 — Curiosidade",
            content:
`> analisando comportamento...

Curiosidade detectada.
Interesse em continuar conhecendo.

Status: INVESTIGANDO CONEXÃO`

        }

    };


    databaseRows.forEach(
        (row) => {

            row.addEventListener(
                "click",
                () => {

                    const id =
                        row.dataset.record;


                    if (id === "5") {

                        if (
                            databaseChallenge
                        ) {

                            databaseChallenge.scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            });

                        }


                        if (keyFeedback) {

                            keyFeedback.textContent =
                                "⚠ Registro protegido. Identifique a chave.";

                            keyFeedback.className =
                                "key-feedback error";

                        }

                        return;
                    }


                    const record =
                        records[id];


                    if (!record) {
                        return;
                    }


                    playClickSound();


                    if (recordId) {
                        recordId.textContent =
                            record.title;
                    }


                    if (recordContent) {
                        recordContent.textContent =
                            record.content;
                    }


                    if (recordViewer) {

                        recordViewer.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    }

                }
            );

        }
    );


    /* =====================================================
       CHAVE DO DATABASE
    ===================================================== */

    databaseKeys.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const key =
                        button.dataset.key;


                    if (
                        key ===
                        "CONEXAO"
                    ) {

                        playSuccessSound();


                        if (keyFeedback) {

                            keyFeedback.className =
                                "key-feedback success";

                            keyFeedback.innerHTML =
                                "✓ CHAVE ACEITA<br>Descriptografando registro 005...";

                        }


                        databaseKeys.forEach(
                            (item) => {

                                item.disabled =
                                    true;

                            }
                        );


                        setTimeout(() => {

                            if (
                                databaseChallenge
                            ) {

                                databaseChallenge.style.display =
                                    "none";

                            }


                            if (secretRecord) {

                                secretRecord.classList.add(
                                    "show"
                                );

                                secretRecord.style.display =
                                    "block";

                                secretRecord.style.visibility =
                                    "visible";

                                secretRecord.style.opacity =
                                    "1";

                            }


                            const record005 =
                                document.querySelector(
                                    '.database-row[data-record="5"]'
                                );


                            if (record005) {

                                record005.classList.remove(
                                    "locked"
                                );


                                const status =
                                    record005.querySelector(
                                        ".record-status"
                                    );


                                if (status) {

                                    status.textContent =
                                        "DESBLOQUEADO";

                                }

                            }


                            createDatabaseContinue();

                        }, 700);


                    } else {

                        playErrorSound();


                        if (keyFeedback) {

                            keyFeedback.className =
                                "key-feedback error";

                            keyFeedback.textContent =
                                "✕ Chave incorreta. Acesso negado.";

                        }

                    }

                }
            );

        }
    );


    /* =====================================================
       BOTÃO DATABASE
    ===================================================== */

    function createDatabaseContinue() {

        if (!secretRecord) {
            return;
        }


        let button =
            document.getElementById(
                "nextDatabaseButton"
            );


        if (!button) {

            const container =
                document.createElement(
                    "div"
                );

            container.style.width =
                "100%";

            container.style.display =
                "flex";

            container.style.justifyContent =
                "center";

            container.style.marginTop =
                "35px";


            button =
                document.createElement(
                    "button"
                );

            button.id =
                "nextDatabaseButton";

            button.type =
                "button";

            button.className =
                "main-button";

            button.textContent =
                "Continuar →";


            container.appendChild(
                button
            );

            secretRecord.appendChild(
                container
            );

        }


        button.style.display =
            "inline-flex";

        button.style.visibility =
            "visible";

        button.style.opacity =
            "1";

        button.style.pointerEvents =
            "auto";

        button.style.cursor =
            "pointer";


        if (
            button.dataset.listenerAtivo ===
            "true"
        ) {
            return;
        }


        button.dataset.listenerAtivo =
            "true";


        button.addEventListener(
            "click",
            () => {

                button.disabled =
                    true;

                button.textContent =
                    "Próxima etapa desbloqueada ✓";


                playSuccessSound();


                setTimeout(() => {

                    showScreen(
                        futureScreen
                    );

                    startFutureStage();

                }, 1000);

            }
        );

    }


    /* =====================================================
       ETAPA 5 — FUTURE.EXE
    ===================================================== */

    const futureQuestion =
        document.getElementById(
            "futureQuestion"
        );

    const futureResponse =
        document.getElementById(
            "futureResponse"
        );

    const responseText =
        document.getElementById(
            "responseText"
        );

    const futureOptions =
        document.querySelectorAll(
            ".future-option"
        );


    const futureResponses = {

        1: `
            Talvez algumas coisas simplesmente não precisem
            mudar de uma hora para outra.

            <br><br>

            O tempo também faz parte da história.
        `,

        2: `
            Talvez algumas das melhores coisas aconteçam
            justamente quando a gente para de tentar
            descobrir exatamente onde elas vão chegar.
        `,

        3: `
            Essa talvez seja a única resposta que o sistema
            realmente consegue aceitar.

            <br><br>

            Algumas coisas são melhores quando descobertas
            aos poucos.
        `,

        4: `
            <strong>ERRO 404</strong>

            <br><br>

            O futuro ainda não possui dados suficientes.

            <br><br>

            Talvez porque ele ainda não foi escrito.
        `

    };


    function startFutureStage() {

        if (futureQuestion) {

            futureQuestion.style.display =
                "block";

        }


        if (futureResponse) {

            futureResponse.classList.add(
                "hidden"
            );

            futureResponse.style.display =
                "none";

        }


        if (responseText) {

            responseText.innerHTML =
                "";

        }


        futureOptions.forEach(
            (button) => {

                button.disabled =
                    false;

                button.style.pointerEvents =
                    "auto";

            }
        );

    }


    futureOptions.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const choice =
                        button.dataset.choice;


                    futureOptions.forEach(
                        (item) => {

                            item.disabled =
                                true;

                            item.style.pointerEvents =
                                "none";

                        }
                    );


                    if (futureQuestion) {

                        futureQuestion.style.display =
                            "none";

                    }


                    if (futureResponse) {

                        futureResponse.classList.remove(
                            "hidden"
                        );

                        futureResponse.style.display =
                            "block";

                    }


                    if (responseText) {

                        responseText.innerHTML =
                            futureResponses[
                                choice
                            ] || "";

                    }


                    playSuccessSound();


                    if (
                        futureContinueButton
                    ) {

                        futureContinueButton.style.display =
                            "inline-block";

                        futureContinueButton.style.visibility =
                            "visible";

                        futureContinueButton.style.opacity =
                            "1";

                        futureContinueButton.style.pointerEvents =
                            "auto";

                    }

                }
            );

        }
    );


    /* =====================================================
       FUTURE → CARTA
    ===================================================== */

    if (futureContinueButton) {

        futureContinueButton.addEventListener(
            "click",
            () => {

                if (letterScreen) {

                    showScreen(
                        letterScreen
                    );

                    startLetter();

                } else {

                    showFinalScreen();

                }

            }
        );

    }


    /* =====================================================
       ETAPA 6 — CARTA
    ===================================================== */

    const letterText =
        document.getElementById(
            "letterText"
        );

    const letterCursor =
        document.getElementById(
            "letterCursor"
        );


    const letterMessage =
`Algumas pessoas aparecem por acaso.

Outras fazem a gente perceber que talvez algumas conexões simplesmente mereçam ser descobertas com calma.

Eu poderia escrever mil coisas aqui, mas talvez nem tudo precise de uma explicação.

Então, em vez de tentar prever o que vem depois, prefiro deixar as coisas acontecerem naturalmente.

Só queria que você soubesse que foi muito legal criar tudo isso pensando em você.

Sem pressão.
Sem respostas prontas.
Só uma pequena forma de dizer:

você é alguém especial para mim.

— Vitor ♥`;


    let letterStarted =
        false;


    function startLetter() {

        if (letterStarted) {
            return;
        }

        letterStarted =
            true;


        if (!letterText) {
            return;
        }


        letterText.textContent =
            "";


        if (letterCursor) {

            letterCursor.style.display =
                "inline-block";

        }


        let index = 0;


        function typeLetter() {

            if (
                index >=
                letterMessage.length
            ) {

                if (letterCursor) {

                    letterCursor.style.display =
                        "none";

                }


                playSuccessSound();


                if (letterContinueButton) {

                    setTimeout(() => {

                        letterContinueButton.style.display =
                            "inline-block";

                        letterContinueButton.style.visibility =
                            "visible";

                        letterContinueButton.style.opacity =
                            "1";

                    }, 800);

                }

                return;

            }


            letterText.textContent +=
                letterMessage[index];


            index++;


            if (
                letterMessage[index - 1] !==
                " "
            ) {

                playSound(
                    240 +
                    Math.random() * 100,
                    0.018,
                    "square",
                    0.006
                );

            }


            setTimeout(
                typeLetter,
                28
            );

        }


        setTimeout(
            typeLetter,
            1000
        );

    }


    /* =====================================================
       CARTA → FINAL
    ===================================================== */

    if (letterContinueButton) {

        letterContinueButton.addEventListener(
            "click",
            () => {

                showFinalScreen();

            }
        );

    }


    /* =====================================================
       ETAPA 7 — FINAL
    ===================================================== */

    function showFinalScreen() {

        showScreen(
            finalScreen
        );


        const finalContent =
            document.getElementById(
                "finalContent"
            );


        const finalTerminal =
            document.querySelector(
                ".final-terminal"
            );


        const finalLines =
            finalTerminal
                ? finalTerminal.querySelectorAll(
                    "p"
                )
                : [];


        if (finalContent) {

            finalContent.classList.remove(
                "show"
            );

            finalContent.style.opacity =
                "0";

            finalContent.style.transform =
                "translateY(25px)";

            finalContent.style.transition =
                "opacity 1.5s ease, transform 1.5s ease";

        }


        finalLines.forEach(
            (line) => {

                line.style.opacity =
                    "0";

                line.style.transform =
                    "translateX(-10px)";

                line.style.transition =
                    "opacity .5s ease, transform .5s ease";

            }
        );


        finalLines.forEach(
            (line, index) => {

                setTimeout(() => {

                    line.style.opacity =
                        "1";

                    line.style.transform =
                        "translateX(0)";

                    playSound(
                        300 +
                        index * 50,
                        0.04,
                        "sine",
                        0.012
                    );

                }, 300 + index * 500);

            }
        );


        setTimeout(() => {

            if (finalContent) {

                finalContent.classList.add(
                    "show"
                );

                finalContent.style.opacity =
                    "1";

                finalContent.style.transform =
                    "translateY(0)";

            }


            createFinalConnection();

        }, 300 + finalLines.length * 500 + 500);

    }


    /* =====================================================
       STATUS FINAL
    ===================================================== */

    function createFinalConnection() {

        if (
            document.getElementById(
                "finalConnectionStatus"
            )
        ) {
            return;
        }


        if (!finalScreen) {
            return;
        }


        const status =
            document.createElement(
                "div"
            );

        status.id =
            "finalConnectionStatus";

        status.innerHTML = `

            <div class="final-status-label">
                CONNECTION STATUS
            </div>

            <div class="final-status-light">
                ●
            </div>

            <div class="final-status-text">
                CONEXÃO ATIVA
            </div>

            <div class="final-status-sub">
                Algumas histórias não precisam
                de um final definido.
            </div>

        `;


        finalScreen.appendChild(
            status
        );


        setTimeout(() => {

            status.classList.add(
                "show"
            );

            playSuccessSound();

        }, 500);

    }


    /* =====================================================
       EASTER EGG
       5 CLIQUES NO TÍTULO "PARA BELL"
    ===================================================== */

    let secretClicks = 0;
    let secretClickTimer = null;


    document.addEventListener(
        "click",
        (event) => {

            const title =
                event.target.closest(
                    "h1, h2, .logo, .welcome-title"
                );


            if (!title) {
                return;
            }


            secretClicks++;


            clearTimeout(
                secretClickTimer
            );


            secretClickTimer =
                setTimeout(() => {

                    secretClicks = 0;

                }, 1800);


            if (
                secretClicks >= 5
            ) {

                secretClicks = 0;

                showEasterEgg();

            }

        }
    );


    function showEasterEgg() {

        if (
            document.getElementById(
                "easterEgg"
            )
        ) {
            return;
        }


        playSuccessSound();


        const overlay =
            document.createElement(
                "div"
            );

        overlay.id =
            "easterEgg";

        overlay.innerHTML = `

            <div class="easter-window">

                <div class="easter-top">
                    SYSTEM MESSAGE
                </div>

                <div class="easter-body">

                    <div class="easter-code">
                        > hidden_file.txt
                    </div>

                    <h2>
                        ARQUIVO SECRETO ENCONTRADO
                    </h2>

                    <p>
                        Você encontrou algo que
                        não deveria estar aqui.
                    </p>

                    <p class="easter-message">
                        Talvez algumas coisas sejam
                        melhores quando descobertas
                        aos poucos. ♥
                    </p>

                    <button
                        id="closeEasterEgg"
                        type="button"
                    >
                        [ FECHAR ARQUIVO ]
                    </button>

                </div>

            </div>

        `;


        document.body.appendChild(
            overlay
        );


        document
            .getElementById(
                "closeEasterEgg"
            )
            .addEventListener(
                "click",
                () => {

                    overlay.remove();

                }
            );

    }


    /* =====================================================
       GLITCH ALEATÓRIO
    ===================================================== */

    setInterval(() => {

        const active =
            document.querySelector(
                ".screen.active h1"
            );


        if (!active) {
            return;
        }


        if (
            Math.random() >
            0.88
        ) {

            active.classList.add(
                "temporary-glitch"
            );


            setTimeout(() => {

                active.classList.remove(
                    "temporary-glitch"
                );

            }, 180);

        }

    }, 4000);


    /* =====================================================
       TECLA ESC
       FECHA EASTER EGG
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key ===
                "Escape"
            ) {

                const easter =
                    document.getElementById(
                        "easterEgg"
                    );

                if (easter) {
                    easter.remove();
                }

            }

        }
    );


    /* =====================================================
       DIAGNÓSTICO
    ===================================================== */

    console.log("---------------------------------");

    console.log(
        "welcomeScreen:",
        welcomeScreen
    );

    console.log(
        "terminalScreen:",
        terminalScreen
    );

    console.log(
        "connectionScreen:",
        connectionScreen
    );

    console.log(
        "developmentScreen:",
        developmentScreen
    );

    console.log(
        "databaseScreen:",
        databaseScreen
    );

    console.log(
        "futureScreen:",
        futureScreen
    );

    console.log(
        "letterScreen:",
        letterScreen
    );

    console.log(
        "finalScreen:",
        finalScreen
    );

    console.log("---------------------------------");
    console.log(
        "SISTEMA CARREGADO COM SUCESSO."
    );
    console.log("---------------------------------");

});