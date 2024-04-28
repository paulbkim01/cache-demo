import { bodyParser } from '@koa/bodyparser'
import Router from '@koa/router'

import cors from '@koa/cors'
import { catchAppErrorsMiddleware } from '@titicaca/ntk-koa-helpers'
import Koa from 'koa'
import { db } from './db.js'
import { logger } from './logger.js'
import type { Employee, EmployeeView, Team } from './types.js'

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
			const query = ctx.request.query as {
				type?: 'all' | 'manager' | 'none'
			}

			if (!query.type) {
				return
			}

			const employees = db.data.employees
			const teams = db.data.teams
			const teamById = teams.reduce<Map<number, Team>>(
				(teams, team) => teams.set(team.id, team),
				new Map()
			)
			const viewModel = employees.map<EmployeeView>((employee) => {
				const team = teamById.get(employee.teamId ?? 0)
				if (!team) {
					throw new Error(`Team not found for employee ${employee.id}`)
				}

				return {
					id: employee.id,
					name: employee.name,
					role: employee.role,
					photo: employee.photo,
					teamName: team.name,
					teamLead: team.lead,
					teamId: team.id,
				}
			})

			switch (query.type) {
				case 'all': {
					ctx.body = viewModel
					break
				}
				case 'manager':
					ctx.body = viewModel.filter((employee) => employee.role === 'manager')
					break
				case 'none':
					ctx.body = viewModel.filter((employee) => !employee.teamName)
					break
				default:
					throw new Error(`Unknown type ${query.type}`)
			}
		})
		.post('/employees', async (ctx) => {
			const payload = ctx.request.body as Omit<Employee, 'id'>
			const { id: lastId = 0 } = db.data.employees[db.data.employees.length - 1]
			const employee = {
				id: lastId + 1,
				...payload,
			}

			db.data.employees.push(employee)
			ctx.status = 201
		})
		.patch('/employees/:id', async (ctx) => {
			const id = Number(ctx.params.id)
			const employee = db.data.employees.find((employee) => employee.id === id)
			if (!employee) {
				ctx.status = 404
				return
			}

			const payload = ctx.request.body as Required<Pick<Employee, 'teamId'>>

			db.update((data) => {
				const employees = data.employees
				const index = employees.findIndex((employee) => employee.id === id)
				employees[index] = {
					...employee,
					...payload,
				}
			})
		})
		.get('/cache', async (ctx) => {
			ctx.body = []
		})
		.delete('/cache', async (ctx) => {
			ctx.body = []
		})

	return router.routes()
}
