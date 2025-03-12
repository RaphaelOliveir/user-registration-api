const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
        return {
            db_string: 'mongodb+srv://ph:ra3110@clusterapi.nblqb.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAPI',
            jwt_pass: 'senhadocabra',
            jwt_expires_in: '7d',
        };
        case 'hml':
        return {
            db_string: 'mongodb+srv://ph:ra3110@clusterapi.nblqb.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAPI',
            port: 3000
        };
        case 'prod':
        return {
            db_string: 'mongodb+srv://ph:ra3110@clusterapi.nblqb.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAPI',
            port: 3000
        };
    }
};

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();