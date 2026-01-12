import { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type ImageGalleryProps = {
    images: string[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
    const [visibleSlides, setVisibleSlides] = useState(4);
    
    return (
        <div className="mt-10 relative">
            {images.length > visibleSlides && (
        <>
          <button className="custom-prev nav-btn left-[-25px]">‹</button>
          <button className="custom-next nav-btn right-[-25px]">›</button>
        </>
      )}
            <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={4}
        navigation={
          images.length > visibleSlides
            ? { prevEl: ".custom-prev", nextEl: ".custom-next" }
            : false
        }
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        onInit={(swiper) => {
          setVisibleSlides(Number(swiper.params.slidesPerView));
        }}
        onResize={(swiper) => {
          setVisibleSlides(Number(swiper.params.slidesPerView));
        }}
        className="pb-10"
      >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="rounded-2xl overflow-hidden shadow-md">
                            <img
                                src={img}
                                alt={`Gallery ${index}`}
                                className="w-full h-[220px] object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}