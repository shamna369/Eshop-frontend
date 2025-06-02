/* eslint-disable react/prop-types */
import { useState } from "react";
function FeaturedImageGallery({ images }) {
  const [active, setActive] = useState(images?.[0] || "/default.jpg");

  return (
    <div className="grid gap-4">
      <div>
        <img
          loading="lazy"
          className="max-w-full shadow-sm rounded-lg object-cover object-center h-[240px] md:max-w-[200px]"
          src={active}
          alt=""
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {images?.map((el, index) => (
          <div key={index}>
            <img
              loading="lazy"
              onClick={() => setActive(el)}
              src={el || ""}
              className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center shadow-md"
              alt="gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default FeaturedImageGallery;
