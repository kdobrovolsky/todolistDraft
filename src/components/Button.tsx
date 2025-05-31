type ButtonType = {
    title: string
    onClick?: () => void
    className?: string
    disabled?: boolean
}

export const Button = ({className,title,onClick,disabled}:ButtonType) => <button className={className} disabled={disabled} onClick={onClick}>{title}</button>
