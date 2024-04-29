import 'vite/modulepreload-polyfill'

import { CachePanel } from './components/cache'
import { EmployeePanel } from './components/employee'

function App() {
	return (
		<div className='container min-w-[1280px]'>
			<div className='container max-w-[640px] m-auto flex flex-col justify-center text-center'>
				<h1 className='text-2xl font-semibold p-4'>설정</h1>
				<button className='btn btn-sm btn-outline rounded-none border-none' type='button'>
					데이터 초기화
				</button>
			</div>
			<div className='flex gap-16'>
				<EmployeePanel />
				<CachePanel />
			</div>
		</div>
	)
}

export default App
