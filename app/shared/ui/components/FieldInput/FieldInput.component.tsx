import { forwardRef, ForwardedRef, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

import { mergeDeep } from '../../../utils'
import { themeStore } from '../themeStore'

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string,
    className?: string,
    label?: string,
    color?: string,
    icon?: any,
    sizing?: string,
    theme?: any,
    valid?: boolean,
    invalid?: boolean
}

const FieldInputComponent = forwardRef<HTMLInputElement, MyInputProps>(({ id, className = '', label = '', color = 'default', icon: Icon, sizing = 'md', theme: customTheme = {}, valid, invalid, ...props }, ref: ForwardedRef<HTMLInputElement>) => {
    const theme = mergeDeep(themeStore.fieldInput, customTheme)
    const status = typeof valid === 'boolean' && valid
        ? 'valid' : typeof invalid === 'boolean' && invalid ? 'invalid' : 'none'
    const inputProps = {
        ...props,
        id,
        className: twMerge(
            theme.input.base,
            theme.input.sizes[sizing],
            theme.input.status[status],
        ),
        placeholder: label,
        name: id,
        ref: ref,
    }

    return (
        <div className={ twMerge(theme.base, className) }>
            <input { ...inputProps } />
            <label
                htmlFor={id}
                className={ twMerge(
                    theme.label.base,
                    theme.label.status[status],
                    theme.label.sizes[sizing]
                )}
            >
                { label }
            </label>
            { Icon && <div className={ theme.icon.base }>
                <Icon className={ twMerge(
                    theme.icon.sizes[sizing],
                )} aria-hidden="true" />
            </div> }
        </div>
    )
})
FieldInputComponent.displayName = 'FormInput'
export const FieldInput = FieldInputComponent
