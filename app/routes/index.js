module.exports = (app) => {
  app.get('/', (req, res) => {
    app.app.controllers.index.index(app, req, res )
  })
  app.post('/autenticar', (req, res) => {
    app.app.controllers.index.autenticar(app, req, res )
  })
}