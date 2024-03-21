export const formatString = function (day) {
  return day.charAt(0).toUpperCase() + day.slice(1);
};

export function formatGenres(genres) {
  let formattedGenres = genres.map((genre) => formatString(genre));
  return formattedGenres.join(", ");
}

export function ratingColor(rating) {
  let color;
  let grade;
  switch (rating != null) {
    case rating >= 4.5:
      grade = "Excellent";
      color = "forestgreen";
      break;
    case rating >= 4.0:
      grade = "Very Good";
      color = "yellowgreen";
      break;
    case rating >= 3.0:
      grade = "Good";
      color = "orange";
      break;
    case rating >= 2.0:
      grade = "Ok";
      color = "orangered";
      break;
    default:
      grade = "Poor";
      color = "firebrick";
  }
  return { grade, color };
}
