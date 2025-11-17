"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
  fill?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className = "",
  fallbackSrc = "https://via.placeholder.com/400x300?text=Image",
  priority = false,
  fill = false,
  objectFit = "cover",
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  if (fill) {
    return (
      <div className={`relative ${className}`}>
        <img
          src={imgSrc}
          alt={alt}
          className={`object-${objectFit} w-full h-full`}
          onError={handleError}
        />
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width || 400}
      height={height || 300}
      className={className}
      onError={handleError}
    />
  );
}

