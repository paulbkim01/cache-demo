import { bodyParser } from '@koa/bodyparser'
import Router from '@koa/router'

import cors from '@koa/cors'
import { catchAppErrorsMiddleware } from '@titicaca/ntk-koa-helpers'
import Koa from 'koa'
import { type Employee, db } from './db.js'
import { logger } from './logger.js'

export function createServer() {
	const app = new Koa()
		.use(catchAppErrorsMiddleware(logger))
		.use(bodyParser())
		.use(
			cors({
				origin: '*',
				allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
				allowHeaders: ['Content-Type'],
			})
		)
		.use(routes())

	return app
}

function routes() {
	const router = new Router()

	router
		.get('/employees', async (ctx) => {
			const employees = db.data.employees
			ctx.body = employees
		})
		.post('/employees', async (ctx) => {
			const payload = ctx.request.body as Omit<Employee, 'id'>
			const { id: lastId = 0 } = db.data.employees[db.data.employees.length - 1]
			db.data.employees.push({
				id: lastId + 1,
				...payload,
			})
		})

	return router.routes()
}
