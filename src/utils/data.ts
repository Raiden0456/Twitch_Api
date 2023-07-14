import { ApiClient } from "twitch";

import authProvider from "./auth.js";

const apiClient = new ApiClient({ authProvider });

class User {
  async getAllData(nickname: string) {

    let userData;
    if (nickname.toLowerCase() === "mine") {
      console.log("Getting your data");
      userData = await apiClient.helix.users.getMe();
    } else {
      userData = await apiClient.helix.users.getUserByName(nickname);
    }

    const channelData = userData
      ? await apiClient.helix.channels.getChannelInfo(userData?.id)
      : null;

    const followersResult = userData
      ? await apiClient.helix.users.getFollows({ followedUser: userData.id })
      : null;
    const totalFollowers = followersResult ? followersResult.total : 0;

    const totalVideosPagi = userData
      ? await apiClient.helix.videos.getVideosByUserPaginated(userData?.id)
      : null;

    const totalVideos = totalVideosPagi ? await totalVideosPagi.getAll() : [];
    const videoAmount = totalVideos.length;

    const videoAmountYear = totalVideos
      ? totalVideos.filter((video) => {
          const videoDate = new Date(video.creationDate);
          const currentDate = new Date();
          const yearAgo = new Date(
            currentDate.setFullYear(currentDate.getFullYear() - 1)
          );
          return videoDate > yearAgo;
        }).length
      : 0;

    // Get the amount of views during the last month
    const totalViewsMonth = totalVideos
      ? totalVideos
          .filter((video) => {
            const videoDate = new Date(video.creationDate);
            const currentDate = new Date();
            const monthAgo = new Date(
              currentDate.setMonth(currentDate.getMonth() - 1)
            );
            return videoDate > monthAgo;
          })
          .reduce((acc, video) => {
            return acc + video.views;
          }, 0)
      : 0;


    // Construct json object with all the data
    const data = {
      id: userData?.id,
      displayName: userData?.displayName,
      language: channelData?.language,
      totalFollowers: totalFollowers,
      totalVideos: videoAmount,
      totalVideosYear: videoAmountYear,
      totalViewsMonth: totalViewsMonth,
    };

    return data;
  }
}

export default User;
