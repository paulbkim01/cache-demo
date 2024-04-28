import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'

export type Employee = {
	id: number
	name: string
	age: number
	teamId?: number
}

export type Team = {
	id: number
	name: string
}

export const db = new LowSync(
	new JSONFileSync<{
		employees: Employee[]
		teams: Team[]
	}>('db.json'),
	{
		employees: [
			{
				id: 1,
				name: 'Alice',
				age: 25,
				teamId: 1,
			},
			{
				id: 2,
				name: 'Bob',
				age: 30,
				teamId: 1,
			},
			{
				id: 3,
				name: 'Charlie',
				age: 35,
				teamId: 2,
			},
		],
		teams: [
			{
				id: 1,
				name: 'Engineering',
			},
			{
				id: 2,
				name: 'Sales',
			},
		],
	}
)
