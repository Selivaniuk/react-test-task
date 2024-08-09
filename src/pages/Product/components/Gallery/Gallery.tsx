import { Product } from "types/product";
import styles from "./Gallery.module.scss";
import { FC, useEffect, useState } from "react";
import useProductColor from "pages/Product/provider/useProductColor";

interface Props {
  colors: Product["colors"];
}
const Gallery: FC<Props> = ({ colors }) => {
  const { selectedColorID } = useProductColor();
  const [imageIndex, setImageIndex] = useState(0);

  const currentColor = colors.find((c) => c.id === selectedColorID);

  useEffect(() => {
    return () => setImageIndex(0);
  }, [currentColor]);

  if (!currentColor) {
    return null;
  }

  const images = currentColor.images;
  if (images.length === 0) {
    return <p>no_picture.png</p>;
  }

  const onSlide = (side: 1 | -1) => {
    let nextIndex = imageIndex + side;
    if (nextIndex > images.length - 1) nextIndex = 0;
    else if (nextIndex < 0) nextIndex = images.length - 1;
    setImageIndex(nextIndex);
  };

  return (
    <div className={styles.container}>
      <img src={images[imageIndex]} alt={currentColor.name} />
      {images.length > 1 && (
        <div className={styles.controls}>
          <button onClick={() => onSlide(1)} className={styles.controlBtn}>
            ←
          </button>
          <button onClick={() => onSlide(-1)} className={styles.controlBtn}>
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
