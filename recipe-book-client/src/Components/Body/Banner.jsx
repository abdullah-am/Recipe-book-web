import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  { src: 'https://i.ibb.co/cKGMnd8t/image-8.jpg'},
  { src: 'https://i.ibb.co/gbCbdrXf/b1.jpg'},
  { src: 'https://i.ibb.co/0jtVHVc5/b2.jpg'},
  { src: 'https://i.ibb.co/3yLJvt5s/b3.jpg'},
];

const Banner = () => {
  return (
    <div className="bg-white py-4">
      <div className="container mx-auto px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="w-full h-[400px]"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center">
                <img
                  src={slide.src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[350px] object-cover rounded-lg"
                />
                <p className="text-gray-600 text-sm mt-2">{slide.caption}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;