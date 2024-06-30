import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'primeicons/primeicons.css';
import CustomLink from "../../../components/shared/buttons/linkButton";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function CusttomeArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#2563EB" ,borderRadius:'50% '}}
      onClick={onClick}
    />
  );
}


const data = [
  {
    link: '/career',
    img: "https://i.ytimg.com/vi/QQB93QyEHJ0/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLD_qK1wvgqwXI88PWMoeHIbDwX9Uw",
    title: "Top Career Journey Stories of PCS Global",
    description: "Discover inspiring stories from industry experts on how they overcame challenges and achieved success in their careers. This series offers valuable insights and motivation for anyone looking to advance their professional journey.",
    rating: 4.9,
    views: '2k',
    price: 30,
    instructor: "Manasvi Kapoor",
  },
  {
    link: '/motivation',
    img: "https://i.ytimg.com/vi/k2y_PxpoQhc/hqdefault.jpg?sqp=-oaymwExCOADEI4CSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYciBSKEEwDw==&rs=AOn4CLA2uSzSiP9SMnG89fpZ4MzTENST1Q",
    title: "PCS Global Career Motivation",
    description: "Boost your career with powerful motivational content. Learn tips and strategies to stay motivated and overcome obstacles in your professional life, shared by experienced professionals at PCS Global.",
    rating: 4.8,
    views: 900,
    price: 20,
    instructor: "Vardhini Gupta",
  },
  {
    link: '/career-talk',
    img: "https://res.cloudinary.com/dalfbjhy3/image/upload/v1709055446/ykchmzyfl11smra2hh5q.webp",
    title: "Build Career With PCS Global",
    description: "Gain insights on building a successful career with expert advice from PCS Global professionals. This series covers essential skills, industry trends, and personal development tips to help you achieve your career goals.",
    rating: 4.7,
    views: 850,
    price: 15,
    instructor: "Rohan Menon",
  },
  {
    link: '/pcs-born',
    img: "https://res.cloudinary.com/dalfbjhy3/image/upload/v1710003914/vydpzhsbpjwclt7k1sdf.webp",
    title: "How PCS Global Born In India",
    description: "Explore the origins and growth of PCS Global. This series narrates the story of how PCS Global was founded and evolved into a leading company, highlighting key milestones and achievements.",
    rating: 4.6,
    views: 800,
    price: 25,
    instructor: "Anjali Sharma",
  },
  {
    link: '/interview-sql',
    img: "https://res.cloudinary.com/dalfbjhy3/image/upload/v1710013958/v7menfrf6rhyxiswvzhw.webp",
    title: "SQL Basic Interview Questions",
    description: "Prepare for SQL interviews with this comprehensive guide. Learn essential SQL concepts, commonly asked interview questions, and effective strategies to excel in your SQL interviews.",
    rating: 4.5,
    views: 750,
    price: 10,
    instructor: "Raj Patel",
  }
];

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CusttomeArrow />,
    prevArrow: <CusttomeArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          nextArrow: null, // Hide next arrow on medium screens
          prevArrow: null, // Hide prev arrow on medium screens
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0, // Adjusted to start at the first slide on mobile
          dots: true, // Optionally, enable dots navigation for better UX
          nextArrow: null, // Hide next arrow on small screens
          prevArrow: null, // Hide prev arrow on small screens
        }
      }
    ]
  };

  return (
    <div className="slider-container w-[90%] px-2  text-black  lg:px-10">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Popular Courses</h2>

      <Slider {...settings}>
        {data.map((course, index) => (
          <div key={index} className="p-2  text-start">
            <div className="border rounded-lg shadow-md overflow-hidden h-[350px] flex flex-col  items-center">
              <LazyLoadImage
                src={course.img}
                alt={course.title}
                className="w-full h-44 object-cover rounded-lg shadow-md"
                effect="blur"
              />

              {/* rating and view icons and details  */}
              <div className="text-xs px-2 text-gray-600 pt-2 flex gap-[14rem]">
                <div className="flex items-center gap-2">
                  <i className="pi pi-star"></i> {course.rating}
                </div>
                <div className="flex items-center gap-2">
                  {course.views}
                  <i className="pi pi-eye"></i>
                </div>
              </div>

              <div className="p-4 h-[200px] overflow-hidden flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 leading-tight ">{course.title}</h3>
                  <p className="text-sm mb-1 line-clamp-2">{course.description}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <i className="pi pi-user text-xl text-gray-500 border-2 text-[0.9rem] border-gray-400 rounded-full p-1"></i>
                  <span className="text-sm text-gray-700">{course.instructor}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="py-10">
        <CustomLink to="/dashboard">
          Explore More Courses
        </CustomLink>
      </div>

    </div>
  );
}

export default Carousel;
