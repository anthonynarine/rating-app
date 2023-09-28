import React from 'react';
import StarIcon from '@mui/icons-material/Star';

/**
 * StarRating - A component that displays a number of star icons based on a given rating.
 *
 * @param {number} rating - The number of stars to be displayed.
 *
 * Example usage:
 * <StarRating rating={3} />
 * This will render 3 star icons.
 */
const StarRating = ({ rating }) => {
    // Create an array with a length equivalent to the rating value.
    // Each item of the array is filled with a `null` placeholder.
    // For instance, if rating is 3, stars will be [null, null, null].
    const stars = new Array(rating).fill(null);

    // A function to render a single star icon for each placeholder in the stars array.
    const renderStar = (_, index) => <StarIcon key={index} />;

    return (
        <div>
            {/* 
               Map over the stars array to transform each placeholder into a StarIcon.
               For a rating of 3, this will render 3 StarIcon components.
            */}
            {stars.map(renderStar)}
        </div>
    );
};

export default StarRating;


            // function summery
/*The line const stars = new Array(rating).fill(null);
 is a way to create an array of a certain length
(in this case, the length is rating) and fill each 
of its items with a specific value (null in this instance).

Here's a step-by-step breakdown:
new Array(rating):
This creates a new array with a length of rating.
If rating is 5, this creates an array of length 5.
However, this array doesn't have any values in it yet—it's sparse. 
That is, if you try to .map() over this array immediately after creating it, 
nothing will happen because there aren't any defined values in the array.

.fill(null):
To make the array usable (e.g., to be able to .map() over it), 
we need to fill it with some values. The .fill() method fills 
every index in the array with the value provided as an argument. 
In our case, we're filling each index with the value null. 
The choice of null is arbitrary here; it could be any other value. 
The important thing is that we're giving the array defined values 
so that we can then iterate over it.

So, after executing const stars = new Array(rating).fill(null);,
the variable stars holds an array with rating number of items, all 
of which are null.

For example:

If rating is 3, then stars will be [null, null, null].
If rating is 5, then stars will be [null, null, null, null, null].
The reason for this construction is to easily create an array of a 
specific length (determined by the rating) and then use that array
to generate the corresponding number of star icons. */