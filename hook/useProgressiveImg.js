import { useEffect, useState } from "react";

const useProgressiveImg = (lowQualitySrc, highQualitySrc) => {
  const [src, setSrc] = useState(lowQualitySrc);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setSrc(lowQualitySrc);
    const img = new Image();
    img.src = highQualitySrc;
    img.onload = () => {
      setLoad(true)
      setSrc(highQualitySrc);
    };
  }, [lowQualitySrc, highQualitySrc]);

  //return [src, { blur: src === lowQualitySrc  }];
  return [src, { blur: !load  }];
};
export default useProgressiveImg;
