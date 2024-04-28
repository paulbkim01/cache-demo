import type { Employee } from './server/db'

const BASE_URL = 'http://localhost:5555'

export function fetchEmployees(): Promise<Employee[]> {
	return fetch(`${BASE_URL}/employees`).then((resp) => {
		if (!resp.ok) {
			console.error('Failed to fetch employees', resp.status, resp.statusText)
		}

		return resp.json()
	})
}

export function createEmployee(employee: Employee): Promise<void> {
	return fetch(`${BASE_URL}/employees`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(employee),
	}).then((resp) => {
		if (!resp.ok) {
			console.error('Failed to create employee', resp.status, resp.statusText)
		}
	})
}

export function updateEmployee(employee: Employee): Promise<void> {
	return fetch(`${BASE_URL}/employees/${employee.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(employee),
	}).then((resp) => {
		if (!resp.ok) {
			console.error('Failed to update employee', resp.status, resp.statusText)
		}
	})
}

export function deleteEmployee(id: number): Promise<void> {
	return fetch(`${BASE_URL}/employees/${id}`, {
		method: 'DELETE',
	}).then((resp) => {
		if (!resp.ok) {
			console.error('Failed to delete employee', resp.status, resp.statusText)
		}
	})
}
