import { map } from "lodash";
import React, { useState } from "react";
import Slider from "react-slick";
import { Image, Modal } from "semantic-ui-react";

const settings = {
  className: "carousel-screenshots",
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  swipeToSlider: true,
};

export default function CarrouselScrenshots(props) {
  const { title, screenshots } = props;
  const [showModal, setShowModal] = useState(false);
  const [urlImage, setUrlImage] = useState(null);

  const openImage = (url) => {
    setUrlImage(url);
    setShowModal(true);
  };
  return (
    <>
      <Slider {...settings}>
        {map(screenshots, (screenshots) => (
          <Image
            key={screenshots.id}
            src={screenshots.url}
            alt={screenshots.name}
            onClick={() => openImage(screenshots.url)}
          />
        ))}
      </Slider>
      <Modal open={showModal} onClose={() => setShowModal(false)} size="large">
        <Image src={urlImage} alt={title} />
      </Modal>
    </>
  );
}
