import { useEffect, useState } from "react";
import RALColor from "../../models/RALColor";
import { ContrastService } from "../../service/ContrastService";
import ColorExamples from "../components/Multi RCT Components/colorExamples/ColorExamples";
import styles from './MultiRCT.module.css';
import InputFields from "../components/Multi RCT Components/inputFields/InputFields";
import ContrastResults from "../components/Multi RCT Components/contrastResult/ContrastResults";


export default function MultiRCT() {
    const contrastService: ContrastService = new ContrastService();

    const [firstSelectedColor, setFirstSelectedColor] = useState<RALColor>();
    const [secondSelectedColor, setSecondSelectedColor] = useState<RALColor>();
    const [thirdSelectedColor, setThirdSelectedColor] = useState<RALColor>();
    const [fourthSelectedColor, setFourthSelectedColor] = useState<RALColor>();
    const [ralData, setRalData] = useState<RALColor[]>([]);

    const [score1, setScore1] = useState<number>(0);
    const [evaluation1, setEvaluation1] = useState<string>('');
    const [score2, setScore2] = useState<number>(0);
    const [evaluation2, setEvaluation2] = useState<string>('');
    const [score3, setScore3] = useState<number>(0);
    const [evaluation3, setEvaluation3] = useState<string>('');
    const [score4, setScore4] = useState<number>(0);
    const [evaluation4, setEvaluation4] = useState<string>('');
    const [score5, setScore5] = useState<number>(0);
    const [evaluation5, setEvaluation5] = useState<string>('');
    const [score6, setScore6] = useState<number>(0);
    const [evaluation6, setEvaluation6] = useState<string>('');

    useEffect(() => {
        contrastService.getAllColors().then(ralColors => {
            setRalData(ralColors);
            if (!firstSelectedColor) setFirstSelectedColor(ralColors[0]);
            if (!secondSelectedColor) setSecondSelectedColor(ralColors[1]);
            if (!thirdSelectedColor) setThirdSelectedColor(ralColors[2]);
            if (!fourthSelectedColor) setFourthSelectedColor(ralColors[3]);

            if (firstSelectedColor && secondSelectedColor && thirdSelectedColor && fourthSelectedColor) {
                contrastService.calculateContrast(firstSelectedColor.RAL, secondSelectedColor.RAL).then(result => {
                    setScore1(parseFloat(result.toFixed(2)));
                    setEvaluation1(determineEvaluation(result));
                });
                contrastService.calculateContrast(firstSelectedColor.RAL, thirdSelectedColor.RAL).then(result => {
                    setScore2(parseFloat(result.toFixed(2)));
                    setEvaluation2(determineEvaluation(result));
                });
                contrastService.calculateContrast(firstSelectedColor.RAL, fourthSelectedColor.RAL).then(result => {
                    setScore3(parseFloat(result.toFixed(2)));
                    setEvaluation3(determineEvaluation(result));
                });
                contrastService.calculateContrast(secondSelectedColor.RAL, thirdSelectedColor.RAL).then(result => {
                    setScore4(parseFloat(result.toFixed(2)));
                    setEvaluation4(determineEvaluation(result));
                });
                contrastService.calculateContrast(secondSelectedColor.RAL, fourthSelectedColor.RAL).then(result => {
                    setScore5(parseFloat(result.toFixed(2)));
                    setEvaluation5(determineEvaluation(result));
                });
                contrastService.calculateContrast(thirdSelectedColor.RAL, fourthSelectedColor.RAL).then(result => {
                    setScore6(parseFloat(result.toFixed(2)));
                    setEvaluation6(determineEvaluation(result));
                });
            }
        });
    }, [firstSelectedColor, secondSelectedColor, thirdSelectedColor, fourthSelectedColor]);

    function determineEvaluation(score: number): string {
        if (score < 0.3) return 'Slecht';
        if (score < 0.7) return 'Goed';
        if (score < 1) return 'Alarmerend';
        return '';
    }

    if (firstSelectedColor && secondSelectedColor && thirdSelectedColor && fourthSelectedColor) {
        return (
            <main className={styles.MultiRCTContainer} id={styles.MultiRCT}>
                <div className={styles.inputArea}>
                    <InputFields
                        ralData={ralData}
                        firstSelectedColor={firstSelectedColor}
                        setFirstSelectedColor={setFirstSelectedColor}
                        secondSelectedColor={secondSelectedColor}
                        setSecondSelectedColor={setSecondSelectedColor}
                        thirdSelectedColor={thirdSelectedColor}
                        setThirdSelectedColor={setThirdSelectedColor}
                        fourthSelectedColor={fourthSelectedColor}
                        setFourthSelectedColor={setFourthSelectedColor}
                    />

                    <ColorExamples color1={firstSelectedColor} color2={secondSelectedColor} color3={thirdSelectedColor} color4={fourthSelectedColor} />
                </div>

                <ContrastResults
                    color1={firstSelectedColor}
                    color2={secondSelectedColor}
                    color3={thirdSelectedColor}
                    color4={fourthSelectedColor}

                    score1={score1}
                    evaluation1={evaluation1}
                    score2={score2}
                    evaluation2={evaluation2}
                    score3={score3}
                    evaluation3={evaluation3}
                    score4={score4}
                    evaluation4={evaluation4}
                    score5={score5}
                    evaluation5={evaluation5}
                    score6={score6}
                    evaluation6={evaluation6}
                />
            </main>
        );
    }

    return <div>Loading...</div>;
}
