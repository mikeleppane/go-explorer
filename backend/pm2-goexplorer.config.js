module.exports = {
  apps: [
    {
      name: "go-explorer",
      script: "./build/index.js",
      watch: ".",
      watch_delay: 1000,
      ignore_watch: ["node_modules", "build", "go-modules", "logs"],
      exec_mode: "cluster",
      instances: "max",
      exp_backoff_restart_delay: 100,
      env: {
        PORT: 5000,
        NODE_ENV: "development",
      },
      env_production: {
        PORT: 5000,
        NODE_ENV: "production",
      },
    },
  ],
};
