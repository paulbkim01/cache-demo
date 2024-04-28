import 'vite/modulepreload-polyfill'

import { CachePanel } from './components/cache'
import { EmployeePanel } from './components/employee'

function App() {
	return (
		<main>
			<div className='flex gap-12'>
				<EmployeePanel />
				<CachePanel />
			</div>
		</main>
	)
}

export default App
