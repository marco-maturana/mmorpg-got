module.exports.jogo = (app, req, res) => {
  if (req.session.autorizado) {
    let jogo = new app.app.models.Jogo(app.database)

    jogo.iniciaJogo(res, req.session.usuario, req.session.casa, req.query.msg)
  } else
    res.render('index', {validacao: {}})
}

module.exports.sair = (app, req, res) => {
  req.session.destroy((err) => {
    res.render('index', {validacao: {}})
  })
}

module.exports.suditos = (app, req, res) => {
  if (req.session.autorizado)
    res.render('aldeoes', {validacao: {}})
  else
    res.render('index', {validacao: {}})
}

module.exports.pergaminhos = (app, req, res) => {
  if (req.session.autorizado) {
    let jogo = new app.app.models.Jogo(app.database)

    jogo.getAcoes(req.session.usuario, res);
  } else
    res.render('index', {validacao: {}})
}

module.exports.ordenar_acao_suditos = (app, req, res) => {
  req.assert('acao', 'Ação deve ser informada').notEmpty();
  req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

  const erros = req.validationErrors();

  if (erros)
    res.redirect('/jogo?msg=A')
  else {
    let jogo = new app.app.models.Jogo(app.database)

    req.body.usuario = req.session.usuario
    jogo.acao(req.body)

    res.redirect('jogo?msg=B')
  }
}

module.exports.revogar_acao = (app, req, res) => {
  let jogo = new app.app.models.Jogo(app.database)

  jogo.revogarAcao(req.query.id_acao, res)
}