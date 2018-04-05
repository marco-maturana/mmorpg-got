
let
  express = require('express'),                    /* importar o módulo do framework express */
  consign = require('consign'),                    /* importar o módulo do consign */
  bodyParser = require('body-parser'),             /* importar o módulo do body-parser */
  expressValidator = require('express-validator') ,/* importar o módulo do express-validator */
  expressSessio = require('express-session'),
  app = express()                                  /* iniciar o objeto do express */

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: false}));

/* configurar o middleware express-validator */
app.use(expressValidator());

/*configura o middleware express-sessio*/
app.use(expressSessio({
  secret: '12345678910',
  resave: false,
  saveUninitialized: false
}))

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
  .include('app/routes')
  .then('app/models')
  .then('app/controllers')
  .then('config/database.js')
  .into(app);

/* exportar o objeto app */
module.exports = app;