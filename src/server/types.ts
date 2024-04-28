export type Employee = {
	id: number
	name: string
	role: 'frontend' | 'backend' | 'manager'
	photo?: string
	teamId?: number
}

export type Team = {
	id: number
	name: string
	lead: string
}

export type EmployeeView = {
	id: Employee['id']
	name: Employee['name']
	role: Employee['role']
	photo?: Employee['photo']
	teamName?: Team['name']
	teamLead?: Team['lead']
	teamId?: Team['id']
}
