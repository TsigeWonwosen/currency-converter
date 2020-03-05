const httpstatus = require('http-status');

module.exports = {

  BAD_REQUEST: {
    statusCode: httpstatus.BAD_REQUEST,
    type: 'BAD_REQUEST',
    message: 'Invalid request',
  },

  UNAUTHORIZED: {
    statusCode: httpstatus.UNAUTHORIZED,
    type: 'UNAUTHORIZED',
    message: 'Unauthorized. Please login first!',
  },

  REQUEST_FAILED: {
    statusCode: 402,
    type: 'REQUEST_FAILED',
    message: 'Request failed!',
  },

  FORBIDDEN: {
    statusCode: httpstatus.FORBIDDEN,
    type: 'FORBIDDEN',
    message: 'You have not enough permission for this resource!',
  },

  NOT_FOUND: {
    statusCode: httpstatus.NOT_FOUND,
    type: 'NOT_FOUND',
    message: 'Not found!',
  },

  TOO_MANY_REQUEST: {
    statusCode: httpstatus.TOO_MANY_REQUESTS,
    type: 'TOO_MANY_REQUEST',
    message: 'Too many request!',
  },

  SERVER_ERROR: {
    statusCode: httpstatus.INTERNAL_SERVER_ERROR,
    type: 'SERVER_ERROR',
    message: 'Server error',
  },

  NOT_IMPLEMENTED: {
    statusCode: httpstatus.NOT_IMPLEMENTED,
    type: 'NOT_IMPLEMENTED',
    message: 'This resource is not implemented!',
  },


  /**
   * Generate a JSON REST API response
   *
   * If data is present and no error, we will send status 200 with JSON data
   * If no data but has error, we will send HTTP error code and message
   *
   * @param  {Object} res        	ExpressJS res object
   * @param  {json} 	data       	JSON response data
   * @param  {Object} err        	Error object
   * @param  {String} errMessage  Custom error message
   * @return {json} If res assigned, return with res, otherwise return the response JSON object
   */
  json(res, data, err = undefined, errMessage = undefined) {
    const response = {};

    if (err && err.isBoom) {
      response.error = err.output.payload;
      response.status = err.output.statusCode;
      return res ? res.status(response.status).json(response) : response;
    } else if (err) {
      response.error = err;
      response.status = err.statusCode || 500;
      if (errMessage) { response.error.message = errMessage.message || errMessage; }

      response.data = data;

      return res ? res.status(response.status).json(response) : response;
    }

    response.status = 200;
    response.data = data;

    return res ? res.json(response) : response;
  },

};
