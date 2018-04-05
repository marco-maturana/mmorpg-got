module.exports.cadastro = (app, req, res) => {
    res.render('cadastro', {validacao: {}, dadosForm: {}})
}

module.exports.cadastrar = (app, req, res) => {
    req.assert('nome', 'Nome não pode ser vazio').notEmpty()
    req.assert('usuario', 'Usuario não pode ser vazio').notEmpty()
    req.assert('senha', 'Senha não pode ser vazio').notEmpty()
    req.assert('casa', 'Casa não pode ser vazio').notEmpty()

    let erros = req.validationErrors()

    if (erros)
        res.render('cadastro', {validacao: erros, dadosForm: req.body})
    else {
        let usuario = new app.app.models.Usuario(app.database)
        let jogo = new app.app.models.Jogo(app.database)

        usuario.inserir(req.body)
        jogo.gerarParametros(req.body.usuario)
        res.render('index', {validacao: {}})
    }
}