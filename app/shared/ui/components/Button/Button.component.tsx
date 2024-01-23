import { twMerge } from 'tailwind-merge'
import { mergeDeep, genericForwardRef } from '_shared/utils'
import { themeStore } from '../themeStore'
import { ButtonBase } from './Button.base'

type MyProps = {
    children: any,
    className?: string,
    color?: string,
    disabled?: boolean,
    fullSized?: any,
    outline?: boolean,
    pill?: boolean,
    positionInGroup?: keyof typeof themeStore.buttonGroup.position,
    sizing?: string,
    type?: string,
    theme?: any
}

const ButtonComponent = genericForwardRef(({ children, className, color = 'default', disabled, fullSized, outline = false, pill = false, positionInGroup = 'none', sizing = 'md', theme: customTheme = {}, ...props }: MyProps, ref: any) => {
    const { buttonGroup: groupTheme, button: buttonTheme } = themeStore;
    const theme = mergeDeep(buttonTheme, customTheme);
    const currProps: any = {
        ref,
        disabled,
        className: twMerge(
            theme.base,
            theme.color[color] && theme.color[color],
            disabled && theme.disabled,
            outline && (theme.outline.color[color] ?? theme.outline.color.default),
            theme.pill[pill ? 'on' : 'off'],
            fullSized && theme.fullSized,
            groupTheme.position[positionInGroup],
            className
        ),
        ...props,
    }
    const spanProps = {
        className: twMerge(
            theme.inner.base,
            theme.outline[outline ? 'on' : 'off'],
            theme.outline.pill[outline && pill ? 'on' : 'off'],
            theme.size[sizing],
            outline && !theme.outline.color[color] && theme.inner.outline,
            theme.inner.position[positionInGroup]
        )
    }

    return (
        <ButtonBase {...currProps}>
            <span {...spanProps}>
                {children}
            </span>
        </ButtonBase>
    )
})
ButtonComponent.displayName = 'Button'
export const Button = ButtonComponent

