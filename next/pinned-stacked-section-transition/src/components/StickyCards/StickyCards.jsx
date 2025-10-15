'use client';

import './StickyCards.scss';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import InversionLens from '../InversionLens/InversionLens';

gsap.registerPlugin(ScrollTrigger);

const StickyCards = () => {
	const stickyCardsData = [
		{
			index: '01',
			title: 'Modularity',
			image: '/sticky-cards/card_1.jpg',
			description:
				'Every element is built to snap into place. We design modular systems where clarity, structure, and reuse come first—no clutter, no excess.',
		},
		{
			index: '02',
			title: 'Materials',
			image: '/sticky-cards/card_2.jpg',
			description:
				'From soft gradients to hard edges, our design language draws from real-world materials—elevating interfaces that feel both digital and tangible.',
		},
		{
			index: '03',
			title: 'Precision',
			image: '/sticky-cards/card_3.jpg',
			description:
				'Details matter. We work with intention—aligning pixels, calibrating contrast, and obsessing over every edge until it just feels right.',
		},
		{
			index: '04',
			title: 'Character',
			image: '/sticky-cards/card_4.jpg',
			description:
				'Interfaces should have personality. We embed small moments of play and irregularity to bring warmth, charm, and a human feel to the digital.',
		},
	];

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
			<div className='sticky-card'>
				<h1>about section</h1>
				<InversionLens src='/turbulence/portrait.jpeg' />
			</div>
			<div className='sticky-card'>portfolio section</div>
		</div>
	);
};

export default StickyCards;
