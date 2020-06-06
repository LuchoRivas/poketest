const config = {
    local: {
        port: '8001',
        appName: 'pokef',
        host: 'http://localhost:3000/',
    },
};

exports.getEnv = () => {
    return process.env.NODE_ENV || 'local';
};

exports.get = () => {
    return config[this.getEnv()];
};