import fetch from 'cross-fetch';
import SGN from '../../sgn-sdk';
import {error, promiseCallbackInterop} from '../../util';

function request(options, callback) {
    const url = new URL(SGN.config.get('coreUrl') + (options?.url || ''));
    const method = options?.method || 'get';
    const headers = options?.headers || {};
    const apiKey = SGN.config.get('apiKey');
    const body = options.body;

    if (!apiKey) {
        return callback(
            new Error('`apiKey` needs to be configured, please see README')
        );
    }

    headers['X-Api-Key'] = apiKey;

    if (!headers['Accept']) headers['Accept'] = 'application/json';

    if (options?.qs) {
        for (const key in options.qs) {
            url.searchParams.append(key, options.qs[key]);
        }
    }

    fetch(String(url), {
        method,
        body,
        headers,
        credentials: 'same-origin'
    })
        .then((response) => {
            if (
                (response.status >= 200 && response.status < 300) ||
                response.status === 304
            ) {
                response
                    .json()
                    .then((json) => callback(null, json))
                    .catch((err) => callback(err));
            } else {
                callback(
                    error(new Error('Core API error'), {
                        code: 'CoreAPIError',
                        statusCode: response.status
                    }),
                    response.text()
                );
            }
        })
        .catch(callback);
}

export default promiseCallbackInterop(request, 1);
