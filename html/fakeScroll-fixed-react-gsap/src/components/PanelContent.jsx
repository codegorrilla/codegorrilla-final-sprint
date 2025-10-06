// PanelContent.jsx
function PanelContent({ panel }) {
	switch (panel.type) {
		case 'basic':
			return <p>{panel.text}</p>;
		case 'list':
			return (
				<ul>
					{panel.listItems.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			);
		case 'cta':
			return (
				<button
					onClick={() => alert(`You clicked the button in ${panel.title}`)}
				>
					{panel.buttonText}
				</button>
			);
		default:
			return null;
	}
}

export { PanelContent };
