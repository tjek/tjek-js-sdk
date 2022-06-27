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
        qs?: Record<string, string | number | undefined>;
        method?: RequestInit['method'];
        headers?: Record<string, string>;
        body?: RequestInit['body'];
    },
    callback?: (error: Error | null, result?: T | null) => void
): Promise<Awaited<T>> {
    try {
        const url = new URL(rawUrl, coreUrl);

        if (!apiKey) {
            throw new Error(
                '`apiKey` needs to be configured, please see README'
            );
        }

        // @ts-expect-error
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

            callback?.(null, json);

            return json;
        }
        throw error(new Error('Core API error'), {
            code: 'CoreAPIError',
            statusCode: response.status
        });
    } catch (error) {
        callback?.(error);

        throw error;
    }
}

export default request;
