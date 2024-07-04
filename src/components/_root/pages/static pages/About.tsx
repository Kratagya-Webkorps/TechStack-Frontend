import React from "react";

const About = () => {
  return (
    <div id="about" className="relative bg-white overflow-hidden mt-16">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-1/2 lg:pb-28 xl:pb-32">
          <div className="pt-1"></div>
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center lg:text-left">
              <h2 className="my-6 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                About me
              </h2>
              <p className="text-lg text-gray-600 text-justify">
                Welcome to my self-made e-commerce website, a dynamic platform
                built with the MERN stack—MongoDB, Express.js, React, and
                Node.js. This project reflects my passion for full-stack
                development, combining a robust backend with an intuitive
                frontend. With MongoDB for data storage, Express.js and Node.js
                for server-side logic, and React for a responsive user
                interface, this site offers a seamless shopping experience.
                Whether you're browsing products, making purchases, or managing
                orders, every feature is designed for ease of use. Explore and
                enjoy the fruits of modern web technology, meticulously crafted
                to meet your needs.
              </p>
            </div>
          </main>
        </div>
        <div className="lg:w-1/2 lg:relative">
          <img
            className="hidden lg:block"
            src="https://images.pexels.com/photos/1549004/pexels-photo-1549004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="E-commerce"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
