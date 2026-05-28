import React, { useMemo } from "react";
import { motion } from "framer-motion";
import DomeGallery from "./DomeGallery";

/**
 * PhotoGallery — wraps DomeGallery with a section header.
 * Accepts the `images` array from DataContext (objects with { src, alt }).
 */
const PhotoGallery = ({ images }) => {
  // Normalise to the shape DomeGallery expects: { src, alt }
  const galleryImages = useMemo(() => {
    if (!images || images.length === 0) return [];
    return images.map((img) =>
      typeof img === "string" ? { src: img, alt: "" } : { src: img.src, alt: img.alt || "" }
    );
  }, [images]);

  if (galleryImages.length === 0) return null;

  return (
    <section className="pt-20  relative overflow-hidden">
      {/* subtle bg blobs */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <div className="absolute top-0 left-1/3 w-96 h-30 bg-cyan-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-50 bg-purple-600 rounded-full blur-[120px]" />
      </div>

      {/* section header */}
      <motion.div
        className="relative z-10 text-center mb-10 px-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 rounded-full backdrop-blur-sm mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Community Moments
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Our{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Gallery
          </span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Drag to explore — click any photo to enlarge it
        </p>
      </motion.div>

      {/* DomeGallery canvas — needs an explicit height */}
      <div className="relative z-10 w-full " style={{ height: "500px" }}>
        <DomeGallery
          images={galleryImages}
          overlayBlurColor="#080E20"
          grayscale={false}
          fit={0.55}
          minRadius={500}
          dragSensitivity={20}
          dragDampening={2}
          imageBorderRadius="16px"
          openedImageBorderRadius="20px"
          openedImageWidth="420px"
          openedImageHeight="420px"
          autoRotate={true}
        
        />
      </div>

     
    </section>
  );
};

export default PhotoGallery;
