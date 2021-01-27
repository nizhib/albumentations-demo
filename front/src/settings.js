const protocol = window.location.protocol
const hostname = window.location.hostname
const port = window.location.port

const hostPort = hostname + (port === '80' ? '' : ':' + port)

export const apiRoot = `${protocol}//${hostPort}/api/`
