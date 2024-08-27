import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { topMeal } from './TopMeal';
import { CarouselItem } from './CarouselItem';

export const MultiItemCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
  };

  return (
    <Slider {...settings}>
      {topMeal.map((item) =>
        <CarouselItem image={item.image} title={item.title} />)}
    </Slider>
  )
}
