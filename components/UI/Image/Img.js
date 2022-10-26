import Image from "next/image";

const Img = ({ src, alt, priority=false, objFit="contain"}) => {

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 70vw,
          (max-width: 1200px) 50vw,
          33vw"
          style={{objectFit: objFit}}
        />
    </div>
  );
};

export default Img;
