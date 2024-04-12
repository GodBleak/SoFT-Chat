// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import 'dotenv/config'
import { feathers } from '@feathersjs/feathers'
import express, {
  rest,
  json,
  urlencoded,
  cors,
  serveStatic,
  notFound,
  errorHandler
} from '@feathersjs/express'
import configuration from '@feathersjs/configuration'
import socketio from '@feathersjs/socketio'
import { createServer as createViteServer, type ViteDevServer } from 'vite'

import type { Application } from './declarations'
import { configurationValidator } from './configuration'
import { logger } from './logger'
import { logError } from './hooks/log-error'
import { sqlite } from './sqlite'
import { authentication } from './authentication'
import { services } from './services/index'
import { channels } from './channels'
const dirname = path.dirname(fileURLToPath(import.meta.url))
const app: Application = express(feathers())

// Load app configuration
app.configure(configuration(configurationValidator))
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))

if (app.get('authentication').secret === 'CHANGE_ME')
  throw new Error(
    'Change the default secret in `./config/default.json`. Use `npm run generate:secret` to create a new secret.'
  )

let viteServer: ViteDevServer | undefined

if (isDev()) {
  viteServer = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
    publicDir: path.join(dirname, 'public'),
    configFile: 'vite.config.ts'
  })
  app.use(viteServer.middlewares)
} else app.use('/public', serveStatic(path.resolve(dirname, 'public')))

// Host the public folder
app.use('/', async (_, res) => {
  try {
    const { render } =
      isDev() && viteServer
        ? await viteServer.ssrLoadModule('/src/web/render.tsx')
        : await import('./web/render')

    res.status(200)
    res.write('<!DOCTYPE html>')
    res.write(await render())
    res.end()
  } catch (error) {
    if (error instanceof Error) {
      if (isDev() && viteServer) viteServer.ssrFixStacktrace(error)
      console.error(error)
      return res.status(500).send(error.stack)
    }
    throw error
  }
})

// Configure services and real-time functionality
app.configure(rest())
app.configure(
  socketio({
    cors: {
      origin: app.get('origins')
    }
  })
)
app.configure(sqlite)
app.configure(authentication)
app.configure(services)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(notFound())
app.use(errorHandler({ logger }))

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
})
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: []
})

export { app }

function isDev() {
  return process.env.NODE_ENV === 'development'
}
