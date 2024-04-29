import { useEffect, useState } from 'react'

type Cache = {
	namespace: string | undefined
	key: string
	value: string
	expire?: string
}

export function CachePanel() {
	const [cache, setCache] = useState<Cache[]>([])

	useEffect(() => {
		const fetchCache = async () => {
			const resp = await fetch('http://localhost:5555/cache')
			if (!resp.ok) {
				console.error('Failed to fetch cache', resp.status, resp.statusText)
			}
			const data = await resp.json()
			console.log(data)
			const cacheData = Object.entries(data).map(([k, v]) => {
				const splat = k.split(':')

				const key = splat.length > 1 ? splat[1] : splat[0]
				const namespace = splat.length > 1 ? splat[0] : undefined

				return {
					namespace,
					key,
					value: JSON.stringify(v),
				}
			})

			setCache(cacheData)
		}

		fetchCache()
	}, [])

	return (
		<div className='container min-w-max'>
			<h1 className='text-xl font-semibold flex justify-center p-4'>캐시 현황</h1>
			<table className='table table-lg pb-0 mb-0'>
				<thead>
					<tr className='text-center'>
						<th>Namespace</th>
						<th>Key</th>
						<th>Value</th>
						<th>만료 시간</th>
					</tr>
				</thead>
				<tbody className='text-center'>
					{cache.map((item) => (
						<tr key={item.key}>
							<td>{item.namespace ?? '없음'} </td>
							<td>{item.key}</td>
							<td>{item.value}</td>
							<td>{item.expire ?? '없음'}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className='flex justify-end'>
				<button
					type='button'
					className='btn btn-ghost btn-sm'
					onClick={async () => {
						const resp = await fetch('http://localhost:5555/cache', {
							method: 'DELETE',
						})
						if (!resp.ok) {
							console.error('Failed to clear cache', resp.status, resp.statusText)
						}
						setCache([])
					}}
				>
					- 캐시 초기화
				</button>
			</div>
		</div>
	)
}
