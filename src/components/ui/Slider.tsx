import styles from "./Slider.module.css";

type SliderProps = {
  name: string;
  value?: number;
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
        value={props.value}
        onChange={(e) => props.onChange(e.target.valueAsNumber)}
        className={styles.input}
      />
    </div>
  );
}

export default Slider;
