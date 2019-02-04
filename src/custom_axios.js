const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
});

exports.get = (url) => {
    return instance.get(url);
};

exports.post = (url, payload, headers) => {
    return instance.post(url, payload, headers);
};

exports.delete = (url) => {
    return instance.delete(url);
};
