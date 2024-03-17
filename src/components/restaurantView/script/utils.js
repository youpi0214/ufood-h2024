export const formatString = function (day) {
  return day.charAt(0).toUpperCase() + day.slice(1);
};

export function formatGenres(genres) {
  let formattedGenres = genres.map((genre) => formatString(genre));
  return formattedGenres.join(", ");
}
