import React, { useState } from 'react';

// Default fallback image URL from a reliable source
const DEFAULT_FALLBACK = 'https://placehold.co/600x400/e9ecef/495057?text=Image+Not+Found';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  [key: string]: any; // For other props
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  fallbackSrc = DEFAULT_FALLBACK,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={className} 
      onError={handleError} 
      {...props} 
    />
  );
};

export default ImageWithFallback;