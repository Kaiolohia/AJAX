async function getGif(term) {
  const payload = { api_key: "PPTJfgGAkO3r5ArIBLqtM9PQxUdC0pTL", tag: term };
  const img = await axios.get("http://api.giphy.com/v1/gifs/random", {
    params: payload,
  });
  createGif(img.data.data.images.downsized_medium.url)
}
$("form").on("submit", (e) => {
  e.preventDefault();
  const tag = $("#tag").val();
  getGif(tag)
});
function createGif(url) {
    const container = $('#container')
    const img = document.createElement('img')
    img.src = url
    container.append(img)
}

$('#erase').on('click', () => $('#container').empty())