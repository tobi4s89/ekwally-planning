import { usePageContext } from 'vike-react/usePageContext'

export default function Link({ className, href, children }: { className: string; href: string; children: any; }) {
  const pageContext = usePageContext()
  const { urlPathname } = pageContext
  const isActive = href === "/" ? urlPathname === href : urlPathname.startsWith(href)
  return (
    <a href={href} className={ `${className} ${isActive ? "is-active" : undefined}` }>
      {children}
    </a>
  )
}
