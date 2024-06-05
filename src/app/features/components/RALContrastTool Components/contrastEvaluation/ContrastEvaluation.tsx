import styles from './ContrastEvaluation.module.css';

const evaluationColors = {
	sufficient: '#D2FBD0',
	insufficient: '#FBD0DA',
	alarming: '#FBF5D0',
};

const evaluationTextColors = {
	sufficient: '#0D5F07',
	insufficient: '#78071C',
	alarming: '#5F5207',
};

const inlineStyles = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	height: '150px',
	width: '100%',
	paddingRight: '10px',
	borderRadius: '14px',
	backgroundColor: evaluationColors.sufficient,
	color: evaluationTextColors.sufficient,
};

// CSS styles for the evaluation score number
const evaluationNumberStyle = {
	fontSize: '3.5rem',
	fontWeight: 'bold',
	paddingLeft: '15px',
};

// CSS styles for the evaluation text
const evaluationStyle = {
	fontSize: '1.5rem',
	fontWeight: 'bold',
	paddingRight: '75px',
};

interface Props {
	score: number; // The contrast score to display
	evaluation: string; // The evaluation category to display
}

/**
 * Component that displays the contrast score and evaluation category
 * @param score - the contrast score to display
 * @param evaluation - the evaluation category to display
 * @returns a React component that displays the contrast score and evaluation category
 */
export default function ContrastEvaluation({ score, evaluation }: Props) {
	// Determine the color and text color for the evaluation category
	const colorStyles = {
		backgroundColor:
			evaluation === 'Slecht'
				? evaluationColors.insufficient
				: evaluation === 'Goed'
					? evaluationColors.sufficient
					: evaluationColors.alarming,
		color:
			evaluation === 'Slecht'
				? evaluationTextColors.insufficient
				: evaluation === 'Goed'
					? evaluationTextColors.sufficient
					: evaluationTextColors.alarming,
	};

	// Render the component with the given score and evaluation category
	return (
		<div style={Object.assign({}, inlineStyles, colorStyles)} aria-live='polite'>
			<span style={evaluationNumberStyle}>
				<span className={styles.visuallyHidden}>De contrast score is </span>
				{score}
			</span>
			<span style={evaluationStyle}>
				<span className={styles.visuallyHidden}>Het contrast is </span>
				{evaluation}
			</span>
		</div>
	);
}
