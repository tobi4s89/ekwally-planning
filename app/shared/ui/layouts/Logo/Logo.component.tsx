import logo from '../../../assets/logo.svg'
import whiteLogo from '../../../assets/logo-white.svg'

type MyProps = {
    className: string,
    isWhite?: boolean | undefined
}

export default function LogoComponent({ className, isWhite }: MyProps) {
    return (
        <div className={ `main-logo ${className}`}>
            <a className="inline-block" href="/">
                <img src={isWhite ? whiteLogo : logo} height={40} width={184} alt="logo" />
            </a>
        </div>
    )
}
