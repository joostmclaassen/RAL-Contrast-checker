import React, { useState } from "react";
import RALColor from "../../../models/RALColor";
import ExampleColorDiv from "../exampleColorDiv/ExampleColorDiv";
import styles from './ColorDropdownMenu.module.css';

interface Props {
	menuColors: RALColor[]; // The RAL colors to display in the dropdown menu
	setColor: (color: RALColor) => void; // A function to set the selected color
}

/**
 * Component that displays a dropdown menu of RAL colors to choose from
 * @param menuColors - the RAL colors to display in the dropdown menu
 * @param setColor - a function to set the selected color
 * @returns a React component that displays a dropdown menu of RAL colors to choose from
 */
export default function ColorDropdownMenu({ menuColors, setColor }: Props) {
	// State for whether the second level menu is dropped down or not
	const [secondLevelDroppedDown, setSecondLevelDroppedDown] = useState(false);

	// Filter the menu colors to get the first level colors
	const firstLevelColors: RALColor[] = menuColors
		.filter(color => color.RAL % 1000 === 0 || color.RAL === 3013 || color.RAL === 4001 || color.RAL === 9001)
		.sort((a, b) => a.RAL - b.RAL);

	// Function to get the second level colors for a given first level color
	function getSecondLevelColors(firstLevelColor: RALColor): RALColor[] {
		const firstLevelCode = firstLevelColor.RAL;
		const firstLevelCodeStr = firstLevelCode.toString();

		if (firstLevelCodeStr.length === 4) {
			// Find the first color in the list with the same code as the first level color
			const startIndex = menuColors.findIndex(color => color.RAL === firstLevelCode);
			// Find the index of the first color that does not belong to the same thousands group as the first level color
			const endIndex = menuColors
				.slice(startIndex)
				.findIndex(color => Math.floor(color.RAL / 1000) !== Math.floor(firstLevelCode / 1000));
			// If no such color is found, use the rest of the list
			const endIndexOrListLength = endIndex === -1 ? menuColors.length : startIndex + endIndex;
			return menuColors.slice(startIndex, endIndexOrListLength);
		}
		else if (firstLevelCodeStr.startsWith('3')) {
			// For 3000 series colors, find the index of the first and last color in the series
			const startIndex = menuColors.findIndex(color => color.RAL === 3013);
			const endIndex = menuColors.findIndex(color => color.RAL === 3031) + 1;
			return menuColors.slice(startIndex, endIndex);
		}
		else if (firstLevelCodeStr.startsWith('9')) {
			// For 9000 series colors, find the index of the first and last color in the series
			const startIndex = menuColors.findIndex(color => color.RAL === 9001);
			const endIndex = menuColors.findIndex(color => color.RAL === 9018) + 1;
			return menuColors.slice(startIndex, endIndex);
		}
		return []
	}

	function openSecondLevelMenu(color: RALColor) {
		const secondLevelMenu = document.getElementById(`second-dropdown-${color.RAL}`);
		if (secondLevelMenu) secondLevelMenu.style.display = 'block';
		setSecondLevelDroppedDown(true);
	}

	function closeSecondLevelMenu(color: RALColor) {
		const secondLevelMenu = document.getElementById(`second-dropdown-${color.RAL}`);
		if (secondLevelMenu) secondLevelMenu.style.display = 'none';
		setSecondLevelDroppedDown(false);
	}

	function selectColor(color: RALColor) {
		setColor(color);
	}


	// second-dropdown id is not used for styles, but is used to find the element in the DOM, might need a refactor to useRef

	return (
		<ul>
			{firstLevelColors.map(firstLevelColor => (
				<li key={firstLevelColor.RAL} style={{ listStyle: 'none' }} >
					<button
						id={styles.MenuListItemStyles}
						onClick={() => secondLevelDroppedDown ? closeSecondLevelMenu(firstLevelColor) : openSecondLevelMenu(firstLevelColor)}>
						RAL {firstLevelColor.RAL}<ExampleColorDiv color={firstLevelColor} /></button>
					<ul
						id={`second-dropdown-${firstLevelColor.RAL}`}
						style={{ display: 'none' }}>
						{getSecondLevelColors(firstLevelColor).map(secondLevelColor => (
							<li key={secondLevelColor.RAL} id={styles.SubMenuListItemStyles}>
								<button id={styles.SubMenuListItemStyles} onClick={() => {
									selectColor(secondLevelColor);
									closeSecondLevelMenu(firstLevelColor);
								}}>{secondLevelColor.RAL}<ExampleColorDiv color={secondLevelColor} /></button>
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	);
}
