/**
 * Helper function that hides elements passed to it
 * @param {element} element DOM element
 * @returns
 */
const hideElement = (element) => {
  if (element == null) {
    return;
  } else {
    element.style.setProperty("display", "none", "important");
  }
};

/**
 * Removes video from the home page
 */
const cleanHomepage = () => {
  const recommendedVideos = document.querySelector("ytd-browse");
  hideElement(recommendedVideos);
};

/**
 * Removes recommended videos alongside current video
 */
const removeRecommended = () => {
  const recommended = document.querySelectorAll("#secondary, #related");
  recommended.forEach((section) => {
    hideElement(section);
  });
};

/**
 * Removes 'Shorts' button from the side bar
 */
const removeShortsButton = () => {
  const shortsButton = document.querySelector('[title="Shorts"]');
  hideElement(shortsButton);
};

/**
 * Removes shorts player to prevent user from going to shorts via URL
 */
const removeShorts = () => {
  const shortsPlayer = document.querySelector("#shorts-container");
  hideElement(shortsPlayer);
};

/**
 * Hides comments below video player
 */
const hideComments = () => {
  const commentContainer = document.querySelector("#comments");
  hideElement(commentContainer);
};

// HTML5 video element
const video = document.querySelector(".html5-main-video");
// State that indicates first play or not. Always true at start
let isFirstPlay = true;

video.onplay = (event) => {
  videoURL = window.location.href;
  if (isFirstPlay == true) {
    alert("You are supposed to be working!");
    // no longer the first play, thus change state
    isFirstPlay = false;
  }
};

// if user navigates to another video, first play is reset
window.addEventListener("yt-navigate-start", (event) => {
  isFirstPlay = true;
});

const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach((node) => {
        // filter to only HTML element nodes
        if (node.nodeType === 1) {
          if (node.matches("ytd-browse")) {
            cleanHomepage();
          }
          if (node.matches("#secondary") || node.matches("#related")) {
            removeRecommended();
          }
          if (node.matches('[title="Shorts"]')) {
            removeShortsButton();
          }
          if (node.matches("#shorts-container")) {
            removeShorts();
          }
          if (node.matches("#columns")) {
            hideComments();
          }
        }
      });
    }
  }
};

const observer = new MutationObserver(callback);

const config = {
  attributes: true,
  childList: true,
  subtree: true
};

observer.observe(document.body, config);
