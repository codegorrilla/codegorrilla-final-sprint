import Page from './components/page';
import ThemeContextProvider from './ThemeContextProvider';

export default function App() {
	return (
		<ThemeContextProvider>
			<Page />
		</ThemeContextProvider>
	);
}
