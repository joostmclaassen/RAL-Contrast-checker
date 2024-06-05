import RALColor from "../../../../models/RALColor";
import ColorComparisonDiv from "./ComparisonDiv/ColorComparisonDiv";
import styles from './ContrastResults.module.css';

interface Props {
    color1: RALColor;
    color2: RALColor;
    color3: RALColor;
    color4: RALColor;

    score1: number;
    evaluation1: string;
    score2: number;
    evaluation2: string;
    score3: number;
    evaluation3: string;
    score4: number;
    evaluation4: string;
    score5: number;
    evaluation5: string;
    score6: number;
    evaluation6: string;
}

export default function ContrastResults({
    color1,
    color2,
    color3,
    color4,
    score1,
    evaluation1,
    score2,
    evaluation2,
    score3,
    evaluation3,
    score4,
    evaluation4,
    score5,
    evaluation5,
    score6,
    evaluation6,
}: Props) {
    return (
        <div className={styles.ContrastResultsStyles}>
            <h2 className={styles.GridTitle}>Contrast evaluaties</h2>
            <ColorComparisonDiv color1={color1} color2={color2} score={score1} evaluation={evaluation1} />
            <ColorComparisonDiv color1={color1} color2={color3} score={score2} evaluation={evaluation2} />
            <ColorComparisonDiv color1={color1} color2={color4} score={score3} evaluation={evaluation3} />
            <ColorComparisonDiv color1={color2} color2={color3} score={score4} evaluation={evaluation4} />
            <ColorComparisonDiv color1={color2} color2={color4} score={score5} evaluation={evaluation5} />
            <ColorComparisonDiv color1={color3} color2={color4} score={score6} evaluation={evaluation6} />
        </div>
    );
}