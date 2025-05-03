import React, { useState } from 'react';
import styled from 'styled-components';
import { HOUSE_PLAN_IMAGES } from '../../constants/images';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc = HOUSE_PLAN_IMAGES.FALLBACK,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  
  const onError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };
  
  return <StyledImage src={imgSrc} alt={alt} onError={onError} {...props} />;
};

export default ImageWithFallback;