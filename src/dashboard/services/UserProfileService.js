import { Cache } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { UserProfile } from '../../models';
import Auth from '@aws-amplify/auth';

const UserProfileService = {
  getCurrentUserProfile: async () => {
    let userProfile = null;
    try {
      const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();
      if (!!currentAuthenticatedUser) {
        userProfile = await Cache.getItem(`/userprofile/${currentAuthenticatedUser.username}`);
        if (!userProfile) {
          userProfile = await UserProfileService.loadUserProfile(currentAuthenticatedUser.username);
        }
      }
    } catch (e) {
      console.error(e);
    }
    return userProfile;
  },
  getUserProfile: async (username) => {
    let userProfile = null;
    try {
      userProfile = await Cache.getItem(`/userprofile/${username}`);
      if (!userProfile) {
        userProfile = await UserProfileService.loadUserProfile(username);
      }
    } catch (e) {
      console.error(e);
    }
    return userProfile;
  },
  loadUserProfile: async (username) => {
    let loadedUserProfile = null;
    try {
      const userProfiles = await DataStore.query(UserProfile, (u) => u.username('eq', username));
      if (userProfiles.length > 0) {
        loadedUserProfile = userProfiles[0];
        Cache.setItem(`/userprofile/${username}`, loadedUserProfile);
      }
    } catch (e) {
      console.error(e);
    }
    return loadedUserProfile;
  },
  saveUserProfile: async (id, newUserProfile) => {
    const { username, preferredName, avatar, avatarOriginalUrl, isComplete } = newUserProfile;
    try {
      let savedUserProfile = null;
      if (!id) {
        savedUserProfile = await DataStore.save(new UserProfile({ username, preferredName, avatar, avatarOriginalUrl, isComplete }));
      } else {
        const original = await DataStore.query(UserProfile, id);

        if (!original) {
          throw Error(`Could not find UserProfile with ${id} to update`);
        }

        savedUserProfile = await DataStore.save(
          UserProfile.copyOf(original, (updated) => {
            updated.preferredName = preferredName;
            updated.avatar = avatar;
            updated.avatarOriginalUrl = avatarOriginalUrl;
            updated.isComplete = true;
          })
        );
      }
      Cache.setItem(`/userprofile/${username}`, savedUserProfile);
      return savedUserProfile;
    } catch (e) {
      Cache.removeItem(`/userprofile/${username}`);
      return null;
    }
  },
};

export default UserProfileService;
