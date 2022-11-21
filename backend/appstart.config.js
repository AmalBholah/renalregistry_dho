module.exports = {
    apps : [
        {
            name: "swan-core-api",
            script: "./bin/www",
            watch: true,
            ignore_watch: ["node_modules", "views", "public", "bin", "log.txt", "logs"],
            exec_mode: "cluster",
            instances: 0,
            //max_memory_restart: "200M",
            time: true,
            env: {
                "NODE_ENV": "development",
                "PORT": "4000"
            },
            env_production: {
                "NODE_ENV": "production",
                "PORT": "4000"
            },
            env_preprod: {
                "NODE_ENV": "preprod",
                "PORT": "4000"
            },
            env_stable: {
                "NODE_ENV": "dev_stable",
                "PORT": "4000"
            }
        }
    ]
};