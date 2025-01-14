/* eslint-disable */
export async function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve([position.coords.longitude, position.coords.latitude]);
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

export async function getCurrentPositionWithRetry() {
  let currentPosition = null;
  while (!currentPosition) {
    try {
      currentPosition = await getLocation();
    } catch (error) {
      console.error("Error getting current location:", error);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  return currentPosition;
}
