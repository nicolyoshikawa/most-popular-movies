/**
 * Design decisions I chose to make:
 * - throw an error if the starting ID is invalid (null, does not exist)
 * - throw an  error if the network is invalid (null, empty)
 * - throw an error if an ID in the friends list is invalid
 * @param {*} network - an array of user objects
 * @param {*} startId - id of current user
 * @returns
 */
const mostPopularMovie = function (network, startId) {
  if (startId === null) {
    throw new Error("invalid id");
  }
  if (network === null || network.length === 0) {
    throw new Error("invalid network");
  }

  const visited = new Set();
  const queue = [startId];
  const result = [];
  let movieCountObj = {};
  let highestMovieCount = 0;
  let mostPopularMovieTitle = "";
  visited.add(startId);

  while (queue.length > 0) {
    const currentFriendId = queue.shift();
    result.push(currentFriendId);
    const friendObj = network.find((el) => el.id === currentFriendId);
    if (!friendObj) {
      throw new Error("invalid id");
    }

    for (const friendId of friendObj.friends) {
      if (!visited.has(friendId)) {
        visited.add(friendId);
        queue.push(friendId);
      }
    }

    for (const movie of friendObj.movies) {
      let count = movieCountObj[movie] ?? 0;
      movieCountObj[movie] = count + 1;
    }
  }
  for (const movieTitle in movieCountObj) {
    let currentCount = movieCountObj[movieTitle];
    if (currentCount > highestMovieCount) {
      highestMovieCount = currentCount;
      mostPopularMovieTitle = movieTitle;
    } else if (
      currentCount === highestMovieCount &&
      mostPopularMovieTitle.toLowerCase() > movieTitle.toLowerCase()
    ) {
      // if there is a tie, use the movie title that comes first alphabetically
      mostPopularMovieTitle = movieTitle;
    }
  }

  return mostPopularMovieTitle;
};

try {
  module.exports = mostPopularMovie;
} catch {
  module.exports = null;
}
