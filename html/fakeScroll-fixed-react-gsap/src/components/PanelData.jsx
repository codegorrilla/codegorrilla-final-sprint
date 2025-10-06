export const panelData = [
	{
		type: 'basic',
		title: 'Panel One',
		content: (
			<>
				<p>This is the custom content for Panel One.</p>
				<img
					src='path/to/image1.jpg'
					alt='Panel 1'
				/>
			</>
		),
	},
	{
		type: 'list',
		title: 'Panel Two',
		content: <p>This panel has a different kind of content, with a list:</p>,
		listItems: ['Item A', 'Item B', 'Item C'],
	},
	{
		type: 'cta',
		title: 'Panel Three',
		content: <p>Here is a unique button for Panel Three.</p>,
		buttonText: 'Click Me!',
	},
	{
		type: 'basic',
		title: 'Panel Four',
		content: (
			<>
				<div className='box'></div>
			</>
		),
	},
	{
		type: 'basic',
		title: 'Panel Five',
	},
];
