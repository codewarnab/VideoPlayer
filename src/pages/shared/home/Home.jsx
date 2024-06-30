import React, { Suspense } from "react";
import HeroSection from "./Hero";

const Carousel = React.lazy(() => import("./Carousel"));
const Stats = React.lazy(() => import("./Stats"));
const FAQ = React.lazy(() => import("./faq/FAQ"));
const ExploreCategories = React.lazy(() => import("./Categories"));

const components = [
  { Component: ExploreCategories, key: "explore-categories" },
  { Component: Carousel, key: "carousel" },
  { Component: Stats, key: "stats" },
  { Component: FAQ, key: "faq" },
];

const Home = () => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <HeroSection />
        {components.map(({ Component, key }) => (
          <div key={key} className="py-20 w-full flex justify-center bg-white h-auto">
            <Suspense fallback={<div>Loading...</div>}>
              <Component />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
