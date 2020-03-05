const _ = require('lodash');
const path = require('path');

let configs = {
    app_name: 'Currency-converter',
    app_title: 'Currency Converter',
    project_name: 'Currency Converter',
    base_locale: 'it',
    base_timezone: 'Europe/Rome',
    max_api_idle: 7220,
    ports: {
        backend: 7040,
    },
    import_path: path.join(__dirname, '../import/eurofxref-hist-90d.xml')
};

module.exports = configs;
