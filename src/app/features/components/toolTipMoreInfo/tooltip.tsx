import React, {useState} from "react";
import styles from "./tooltip.module.css";

interface Props {
    ariaLabel?: string;
    children: React.ReactNode;
    tooltipText: string;
}

/**
 * Tooltip Component
 *
 * This component displays a tooltip when the user interacts with it.
 * It wraps the provided content with a link and shows the tooltip when the link is clicked.
 * @param {Props} props - Props for the Tooltip component
 * @returns {React.ReactNode} The rendered Tooltip component
 */
const Tooltip: React.FC<Props> = ({ariaLabel, children, tooltipText}) => {
    // State to manage the visibility of the tooltip
    const [tooltipVisible, setTooltipVisible] = useState(false);

    const toggleTooltip = () => {
        /**
         * Toggle the visibility of the tooltip.
         */
        setTooltipVisible((prevVisible) => !prevVisible);
    };

    const handleTooltipClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (<div className={styles.tooltip}>
            <a
                className={styles.tooltipText}
                href="#"
                onClick={toggleTooltip}
                onMouseDown={handleTooltipClick}
                aria-label={ariaLabel}
            >
                {children}
            </a>
            {tooltipVisible && (<div className={styles.tooltipContent} role="tooltip">
                    <p>{tooltipText}</p>
                </div>)}
        </div>);
};

export default Tooltip;
