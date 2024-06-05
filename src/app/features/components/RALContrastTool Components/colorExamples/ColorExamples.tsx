import RALColor from '../../../../models/RALColor';
import styles from './ColorExamples.module.css';

interface Props {
	color1: RALColor; // The first RAL color to display in the color examples
	color2: RALColor; // The second RAL color to display in the color examples
}

/**
 * Component that displays two example colors side by side
 * @param color1 - the first RAL color to display in the color examples
 * @param color2 - the second RAL color to display in the color examples
 * @returns a React component that displays two example colors side by side
 */
export default function ColorExamples({ color1, color2 }: Props) {
	return (
		<div className={styles.colorExamples} id={styles.ColorExamplesStyles}>
			<div
				className={styles.color1}
				style={{ width: '50%', height: '100%', backgroundColor: color1.HEX }}
			></div>
			<div
				className={styles.color2}
				style={{ width: '50%', height: '100%', backgroundColor: color2.HEX, borderRadius: '0px 14px 14px 0px' }}
			></div>
		</div>
	);
}
