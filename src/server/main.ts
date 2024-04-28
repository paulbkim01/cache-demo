import { logger } from './logger.js'
import { createServer } from './server.js'

async function main() {
	const app = createServer()
	const server = app.listen(5555, () => {
		logger.info('Server listening on port 5555')
	})

	process.on('SIGINT', () => {
		server.close(() => {
			logger.info('Server closed')
		})
	})
}

try {
	await main()
} catch (error) {
	logger.error(error)
}
