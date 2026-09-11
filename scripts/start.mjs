// Production entry point — serves .output on port 3002 by default.
// Override with PORT / NUXT_PORT and HOST / NUXT_HOST environment variables.
process.env.PORT = process.env.PORT || process.env.NUXT_PORT || '3002'
process.env.HOST = process.env.HOST || process.env.NUXT_HOST || '0.0.0.0'

const serverModule = '../.output/server/index.mjs'

try {
  await import(new URL(serverModule, import.meta.url).href)
} catch (err) {
  if (err?.code === 'ERR_MODULE_NOT_FOUND' || err?.code === 'ENOENT') {
    console.error('Build output not found. Run "npm run build" first, then "npm run start".')
    process.exit(1)
  }
  throw err
}
