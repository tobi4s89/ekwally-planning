import { createElement } from 'react'
import { genericForwardRef } from '../../../utils'

type MyProps = {
    children: any,
    as: any,
    href: any,
    type: any
}

const ButtonBaseComponent = ({ children, as: Component, href, type = 'button', ...props }: MyProps, ref: any) => {
    const BaseComponent = Component || (href ? 'a' : 'button');
    return createElement(BaseComponent, { ref, href, type, ...props }, children);
};
export const ButtonBase = genericForwardRef(ButtonBaseComponent);
