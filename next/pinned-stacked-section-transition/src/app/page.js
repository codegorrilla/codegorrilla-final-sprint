import styles from './page.module.scss';
import StickyCards from '@/components/StickyCards/StickyCards';
import { ReactLenis, useLenis } from 'lenis/react';

export default function Home() {
	// const lenis = useLenis((lenis) => {
	// 	console.log(lenis);
	// });
	return (
		<>
			<ReactLenis root />
			<section className={styles.intro}>
				<h1>The Foundations</h1>
			</section>
			<StickyCards />
			<section className={styles.outro}>
				<h1>Ends in Form</h1>
			</section>
		</>
	);
}
