import React from "react";
import { Star } from "@mui/icons-material";
import StarHalfIcon from '@mui/icons-material/StarHalf';

/**
 * StarRating - A component that displays a number of star icons based on a given rating.
 *
 * @param {number} rating - The number of stars to be displayed.
 *
 * Example usage:
 * <StarRating rating={3.5} />
 * This will render 3.5 stars with one half star.
 */
const StarRating = ({ rating }) => {
  // Determine the number of full stars and half stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  // Create an array to store star icons
  const stars = [];

  // Render full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-star-${i}`} />);
  }

  // Render a half star if applicable
  if (hasHalfStar) {
    stars.push(
        <StarHalfIcon key={"half_star"}  />
    //   <Star key="half-star" style={{ transform: "scale(0.6)" }} />
    );
  }

  return <div>{stars}</div>;
};

export default StarRating;


            // function summery
/*fullStars: This variable calculates the number of full stars
to be displayed by using the Math.floor function on the rating. 
For example, if the rating is 3.5, fullStars will be 3.

hasHalfStar: This variable checks if there is a half star by 
checking if the rating has a decimal value (e.g., 0.5, 1.5, 2.5, etc.). 
If there's a decimal value, it means a half star should be displayed.

stars: This array is used to store the star icons that will be rendered.
It initially starts as an empty array.

Rendering Full Stars: In a loop, the component iterates fullStars times
to render the appropriate number of full stars. For each iteration,
a <Star /> component is added to the stars array. For example,
if fullStars is 3, three full stars will be added to the stars array.

Rendering a Half Star: If hasHalfStar is true, indicating that 
a half star should be displayed, a <StarHalfIcon /> component is
added to the stars array. This represents the half star.

Return: Finally, the component returns a <div> containing all the
star icons stored in the stars array. The result is a visual 
representation of the rating, including full stars and a half
star if applicable. */