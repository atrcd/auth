let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

// Ver senha
let btn = document.querySelector('#verSenha')
let btnConfirm = document.querySelector('#verConfirmSenha')

// Validação Nome
let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false

nome.addEventListener('keyup', () => {
    if (nome.value.length <= 2) {
        labelNome.setAttribute('style', 'color: red')
        labelNome.innerHTML = 'Nome *Insira no mínimo 3 caracteres'
        nome.setAttribute('style', 'border-color: red')
        validNome = false
    } else {
        labelNome.setAttribute('style', 'color: lightgreen')
        labelNome.innerHTML = 'Nome'
        nome.setAttribute('style', 'border-color: lightgreen')
        validNome = true
    }
})

// Validação de Usuario
let usuario = document.querySelector('#usuario')
let labelUsuario = document.querySelector('#labelUsuario')
let validUsuario = false

usuario.addEventListener('keyup', () => {
    if (usuario.value.length <= 4) {
        labelUsuario.setAttribute('style', 'color: red')
        labelUsuario.innerHTML = 'Usuário *Insira no mínimo 5 caracteres'
        usuario.setAttribute('style', 'border-color: red')
        validUsuario = false
    } else {
        labelUsuario.setAttribute('style', 'color: lightgreen')
        labelUsuario.innerHTML = 'Usuário'
        usuario.setAttribute('style', 'border-color: lightgreen')
        validUsuario = true
    }
})

// Validação Senha
let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

senha.addEventListener('keyup', () => {
    if (senha.value.length <= 7) {
        labelSenha.setAttribute('style', 'color: red')
        labelSenha.innerHTML = 'Senha *Insira no mínimo 8 caracteres'
        senha.setAttribute('style', 'border-color: red')
        validSenha = false
    } else {
        labelSenha.setAttribute('style', 'color: lightgreen')
        labelSenha.innerHTML = 'Senha'
        senha.setAttribute('style', 'border-color: lightgreen')
        validSenha = true
    }
})

// Validação Confirmar Senha
let confirmSenha = document.querySelector('#confirmSenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false

confirmSenha.addEventListener('keyup', () => {
    if (senha.value !== confirmSenha.value) {
        labelConfirmSenha.setAttribute('style', 'color: red')
        labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem'
        confirmSenha.setAttribute('style', 'border-color: red')
        validConfirmSenha = false
    } else {
        labelConfirmSenha.setAttribute('style', 'color: lightgreen')
        labelConfirmSenha.innerHTML = 'Confirmar Senha'
        confirmSenha.setAttribute('style', 'border-color: lightgreen')
        validConfirmSenha = true
    }
})

// Função Cadastrar
function cadastrar() {
    if (validNome && validUsuario && validSenha && validConfirmSenha) {
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')

        listaUser.push({
            nomeCad: nome.value,
            userCad: usuario.value,
            senhaCad: senha.value
        })

        localStorage.setItem('listaUser', JSON.stringify(listaUser))

        msgSuccess.setAttribute('style', 'display: block')
        msgSuccess.innerHTML = '<strong>Cadastrando Usuário...</strong>'
        msgError.setAttribute('style', 'display: none')

        // Redireciona para a página de login após 3 segundos
        setTimeout(() => {
            window.location.href = 'index.html'
        }, 3000)
    } else {
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = '<strong>Preencha todos os campos para prosseguir</strong>'
        msgSuccess.setAttribute('style', 'display: none')
    }
}

// Evento de Click para visualizar a senha
btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha')

    if (inputSenha.getAttribute('type') === 'password') {
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})

// Evento de click para visualizar a confirmar senha
btnConfirm.addEventListener('click', () => {
    let inputConfirmSenha = document.querySelector('#confirmSenha')

    if (inputConfirmSenha.getAttribute('type') === 'password') {
        inputConfirmSenha.setAttribute('type', 'text')
    } else {
        inputConfirmSenha.setAttribute('type', 'password')
    }
})

// Função Entrar
function entrar() {
    let usuario = document.querySelector('#usuario')
    let userLabel = document.querySelector('#userLabel')
    let senha = document.querySelector('#senha')
    let senhaLabel = document.querySelector('#senhaLabel')
    let msgError = document.querySelector('#msgError')
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')

    let userValid = listaUser.find((item) => usuario.value === item.userCad && senha.value === item.senhaCad)

    if (userValid) {
        window.location.href = 'home.html'
        let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)
        localStorage.setItem('token', token)

        localStorage.setItem('userLogado', JSON.stringify(userValid))
    } else {
        userLabel.setAttribute('style', 'color: red')
        usuario.setAttribute('style', 'border-color: red')
        senhaLabel.setAttribute('style', 'color: red')
        senha.setAttribute('style', 'border-color: red')
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = 'Usuário ou senha incorretos'
        usuario.focus()
    }
}

let userLogado = JSON.parse(localStorage.getItem('userLogado'))

let logado = document.querySelector('#logado')

logado.innerHTML = `ola ${userLogado.nome}` 

// Verificação de autenticação


// Função Sair
function sair() {
    localStorage.removeItem('token')
    window.location.href = 'index.html'
}
