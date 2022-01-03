import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

function Button(props: ButtonProps) {
  function onClicked(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    event.stopPropagation();
    props.onClick();
  }
  return <button onClick={onClicked} className={styles.button}>{props.children}</button>;
}

export default Button;
