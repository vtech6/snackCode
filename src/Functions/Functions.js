import * as Haptics from "expo-haptics";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
export function triggerHaptics(type) {
  if (type == undefined) {
    Haptics.impactAsync();
  }
}
export const checkNotificationPermissions = async () => {
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    if (existingStatus == "granted") {
      return true;
    }
  }
  return false;
};
