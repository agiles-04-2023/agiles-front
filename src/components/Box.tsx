import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Box = ({ children, className }: { children: any; className?: string }) => {
	const { authState } = useContext(AuthContext)

	return (
		<div
			id='box-app'
			className={
				` ${authState?.theme} bg-[#51445f] box-app mt-4 text-[#d1b68d] rounded-md shadow-md border border-[#d1b68d] p-6 mx-2 ` +
				className
			}
		>
			{children}
		</div>
	)
}

export default Box
