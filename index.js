let card = document.querySelector(".card");
let loginButton = document.querySelector(".loginButton");
let cadastroButton = document.querySelector(".cadastroButton");

loginButton.onclick = () =>{
    card.classList.remove("cadastroActive")
    card.classList.add("loginActive")
}

cadastroButton.onclick = () =>{
    card.classList.remove("loginActive")
    card.classList.add("cadastroActive")
}


/* ===== Funções de validação ===== */

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
}

function validarSenha(senha) {
    return senha.length >= 6;
}

function validarNome(nome) {
    return nome.trim().length >= 2;
}

function senhasCoincidem(senha, confirmarSenha) {
    return senha === confirmarSenha;
}

/* ===== Exibição de erro ===== */

function mostrarErro(input, mensagem) {
    limparErro(input);
    input.style.border = "2px solid #f76c6c";

    const erro = document.createElement("span");
    erro.className = "erro-input";
    erro.textContent = mensagem;
    erro.style.color = "#f76c6c";
    erro.style.fontSize = "13px";
    erro.style.marginTop = "-10px";
    erro.style.width = "400px";
    erro.style.textAlign = "left";

    input.insertAdjacentElement("afterend", erro);
}

function limparErro(input) {
    input.style.border = "";
    const proximo = input.nextElementSibling;
    if (proximo && proximo.classList.contains("erro-input")) {
        proximo.remove();
    }
}

function limparErrosDoForm(form) {
    form.querySelectorAll(".erro-input").forEach((el) => el.remove());
    form.querySelectorAll("input").forEach((input) => (input.style.border = ""));
}

/* ===== Validação do Login ===== */

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    limparErrosDoForm(formLogin);

    const inputEmail = formLogin.querySelector('input[type="text"], input[type="email"]');
    const inputSenha = formLogin.querySelector('input[type="password"]');

    let valido = true;

    if (!validarEmail(inputEmail.value)) {
        mostrarErro(inputEmail, "Digite um e-mail válido.");
        valido = false;
    }

    if (!validarSenha(inputSenha.value)) {
        mostrarErro(inputSenha, "A senha deve ter no mínimo 6 caracteres.");
        valido = false;
    }

    if (valido) {
        alert("Login válido! Prosseguindo...");
        formLogin.reset();
        // Aqui entraria a lógica real de envio (fetch/API)
    }
});

/* ===== Validação do Cadastro ===== */

formCadastro.addEventListener("submit", (e) => {
    e.preventDefault();
    limparErrosDoForm(formCadastro);

    const inputs = formCadastro.querySelectorAll("input");
    const inputNome = inputs[0];
    const inputEmail = inputs[1];
    const inputSenha = inputs[2];
    const inputConfirmarSenha = inputs[3];

    let valido = true;

    if (!validarNome(inputNome.value)) {
        mostrarErro(inputNome, "Digite um nome válido.");
        valido = false;
    }

    if (!validarEmail(inputEmail.value)) {
        mostrarErro(inputEmail, "Digite um e-mail válido.");
        valido = false;
    }

    if (!validarSenha(inputSenha.value)) {
        mostrarErro(inputSenha, "A senha deve ter no mínimo 6 caracteres.");
        valido = false;
    }

    if (!senhasCoincidem(inputSenha.value, inputConfirmarSenha.value)) {
        mostrarErro(inputConfirmarSenha, "As senhas não coincidem.");
        valido = false;
    }

    if (valido) {
        alert("Cadastro válido! Prosseguindo...");
        formCadastro.reset();
        // Aqui entraria a lógica real de envio (fetch/API)
    }
});