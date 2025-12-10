module.exports = {
  apps: [
    {
      name: 'pagbs-back',
      script: 'server.js',
      cwd: 'D:\\Desarrollos\\PagBS\\Back',
      instances: 1,
      env: {
        NODE_ENV: 'production',
        PORT: 3019
      }
    },
    {
      name: 'pagbs-front',
      script: 'node_modules/vite/bin/vite.js',
      args: 'preview --port 3304 --host',
      cwd: 'D:\\Desarrollos\\PagBS',
      instances: 1,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
