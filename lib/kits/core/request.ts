import fetch from 'cross-fetch';
import {error} from '../../util';

async function request<T>(
    {
        coreUrl,
        url: rawUrl = '',
        apiKey,
        qs,
        method = 'get',
        headers,
        body
    }: {
        coreUrl?: string;
        url: string | URL;
        apiKey?: string;
        qs?: Record<string, string>;
        method?: RequestInit['method'];
        headers?: Record<string, string>;
        body?: RequestInit['body'];
    },
    callback?: (error: Error | null, result?: T) => void
): Promise<void | Awaited<T>> {
    try {
        const url = new URL(rawUrl, coreUrl);

        if (!apiKey) {
            throw new Error(
                '`apiKey` needs to be configured, please see README'
            );
        }

        for (const key in qs) url.searchParams.append(key, qs[key]);

        const response = await fetch(String(url), {
            method,
            body,
            headers: {
                Accept: 'application/json',
                ...headers,
                'X-Api-Key': apiKey
            },
            credentials: 'same-origin'
        });
        if (
            (response.status >= 200 && response.status < 300) ||
            response.status === 304
        ) {
            const json = await response.json();

            if (typeof callback === 'function') callback(null, json);

            return json;
        }
        throw error(new Error('Core API error'), {
            code: 'CoreAPIError',
            statusCode: response.status
        });
    } catch (error) {
        // Don't throw when there's a callback to avoid creating uncaught promise rejections.
        if (typeof callback === 'function') return callback(error);

        throw error;
    }
}

export default request;
