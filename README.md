<div align="center">
  <h3 align="center">Songpop Spotify</h3>

  <p align="center">
    Songs trivia game made for drinking and friends 🎉🍻
    <br />
    <a href="https://github.com/DrunkOldDog/songpop-spotify/issues">Report Bug</a>
    ·
    <a href="https://github.com/DrunkOldDog/songpop-spotify/issues">Request Feature</a>
  </p>
</div>

<br />

## About The Project

<div align="center">
  <img width="320" alt="image" src="https://github.com/DrunkOldDog/songpop-spotify/assets/21226219/48f40658-cc37-4c7b-aee2-0b7b82866905">
</div>
<br />

I guess most of us are familiar with [Songpop](https://en.wikipedia.org/wiki/SongPop). It was a cool game from our childhood that got pretty competitive sometimes. So this project is all about bringing this game back to life but by using the awesome [Spotify API](https://developer.spotify.com/documentation/web-api).

Unfortunately, this API is not too kind with _Games/Trivias_, so that's why you will need your own keys to make it work with your account. However, I will do my best to help you ease this steps!

## Getting Started

### Prerequisites

This project uses Spotify API and Redis on the background. So you will need some _API KEYS_ to make it work.

Here are some docs so you can get your own:

- [Getting started with Spotify Web API](https://developer.spotify.com/documentation/web-api/tutorials/getting-started)
- [Create a Redis Cloud Database](https://docs.redis.com/latest/rc/databases/create-database/)

### Installation

This project is based on `npm`. But feel free to use whichever tool you want.

First, install the project dependencies:

```bash
npm install
```

Before running the application, you will need to add an `.env.local` file at the root of the project. This file would need the following values:

```
SPOTIFY_CLIENT_ID=<YOUR_CLIENT_ID>
SPOTIFY_CLIENT_SECRET=<YOUR_CLIENT_SECRET>

REDIS_PASSWORD=<YOUR_REDIS_PASSWORD>
REDIS_HOST=<YOUR_REDIS_HOST>
REDIS_PORT=<YOUR_REDIS_PORT>

NEXTAUTH_SECRET=<SOMETHING_FUNNY_COMES_HERE>
```

Finally, start the development environment.

```bash
npm run dev
```

With this, you'll be damn ready to run the app locally. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Roadmap

Features needed to achieve this main application scope.

- [x] Add Games Connected with Spotify API
- [ ] Add Testing
- [ ] Add Multiplayer Functionality For Games Using Pusher Pub/Sub
  - [ ] Add Rooms to Sync All Players Scores
  - [ ] Submit All Players Scores to Redis By End of Game

See the [open issues](https://github.com/DrunkOldDog/songpop-spotify/issues) for a full list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Same goes for a fix with the `fix/` branch code.
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Juani Reyes - [@juanireyesg](https://twitter.com/juanireyesg) - juanireyes182@gmail.com

## Other

Kudos to [othneildrew](https://github.com/othneildrew) for this awesome README template 🚀
