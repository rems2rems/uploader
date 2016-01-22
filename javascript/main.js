// Generated by CoffeeScript 1.9.2
(function() {
  var config, configDb, configDbOptions, dataDb, dataDbOptions, dbDriver, saveMeasure, takeMeasure;

  dbDriver = require('../../openbeelab-db-util/javascript/dbUtil');

  config = require('./config');

  configDbOptions = {
    host: config.host,
    protocol: config.protocol,
    port: config.port,
    auth: {
      username: config.auth.username,
      password: config.auth.password
    },
    name: config.name + "_config"
  };

  configDb = dbDriver.database(configDbOptions);

  dataDbOptions = {
    host: config.host,
    protocol: config.protocol,
    port: config.port,
    auth: {
      username: config.auth.username,
      password: config.auth.password
    },
    name: config.name + "_data"
  };

  dataDb = dbDriver.database(dataDbOptions);

  takeMeasure = require('./takeMeasure');

  saveMeasure = require('./saveMeasure');

  configDb.get(config.stand_id).then(function(stand) {
    var device, i, len, measure, ref, results, sensor;
    device = require('./devices/' + stand.device);
    ref = stand.sensors;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      sensor = ref[i];
      if (!sensor.active) {
        continue;
      }
      sensor.device = device;
      measure = takeMeasure(sensor);
      results.push(saveMeasure(measure, stand, dataDb));
    }
    return results;
  })["catch"](function(err) {
    return console.log(err);
  });

}).call(this);
