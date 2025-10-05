import { useContext } from 'react';
import { ThemeContext } from '../util/ThemeContext';
import Header from './header';

export default function Page() {
	const { theme } = useContext(ThemeContext);

	return (
		<div className={`container ${theme}`}>
			<Header />
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ducimus
				veniam, adipisci iste nostrum est perferendis debitis illo totam quaerat
				asperiores eum eius necessitatibus veritatis enim fugit cupiditate
				impedit nobis.
			</p>
		</div>
	);
}
