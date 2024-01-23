/**
 * Todo: Add sections to Sidebar and Content component, which can include components provided by domains.
 * options:
 * - generic and global contentBuilder() and sidebarBuilder() function
 * - sidebar.ts and content.ts module config file
 */

import { useState } from 'react'
import { Header, Sidebar, SidebarDialog, Content } from '../'

import '../../tailwind.css'

type MyProps = {
    children?: any
}

export function PageBlank({ children }: any) {
    return (
        <div className="page-layout h-full layout-blank bg-secondary">
            {children}
        </div>
    )
}

export function PageLayoutOneColumn({ children }: any) {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="page-layout h-full layout-1column">
            {/* for mobile */}
            <SidebarDialog
                isOpen={sidebarOpen}
                onSidebarOpen={setSidebarOpen}
            >
                <Sidebar />
            </SidebarDialog>

            <div>
                <Header onSidebarOpen={setSidebarOpen} />
                <Content>
                    {children}
                </Content>
            </div>
        </div>
    )
}

export function PageLayout({ children }: MyProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="page-layout h-full layout-default">
            {/* for mobile */}
            <SidebarDialog
                isOpen={sidebarOpen}
                onSidebarOpen={setSidebarOpen}
            >
                <Sidebar />
            </SidebarDialog>

            {/* for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                {<Sidebar />}
            </div>

            <div className="lg:pl-72">
                <Header onSidebarOpen={setSidebarOpen} />
                <Content>
                    {children}
                </Content>
            </div>
        </div>
    )
}
