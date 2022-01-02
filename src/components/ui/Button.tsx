type ButtonProps = {
  children: React.ReactNode;
};

function Button(props: ButtonProps) {
  return <button>{props.children}</button>;
}

export default Button;
