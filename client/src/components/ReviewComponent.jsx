import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"
import {getReviews} from "../utils/ApiCalls";

const Marquee = ({
  children,
  direction = "left",
  speed = 50,
   
}) => {
  const [contentWidth, setContentWidth] = useState(0)
  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.scrollWidth)
    }
  }, [children])

  return (
    <div
      className={`overflow-hidden relative`}>
      <div
        className={`flex min-w-full gap-4 dark:text-white`}
        style={{
          transform: `translateX(${direction === "left" ? "-" : ""}4px)`,
          animation: `scroll-${direction} ${contentWidth /
            speed}s linear infinite`
        }}
      >
        <div ref={contentRef} className="flex gap-4 shrink-0">
          {children}
        </div>
        <div className="flex gap-4 shrink-0">{children}</div>
      </div>

      <style>
        {`
          @keyframes scroll-left {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
        `}
      </style>
    </div>
  )
}

const ReviewCard = ({ avatar, name, rating, review }) => (
  <div className="w-96 h-[250px] p-5 bg-card rounded-lg border border-border shadow-lg dark:bg-gray-800">
    <div className="flex items-center gap-3 mb-3">
      <img
        src={avatar}
        alt={name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="p-5">
        <h3 className="font-bold text-2xl leading-6 tracking-widest">{name}</h3>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
    <p className=" text-xl font-medium leading-6 tracking-widest">{review}</p>
  </div>
)


export default function ReviewComponent() {
  
  const [reviews, setReviews] = useState([]);

  async function getAllReviews() {
    const response = await getReviews("admin");
    setReviews(response.data.reviews.reviews);
  }
    useEffect(() => {
      getAllReviews();
    }, []);

  return (
    <div className=" bg-background p-2 flex flex-col gap-8 items-center justify-center">
      <div className=" w-3/4 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-center text-foreground mb-6 dark:text-white">
            What Our Customers Say
          </h2>
          <Marquee className='py-4 dark:text-white'>
            {reviews.map((review,index) => (
              <ReviewCard
                key={index}
                // avatar={`https://avatar.iran.liara.run/username?username=${review.name}`}
                avatar={`https://avatar.iran.liara.run/public/${index+1}`}
                name={review.reviewername}
                rating={review.rating}
                review={review.review}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  )
}
