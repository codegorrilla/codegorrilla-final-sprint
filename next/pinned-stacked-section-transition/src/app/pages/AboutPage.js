'use client';

export default function AboutPage({ className, ...props }) {
	return (
		<>
			<div
				{...props}
				className={`${className || ''} custom`}
			>
				<h1>about section</h1>
				{props.children}
			</div>
		</>
	);
}
