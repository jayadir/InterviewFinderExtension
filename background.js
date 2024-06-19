import fetchlocation from "./api/fetchLocations.js";

chrome.runtime.onInstalled.addListener((details) => {
  fetchlocation();
});
chrome.runtime.onMessage.addListener((data) => {
  switch (data.event) {
    case "onStop":
      handleOnStop();
      break;
    case "onStart":
      handleOnStart(data);
      break;
    default:
      break;
  }
});

const handleOnStop = () => {
  // console.log(data.props);
};
const handleOnStart = (data) => {
  console.log(data.props);
};
