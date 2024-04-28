import { useEffect, useState } from 'react'
import type { EmployeeView } from '../server/types'

const employeeQueryMap = {
	default: '',
	all: '?type=all',
	managers: '?type=manager',
	none: '?type=none',
}

export function EmployeePanel() {
	const [employees, setEmployees] = useState<EmployeeView[]>([])
	const [selectedTab, setSelectedTab] = useState<keyof typeof employeeQueryMap>('default')

	useEffect(() => {
		if (selectedTab === 'default') {
			return
		}
		const fetchEmployees = async () => {
			const resp = await fetch(`http://localhost:5555/employees${employeeQueryMap[selectedTab]}`)
			if (!resp.ok) {
				console.error('Failed to fetch employees', resp.status, resp.statusText)
			}
			const data = await resp.json()

			setEmployees(data)
		}

		fetchEmployees()
	}, [selectedTab])

	const handleTabChange = (tab: keyof typeof employeeQueryMap) => {
		setSelectedTab(tab)
	}

	return (
		<div>
			<h1 className='text-xl font-semibold flex justify-center p-4'>직원 목록</h1>
			<div role='tablist' className='tabs tabs-bordered'>
				<button
					name='all'
					role='tab'
					className={`tab hover:text-green-800 ${selectedTab === 'all' ? 'tab-active' : ''}`}
					type='button'
					onClick={(e) => handleTabChange(e.currentTarget.name as keyof typeof employeeQueryMap)}
				>
					전체 직원
				</button>
				<button
					name='managers'
					role='tab'
					className={`tab hover:text-green-800 ${selectedTab === 'managers' ? 'tab-active' : ''}`}
					type='button'
					onClick={(e) => handleTabChange(e.currentTarget.name as keyof typeof employeeQueryMap)}
				>
					매니저
				</button>
				<button
					name='none'
					role='tab'
					className={`tab hover:text-green-800 ${selectedTab === 'none' ? 'tab-active' : ''}`}
					type='button'
					onClick={(e) => handleTabChange(e.currentTarget.name as keyof typeof employeeQueryMap)}
				>
					무소속
				</button>
			</div>

			<EmployeeTable employees={employees} />
			<EmployeeAddDialog />
		</div>
	)
}

type EmployeeTableProps = {
	employees: EmployeeView[]
}

function EmployeeTable({ employees }: EmployeeTableProps) {
	return (
		<table className='table table-lg pb-0 mb-0'>
			<thead>
				<tr className='text-center'>
					<th>직원 ID</th>
					<th>인적사항</th>
					<th>역할</th>
					<th>보고자</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{employees.map((employee) => (
					<EmployeeRow key={employee.id} employee={employee} />
				))}
			</tbody>
		</table>
	)
}

type EmployeeRowProps = {
	employee: EmployeeView
}

function EmployeeRow({ employee }: EmployeeRowProps) {
	return (
		<tr>
			<td>
				<span className='text-sm text-opacity-50'>{employee.id}</span>
			</td>
			<td>
				<div className='flex items-center gap-3'>
					<div className='avatar'>
						<div className='mask mask-squircle w-12 h-12'>
							<img src={employee.photo} alt='Employee Avatar' />
						</div>
					</div>
					<div>
						<div className='font-bold'>{employee.name}</div>
						<div className='text-sm opacity-50'>{employee.teamName ?? '무소속'}</div>
					</div>
				</div>
			</td>
			<td>
				<span className='badge badge-ghost badge-sm'>{employee.role}</span>
			</td>
			<td>{employee.teamLead ?? '없음'}</td>
			<th>
				<button
					className='btn btn-sm btn-outline'
					type='button'
					onClick={() => alert('수정 버튼 클릭')}
				>
					{employee.teamName ? '팀 제외' : '팀 추가'}
				</button>
			</th>
		</tr>
	)
}

function EmployeeAddDialog() {
	return (
		<div className='flex justify-end'>
			<button
				type='button'
				className='btn btn-ghost btn-sm'
				// @ts-ignore
				onClick={() => document.getElementById('employee_add')?.showModal()}
			>
				+ 직원 등록
			</button>

			<dialog id='employee_add' className='modal'>
				<div className='modal-box w-11/12 max-w-5xl'>
					<label className='input flex items-center gap-2'>
						이름
						<input type='text' className='grow' placeholder='홍길동' />
					</label>
					<label className='input flex items-center gap-2'>
						주요업무
						<input type='text' className='grow' placeholder='프론트엔드' />
					</label>
					<label className='input flex items-center gap-2'>
						<select className='select select-bordered w-full max-w-xs'>
							<option disabled selected>
								소속부서
							</option>
							<option>트리플 컨텐츠 팀</option>
							<option>트리플 플랫폼 팀</option>
						</select>
					</label>
					<div className='modal-action'>
						<button className='btn btn-primary' type='submit'>
							등록
						</button>
						<form method='dialog'>
							<button className='btn' type='submit'>
								닫기
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	)
}
