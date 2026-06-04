import React, { useState, useRef, useEffect } from 'react';

const defaultPlaceholder = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='400'%20height='200'%3E%3Crect%20width='400'%20height='200'%20fill='%231e293b'/%3E%3Ctext%20x='50%25'%20y='50%25'%20dominant-baseline='middle'%20text-anchor='middle'%20fill='%2360a5fa'%20font-family='Arial,sans-serif'%20font-size='24'%3ELoading...%3C/text%3E%3C/svg%3E";

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = defaultPlaceholder,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} {...props}>
      {/* Placeholder */}
      {!isLoaded && (
        <img
          src={placeholder}
          alt="Loading..."
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
      
      {/* Actual Image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${!isLoaded ? 'absolute inset-0' : ''}`}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            e.target.src = placeholder;
            setIsLoaded(true);
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;