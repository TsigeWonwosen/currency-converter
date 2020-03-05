const response = require('../../../helpers/response');

module.exports = function(app) {
    app.get('/health', (req, res) => response.json(res, 'Application running fine!'));

    // currency routes
    app.use(
        '/', require('./currency/index'),
    );
 
    // error handler
    app.use((err, req, res, next) => response.json(res, null, err));
};
