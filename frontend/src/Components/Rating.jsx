import React from "react";
import { StarFill, StarHalf, Star } from "react-bootstrap-icons";

const value = ({ value, text }) => {

  return (
   <div className = "rating--stars">
       <div className = "d-flex">
        <p>
            {
                value >= 1 ? <StarFill fill = "#ffcd3c"/> : value >= 0.5 ? <StarHalf fill = "#ffcd3c" /> : <Star fill = "#ffcd3c"/>
            }
            </p>
            <p>
                {
                    value >= 2 ? <StarFill fill = "#ffcd3c"/> : value >= 1.5 ? <StarHalf fill = "#ffcd3c" /> : <Star fill = "#ffcd3c"/>
                }
            </p>
            <p>
                {
                    value >= 3 ? <StarFill fill = "#ffcd3c"/> : value >= 2.5 ? <StarHalf fill = "#ffcd3c" /> : <Star fill = "#ffcd3c"/>
                }
            </p>
            <p>
                {
                    value >= 4 ? <StarFill fill = "#ffcd3c"/> : value >= 3.5 ? <StarHalf fill = "#ffcd3c" /> : <Star fill = "#ffcd3c"/>
                }
            </p>
            <p>
                {
                    value >= 5 ? <StarFill fill = "#ffcd3c"/> : value >= 4.5 ? <StarHalf fill = "#ffcd3c" /> : <Star fill = "#ffcd3c"/>
                }
            </p>
        </div>
        <div>
            <p>{text && text}</p>
        </div>
   </div>
  )
}

export default value;