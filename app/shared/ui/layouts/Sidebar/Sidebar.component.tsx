/* eslint-disable jsx-a11y/no-redundant-roles */
import {
    CalendarIcon,
    HomeIcon,
    IdentificationIcon,
    KeyIcon,
    UsersIcon,
    ViewColumnsIcon,
} from '@heroicons/react/24/outline'
import { twMerge } from 'tailwind-merge'

import { Logo } from '../'
import { Link } from '../../components'

export default function SidebarComponent() {
    const navigation = [
        { current: false, name: 'Dashboard', href: '#', icon: HomeIcon },
        { current: false, name: 'Planning', href: '#', icon: ViewColumnsIcon },
        { current: false, name: 'Calendar', href: '/calendar', icon: CalendarIcon },
        { current: false, name: 'Team', href: '#', icon: UsersIcon },
    ]

    const authorization = [
        { current: false, name: 'Login', href: '/account/login', icon: KeyIcon },
        { current: false, name: 'Sign Up', href: '/account/create', icon: IdentificationIcon },
    ]

    const renderProfileGroup = () => {
        return (
            <li>
                <div className="text-xs font-semibold leading-6 text-gray-500">Profile</div>
                <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map(({ name, href, current, icon: Icon }) => (
                        <li key={name}>
                            <Link
                                href={href}
                                className={twMerge(
                                    current
                                        ? 'bg-secondary-darker text-gray-800'
                                        : 'text-gray-600 hover:text-gray-800 hover:bg-secondary-darker',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                            >
                                <Icon
                                    className={twMerge(
                                        current ? 'text-primary' : 'text-gray-600 group-hover:text-primary',
                                        'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                />
                                { name }
                            </Link>
                        </li>
                    ))}
                </ul>
            </li>
        )
    }

    const renderAuthorizationGroup = () => (
        <li>
            <div className="text-xs font-semibold leading-6 text-gray-500">Authorization</div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
                {authorization.map(({ name, href, current, icon: Icon }) => (
                    <li key={name}>
                        <Link
                            href={href}
                            className={twMerge(
                                current
                                    ? 'bg-secondary-darker text-gray-800'
                                    : 'text-gray-600 hover:text-800 hover:bg-secondary-darker',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            )}
                        >
                            <Icon
                                className={twMerge(
                                    current ? 'text-primary' : 'text-gray-800 group-hover:text-primary',
                                    'h-6 w-6 shrink-0'
                                )}
                                aria-hidden="true"
                            />
                            <span className="truncate">{name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </li>
    )

    return (
        <div className="bg-secondary-lighter border-solid border-r-2 border-secondary flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
            <Logo className="flex mt-2 h-16 shrink-0 items-center" />
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    { renderProfileGroup() }
                    { renderAuthorizationGroup() }
                </ul>
            </nav>
        </div>    
    )
}
