const hideElement = (element) => {
  if (element == null) {
    return;
  } else {
    element.setAttribute("hidden", true);
  }
};

const cleanHomepage = () => {
  const recommendedVideos = document.querySelector("ytd-browse");
  hideElement(recommendedVideos);
};

const removeRecommended = () => {
  const nextUpVideos = document.querySelector("#secondary");
  hideElement(nextUpVideos);
};

const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      cleanHomepage();
      removeRecommended();
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
