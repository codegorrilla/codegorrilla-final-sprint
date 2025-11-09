import '../scss/app.scss';
import gsap from 'gsap';
import { ScrollTrigger, SplitText, CustomEase, CustomBounce } from 'gsap/all';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

console.clear();

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, CustomBounce);

CustomBounce.create('iconBounce', {
	strength: 0.25,
});

// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
	lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

const revealText = gsap.utils.toArray('.reveal-text p');

//console.log(revealtext);

const split = new SplitText(revealText, {
	type: 'lines',
	linesClass: 'reveal++',
});

const tl = gsap.timeline();

//section scrolling
tl.to('.dark', {
	scrollTrigger: {
		trigger: '.dark',
		pin: true,
		start: 'top top',
		end: '+=600',
		markers: true,
	},
});

function textRevealOnScroll() {
	//animating icon on revealing first line of text
	const para1 = document.querySelector('.p1');
	const firstTextLine = para1.querySelector('.reveal1');
	const secondTextLine = document
		.querySelector('.p2')
		.querySelector('.reveal1');

	//const firstTextLineBgPos = firstTextLine.style.backgroundPositionX;

	const rocketIcon = document.querySelector('.rocket');
	const robotIcon = document.querySelector('.robot');

	split.lines.forEach((line) => {
		tl.to(line, {
			backgroundPositionX: 0,
			ease: 'power2.in',
			scrollTrigger: {
				trigger: line,
				//markers: true,
				scrub: 1,
				start: 'top center',
				end: 'bottom center',
				onEnter: () => {
					if (firstTextLine.style.backgroundPositionX < '100%') {
						//console.log(firstTextLine.style.backgroundPositionX);
						tl.to(rocketIcon, {
							opacity: 1,
							top: '10vh',
							ease: 'iconBounce',
						});
					}

					if (secondTextLine.style.backgroundPositionX < '100%') {
						//console.log(firstTextLine.style.backgroundPositionX);
						tl.to(robotIcon, {
							opacity: 1,
							top: '40vh',
							ease: 'iconBounce',
						});
					}
				},

				onLeaveBack: () => {
					//console.log('entering back');
					if (firstTextLine.style.backgroundPositionX > '0%') {
						//console.log(firstTextLine.style.backgroundPositionX);
						tl.to(rocketIcon, {
							opacity: 0,
							top: '20vh',
							ease: 'iconBounce',
						});
					}

					if (secondTextLine.style.backgroundPositionX > '0%') {
						//console.log(firstTextLine.style.backgroundPositionX);
						tl.to(robotIcon, {
							opacity: 0,
							top: '60vh',
							ease: 'iconBounce',
						});
					}
				},
			},
		});
	});
}

textRevealOnScroll();

// handle window resize events to re-calculate the split and triggers
let someDelay = gsap.delayedCall(0.2, newTriggers).pause();
window.addEventListener('resize', () => someDelay.restart(true));

function newTriggers() {
	// Revert split text and kill old triggers before re-initializing
	split.revert();
	ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
	textRevealOnScroll();
}
