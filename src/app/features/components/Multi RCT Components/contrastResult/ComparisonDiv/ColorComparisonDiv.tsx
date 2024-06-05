import RALColor from "../../../../../models/RALColor";
import './ColorComparisonDiv.css';

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

interface Props {
    color1: RALColor;
    color2: RALColor;
    score: number;
    evaluation: string;
}

export default function ColorComparisonDiv({ color1, color2, score, evaluation }: Props) {
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
    }

    return (
        <div className="container">
            <div className="overlap" style={{ backgroundColor: color2.HEX }}>
                <div className="rectangle" style={{ backgroundColor: color1.HEX }} />
            </div>
            <div className="overlap-group">
                <div className="text-container" style={colorStyles} aria-live='polite'>
                    {/* De screen reader leest alleen de div's die veranderen. de rest van de div's worden niet gelezen */}
                    <span className="score"><span className="visuallyHidden">De contrast score tussen  RAL kleur {color1.RAL} en {color2.RAL} is </span>{score}</span>
                    <span className="evaluation"><span className="visuallyHidden">Het contrast is </span>{evaluation}</span>
                </div>
            </div>
        </div>
    );
}