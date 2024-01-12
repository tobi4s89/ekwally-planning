import { Fragment, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { mergeDeep } from '../../../utils'
import { themeStore } from '../themeStore'

type MyProps = {
    className?: string;
    children?: ReactNode[];
    customTheme?: any;
    flow?: string;
    sizing?: string;
    title: string;
}

const FieldGroupComponent = ({ children, className = '', customTheme = {}, flow = 'row', sizing = 'md', title = '' }: MyProps) => {
    const theme = mergeDeep(themeStore.fieldGroup, customTheme)

    return (
        <Fragment>
            <fieldset className={ twMerge(theme.base, className) }>
                <div className="mb-5">
                    <legend className={ theme.legend.base }>
                        <div className={ theme.legend.divider } />
                        <h4 className={ theme.legend.title }>{ title }</h4>
                        <div className={ theme.legend.divider } />
                    </legend>
                </div>
                <div className={ twMerge(
                    theme.container.base,
                    theme.container.flow[flow],
                    theme.container.sizes[sizing],
                ) }>
                    { children }
                </div>
            </fieldset>
        </Fragment>
    )
}
FieldGroupComponent.displayName = 'FieldGroup'

export const FieldGroup = FieldGroupComponent
