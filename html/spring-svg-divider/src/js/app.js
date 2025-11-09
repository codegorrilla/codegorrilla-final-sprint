import '../scss/app.scss';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/dist/MorphSVGPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(MorphSVGPlugin, ScrollTrigger);

// Get the SVG path element
const path = document.getElementById('myPath');

// Define the path data for the wavy state
//const curvePath = 'M 0 5 C 25 15, 75 -5, 100 5';
const straightPath = 'M 0 5 L 100 5';

// Create a GSAP timeline for the morph animation
const tl = gsap.timeline();

// tl.to(path, {
// 	morphSVG: 'M 0 5 C 25 0, 75 0, 100 5',
// 	ease: 'elastic.out(1, 0.4)',
// });

// Create a GSAP.to() tween for the inward curve
tl.to(path, {
	morphSVG: 'M 0 5 C 25 -5, 75 -5, 100 5', // An exaggerated inward curve
	ease: 'power2.out',
	paused: true, // We will manually control its progress
});

tl.to(path, {
	morphSVG: straightPath, // Animate back to a straight line
	ease: 'bounce.out',
});

//Attach the timeline to a ScrollTrigger
ScrollTrigger.create({
	animation: tl,
	trigger: '#third', // The element that starts the animation
	start: 'center center', // When the top of the trigger hits the center of the viewport
	end: 'bottom bottom', // When the bottom of the trigger leaves the center of the viewport
	scrub: 1, // Link the animation's progress to the scrollbar position (1-second lag)
	markers: true, // Optional: Shows start and end positions for debugging
});
