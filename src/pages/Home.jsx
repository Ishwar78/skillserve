import React from "react";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import GuidanceSection from "../components/GuidanceSection";
import Categories from "../components/Categories";
import FeaturedCourses from "../components/FeaturedCourses";
import AboutUs from "../components/AboutUs";
import SuccessStories from "../components/SuccessStories";
import StartToSuccess from "../components/StartToSuccess";
import WhyChooseSkillServe from "../components/WhyChooseSkillServe";
import FloatingSupport from "../components/FloatingSupport";

const Home = () => {
  return (
    <>
      <main>
        <Hero />
        <Partners />
        <SuccessStories />
        <WhyChooseSkillServe />
        <FeaturedCourses />
        <GuidanceSection />
        <Categories />
        <AboutUs />
        <StartToSuccess />
      </main>

      <FloatingSupport />
    </>
  );
};

export default Home;