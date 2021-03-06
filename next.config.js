const API_key = process.env.API_KEY;

module.exports = {
  reactStrictMode: true,
  async redirects(){
    return [
      {
        source: "/contact",
        destination: "/form",
        permanent: false,
      }
    ]
  },
  async rewrites(){
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_key}`
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_key}`
      }
    ];
  }
}
