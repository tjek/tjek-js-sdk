import fetch from 'cross-fetch';
import SGN from '../../sgn-sdk';
import {error, promiseCallbackInterop} from '../../util';

function request(options = {}, callback) {
    let url = SGN.config.get('coreUrl') + (options.url ?? '');
    const method = options.method || 'get';
    const headers = options.headers ?? {};
    const appKey = SGN.config.get('appKey');
    const clientVersion = SGN.config.get('clientVersion');
    const body = options.body;

    headers['X-Api-Key'] = appKey;

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
        .then((response) =>
            response.json().then((json) => {
                if (
                    (response.status >= 200 && response.status < 300) ||
                    response.status === 304
                ) {
                    callback(null, json);
                } else {
                    callback(
                        error(new Error('Core API error'), {
                            code: 'CoreAPIError',
                            statusCode: response.status
                        }),
                        json
                    );
                }
            })
        )
        .catch(callback);
}

export default promiseCallbackInterop(request, 1);
