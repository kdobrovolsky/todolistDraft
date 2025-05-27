type ButtonType = {
    title: string
    onClick?: () => void
}

export const Button = ({title,onClick}:ButtonType) => <button onClick={onClick}>{title}</button>
