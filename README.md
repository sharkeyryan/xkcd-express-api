# XKCD REST API Using NodeJS Express

XKCD Web comics or awesome. :)

https://xkcd.com/

This is a REST API service using NodeJS Express to allow for integrating with the XKCD API.

## Example ##

To see JSON for the current XKCD comic use this url: https://xkcd.com/info.0.json

You will see something like this (queried On 10-24-2024):

```json
{
  "month": "10",
  "num": 3002,
  "link": "",
  "year": "2024",
  "news": "",
  "safe_title": "RNAWorld",
  "transcript": "",
  "alt": "Disney lore: Canonically, because of how Elsa's abiogenesis powers work, Olaf is an RNA-only organism.",
  "img": "https://imgs.xkcd.com/comics/rnaworld.png",
  "title": "RNAWorld",
  "day": "23"
}
```

This project was created to add a layer of API interactivity so that a front-end applicaiton could ingest these comics and display them on a web page or digital sign.

# Setup

After cloning the repo or forking it, you can run it locally if you have `Node Package Manager (NPM)` or `Docker` and `Docker Compose`.

To run using NPM follow these steps:

1. Install the packages: `npm install`
2. Run the Express API server: `node index.js`
3. In a browser or using other REST client like `curl` navigate to the following URL: `http://localhost:3005/comic?comic=current`

To run using Docker and Docker Compose follow these steps:

1. Build application using `docker-compose` by running the `full-reset` script: `./local-bin/full-reset`
2. Run the Express API server application: `./local-bin/start`
3. In a browser or using other REST client like `curl` navigate to the following URL: `http://localhost:3005/comic?comic=current`

Example response JSON (queried on 10/24/2024):

```json
{
  "title": "RNAWorld (#3002)",
  "num": 3002,
  "title_link": "https://xkcd.com/3002/",
  "image_url": "https://imgs.xkcd.com/comics/rnaworld.png",
  "alt_text": "Disney lore: Canonically, because of how Elsa's abiogenesis powers work, Olaf is an RNA-only organism."
}
```

The REST API allows for the following `comic` URL query parameter values

1. `current` or `today` - These will return the latest comic published.
2. `random` - This will return a random comic by generating a nukber between `1` and the comic `num` of the latest or current comic.
3. `<integer number>` - This will return the comic for the provided number.