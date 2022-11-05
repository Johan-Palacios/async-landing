const API =
  "https://youtube138.p.rapidapi.com/channel/videos/?id=UC8h9RRhxtAbpE3-J3RQljKQ&filter=videos_latest&hl=es&gl=GT";

const content = null || document.getElementById("content");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "ece35d0a6emsh7d4e79ea27322c9p1ad93djsn4b97c471209e",
    "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
  },
};

async function fetchData(urlAPI) {
  const response = await fetch(urlAPI, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const videos = await fetchData(API);
    let view = `
        ${videos?.contents
          .map(
            (video) => `
            <div class="group relative">

                <a
                href="${
                  "https:\/\/www.youtube.com\/watch?v=" + video.video.videoId
                }">
                <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img 
                class="w-full" 
                src="${video.video.thumbnails[2].url}" alt="${video.video.stats.views}" />
                </div>
                <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.video.title}
                </h3>
                </div>
                </a>
            </div>
        `
          )
          .slice(0, 4)
          .join("")}
        `;
    content.innerHTML = view;
  } catch (error) {
    console.log(error);
  }
})();
