import { CacheManager } from '@titicaca/ntk-koa-helpers'
import { redisStore } from 'cache-manager-redis-yet'
import { logger } from './logger'
let cacheManager: CacheManager

export async function cacheClient() {
	if (!cacheManager) {
		try {
			const store = await redisStore({
				socket: {
					host: 'localhost',
					port: 6379,
				},
				database: 0,
			})

			cacheManager = await CacheManager.of(store)
		} catch (error) {
			logger.error('Failed to create cache client', error)
			throw error
		}
	}

	return cacheManager
}
