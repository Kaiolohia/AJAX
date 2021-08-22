/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // DONE: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  const showDataArr = [];
  const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
  for (let show of res.data) {
    const {
      id,
      name,
      summary,
      image: { medium: image },
    } = show.show;
    showDataArr.push({ id, name, summary, image });
  }
  return showDataArr;
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <img class="card-img-top" src="${
               show.image
                 ? show.image
                 : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1200px-No_image_3x4.svg.png"
             }"
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button class="btn btn-outline-info episode-list">Episode list</button>
           </div>
         </div>
       </div>
      `
    );

    $showsList.append($item);
  }
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});

function populateEpisodes(episodes) {
  const $episodesList = $("#episodes-list")
  $episodesList.empty()
  for(let episode of episodes) {
    let $item = $(
      `<li class="list-group-item">${episode.name} (Season: ${episode.season} | Episode: ${episode.number})</li>`
      )
    $episodesList.append($item)
  }
  $("#episodes-area").show()
}

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
  const showDataArr = [];
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  for (let episode of res.data) {
    const { id, name, season, number } = episode;
    showDataArr.push({ id, name, season, number });
  }
  return showDataArr;
  // TODO: return array-of-episode-info, as described in docstring above
}


$("#shows-list").on('click', '.episode-list', async (e) => {
  const episodes = await getEpisodes($(e.target).closest('.Show').data('show-id'))
  populateEpisodes(episodes)
})