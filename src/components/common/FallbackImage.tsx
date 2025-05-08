'use client'

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface FallbackImageProps extends ImageProps {
  fallbackSrc: string;
  title?: string;
}

const FallbackImage = ({ 
  src, 
  alt, 
  fallbackSrc, 
  title,
  width,
  height,
  ...rest 
}: FallbackImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  return (
    <>
      <Image
        {...rest}
        src={error ? fallbackSrc : imgSrc}
        alt={alt}
        title={title || alt} // Add title attribute for better SEO
        width={width} // Explicitly include width
        height={height} // Explicitly include height
        onError={() => {
          setImgSrc(fallbackSrc);
          setError(true);
        }}
        loading="lazy" // Lazy load images not in the viewport
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizing
      />
      {/* Hidden paragraph with keyword-rich description for screen readers and SEO */}
      <p className="sr-only">{alt}</p>
    </>
  );
};

export default FallbackImage;