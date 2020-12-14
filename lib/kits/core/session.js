const fetch = require('cross-fetch');
const sha256 = require('sha256');
const SGN = require('../../sgn');
const clientCookieStorage = require('../../storage/client-cookie');
let callbackQueue = [];
let renewed = false;

var session = {
    ttl: 1 * 60 * 60 * 24 * 60,

    saveToken(token) {
        if (!token) {
            throw new Error('No token provided for saving');
        }

        SGN.config.set({coreSessionToken: token});

        session.saveCookie();
    },

    saveClientId(clientId) {
        SGN.config.set({coreSessionClientId: clientId});

        session.saveCookie();
    },

    saveCookie() {
        clientCookieStorage.set('session', {
            token: SGN.config.get('coreSessionToken'),
            client_id: SGN.config.get('coreSessionClientId')
        });
    },

    create(callback) {
        const key = SGN.config.get('appKey');
        const {ttl} = session;

        const req = fetch(
            SGN.config.get('coreUrl') +
                `/v2/sessions?api_key=${key}&token_ttl=${ttl}`,
            {method: 'post'}
        );

        req.then((response) =>
            response.json().then((json) => {
                if (response.status === 201) {
                    session.saveToken(json.token);
                    session.saveClientId(json.client_id);

                    callback(null, json);
                } else {
                    callback(new Error('Could not create session'));
                }
            })
        ).catch((err) => {
            callback(err);
        });
    },

    update(callback) {
        const headers = {};
        const token = SGN.config.get('coreSessionToken');
        const appSecret = SGN.config.get('appSecret');

        headers['X-Token'] = token;
        if (appSecret != null) {
            headers['X-Signature'] = session.sign(appSecret, token);
        }

        const req = fetch(SGN.config.get('coreUrl') + '/v2/sessions', {
            method: 'put',
            headers
        });

        req.then((response) =>
            response.json().then((json) => {
                if (response.status === 200) {
                    session.saveToken(json.token);
                    session.saveClientId(json.client_id);

                    callback(null, json);
                } else {
                    callback(new Error('Could not update session'));
                }
            })
        ).catch((err) => {
            callback(err);
        });
    },

    renew(callback) {
        const headers = {};
        const token = SGN.config.get('coreSessionToken');
        const appSecret = SGN.config.get('appSecret');

        headers['X-Token'] = token;
        if (appSecret) {
            headers['X-Signature'] = session.sign(appSecret, token);
        }

        const req = fetch(SGN.config.get('coreUrl') + '/v2/sessions', {
            method: 'put',
            headers
        });

        req.then((response) =>
            response.json().then((json) => {
                if (response.status === 200) {
                    session.saveToken(json.token);
                    session.saveClientId(json.client_id);

                    callback(null, json);
                } else {
                    callback(new Error('Could not renew session'));
                }
            })
        ).catch((err) => {
            callback(err);
        });
    },

    ensure(callback) {
        const queueCount = callbackQueue.length;
        const complete = (err) => {
            callbackQueue = callbackQueue.filter((fn) => {
                fn(err);

                return false;
            });
        };

        callbackQueue.push(callback);

        if (queueCount === 0) {
            if (SGN.config.get('coreSessionToken') == null) {
                session.create(complete);
            } else if (renewed === false) {
                renewed = true;
                session.renew((err) => {
                    if (err != null) {
                        session.create(complete);
                    } else {
                        complete();
                    }
                });
            } else {
                complete();
            }
        }
    },

    sign(appSecret, token) {
        return sha256([appSecret, token].join(''));
    }
};

module.exports = session;
