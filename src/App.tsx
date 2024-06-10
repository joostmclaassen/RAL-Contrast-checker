import RALContrastTool from './app/features/RALContrastTool/RALContrastTool';
import { useState } from 'react';
import MultiRCT from './app/features/Multi RCT/MultiRCT';

function App() {
	const [MultiTool, setMultiTool] = useState(false);

	return (
		<>
			{MultiTool ? (
				<div>
					<h2> Multi RCT</h2>
					<MultiRCT />
				</div>
			) : (
				''
			)}

			<div style={{ padding: '25px' }} />

			{MultiTool ? (
				''
			) : (
				<div>
					<h2> RAL Contrast Tool</h2>
					<RALContrastTool />
					<img src="../RAL Contrast Checker Poster.jpg" aria-label="RAL Contrast Checker Poster">
				</div>
			)}

			<div style={{ padding: '25px' }} />

			<button
				style={{
					backgroundColor: '#2B50EC',
					border: 'none',
					color: 'white',
					padding: '15px 32px',
					textAlign: 'center',
					textDecoration: 'none',
					display: 'inline-block',
					fontSize: '16px',
					margin: '4px 2px',
					cursor: 'pointer',
					borderRadius: '8px',
				}}
				onClick={() => {
					setMultiTool(!MultiTool);
					window.scrollTo(0, 0);
				}}
			>
				{MultiTool ? 'Open RAL Contrast Tool' : 'Open MultiRCT'}
			</button>
		</>
	);
}

export default App;
