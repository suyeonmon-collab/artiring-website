export default function CatVideo({ src, alt, className = '' }) {
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label={alt}
      className={className}
    />
  );
}
