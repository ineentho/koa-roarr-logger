const uuidv4 = require('uuid/v4')

const koaRoarrLogger = log => async (ctx, next) => {
  const start = Date.now()
  const { request, response } = ctx

  const clientRequestId = ctx.request.headers['x-request-id']
  const requestId = clientRequestId ? `${clientRequestId}` : `s-${uuidv4()}`
  ctx.log = log.child({ requestId })

  await next()

  const time = Date.now() - start

  ctx.log.debug({ request, response, time }, 'http request')
}

module.exports = koaRoarrLogger
