import RALColor from '../../../../models/RALColor';
import styles from './ColorExamples.module.css';

interface Props {
    color1: RALColor;
    color2: RALColor;
    color3: RALColor;
    color4: RALColor;
}

export default function ColorExamples({ color1, color2, color3, color4 }: Props) {
    return (
        <div className={styles.colorExamples} id={styles.ColorExamplesStyles}>
            <div
                className={styles.color1}
                style={{ width: '100%', height: '25%', backgroundColor: color1.HEX }}
            ></div>
            <div
                className={styles.color2}
                style={{ width: '100%', height: '25%', backgroundColor: color2.HEX }}
            ></div>
            <div
                className={styles.color3}
                style={{ width: '100%', height: '25%', backgroundColor: color3.HEX }}
            ></div>
            <div
                className={styles.color4}
                style={{ width: '100%', height: '25%', backgroundColor: color4.HEX }}
            ></div>
        </div>
    );
}
