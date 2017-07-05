'use strict';

const https = require('https');

/**
 * Validate the token with Google
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
let auth = (req, res, next) => {
  const url = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + req.get('Authorization');

  // send request to Google
  https.get(url, (r) => {
    let body = '';

    r.on('data', (d) => {
      body += d;
    });

    r.on('end', () => {
      checkResponse(JSON.parse(body), (err) => {
        if (err) {
          return res.json({ success: false, message: err });
        } else {
          next();
        }
      });
    });
  });
};

/**
 * Check the response from google
 * If aud claim contains the client id of this app,
 * then the token is valid
 * 
 * @param {object} res 
 * @param {function} callback 
 */
let checkResponse = (res, callback) => {
  if (res['error_description']) {
    return callback(res['error_description']);
  } else {
    if (res['aud'] == process.env.CLIENT_ID) {
      return callback(null);
    } else {
      return callback('Invalid Value');
    }
  }
};

module.exports = auth;
