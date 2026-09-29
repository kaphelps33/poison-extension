const hideElement = (element) => {
  if (element == null) {
    return;
  } else {
    element.style.setProperty("display", "none", "important");
  }
};

const cleanHomepage = () => {
  const recommendedVideos = document.querySelector("ytd-browse");
  hideElement(recommendedVideos);
};

const removeRecommended = () => {
  const recommended = document.querySelectorAll("#secondary, #related");
  recommended.forEach((section) => {
    hideElement(section);
  });
};

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

const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      cleanHomepage();
      removeRecommended();
      removeShortsButton();
      removeShorts();
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
