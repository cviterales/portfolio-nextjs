import useProgressiveImg from '../../../hook/useProgressiveImg';

const Image = ({ src, alt }) => {
  const [srcImg, { blur }] = useProgressiveImg(src, src);

  return (
    <>
      <img
        src={srcImg}
        alt={alt}
        style={{
          filter: blur ? "blur(20px)" : "none",
          transition: blur ? "none" : "filter 0.3s ease-out",
          width: "100%",
          height: "auto",
          objectFit: "contain",
        }}
      />
    </>
  );
};

export default Image;