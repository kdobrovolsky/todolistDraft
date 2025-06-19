export type ButtonPropsType = {
  title: string;
  onClick?: () => void;
  className?: string;
};

export const Button = ({ className, title, onClick }: ButtonPropsType) => {
  return (
    <button onClick={onClick} className={className}>
      {title}
    </button>
  );
};
