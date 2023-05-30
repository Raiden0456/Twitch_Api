import { ApiClient } from "twitch";
import authProvider from "./auth.js";
const apiClient = new ApiClient({ authProvider });

class User {
  async getAllData(Nickname: string) {
    // Get the user's data
    const userData = await apiClient.helix.users.getUserByName(Nickname);
    // console.log("User data: ", userData);

    // Get the user's channel data
    const channelData = userData ? await apiClient.helix.channels.getChannelInfo(userData?.id) : null;
    // console.log("Channel data: ", channelData);

    // Get the user's total followers
    const totalFollowers = 100000;
    // const totalFollowers = userData ? await apiClient.helix.subscriptions.getSubscriptions(userData?.id) : null;
    // console.log("Total followers: ", totalFollowers);

    // Get the user's videos paginated
    const totalVideosPagi = userData ? await apiClient.helix.videos.getVideosByUserPaginated(userData?.id) : null;
    // console.log("Total videos paginated: ", totalVideosPagi);

    // Calculate the user's total videos 
    const totalVideos = totalVideosPagi ? await totalVideosPagi.getAll() : [];
    const videoAmount = totalVideos.length;
    // console.log("Total videos: ", videoAmount);

    // Get the user's total amount of videos duing the last year
    const videoAmountYear = totalVideos ? totalVideos.filter((video) => {
      const videoDate = new Date(video.creationDate);
      const currentDate = new Date();
      const yearAgo = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
      return videoDate > yearAgo;
    }).length : 0;
    // console.log("Total videos during the last year: ", videoAmountYear);
    
    // Construct json object with all the data
    const data = {
      id: userData?.id,
      displayName: userData?.displayName,
      language: channelData?.language,
      createdAt: userData?.creationDate,
      totalViews: userData?.views,
      totalFollowers: totalFollowers,
      totalVideos: videoAmount,
      totalVideosYear: videoAmountYear,
    };
    
    return data;
  }
}

export default User;