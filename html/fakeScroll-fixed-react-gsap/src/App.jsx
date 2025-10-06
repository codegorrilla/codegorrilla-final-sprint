import HorizontalScrollTrigger from './components/HorizontalScrollTrigger';

export default function App() {
	return (
		<>
			<section className='spacer'>
				<h1>Building fake horizontal scroll</h1>
			</section>
			<HorizontalScrollTrigger />
			<section className='spacer'>
				<h1>Again Scrolling Vertically!!!</h1>
			</section>
		</>
	);
}
