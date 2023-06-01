import { ApiClient } from "twitch";

import authProvider from "./auth.js";

const apiClient = new ApiClient({ authProvider });


class User {
  async getAllData(nickname: string) {

    const userData = await apiClient.helix.users.getUserByName(nickname);
    // console.log("User data: ", userData);

    const channelData = userData ? await apiClient.helix.channels.getChannelInfo(userData?.id) : null;
    // console.log("Channel data: ", channelData);

    const followersResult = userData ? await apiClient.helix.users.getFollows({ followedUser: userData.id }) : null;
    // console.log("Followers result: ", followersResult);
    const totalFollowers = followersResult ? followersResult.total : 0;

    const totalVideosPagi = userData ? await apiClient.helix.videos.getVideosByUserPaginated(userData?.id) : null;
    // console.log("Total videos paginated: ", totalVideosPagi);

    const totalVideos = totalVideosPagi ? await totalVideosPagi.getAll() : [];
    const videoAmount = totalVideos.length;
    // console.log("Total videos: ", videoAmount);

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