import type { ReactNode } from 'react'

type MyProps = {
    children: ReactNode
}

export default function ContentComponent({ children }: MyProps) {
    return (
        <main>
           { children }
        </main>
    )
}
