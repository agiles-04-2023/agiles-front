import { useState } from 'react'
import FormError from './FormError'

type Props = {
	placeholder: string
	type?: string
	onChange: (val: string) => void
	className?: string
	initialValue?: string | number
	disabled?: boolean
	maxLength?: number | undefined
	minLength?: number | undefined
	max?: number | undefined
	min?: number | undefined
	label?: string
	required?: boolean
	hasError?: boolean
	errorText?: string
	optional?: boolean
	name: string
	fieldsetClassName?: string
}

const CustomInput = ({
	initialValue = '',
	placeholder,
	type = 'text',
	onChange,
	max = undefined,
	min = undefined,
	className = '',
	disabled = false,
	label = undefined,
	name,
	required = false,
	hasError = false,
	maxLength = undefined,
	minLength = undefined,
	errorText = 'El campo es obligatorio',
	optional = false,
	fieldsetClassName = ''
}: Props) => {
	const [value, setValue] = useState<string | number>(initialValue)
	return (
		<fieldset className={fieldsetClassName}>
			{label && (<label htmlFor={name}>{label} {optional && (<span className='text-xs opacity-50'>(opcional)</span>)} </label>)}
			<input
				onChange={(e) => {
					setValue(e.target.value)
					onChange(e.target.value)
				}}
				className={`dark:!bg-gray-900 dark:text-slate-400 border !border-gray-300 dark:!border-slate-700 !shadow ${className}`}
				value={value}
				placeholder={placeholder}
				maxLength={maxLength}
				minLength={minLength}
				max={max}
				name={name}
				required={required}
				min={min}
				type={type}
				disabled={disabled}
			/>
			{hasError && <FormError text={errorText} />}
		</fieldset>

	)
}

export default CustomInput
