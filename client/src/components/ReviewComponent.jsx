import React, { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";

function ReviewComponent() {
  const [reviews, setReview] = useState([]);
  useEffect(() => {
    const url = "../src/data/reviewdata.json";
    fetch(url).then((res) => {
      res.json().then((data) => {
        setReview(data.reviews);
      });
    });
  }, []);
  return (
    <div className=" px-20 m-8 flex">
      {reviews.map((review, index) => (
        <div key={index} className="p-5 w-80"><TestimonialCard key={index} testimonial={review} /></div>
        
      ))}
    </div>
  );
}

export default ReviewComponent;
