import useProgressiveImg from "../../../hook/useProgressiveImg";
import Image from "next/Image";

const Img = ({ src, alt }) => {
  const [srcImg, { blur }] = useProgressiveImg(src, src);

  return (
    <div
      style={{
        filter: blur ? "blur(20px)" : "none",
        transition: blur ? "none" : "filter 0.3s ease-out",
        width: "100%",
        height: "100%",
        objectFit: "contain",
        position: "relative",
      }}
    >
      {blur ? (
        <img
          src={srcImg}
          alt=""
          style={{
            filter: blur ? "blur(20px)" : "none",
            transition: blur ? "none" : "filter 0.3s ease-out",
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      ) : (
        <Image
          src={srcImg}
          alt={alt}
          layout={"fill"}
          objectFit={"cover"}
        />
      )}
    </div>
  );
};

export default Img;
