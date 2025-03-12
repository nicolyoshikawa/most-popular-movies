const { Result } = require("express-validator");
const mostPopularMovie = require("./most-popular-movie");

const facebookNetwork = [
  {
    id: 1,
    name: "lily",
    movies: [
      "Mean Girls",
      "Miss Congeniality",
      "Barbie",
      "Love Actually",
      "Awakenings",
      "Founder",
    ],
    friends: [2, 3],
  },
  {
    id: 2,
    name: "bob",
    movies: [
      "Love Actually",
      "Barbie",
      "Mean Girls",
      "Up",
      "Finding Nemo",
      "Wall-E",
    ],
    friends: [1, 4, 5],
  },
  {
    id: 3,
    name: "cindy",
    movies: [
      "Inside Out",
      "Miss Congeniality",
      "Barbie",
      "Mean Girls",
      "Free Solo",
      "Dodgeball",
    ],
    friends: [1],
  },
  {
    id: 4,
    name: "phil",
    movies: [
      "The Proposal",
      "Mean Girls",
      "The Truman Show",
      "Dodgeball",
      "Awakenings",
      "Up",
    ],
    friends: [2, 6],
  },
  {
    id: 5,
    name: "max",
    movies: [
      "Office Space",
      "Dodgeball",
      "Rush Hour",
      "Wall-E",
      "Love Actually",
      "Mean Girls",
    ],
    friends: [2, 6],
  },
  {
    id: 6,
    name: "alice",
    movies: [
      "Up",
      "Office Space",
      "Rush Hour",
      "Wall-E",
      "Love Actually",
      "Mean Girls",
    ],
    friends: [4, 5],
  },
  {
    id: 7,
    name: "karl",
    movies: [
      "Up",
      "Office Space",
      "Rush Hour",
      "Wall-E",
      "Love Actually",
      "Mean Girls",
    ],
    friends: [],
  },
  {
    id: 8,
    name: "teddy",
    movies: [
      "Up",
      "Office Space",
      "Barbie",
      "Wall-E",
      "Love Actually",
      "Mean Girls",
    ],
    friends: [9],
  },
  {
    id: 9,
    name: "baylee",
    movies: [
      "Up",
      "Office Space",
      "Barbie",
      "Wall-E",
      "Love Actually",
      "Mean Girls",
    ],
    friends: [8],
  },
];

describe("mostPopularMovie", function () {
  it("should return Mean Girls if I am phil", function () {
    let favoriteMovie = mostPopularMovie(facebookNetwork, 4);
    expect(favoriteMovie).toBe("Mean Girls");
  });

  it("should return the first movie alphabetically if there is a tie", function () {
    // If Lily, there is a tie between Barbie and Mean Girls
    let favoriteMovie = mostPopularMovie(facebookNetwork, 8);
    expect(favoriteMovie).toBe("Barbie");
  });

  it("should return my first movie alphabetically if I have no friends", function () {
    // If I am Karl (7), it should return Love Actually
    let favoriteMovie = mostPopularMovie(facebookNetwork, 7);
    expect(favoriteMovie).toBe("Love Actually");
  });

  it("should throw an error if I have an invalid id", function () {
    expect(() => mostPopularMovie(facebookNetwork, null)).toThrowError(
      "invalid id"
    );
    expect(() => mostPopularMovie(facebookNetwork, 0)).toThrowError(
      "invalid id"
    );
  });

  it("should throw an error if I have an invalid or empty network", function () {
    expect(() => mostPopularMovie(null, 6)).toThrowError("invalid network");
    expect(() => mostPopularMovie([], 6)).toThrowError("invalid network");
  });
});
