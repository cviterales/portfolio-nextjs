import Image from "next/Image";

const Img = ({ src, alt }) => {

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
          objectFit="cover"
          placeholder="blur"
          blurDataURL={src}
        />
    </div>
  );
};

export default Img;
