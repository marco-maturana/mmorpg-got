let
  mongo = require('mongodb').MongoClient

let connection = (app) => {
  const
    url = 'mongodb://127.0.0.1',
    dbName = 'got'

  return mongo.connect(url, function (err, client) {
    if (err)
      console.log(err)

    app.database = client.db(dbName)
  })
}

module.exports  = (app) => {
  return connection(app);
}