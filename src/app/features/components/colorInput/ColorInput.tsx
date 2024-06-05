import { useCallback, useEffect, useRef, useState } from 'react';
import RALColor from '../../../models/RALColor';
import ColorDropdownMenu from '../colorDropdownMenu/ColorDropdownMenu';
import ExampleColorDiv from '../exampleColorDiv/ExampleColorDiv';
import { ContrastService } from '../../../service/ContrastService';
import styles from './ColorInput.module.css';

// CSS styles for the color selection and input fields
const colorSelectionStyles = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'initial',
	width: '100%',
};

// CSS styles for hiding the color dropdown
const closeDropdown = {
	display: 'none',
};

// CSS styles for showing the color dropdown
const showDropdown = {
	display: 'block',
	backgroundColor: '#f1f1f1',
	overflow: 'auto',
	borderRadius: '14px',
	boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
	zIndex: 1,
	position: 'absolute',
};

// Props interface for the ColorInput component
interface Props {
	label: string; // The label text for the input field
	ralData: RALColor[]; // The RAL color data to display in the dropdown menu
	selectedColor: RALColor; // The currently selected RAL color
	setSelectedColor: (color: RALColor) => void; // A function to set the selected color
}

/**
 * Component that displays a color input field with a dropdown menu of RAL colors to choose from
 * @param label - the label text for the input field
 * @param ralData - the RAL color data to display in the dropdown menu
 * @param selectedColor - the currently selected RAL color
 * @param setSelectedColor - a function to set the selected color
 * @returns a React component that displays a color input field with a dropdown menu of RAL colors to choose from
 */
export default function ColorInput({ label, ralData, selectedColor, setSelectedColor }: Props) {
	// State for whether the dropdown menu is dropped down or not
	const [menuDroppedDown, setMenuDroppedDown] = useState(false);
	// State for the input field text color
	const [inputColor, setInputColor] = useState('black');
	// Ref for the dropdown menu div
	const ref = useRef<HTMLDivElement>(null);
	// Ref for the RAL code input field
	const textInputRef = useRef<HTMLInputElement>(null);
	const [inputCode, setInputCode] = useState<string>('');

	// Event handler for the Escape key to close the dropdown menu
	const escFunction = useCallback((event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			closeDropdownMenu();
		}
	}, []);

	// Event handler for clicking outside the dropdown menu to close it
	const closeDropdownWhenClickingOutsideOfDropdown = useCallback((event: globalThis.MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
			closeDropdownMenu();
		}
	}, []);

	// Add event listeners for Escape key and outside click
	useEffect(() => {
		document.addEventListener('keydown', escFunction, false);
		document.addEventListener('mousedown', closeDropdownWhenClickingOutsideOfDropdown, false);
	}, [escFunction, closeDropdownWhenClickingOutsideOfDropdown]);

	// Open the dropdown menu
	function openDropdownMenu() {
		setMenuDroppedDown(true);
	}

	// Close the dropdown menu
	function closeDropdownMenu() {
		setMenuDroppedDown(false);
	}
	// Set the selected color, remove the error styling if they exist and close the dropdown menu
	function setColor(color: RALColor) {
		setSelectedColor(color);
		closeDropdownMenu();
		if (textInputRef.current) textInputRef.current.value = '';
		const errorDiv = document.getElementById(`ral-input-error-message-${selectedColor.RAL}`);
		if (errorDiv) errorDiv.setAttribute('style', 'display: none');
		const ralInputDiv = document.getElementById(`ral-input-div-${selectedColor.RAL}`);
		if (ralInputDiv) {
			ralInputDiv.classList.remove(styles.ralInputDivError);
			setInputColor('black');
			if (textInputRef.current) textInputRef.current.value = color.RAL.toString();
		}
	}
	// Set the selected color based on the RAL-code entered into the input field
	function setColorFromInput(RALCode: string) {
		// Set the input field value to the RAL code entered, this is used for displaying the input in the error message
		setInputCode(RALCode);

		// Get the error message div, this is used to display an error message if the code entered is invalid
		const errorDiv = document.getElementById(`ral-input-error-message-${selectedColor.RAL}`);

		// Get the div containing the input field, this is used to add error styling to the div if the code entered is invalid
		const ralInputDiv = document.getElementById(`ral-input-div-${selectedColor.RAL}`);

		// If the RAL code entered is not 4 digits long, set the input field color to black, remove the error styling from the div and return
		if (RALCode.length !== 4) {
			setInputColor('black');
			if (errorDiv) errorDiv.setAttribute('style', 'display: none');
			if (ralInputDiv) ralInputDiv.classList.remove(styles.ralInputDivError);
			return;
		}
		// Create a new instance of the ContrastService
		const contrastService = new ContrastService();
		// Get all the RAL colors using the ContrastService
		contrastService.getAllColors().then(colors => {
			// Find the RAL color with the matching RAL code entered into the input field
			const resultColor = colors.find(color => color.RAL === parseInt(RALCode));

			// If a matching color is found, set it as the selected color
			// Otherwise, set the input field color to red, add error styling to the div and show the error message
			if (resultColor) {
				setSelectedColor(resultColor);
				setInputColor('black');
				if (errorDiv) errorDiv.setAttribute('style', 'display: none');
				if (ralInputDiv) ralInputDiv.classList.remove(styles.ralInputDivError);
			} else {
				setInputColor('#d93025');
				if (errorDiv) errorDiv.setAttribute('style', 'display: flex');
				if (ralInputDiv) ralInputDiv.classList.add(styles.ralInputDivError);
			}
		});
	}

	return (
		<div ref={ref}>
			<label className={styles.label}>{label}</label>
			<div id={`ral-input-div-${selectedColor.RAL}`} className={styles.ralInputDiv}>
				<div style={{ ...colorSelectionStyles, color: inputColor }}>
					<label htmlFor={`ral-input-${selectedColor.RAL}`}>RAL</label>
					<input
						id={`ral-input-${selectedColor.RAL}`}
						ref={textInputRef}
						type='text'
						maxLength={4}
						minLength={4}
						className={styles.ralInputField}
						placeholder={selectedColor.RAL.toString()}
						style={{ color: inputColor }}
						onChange={e => {
							setColorFromInput(e.target.value);
						}}
						onFocus={closeDropdownMenu}
						aria-label={`Voer een RAL code in voor de ${label} of tab voor RAL kleuren selectie.`}
					></input>
				</div>
				<button
					onClick={() => (menuDroppedDown ? closeDropdownMenu() : openDropdownMenu())}
					type='button'
					className={styles.ralSelectionButton}
					aria-label={`RAL kleuren selectie voor de ${label}.`}
				>
					<ExampleColorDiv color={selectedColor} />
				</button>
			</div>
			<div
				id={`ral-input-error-message-${selectedColor.RAL}`}
				style={{ color: '#d93025', display: 'none' }}
				className={styles.ralInputErrorMessageDiv}
			>
				<span>
					<svg
						aria-hidden='true'
						fill='currentColor'
						focusable='false'
						width='16px'
						height='16px'
						viewBox='0 0 24 24'
						xmlns='https://www.w3.org/2000/svg'
						className={styles.ralInputErrorIcon}
					>
						<path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'></path>
					</svg>
				</span>
				<span aria-hidden='false' role='alert'>
					Ingevoerde code {inputCode} bestaat niet in ons systeem.
				</span>
			</div>
			<div className={styles.colorDiv} style={menuDroppedDown ? showDropdown : closeDropdown}>
				{menuDroppedDown ? <ColorDropdownMenu menuColors={ralData} setColor={setColor} /> : ''}
			</div>
		</div>
	);
}
