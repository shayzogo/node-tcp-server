module.exports = {
    apps: [{
        name: 'Log TCP server',
        script: './server.js',
        autostart: true,
        instances: 4,
        watch: true,
        max_memory_restart: '1G',
        exec_mode: 'cluster',
        env:{
            MODE_ENV: 'development'
        },
        env_production:{
            MODE_ENV: 'production'
        }
    }]
};
