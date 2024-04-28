import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
import type { Employee, Team } from './types'

export const db = new LowSync(
	new JSONFileSync<{
		employees: Employee[]
		teams: Team[]
	}>('db.json'),
	{
		employees: [
			{
				id: 1,
				name: 'Kage',
				photo: 'https://randomuser.me/api/portraits/men/93.jpg',
				role: 'manager',
				teamId: 1,
			},
			{
				id: 2,
				name: 'Odile',
				photo: 'https://randomuser.me/api/portraits/women/11.jpg',
				role: 'backend',
				teamId: 1,
			},
			{
				id: 3,
				name: 'Doncic',
				photo: 'https://randomuser.me/api/portraits/men/13.jpg',
				role: 'backend',
				teamId: 1,
			},
			{
				id: 4,
				name: 'Ocean',
				photo: 'https://randomuser.me/api/portraits/men/84.jpg',
				role: 'backend',
				teamId: 1,
			},
			{
				id: 5,
				name: 'Audrey',
				photo: 'https://randomuser.me/api/portraits/women/37.jpg',
				role: 'backend',
				teamId: 1,
			},
			{
				id: 6,
				name: 'Rita',
				photo: 'https://randomuser.me/api/portraits/women/75.jpg',
				role: 'backend',
				teamId: 1,
			},
			{
				id: 7,
				name: 'Hailey',
				photo: 'https://randomuser.me/api/portraits/women/55.jpg',
				teamId: 1,
				role: 'frontend',
			},
			{
				id: 8,
				name: 'Mia',
				photo: 'https://randomuser.me/api/portraits/women/84.jpg',
				teamId: 1,
				role: 'frontend',
			},
			{
				id: 9,
				name: 'Ben',
				photo: 'https://randomuser.me/api/portraits/men/58.jpg',
				teamId: 2,
				role: 'manager',
			},
			{
				id: 10,
				name: 'Jarry',
				photo: 'https://randomuser.me/api/portraits/men/53.jpg',
				teamId: 2,
				role: 'backend',
			},
			{
				id: 11,
				name: 'Lucy',
				photo: 'https://randomuser.me/api/portraits/women/90.jpg',
				teamId: 2,
				role: 'backend',
			},
		],
		teams: [
			{
				id: 1,
				name: 'Content',
				lead: 'Kage',
			},
			{
				id: 2,
				name: 'Platform',
				lead: 'Ben',
			},
		],
	}
)
