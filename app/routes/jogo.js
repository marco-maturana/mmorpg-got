module.exports = (app) => {
  app.get('/jogo', (req, res) => {
    app.app.controllers.jogo.jogo(app, req, res )
  })
  app.get('/sair', (req, res) => {
    app.app.controllers.jogo.sair(app, req, res )
  })
  app.get('/suditos', (req, res) => {
    app.app.controllers.jogo.suditos(app, req, res )
  })
  app.get('/pergaminhos', (req, res) => {
    app.app.controllers.jogo.pergaminhos(app, req, res )
  })
  app.post('/ordenar_acao_suditos', (req, res) => {
    app.app.controllers.jogo.ordenar_acao_suditos(app, req, res )
  })
  app.get('/revogar_acao', (req, res) => {
    app.app.controllers.jogo.revogar_acao(app, req, res )
  })
}