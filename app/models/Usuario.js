let usuario = class Usuarios {
  constructor(connection) {
    this._connection = connection
  }

  inserir(usuario) {
    let collection = this._connection.collection('usuarios')

    collection.insertOne(usuario, (err) => {
      if (err)
        throw err;

      console.log("Usuario inserido!");
    })
  }

  autenticar(usuario, req, res) {
    let collection = this._connection.collection('usuarios')

    collection.find(usuario).limit(1).next((err, result) => {
      if (err)
        throw err;

      req.session.autorizado = !(result === null)

      if (req.session.autorizado) {
        req.session.usuario = result.usuario
        req.session.casa = result.casa
        res.redirect('jogo')
      }
      else
        res.render('index', {validacao: {}})
    })
  }
}

module.exports = () => {
  return usuario
}