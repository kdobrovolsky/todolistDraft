type ButtonType = {
    title: string
    onClick?: () => void
    className?: string
}

export const Button = ({className,title,onClick}:ButtonType) => <button className={className} onClick={onClick}>{title}</button>
