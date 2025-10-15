'use client';

import './StickyCards.scss';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AboutPage from '@/app/pages/AboutPage';
import PortfolioPage from '@/app/pages/PortfolioPage';
import InversionLens from '../InversionLens/InversionLens';

gsap.registerPlugin(ScrollTrigger);

const StickyCards = () => {
	const container = useRef(null);

	useGSAP(
		() => {
			const stickyCards = document.querySelectorAll('.sticky-card');

			stickyCards.forEach((card, index) => {
				if (index < stickyCards.length - 1) {
					ScrollTrigger.create({
						trigger: card,
						start: 'top top',
						endTrigger: stickyCards[stickyCards.length - 1],
						end: 'top top',
						pin: true,
						pinSpacing: false,
					});
				}

				if (index < stickyCards.length - 1) {
					ScrollTrigger.create({
						trigger: stickyCards[index + 1],
						start: 'top bottom',
						end: 'top top',
						onUpdate: (self) => {
							const progress = self.progress;
							const scale = 1 - progress * 0.25;
							const rotation = (index % 2 === 0 ? 5 : -5) * progress;
							const afterOpacity = progress;

							gsap.set(card, {
								scale: scale,
								rotation: rotation,
								'--after-opacity': afterOpacity,
							});
						},
					});
				}
			});
		},
		{ scope: container }
	);

	return (
		<div
			className='sticky-cards'
			ref={container}
		>
			<AboutPage
				id='about'
				className='sticky-card'
			>
				<InversionLens src='/turbulence/profile.png' />
			</AboutPage>
			<PortfolioPage className='sticky-card' />
		</div>
	);
};

export default StickyCards;
