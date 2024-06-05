import { useEffect, useState } from 'react';
import ColorChecker from '../components/RALContrastTool Components/colorChecker/ColorChecker';
import ColorExamples from '../components/RALContrastTool Components/colorExamples/ColorExamples';
import { ContrastService } from '../../service/ContrastService';
import RALColor from '../../models/RALColor';
import styles from './RalContrastTool.module.css';

export default function RALContrastTool() {
	const contrastService: ContrastService = new ContrastService();

	// Set up state for selected colors, RAL data, score, and evaluation
	const [firstSelectedColor, setFirstSelectedColor] = useState<RALColor>();
	const [secondSelectedColor, setSecondSelectedColor] = useState<RALColor>();
	const [ralData, setRalData] = useState<RALColor[]>([]);
	const [score, setScore] = useState<number>(0);
	const [evaluation, setEvaluation] = useState<string>('');

	// Load RAL data and set defaults for selected colors
	useEffect(() => {
		contrastService.getAllColors().then(ralColors => {
			setRalData(ralColors);
			if (!firstSelectedColor) setFirstSelectedColor(ralColors[0]);
			if (!secondSelectedColor) setSecondSelectedColor(ralColors[1]);

			if (firstSelectedColor && secondSelectedColor) {
				contrastService.calculateContrast(firstSelectedColor.RAL, secondSelectedColor.RAL).then(result => {
					setScore(parseFloat(result.toFixed(2)));
					setEvaluation(determineEvaluation(score));
				});
			}
		});
	}, [firstSelectedColor, secondSelectedColor, score, evaluation]);

	/**
	 * Determines a string evaluation based on the given score factor
	 * @param score - a contrast factor of 0-1 in decimals
	 * @returns a string evaluation of the score
	 */
	function determineEvaluation(score: number): string {
		if (score < 0.3) return 'Slecht';
		if (score < 0.7) return 'Goed';
		if (score < 1) return 'Alarmerend';
		return '';
	}

	// Render ColorChecker and ColorExamples components with props
	if (firstSelectedColor && secondSelectedColor) {
		return (
			<main className={styles.RalContrastToolContainer} id={styles.RalContrastTool}>
				<ColorChecker
					ralData={ralData}
					firstSelectedColor={firstSelectedColor}
					setFirstSelectedColor={setFirstSelectedColor}
					secondSelectedColor={secondSelectedColor}
					setSecondSelectedColor={setSecondSelectedColor}
					score={score}
					evaluation={evaluation}
				/>
				<ColorExamples color1={firstSelectedColor} color2={secondSelectedColor} />
			</main>
		);
	}
	// Render loading message if RAL data is not yet loaded
	return <div>Loading...</div>;
}
