import fetch from 'cross-fetch';
import SGN from '../../sgn-sdk';
import {error, promiseCallbackInterop} from '../../util';

function request(options = {}, callback) {
    let url = SGN.config.get('coreUrl') + (options.url ?? '');
    const method = options.method || 'get';
    const headers = options.headers ?? {};
    const apiKey = SGN.config.get('apiKey');
    const clientVersion = SGN.config.get('clientVersion');
    const body = options.body;

    if (!apiKey) {
        callback(
            new Error('`apiKey` needs to be configured, please see README')
        );
        return;
    }

    headers['X-Api-Key'] = apiKey;

    if (!headers['Accept']) {
        headers['Accept'] = 'application/json';
    }

    if (clientVersion != null) {
        headers['X-Client-Version'] = clientVersion;
    }

    if (options.qs) {
        const url2 = new URL(url);
        const searchParams = new URLSearchParams(url2.search);

        for (const key in options.qs) {
            searchParams.append(key, options.qs[key]);
        }

        url = url2.origin + url2.pathname + '?' + searchParams.toString();
    }

    fetch(url, {
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
                    .then((json) => {
                        callback(null, json);
                    })
                    .catch(callback);
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
