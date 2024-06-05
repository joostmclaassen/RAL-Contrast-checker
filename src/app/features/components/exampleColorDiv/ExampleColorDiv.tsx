import RALColor from "../../../models/RALColor";
import styles from './ExampleColorDiv.module.css';

interface Props {
    color: RALColor; // The RAL color to display
}

/**
 * Component that renders a colored circle to represent a given RAL color
 * @param color - the RAL color to display
 * @returns a React component that displays a colored circle
 */
export default function ExampleColorDiv({ color }: Props) {
    return (<div id={styles.ExampleColorDivStyles} style={Object.assign({}, { backgroundColor: color.HEX, })}> </div>);
}
