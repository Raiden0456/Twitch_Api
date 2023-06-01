interface twitchdata {
  id: number,
  displayName: string,
  language: string,
  createdAt: Date,
  totalFollowers: number,
  totalVideos: number,
  totalVideosYear: number,
}

class Rating {
  async calculateRating(data: twitchdata) {
    // The odler the account is, the higher the rating
    const accountAge = data.createdAt ? (new Date().getFullYear() - data.createdAt.getFullYear()) * 365 : 0;

    // Console log all the data for debugging
    // console.log("Account age: ", accountAge);
    // console.log("Total followers: ", data.totalFollowers);
    // console.log("Total views: ", data.totalViews);
    // console.log("Total videos: ", data.totalVideos);
    // console.log("Total videos during the last year: ", data.totalVideosYear);


    // Calculate the user's rating
    const rating = data.totalFollowers * 0.25 + accountAge * 0.2 + data.totalVideos * 0.15 + data.totalVideosYear * 0.15;

    // Construct json object with rating data
    const ratingData = {
      rating: rating
    };

    return ratingData;
  }
}

export default Rating;