// Generated by CoffeeScript 1.9.2
(function() {
  var StepMotor, device, motor, pins;

  StepMotor = require('./stepMotor');

  device = require('./devices/arietta_g25');

  pins = {
    enable: 'J4.8',
    ms1: 'J4.10',
    ms2: 'J4.12',
    ms3: 'J4.14',
    pulse: 'J4.28',
    direction: 'J4.30',
    sleep: 'J4.26',
    reset: 'J4.24'
  };

  motor = StepMotor(device, pins);

  while (true) {
    motor.backward(100);
  }

}).call(this);
