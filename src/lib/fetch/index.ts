import { filter, isString, merge } from 'lodash';
import config from './config';

const toQueryString = (query: any) => {
    if (!query) return '';
    if (isString(query)) return '?' + query;
    return (
        '?' +
        Object.entries(query)
            .map(([k, v]) => `${k}=${v}`)
            .join('&')
    );
};

const parseUrl = (url: string, params?: ExtensibleObject) =>
    filter([config.domain, ...url.split('/')], (s) => !!s).join('/') +
    toQueryString(params || null);

export const get = <T = any>(
    url: string,
    params?: ExtensibleObject,
    options?: RequestInit
) => {
    const { headers: headers1, ...others1 } = config;
    const { headers: headers2, ...others2 } = options || {};
    return fetch(
        parseUrl(url, params),
        merge(
            {
                ...others1,
                ...others2,
                headers: new Headers({ ...headers1, ...headers2 })
            },
            options
        )
    ).then<T>((resp) => resp.json());
};

export const post = (url: string, params?: any, options?: any) => {
    const { headers } = options || {};
    const reqInfo: RequestInfo = {
        url,
        body: JSON.stringify(params || {}),
        ...options,
        method: 'POST'
    };
    return fetch(reqInfo).then((resp) => resp.json());
};
export const patch = (url: string, params?: any, options?: any) => {
    const { headers } = options || {};
    const reqInfo: RequestInfo = {
        url,
        body: JSON.stringify(params || {}),
        ...options,
        method: 'PATCH'
    };
    return fetch(reqInfo).then((resp) => resp.json());
};

export const _delete = (url: string, params?: any, options?: any) => {
    const { headers } = options || {};
    const reqInfo: RequestInfo = {
        url,
        ...options,
        method: 'DELETE'
    };
    return fetch(reqInfo).then((resp) => resp.json());
};
export const header = (url: string, params?: any, options?: any) => {
    const { headers } = options || {};
    const reqInfo: RequestInfo = {
        url,
        ...options,
        method: 'HEADER'
    };
    return fetch(reqInfo).then((resp) => resp.json());
};
