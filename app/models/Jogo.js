ObjectID = require('mongodb').ObjectID

let jogo = class Jogo {
  constructor(connection) {
    this._connection = connection
  }

  gerarParametros(usuario) {
    let collection = this._connection.collection('jogo')

    collection.insertOne({
      usuario: usuario,
      moeda: 15,
      suditos: 10,
      temor: Math.floor(Math.random() * 1000),
      sabedoria: Math.floor(Math.random() * 1000),
      comercio: Math.floor(Math.random() * 1000),
      magia: Math.floor(Math.random() * 1000)
    }, (err) => {
      if (err)
        throw err;
    })
  }

  iniciaJogo (res, usuario, casa, msg) {
    let collection = this._connection.collection('jogo')

    collection.find({usuario: usuario}).limit(1).next((err, result) => {
      if (err)
        throw err;

      res.render('jogo', {img_casa: casa, jogo: result, msg: msg});
    })
  }

  acao (acao) {
    let tempo = 0
    switch (parseInt(acao.acao)) {
      case 1: tempo = 1 * 60 * 60000
        break;
      case 2: tempo = 2 * 60 * 60000
        break;
      case 3: tempo = 3 * 60 * 60000
        break;
      case 4: tempo = 4 * 60 * 60000
        break;
    }


    acao.acao_termina_em = new Date().getTime() + tempo
    this._connection.collection('acao').insertOne(acao, (err) => {
      if (err)
        throw err;
    })

    let moedas = 0
    switch (parseInt(acao.acao)) {
      case 1: moedas = -2 * acao.quantidade
        break;
      case 2: moedas = -3 * acao.quantidade
        break;
      case 3: moedas = -1 * acao.quantidade
        break;
      case 4: moedas = -1 * acao.quantidade
        break;
    }

    this._connection.collection('jogo').updateOne({usuario: acao.usuario}, {$inc: {moeda:  moedas}}, (err) => {
      if (err)
        throw err;
    })
  }

  getAcoes (usuario, res) {
    let collection = this._connection.collection('acao')

    collection.find({usuario: usuario, acao_termina_em: {$gte: new Date().getTime()}}).toArray((err, result) => {
      if (err)
        throw err;

      let acoes = []

      result.forEach((value) => {
        acoes.push(value)
      })

      res.render('pergaminhos', { acoes: acoes});
    })
  }

  revogarAcao (_id, res) {
    let collection = this._connection.collection('acao')

    collection.deleteOne({_id: ObjectID(_id)}, (err) => {
      if (err)
        throw err;

      res.redirect('/jogo?msg=D')
    })
  }
}

module.exports = () => {
  return jogo
}