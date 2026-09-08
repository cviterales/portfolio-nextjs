import Image from "next/image";

const Img = ({
  src,
  alt,
  priority = false,
  objFit = "contain",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px",
}) => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        fill
        priority={priority}
        style={{ objectFit: objFit }}
      />
    </div>
  );
};

export default Img;
