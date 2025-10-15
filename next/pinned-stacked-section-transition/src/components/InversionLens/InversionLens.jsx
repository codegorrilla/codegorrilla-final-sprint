'use client';

import './InversionLens.scss';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders';

const InversionLens = ({ src, className }) => {
	const containerRef = useRef(null);

	return (
		<div
			ref={containerRef}
			className={`inversion-lens ${className || ''}`}
		>
			<Image
				src={src}
				alt=''
				style={{ display: 'none' }}
				fill
			/>
		</div>
	);
};

export default InversionLens;
