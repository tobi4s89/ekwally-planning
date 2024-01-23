import { Children, cloneElement, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { mergeDeep } from '_shared/utils'
import { themeStore } from '../themeStore'

const ButtonGroupComponent = ({ children: baseChildren, className, outline, pill, theme: customTheme = {}, ...props }: any) => {
    const items = useMemo(() => Children.map(baseChildren, (child, index) => cloneElement(child, {
        outline,
        pill,
        positionInGroup: index === 0 ? 'start' : index === baseChildren.length - 1 ? 'end' : 'middle',
    })), [baseChildren, outline, pill]);
    const theme = mergeDeep(themeStore.buttonGroup, customTheme);
    const groupProps = {
        className: twMerge(
            theme.base,
            className
        ),
        role: 'group',
        ...props,
        children: items
    }
    return (
        <div {...groupProps} />
    );
};
ButtonGroupComponent.displayName = 'ButtonGroup';
export const ButtonGroup = ButtonGroupComponent
