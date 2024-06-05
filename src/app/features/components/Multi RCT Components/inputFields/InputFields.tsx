import RALColor from "../../../../models/RALColor";
import ColorInput from "../../colorInput/ColorInput"
import styles from './InputFields.module.css';
import Tooltip from "../../toolTipMoreInfo/tooltip";

interface Props {
    ralData: RALColor[];
    firstSelectedColor: RALColor;
    setFirstSelectedColor: (color: RALColor) => void;
    secondSelectedColor: RALColor;
    setSecondSelectedColor: (color: RALColor) => void;
    thirdSelectedColor: RALColor;
    setThirdSelectedColor: (color: RALColor) => void;
    fourthSelectedColor: RALColor;
    setFourthSelectedColor: (color: RALColor) => void;
}

export default function InputFields({
    ralData,
    firstSelectedColor,
    setFirstSelectedColor,
    secondSelectedColor,
    setSecondSelectedColor,
    thirdSelectedColor,
    setThirdSelectedColor,
    fourthSelectedColor,
    setFourthSelectedColor }: Props) {
    const tooltipText = "Kies een primaire en secundaire kleur uit de dropdown-menu's en " +
        "bekijk de resultaten onder de \"Contrast evaluaties\". " +
        "Een cijfer tussen 0 en 1 geeft het niveau van contrast aan, " +
        "waarbij hogere cijfers duiden op sterker contrast. " +
        "Observeer de resultaten die worden weergegeven in de zes contrast-balken hieronder. " +
        "Elke balk vertegenwoordigt een unieke combinatie mogelijk met de gekozen kleuren.";

    return (
        <div className={styles.inputFields} id={styles.InputFieldsStyles}>
            <div className={styles.colorInputContainer} id={styles.ColorInputContainerStyles}>
                <div className={styles.colorInput} id={styles.ColorInputStyles}>
                    <ColorInput
                        label='Eerste Kleur'
                        ralData={ralData}
                        selectedColor={firstSelectedColor}
                        setSelectedColor={setFirstSelectedColor}
                    />
                </div>
                <div className={styles.colorInput}>
                    <ColorInput
                        label='Tweede Kleur'
                        ralData={ralData}
                        selectedColor={secondSelectedColor}
                        setSelectedColor={setSecondSelectedColor}
                    />
                </div>
                <div className={styles.colorInput}>
                    <ColorInput
                        label='Derde Kleur'
                        ralData={ralData}
                        selectedColor={thirdSelectedColor}
                        setSelectedColor={setThirdSelectedColor}
                    />
                </div>
                <div className={styles.colorInput}>
                    <ColorInput
                        label='Vierde Kleur'
                        ralData={ralData}
                        selectedColor={fourthSelectedColor}
                        setSelectedColor={setFourthSelectedColor}
                    />
                </div>
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
