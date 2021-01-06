import fetch from 'cross-fetch';
import sha256 from 'sha256';
import SGN from '../../sgn';
import * as clientCookieStorage from '../../storage/client-cookie';
let callbackQueue = [];
let renewed = false;

const ttl = 1 * 60 * 60 * 24 * 60;

export function saveToken(token) {
    if (!token) {
        throw new Error('No token provided for saving');
    }

    SGN.config.set({coreSessionToken: token});

    saveCookie();
}

export function saveClientId(clientId) {
    SGN.config.set({coreSessionClientId: clientId});

    saveCookie();
}

export function saveCookie() {
    clientCookieStorage.set('session', {
        token: SGN.config.get('coreSessionToken'),
        client_id: SGN.config.get('coreSessionClientId')
    });
}

export function create(callback) {
    const key = SGN.config.get('appKey');

    const req = fetch(
        SGN.config.get('coreUrl') +
            `/v2/sessions?api_key=${key}&token_ttl=${ttl}`,
        {method: 'post'}
    );

    req.then((response) =>
        response.json().then((json) => {
            if (response.status === 201) {
                saveToken(json.token);
                saveClientId(json.client_id);

                callback(null, json);
            } else {
                callback(new Error('Could not create session'));
            }
        })
    ).catch((err) => {
        callback(err);
    });
}

export function update(callback) {
    const headers = {};
    const token = SGN.config.get('coreSessionToken');
    const appSecret = SGN.config.get('appSecret');

    headers['X-Token'] = token;
    if (appSecret != null) {
        headers['X-Signature'] = sign(appSecret, token);
    }

    const req = fetch(SGN.config.get('coreUrl') + '/v2/sessions', {
        method: 'put',
        headers
    });

    req.then((response) =>
        response.json().then((json) => {
            if (response.status === 200) {
                saveToken(json.token);
                saveClientId(json.client_id);

                callback(null, json);
            } else {
                callback(new Error('Could not update session'));
            }
        })
    ).catch((err) => {
        callback(err);
    });
}

export function renew(callback) {
    const headers = {};
    const token = SGN.config.get('coreSessionToken');
    const appSecret = SGN.config.get('appSecret');

    headers['X-Token'] = token;
    if (appSecret) {
        headers['X-Signature'] = sign(appSecret, token);
    }

    const req = fetch(SGN.config.get('coreUrl') + '/v2/sessions', {
        method: 'put',
        headers
    });

    req.then((response) =>
        response.json().then((json) => {
            if (response.status === 200) {
                saveToken(json.token);
                saveClientId(json.client_id);

                callback(null, json);
            } else {
                callback(new Error('Could not renew session'));
            }
        })
    ).catch((err) => {
        callback(err);
    });
}

export function ensure(callback) {
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
            create(complete);
        } else if (renewed === false) {
            renewed = true;
            renew((err) => {
                if (err != null) {
                    create(complete);
                } else {
                    complete();
                }
            });
        } else {
            complete();
        }
    }
}

export function sign(appSecret, token) {
    return sha256([appSecret, token].join(''));
}
