// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-firefox-launcher'), // Cambia a firefox launcher
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // Puedes añadir opciones de configuración para Jasmine aquí
      },
      clearContext: false // deja visible la salida del corredor de pruebas de Jasmine en el navegador
    },
    jasmineHtmlReporter: {
      suppressAll: true // elimina las trazas duplicadas
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/app-activity-manager'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Firefox'],
    singleRun: false,
    restartOnFileChange: true
  });
};

