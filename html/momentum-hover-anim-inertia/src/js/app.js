import '../scss/app.scss';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/all';

gsap.registerPlugin(InertiaPlugin);

const targetContainer = document.querySelector('.container');
const targetElem = document.querySelectorAll('.my-hover-element');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
	mouseX = e.clientX;
	mouseY = e.clientY;
});

targetContainer.addEventListener('mousemove', () => {
	gsap.to(targetElem, {
		inertia: {
			x: { velocity: mouseX * 0.1, min: -20, max: 20 }, // Example: Scale velocity by 0.1
			y: { velocity: mouseY * 0.1, min: -50, max: 50 },
		},
		duration: 1, // Inertia will calculate a natural duration, but you can override it
	});
});

targetContainer.addEventListener('mouseleave', () => {
	gsap.to(targetElem, {
		x: 0,
		y: 0,
		duration: 0.5, // Return to original position smoothly
		ease: 'power1.out',
	});
});

// gsap.registerPlugin(InertiaPlugin);

// const card = document.querySelector('.card');

// // Maximum tilt angle in degrees
// const maxTilt = 15;

// let isHovering = false;

// // Function to handle the tilt animation based on mouse position
// function tiltCard(e) {
// 	if (!isHovering) return;

// 	const rect = card.getBoundingClientRect();
// 	const centerX = rect.left + rect.width / 2;
// 	const centerY = rect.top + rect.height / 2;

// 	// Calculate normalized mouse position relative to the center (-1 to 1)
// 	const mouseX = (e.clientX - centerX) / (rect.width / 2);
// 	const mouseY = (e.clientY - centerY) / (rect.height / 2);

// 	// Map mouse position to rotation values
// 	const rotateX = mouseY * -maxTilt; // Invert X rotation for natural effect
// 	const rotateY = mouseX * maxTilt;

// 	gsap.to(card, {
// 		rotationX: rotateX,
// 		rotationY: rotateY,
// 		ease: 'power2.out',
// 		duration: 0.5,
// 	});
// }

// // Handle mouse enter
// card.addEventListener('mouseenter', () => {
// 	isHovering = true;
// });

// // Handle mouse movement
// card.addEventListener('mousemove', tiltCard);

// // Handle mouse leave with InertiaPlugin
// card.addEventListener('mouseleave', (e) => {
// 	isHovering = false;

// 	// Use the mouse's last movement velocity for the inertia effect
// 	const velocityX = e.movementX;
// 	const velocityY = e.movementY;

// 	gsap.to(card, {
// 		inertia: {
// 			rotationX: {
// 				velocity: -velocityY * 1.5, // Scale velocity for more pronounced effect
// 				end: 0,
// 			},
// 			rotationY: {
// 				velocity: velocityX * 1.5,
// 				end: 0,
// 			},
// 		},
// 	});
// });
