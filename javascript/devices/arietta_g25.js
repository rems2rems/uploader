// Generated by CoffeeScript 1.9.2
(function() {
  var api, fs, pin2kid, pin2name;

  fs = require('fs');

  require('../../../openbeelab-util/javascript/stringUtils').install();

  pin2name = {
    'J4.7': 'pioA23',
    'J4.8': 'pioA22',
    'J4.10': 'pioA21',
    'J4.11': 'pioA24',
    'J4.12': 'pioA31',
    'J4.13': 'pioA25',
    'J4.14': 'pioA30',
    'J4.15': 'pioA26',
    'J4.17': 'pioA27',
    'J4.19': 'pioA28',
    'J4.21': 'pioA29',
    'J4.23': 'pioA0',
    'J4.24': 'pioA1',
    'J4.25': 'pioA8',
    'J4.26': 'pioA7',
    'J4.27': 'pioA6',
    'J4.28': 'pioA5',
    'J4.29': 'pioC28',
    'J4.30': 'pioC27',
    'J4.31': 'pioC4',
    'J4.32': 'pioC31',
    'J4.33': 'pioC3',
    'J4.34': 'pioB11',
    'J4.35': 'pioC2',
    'J4.36': 'pioB12',
    'J4.37': 'pioC1',
    'J4.38': 'pioB13',
    'J4.39': 'pioC0',
    'J4.40': 'pioB14'
  };

  pin2kid = {
    'J4.7': 23,
    'J4.8': 22,
    'J4.10': 21,
    'J4.11': 24,
    'J4.12': 31,
    'J4.13': 25,
    'J4.14': 30,
    'J4.15': 26,
    'J4.17': 27,
    'J4.19': 28,
    'J4.21': 29,
    'J4.23': 0,
    'J4.24': 1,
    'J4.25': 8,
    'J4.26': 7,
    'J4.27': 6,
    'J4.28': 5,
    'J4.29': 92,
    'J4.30': 91,
    'J4.31': 68,
    'J4.32': 95,
    'J4.33': 67,
    'J4.34': 43,
    'J4.35': 66,
    'J4.36': 44,
    'J4.37': 65,
    'J4.38': 45,
    'J4.39': 64,
    'J4.40': 46
  };

  api = {
    "export": function(pinName) {
      return fs.writeFileSync("/sys/class/gpio/export", "" + pin2kid[pinName]);
    },
    unexport: function(pinName) {
      return fs.writeFileSync("/sys/class/gpio/unexport", pin2kid[pinName]);
    },
    unexportAll: function() {
      var _, e, pin, results;
      results = [];
      for (pin in pin2kid) {
        _ = pin2kid[pin];
        try {
          this.unexport(pin);
          results.push(console.log("unexported pin " + pin));
        } catch (_error) {
          e = _error;
        }
      }
      return results;
    },
    getDirection: function(pinName) {
      return fs.readFileSync("/sys/class/gpio/" + pin2name[pinName] + "/direction");
    },
    setDirection: function(pinName, direction) {
      return fs.writeFileSync("/sys/class/gpio/" + pin2name[pinName] + "/direction", direction);
    },
    setInputMode: function(pinName) {
      return this.setDirection(pinName, "in");
    },
    setOutputMode: function(pinName) {
      return this.setDirection(pinName, "out");
    },
    digitalRead: function(pinName) {
      var value;
      value = fs.readFileSync("/sys/class/gpio/" + pin2name[pinName] + "/value");
      if (value === "0") {
        return false;
      }
      return true;
    },
    digitalWrite: function(pinName, value) {
      if (value === true) {
        value = "1";
      }
      if (value === false) {
        value = "0";
      }
      return fs.writeFileSync("/sys/class/gpio/" + pin2name[pinName] + "/value", value);
    },
    analogRead: function(adcName) {
      var value;
      value = "" + fs.readFileSync("/sys/bus/iio/devices/iio:device0/" + adcName);
      return value.toInt();
    },
    planWakeup: function(seconds) {
      return fs.writeFileSync("/sys/class/rtc/rtc0/wakealarm", "" + seconds);
    },
    sleep: function() {
      return sh.exec("halt");
    }
  };

  api.unexportAll();

  module.exports = api;

}).call(this);
