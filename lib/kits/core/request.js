import fetch from 'cross-fetch';
import SGN from '../../sgn-sdk';
import {error, promiseCallbackInterop} from '../../util';
import {ensure, saveToken, sign} from './session';

function request(options = {}, callback, secondTime) {
    ensure((err) => {
        if (err != null) {
            return callback(err);
        }

        let url = SGN.config.get('coreUrl') + (options.url ?? '');
        const headers = options.headers ?? {};
        const json = typeof options.json === 'boolean' ? options.json : true;
        let token = SGN.config.get('coreSessionToken');
        const appKey = SGN.config.get('appKey');
        const appVersion = SGN.config.get('appVersion');
        const appSecret = SGN.config.get('appSecret');
        const locale = SGN.config.get('locale');
        const qs = options.qs ?? {};
        const geo = options.geolocation;
        let {body} = options;

        headers['X-Api-Key'] = appKey;
        headers['X-Token'] = token;
        if (appSecret != null) {
            headers['X-Signature'] = sign(appSecret, token);
        }

        if (json) {
            headers['Content-Type'] = 'application/json';
            headers['Accept'] = 'application/json';

            if (body) {
                body = JSON.stringify(body);
            }
        }

        if (locale != null) {
            qs.r_locale = locale;
        }
        if (appVersion != null) {
            qs.api_av = appVersion;
        }

        if (geo != null) {
            if (geo.latitude != null && qs.r_lat == null) {
                qs.r_lat = geo.latitude;
            }
            if (geo.longitude != null && qs.r_lng == null) {
                qs.r_lng = geo.longitude;
            }
            if (geo.radius != null && qs.r_radius == null) {
                qs.r_radius = geo.radius;
            }
            if (geo.sensor != null && qs.r_sensor == null) {
                qs.r_sensor = geo.sensor;
            }
        }

        if (Object.keys(qs).length) {
            const params = Object.keys(qs)
                .map((k) => {
                    if (Array.isArray(k)) {
                        return qs[k]
                            .map(
                                (val) =>
                                    `${encodeURIComponent(
                                        k
                                    )}[]=${encodeURIComponent(val)}`
                            )
                            .join('&');
                    }

                    return `${encodeURIComponent(k)}=${encodeURIComponent(
                        qs[k]
                    )}`;
                })
                .join('&');

            url += '?' + params;
        }

        const req = fetch(url, {
            method: options.method,
            body,
            headers
        });

        return req
            .then((response) =>
                response.json().then((json) => {
                    token = SGN.config.get('coreSessionToken');
                    const responseToken = response.headers.get('x-token');

                    if (responseToken && token !== responseToken) {
                        saveToken(responseToken);
                    }

                    if (
                        (response.status >= 200 && response.status < 300) ||
                        response.status === 304
                    ) {
                        callback(null, json);
                    } else {
                        if (
                            secondTime !== true &&
                            [1101, 1107, 1108].includes(json?.code)
                        ) {
                            SGN.config.set({coreSessionToken: undefined});

                            request(options, callback, true);
                        } else {
                            callback(
                                error(new Error('Core API error'), {
                                    code: 'CoreAPIError',
                                    statusCode: response.status
                                }),
                                json
                            );
                        }
                    }
                })
            )
            .catch(callback);
    });
}

export default promiseCallbackInterop(request, 1);
