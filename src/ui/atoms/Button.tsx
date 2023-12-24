import { buttonStyle } from "../../style/theme";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button className={buttonStyle()} onClick={onClick}>
      {children}
    </button>
  );
}
