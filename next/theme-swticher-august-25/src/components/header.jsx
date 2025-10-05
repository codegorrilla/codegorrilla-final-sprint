import { useContext } from 'react';
import { ThemeContext } from '../util/ThemeContext';

export default function Header() {
	const { toggleTheme, theme } = useContext(ThemeContext);
	return (
		<header>
			<h1>Theme switcher by useContext</h1>
			<button onClick={toggleTheme}>toggle {theme} theme</button>

			<div className='toggle-switch'>
				<input
					type='checkbox'
					name='toggle-theme'
					value={theme}
					onChange={toggleTheme}
				/>
				<span>switch</span>
			</div>
		</header>
	);
}
