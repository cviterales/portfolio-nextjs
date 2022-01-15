import Image from "next/image";

const Img = ({ src, alt, objFit= "contain"}) => {

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
          layout="fill"
          objectFit={objFit}
          placeholder="blur"
          blurDataURL={src}
        />
    </div>
  );
};

export default Img;
