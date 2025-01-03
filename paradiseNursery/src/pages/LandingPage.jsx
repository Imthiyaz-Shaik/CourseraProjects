import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="overlay">
        <div className="lp1">
        <h1>Welcome to Paradise Nursery</h1>
        <p>Where Green Meets Serenity</p>
        <button className="get-started-btn" onClick={() => navigate("/products")}>
          Get Started
        </button>
        </div>
        <div className="lp2">

        <div>
        At Paradise Nursery, we are passionate about bringing nature closer to you. Explore a variety of houseplants that not only enhance the beauty of your surroundings but also promote a healthier lifestyle. From vibrant flowering plants to air-purifying greens, we have curated a collection that caters to every space and mood.

Whether you're a seasoned plant parent or just starting your green journey, our selection offers something for everyone. Our plants are handpicked for their quality and nurtured with care to ensure they thrive in your home or workspace.

Transform your living spaces into tranquil oases with our carefully chosen pots and planters that complement every decor style. At Paradise Nursery, we believe in the power of plants to reduce stress, boost creativity, and create a sense of calm in today's busy world.

Let us help you bring life into your spaces and reconnect with nature. With Paradise Nursery, you're not just buying plants – you're embracing a greener, healthier, and more beautiful way of living. Start your journey with us today!
        </div>
       
        </div>
        
      </div>
    </div>
  );
};

export default LandingPage;
