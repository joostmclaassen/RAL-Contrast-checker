import RALColor from '../../../../models/RALColor';
import ColorInput from '../../colorInput/ColorInput';
import ContrastEvaluation from '../contrastEvaluation/ContrastEvaluation';
import styles from './ColorChecker.module.css';
import Tooltip from "../../toolTipMoreInfo/tooltip";

interface Props {
    firstSelectedColor: RALColor;
    setFirstSelectedColor: (color: RALColor) => void;
    secondSelectedColor: RALColor;
    setSecondSelectedColor: (color: RALColor) => void;
    score: number;
    evaluation: string;
    ralData: RALColor[];
}

/**
 * The main tsx, where all the functions get bundled.
 * It sets the colorinput displays,
 * runs the logic for calculating and displaying contrast score.
 * **/
export default function ColorChecker({
                                         firstSelectedColor,
                                         setFirstSelectedColor,
                                         secondSelectedColor,
                                         setSecondSelectedColor,
                                         score,
                                         evaluation,
                                         ralData,
                                     }: Props) {
    /**
     * The tooltipText describes how this function is used.
     */
    const tooltipText = "Kies een primaire en secundaire kleur uit de dropdown-menu's en " +
        "bekijk het contrastresultaat in de \"Contrast evaluatie\" balk. " +
        "Een cijfer tussen 0 en 1 geeft het niveau van contrast aan, " +
        "waarbij hogere cijfers duiden op sterker contrast.";

    return (
        <div className={styles.colorChecker} id={styles.ColorCheckerStyles}>
            <div className={styles.colorInputContainer} id={styles.ColorInputContainerStyles}>
                <div className={styles.colorInput} id={styles.ColorInputStyles}>
                    <ColorInput
                        label='Primaire Kleur'
                        ralData={ralData}
                        selectedColor={firstSelectedColor}
                        setSelectedColor={setFirstSelectedColor}
                    />
                </div>
                <div className={styles.colorInput}>
                    <ColorInput
                        label='Secundaire Kleur'
                        ralData={ralData}
                        selectedColor={secondSelectedColor}
                        setSelectedColor={setSecondSelectedColor}
                    />
                </div>
            </div>

            <div className={styles.contrastEvaluation}>
                <p className={styles.label}>Contrast evaluatie</p>
                <ContrastEvaluation score={score} evaluation={evaluation}/>
            </div>

            <div style={{ color: '#59585D' }}>
                Voor meer informatie{" "}
                <Tooltip tooltipText={tooltipText} ariaLabel="Voor meer informatie en verdere begeleiding, klik hier.">
                    klik hier.
                </Tooltip>
            </div>
        </div>

    );
}
