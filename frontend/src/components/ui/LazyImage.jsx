import React, { useState, useRef, useEffect, memo } from 'react';

/**
 * LazyImage — intersection-observer based lazy loader.
 * Applies className directly to the <img> so callers can control
 * object-fit, scale transitions, etc. without a wrapper div interfering.
 */
const LazyImage = memo(({
  src,
  alt,
  className = '',
  onError,
  width,
  height,
  ...props
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    // Start loading slightly before it enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleError = (e) => {
    onError?.(e);
  };

  return (
    <>
      {/* Tiny sentinel — stays in DOM only until img is in view */}
      {!isInView && (
        <span
          ref={imgRef}
          aria-hidden="true"
          className={`block bg-slate-700/60 animate-pulse ${className}`}
          style={{ width: width || '100%', height: height || '100%' }}
        />
      )}

      {isInView && (
        <img
          ref={!isLoaded ? undefined : imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          {...props}
        />
      )}
    </>
  );
});

export default LazyImage;
