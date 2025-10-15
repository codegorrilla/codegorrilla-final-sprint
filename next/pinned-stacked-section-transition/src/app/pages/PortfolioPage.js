'use client';

export default function PortfolioPage({ className, ...props }) {
	return (
		<>
			<div
				{...props}
				className={`${className || ''} custom `}
			>
				<h1>portfolio section</h1>
				{props.children}
			</div>
		</>
	);
}
