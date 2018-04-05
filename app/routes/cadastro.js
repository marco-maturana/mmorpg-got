module.exports = (app) => {
  app.get('/cadastro', (req, res) => {
    app.app.controllers.cadastro.cadastro(app, req, res )
  })

  app.post('/cadastrar', (req, res) => {
    app.app.controllers.cadastro.cadastrar(app, req, res )
  })
}