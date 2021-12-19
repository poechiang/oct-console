export default {
    mode: 'cors' as RequestMode,
    headers: {
        'Content-Type': 'application/json',
        'x-requested-with': 'XMLHttpRequest'
    },
    domain: 'http://localhost:9999'
};
