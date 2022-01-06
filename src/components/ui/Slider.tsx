import styles from "./Slider.module.css";

type SliderProps = {
  name: string;
  label?: string;
  onChange: (value: number) => void;
};

function Slider(props: SliderProps) {
  return (
    <div className={styles.slider}>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <input
        type="range"
        name={props.name}
        onChange={(e) => props.onChange(e.target.valueAsNumber)}
        className={styles.input}
      />
    </div>
  );
}

export default Slider;
