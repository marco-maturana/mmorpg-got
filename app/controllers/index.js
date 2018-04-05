module.exports.index = (app, req, res) => {
  res.render('index', {validacao: {}})
}

module.exports.autenticar = (app, req, res) => {
  req.assert('usuario', 'Usuário não pode ser vazio').notEmpty()
  req.assert('senha', 'Senha não pode ser vazia').notEmpty()

  let errors = req.validationErrors()

  if (errors) {
    res.render('index', {validacao: errors})
  } else {
    let usuario = new app.app.models.Usuario(app.database);

    usuario.autenticar(req.body, req, res)
  }
}