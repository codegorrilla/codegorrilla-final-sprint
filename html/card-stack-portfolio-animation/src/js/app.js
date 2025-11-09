import '../scss/app.scss';
import gsap from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';
import { InertiaPlugin } from 'gsap/dist/InertiaPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Observer } from 'gsap/dist/Observer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, InertiaPlugin, Draggable, Observer);

document.addEventListener('DOMContentLoaded', () => {
	const cards = gsap.utils.toArray('.card');
	const cardInners = gsap.utils.toArray('.card-inner');
	const container = document.querySelector('.cards-container');
	const cardSection = document.querySelector('.card-section');

	const initialPositions = new Map();

	cards.forEach((card, index) => {
		gsap.set(card, {
			x: 0,
			y: 0,
			scale: 1,
			zIndex: cards.length - index,
			yPercent: -50 - index * 3,
			xPercent: -50 + index * 3,
			position: 'absolute',
			left: '50%',
			top: '50%',
			backgroundColor: 'transparent',
		});
	});

	cardInners.forEach((cardInner) => {
		gsap.set(cardInner, {
			x: 0,
			y: 0,
			rotation: 0,
			scale: 1,
		});
	});

	cardInners.forEach((cardInner) => {
		InertiaPlugin.track(cardInner, 'x,y,rotation');
	});

	const scrollTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: cardSection,
			start: 'top top',
			end: 'bottom bottom',
			scrub: 1,
			pin: container,
			onUpdate: () => {
				cards.forEach((card, index) => {
					const matrix = gsap.getProperty(card, 'matrix');
					initialPositions.set(cardInners[index], {
						x: matrix.e,
						y: matrix.f,
						rotation: gsap.getProperty(card, 'rotation'),
					});
				});
			},
		},
	});

	scrollTimeline.to(cards, {
		stagger: 0.1,
		x: (index) => (index - 1.5) * 350,
		y: (index) => Math.random() * 100 - 50,
		rotation: (index) => (index - 1.5) * 5,
		scale: 1,
		ease: 'power2.inOut',
	});

	function createHoverEffect(cardInner, card) {
		function handleMouseEnter(e) {
			gsap.killTweensOf(cardInner);

			// Bring the hovered card to the front
			gsap.to(card.parentElement, { zIndex: cards.length });

			const rect = cardInner.getBoundingClientRect();
			const cardWidth = rect.width;
			const cardHeight = rect.height;
			const mouseX = e.clientX - rect.left - cardWidth / 2;
			const mouseY = e.clientY - rect.top - cardHeight / 2;

			gsap.to(cardInner, {
				duration: 0.8,
				x: mouseX * 0.3,
				y: mouseY * 0.3,
				rotation: mouseX * 0.05,
				scale: 1.1,
				ease: 'elastic.out(1, 0.5)',
			});
		}

		function handleMouseMove(e) {
			const rect = cardInner.getBoundingClientRect();
			const cardWidth = rect.width;
			const cardHeight = rect.height;
			const mouseX = e.clientX - rect.left - cardWidth / 2;
			const mouseY = e.clientY - rect.top - cardHeight / 2;

			gsap.to(cardInner, {
				x: mouseX * 0.3,
				y: mouseY * 0.3,
				rotation: mouseX * 0.05,
				overwrite: true,
				duration: 0.1,
				ease: 'none',
			});
		}

		function handleMouseLeave() {
			gsap.killTweensOf(cardInner);

			const velocity = {
				x: InertiaPlugin.getVelocity(cardInner, 'x'),
				y: InertiaPlugin.getVelocity(cardInner, 'y'),
				rotation: InertiaPlugin.getVelocity(cardInner, 'rotation'),
			};

			gsap.to(cardInner, {
				duration: 'auto',
				x: 0,
				y: 0,
				rotation: 0,
				scale: 1,
				ease: 'power3.out',
				inertia: {
					resistance: 18,
				},
			});

			// Restore z-index
			gsap.to(card.parentElement, { zIndex: cards.indexOf(card) });

			const index = cardInners.indexOf(cardInner);
			const rippleVelocityFactor = 0.5;

			// Animate the card to the left
			if (index > 0) {
				const adjacentLeft = cardInners[index - 1];
				const adjacentLeftVel = {
					x: velocity.x * rippleVelocityFactor,
					y: velocity.y * rippleVelocityFactor,
					rotation: velocity.rotation * rippleVelocityFactor,
				};
				gsap.to(adjacentLeft, {
					duration: 0.6,
					x: adjacentLeftVel.x * 0.5,
					y: adjacentLeftVel.y * 0.5,
					scale: 1.05,
					rotation: adjacentLeftVel.rotation,
					ease: 'expo.in(1, 0.5)',
					yoyo: true,
					repeat: 1,
				});
			}

			// Animate the card to the right
			if (index < cardInners.length - 1) {
				const adjacentRight = cardInners[index + 1];
				const adjacentRightVel = {
					x: velocity.x * rippleVelocityFactor,
					y: velocity.y * rippleVelocityFactor,
					rotation: velocity.rotation * rippleVelocityFactor,
				};
				gsap.to(adjacentRight, {
					duration: 0.6,
					x: adjacentRightVel.x * 0.5,
					y: adjacentRightVel.y * 0.5,
					scale: 1.05,
					rotation: adjacentRightVel.rotation,
					ease: 'expo.out(1, 0.5)',
					yoyo: true,
					repeat: 1,
				});
			}
		}

		card.addEventListener('mouseenter', handleMouseEnter);
		card.addEventListener('mousemove', handleMouseMove);
		card.addEventListener('mouseleave', handleMouseLeave);
	}

	ScrollTrigger.create({
		trigger: cardSection,
		start: 'top top',
		onEnter: () => {
			cards.forEach((card, index) => {
				createHoverEffect(cardInners[index], card);
			});
		},
		onLeaveBack: () => {
			cardInners.forEach((cardInner) => {
				gsap.to(cardInner, {
					x: 0,
					y: 0,
					rotation: 0,
					scale: 1,
					duration: 0.5,
				});
			});
		},
	});
});

// Function to handle the marquees
function setupOpposingMarquees(duration) {
	const marqueeLeft = document.querySelector('.marquee-left .marquee-inner');
	const marqueeRight = document.querySelector('.marquee-right .marquee-inner');

	// Create a timeline for the left-scrolling marquee
	const tlLeft = gsap.timeline({ repeat: -1 });
	tlLeft.to(marqueeLeft, {
		x: `-=${marqueeLeft.scrollWidth / 2}px`, // Adjust distance based on text width
		duration: duration,
		ease: 'none',
	});

	// Create a timeline for the right-scrolling marquee
	const tlRight = gsap.timeline({ repeat: -1 });
	tlRight.fromTo(
		marqueeRight,
		{ x: -marqueeRight.scrollWidth / 2 }, // Start from the left off-screen
		{
			x: 0, // Animate to the starting position
			duration: duration,
			ease: 'none',
		}
	);

	// Set a baseline speed and initialize quickTo
	const baseSpeed = 1;
	const speedTo = gsap.quickTo([tlLeft, tlRight], 'timeScale', {
		duration: 0.5,
	});
	speedTo(baseSpeed); // Set initial speed

	// Use the Observer to react to scroll events
	Observer.create({
		onUp: () => speedTo(baseSpeed + 1), // Speed up on scroll up
		onDown: () => speedTo(baseSpeed + 3), // Speed up on scroll down
		onStop: () => speedTo(baseSpeed - 1), // Return to normal speed when scroll stops
		tolerance: 10,
		preventDefault: false,
		type: 'wheel,touch,pointer',
	});
}

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
	setupOpposingMarquees(20); // The duration is the speed (lower is faster)
});
