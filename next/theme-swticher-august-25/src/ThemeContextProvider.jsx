import { useState } from 'react';
import { ThemeContext } from './util/ThemeContext';

export default function ThemeContextProvider({ children }) {
	const [theme, setTheme] = useState('light');

	const handleThemeToggle = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	const themeVal = {
		theme: theme,
		toggleTheme: handleThemeToggle,
	};

	return (
		<ThemeContext.Provider value={themeVal}>{children}</ThemeContext.Provider>
	);
}
