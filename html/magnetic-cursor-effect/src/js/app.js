import '../scss/app.scss';
import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
	const magneticElem = document.querySelectorAll('.magnetic');

	magneticElem.forEach((elem) => {
		//Get the element's original position relative to the viewport
		let boundingRect;

		//The event listener for mouse movement over the magnetic element
		elem.addEventListener('mousemove', (e) => {
			//Get dimensions and position on mouse move to handle changes
			//(Like window resize, or element position change)
			boundingRect = elem.getBoundingClientRect();
			const mouseX = e.clientX - boundingRect.left;
			const mouseY = e.clientY - boundingRect.top;

			//Calculate the offset from the center of the element
			const xOffset = mouseX - boundingRect.width / 2;
			const yOffset = mouseY - boundingRect.height / 2;

			//A 'strength' value to control how far the element move
			const strength = 0.5;

			//Animate the element's position using GSAP
			gsap.to(elem, {
				x: xOffset * strength,
				y: yOffset * strength,
				duration: 0.8,
				ease: 'power3.out',
			});
		});

		//The event listener for when the mouse leaves the element
		elem.addEventListener('mouseleave', () => {
			//Animate the element back to its original position
			gsap.to(elem, {
				x: 0,
				y: 0,
				duration: 0.8,
				ease: 'elastic.out(1, .3)', //A bouncy , elastic ease for a fun snap back effect
			});
		});
	});
});
