import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface ArchitecturalImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  aspectRatio?: string;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  blueprintOverlay?: boolean;
  priority?: boolean;
  caption?: string;
}

const ImageWrapper = styled.figure<{ aspectRatio?: string }>`
  position: relative;
  width: 100%;
  margin: 0;
  aspect-ratio: ${props => props.aspectRatio || '16/9'};
  background-color: #f5f5f5;
  overflow: hidden;
`;

const StyledImage = styled.img<{ isLoaded: boolean; objectFit?: string }>`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit || 'cover'};
  opacity: ${props => (props.isLoaded ? 1 : 0)};
  transition: opacity 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
`;

const ImagePlaceholder = styled.div<{ isLoaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.isLoaded ? 0 : 1)};
  transition: opacity 0.3s ease;
`;

const BlueprintOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
  opacity: 0.2;
  z-index: 2;
`;

const ImageCaption = styled.figcaption`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
  text-align: center;
  font-style: italic;
`;

const PlaceholderIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="#aaa">
    <path d="M3 5v14h18V5H3zm16 12H5V7h14v10zm-7-7.5l-3 3.5h6l-3-3.5z" />
  </svg>
);

const ArchitecturalImage: React.FC<ArchitecturalImageProps> = ({
  src,
  alt,
  width,
  height,
  aspectRatio,
  className,
  objectFit = 'cover',
  blueprintOverlay = false,
  priority = false,
  caption,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px 0px',
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    // Optionally set a fallback image on error
    const imgElement = document.getElementById(`img-${src.replace(/\W/g, '')}`) as HTMLImageElement;
    if (imgElement) {
      imgElement.src = 'https://via.placeholder.com/800x600?text=Architectural+Design';
    }
  };

  const imageStyle = {
    width: width || '100%',
    height: height || 'auto',
  };

  return (
    <ImageWrapper aspectRatio={aspectRatio} className={className} ref={imgRef}>
      <ImagePlaceholder isLoaded={isLoaded}>
        <PlaceholderIcon />
      </ImagePlaceholder>
      
      {isInView && (
        <StyledImage
          id={`img-${src.replace(/\W/g, '')}`}
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          isLoaded={isLoaded}
          objectFit={objectFit}
          style={imageStyle}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
      
      {blueprintOverlay && <BlueprintOverlay />}
      
      {caption && <ImageCaption>{caption}</ImageCaption>}
    </ImageWrapper>
  );
};

export default ArchitecturalImage;