interface twitchdata {
  id: number;
  displayName: string;
  language: string;
  totalFollowers: number;
  totalVideos: number;
  totalVideosYear: number;
  totalViewsMonth: number;
}

class Rating {
  async calculateRating(data: twitchdata) {
    const top_average = 2500000;
    // Calculate the user's rating
    let rating =
      data.totalFollowers * 0.4 +
      data.totalVideos * 0.2 +
      data.totalVideosYear * 0.2 +
      data.totalViewsMonth * 0.2;

    // Round the rating to integer
    rating = Math.round(rating);

    // Get rating in percentage if it's above the top average rating (6 million) set to 100%
    let ratingPercentage = rating > top_average ? 100 : (rating / top_average) * 100;
    ratingPercentage = Math.round(ratingPercentage);

    // Construct json object with rating data
    const ratingData = {
      rating: rating,
      ratingPercentage: ratingPercentage,
    };

    return ratingData;
  }
}

export default Rating;
