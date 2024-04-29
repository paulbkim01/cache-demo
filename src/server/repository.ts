import { CacheEvict, Cacheable, CacheableMany } from '@titicaca/ntk-koa-helpers'
import { db } from './db'
import type { Employee } from './types'

class Repository {
	@Cacheable('employees', { key: 'name' })
	async searchEmployeeByName(name: string) {
		setTimeout(() => {}, 1000)
		return db.data.employees.filter((employee) => employee.name === name)
	}

	@CacheableMany('employees', { key: 'id', ttl: 6000 })
	async getEmployeeByIds(ids: number[]) {
		setTimeout(() => {}, 1000)
		return db.data.employees.filter((employee) => ids.includes(employee.id))
	}

	@CacheEvict('employees', { key: 'id' })
	async updateEmployee(employee: Employee) {
		const index = db.data.employees.findIndex((e) => e.id === employee.id)
		if (index === -1) {
			throw new Error('Employee not found')
		}
		db.data.employees[index] = employee
	}
}

export const repository = new Repository()
