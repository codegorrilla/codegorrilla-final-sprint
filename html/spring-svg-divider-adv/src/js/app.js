import '../scss/app.scss';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/dist/MorphSVGPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// app.js

// Register GSAP plugins
gsap.registerPlugin(MorphSVGPlugin, ScrollTrigger);

// Get the SVG path element
const path = document.getElementById('myPath');

// Set the initial straight path
// Ensure the starting path is a Cubic Bezier curve for smooth morphing
const straightPath = 'M 0 5 C 25 5, 75 5, 100 5';
path.setAttribute('d', straightPath);

let currentScrollVelocity = 0;

// Create the outward-curving and inward-curving paths
const outwardPath = 'M 0 5 C 25 15, 75 15, 100 5'; // Exaggerated outward curve
const inwardPath = 'M 0 5 C 25 -5, 75 -5, 100 5'; // Exaggerated inward curve

// Use ScrollTrigger's onUpdate to get the scroll velocity
ScrollTrigger.create({
	trigger: 'body', // Listen for global scroll events
	start: 'top top',
	end: 'bottom bottom',
	onUpdate: (self) => {
		// Get the scroll velocity. A positive value means scrolling down, negative is up.
		currentScrollVelocity = self.getVelocity();

		// Normalize the velocity to a value between 0 and 1,
		// clamping to prevent extreme values.
		const normalizedVelocity = gsap.utils.clamp(
			0,
			1,
			Math.abs(currentScrollVelocity) / 2000
		);

		let targetPath = straightPath; // Default to the straight path
		let easeType = 'power2.out'; // Default ease

		if (currentScrollVelocity > 0) {
			// Scrolling down
			// Use gsap.utils.interpolate to blend between the straight and outward paths
			const newPath = gsap.utils.interpolate(
				straightPath,
				outwardPath,
				normalizedVelocity
			);
			targetPath = newPath;
			easeType = 'power2.out';
		} else if (currentScrollVelocity < 0) {
			// Scrolling up
			// Use gsap.utils.interpolate to blend between the straight and inward paths
			const newPath = gsap.utils.interpolate(
				straightPath,
				inwardPath,
				normalizedVelocity
			);
			targetPath = newPath;
			easeType = 'power2.out';
		}

		// Morph the SVG path to the calculated target path
		gsap.to(path, {
			morphSVG: targetPath,
			duration: 0.15, // Short duration for a snappy, responsive feel
			ease: easeType,
		});
	},
	// Optional: markers for debugging
	markers: true,
});
