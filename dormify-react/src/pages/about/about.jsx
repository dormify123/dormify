import React from "react";
import "../about/about.css";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-mission">
        Our mission is to enhance the experience of our users by providing a
        streamlined, efficient service that caters to their daily needs. We aim
        to simplify and enrich the lives of our community through innovative
        solutions.
      </p>
      <p className="about-developers">
        Dormify was developed by Angela Sobhieh, Ezzedine Al Ozone, Reem El
        Hadka, and Steven Oueiss.
      </p>
    </div>
  );
};

export default About;
