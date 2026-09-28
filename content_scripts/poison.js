let recommendedVideos;
let nextUpVideos;

//nextUpVideos = document.querySelector(".style-scope ytd-watch-next-secondary-results-renderer");

const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      recommendedVideos = document.querySelector("ytd-browse");
      if (recommendedVideos == null) {
        return;
      } else {
        recommendedVideos.setAttribute("hidden", true);
      }
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
