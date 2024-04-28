import 'vite/modulepreload-polyfill'

import { useEffect, useState } from 'react'
import type { Employee } from './server/db'

function App() {
	const [employees, setEmployees] = useState<Employee[]>([])

	useEffect(() => {
		const fetchItems = async () => {
			const resp = await fetch('http://localhost:5555/employees')
			if (!resp.ok) {
				console.error('Failed to fetch employees', resp.status, resp.statusText)
			}
			const data = await resp.json()

			setEmployees(data)
		}

		fetchItems()
	}, [])

	return (
		<>
			<h1 className='text-3xl font-bold underline'> Vite + React</h1>
			<div className='card px-2 foo p-4 bar prose'>
				<h2>Employees</h2>
				<ul>
					{employees.map((employee) => (
						<li key={employee.id} className='border'>
							<p>id: {employee.id}</p>
							<p>name: {employee.name}</p>
							<p>age: {employee.age}</p>
							<p>teamId: {employee.teamId}</p>
						</li>
					))}
				</ul>
				<form>
					<input name='name' type='text' placeholder='Name' />
					<input name='age' type='number' placeholder='Age' />
					<input name='teamId' type='number' placeholder='Team ID' />
					<button type='submit'>Add Employee</button>
				</form>
			</div>
			<p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
		</>
	)
}

export default App
