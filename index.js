const express = require('express');
const request = require('request');
const app = express();
const PORT = 3005;

app.get('/comic', (req, res) => {
  if (req.query.comic == null) { 
      res.send(helpText()); 
  }

  process(req.query, res);
});

app.listen(PORT, () => {
  console.log(`XKCD API Server listening on port ${PORT}`);
});
  
async function process(query, response) {
  if (query.comic) {
    let comic = cleanText(query.comic);

    if(comic.toLowerCase() == "random") {
      let result = await getXKCD("current");

      comic = getRandomComic(
        1, 
        result.num
      );
    }

    response.send(await getXKCD(comic));
  } else {
    response.send(helpText());
  }
}
  
async function getXKCD(input) {
  if(/^\d+$/.test(input)) {
    var url = `https://xkcd.com/${input}/info.0.json`;
  } else if (input.toLowerCase() == "current" || input.toLowerCase() == "today") {
    var url = 'https://xkcd.com/info.0.json';
  }else if (input.toLowerCase() == "help") {
    return helpText();
  } else {
    return helpText();
  }

  try {
    const data = await fetchXKCDData(url);

    return data;
  } catch (error) {
    return { "error": `${error}` }
  }
}

async function fetchXKCDData(url) {
  try {
    const { response, body } = await asyncRequest(url);
    handleResponse(response);
    
    var body_parsed = JSON.parse(body);

    data = {
      "title": `${body_parsed.title} (#${body_parsed.num})`,
      "num": body_parsed.num,
      "title_link": `https://xkcd.com/${body_parsed.num}/`,
      "image_url": body_parsed.img,
      "alt_text": body_parsed.alt
    };

    return data;
  } catch (error) {
    throw error;
  }
}

function asyncRequest(url, options) {
  return new Promise((resolve, reject) => {
    request.get(url, options, (error, response, body) => {
      if (error) reject(error);
      else resolve({ response, body });
    });
  });
}

function handleResponse(response) {
  let errorObj = {
    errorCode: response.statusCode,
    errorMessage: response.statusMessage
  }

  let errorMessage = `${errorObj.errorCode}: ${errorObj.errorMessage}`

  if (response.statusCode >= 200 && response.statusCode < 300) {
    // Successful responses
    console.log('Request was successful');
  } else if (response.statusCode === 400) {
    // Bad request
    console.error(errorMessage);
    throw new Error(errorMessage);
  } else if (response.statusCode === 401) {
    // Unauthorized
    console.error(errorMessage);
    throw new Error(errorMessage);
  } else if (response.statusCode === 403) {
    // Forbidden
    console.error(errorMessage);
    throw new Error(errorMessage);
  } else if (response.statusCode === 404) {
    // Not found
    console.error(errorMessage);
    throw new Error(errorMessage);
  } else if (response.statusCode >= 500) {
    // Server errors
    console.error(errorMessage);
    throw new Error(errorMessage);
  } else {
    // Other statusCode codes
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

function helpText() {
  return 'Send "comic" URL query parameter containing "random" (comic=random) for random comic, "current" (comic=current) for the latest comic or a specific comic number (comic=614)'
}

function cleanText(text) {
  let textCleaned = text.replace(/["“”‘’']+/g, "");
  
  return textCleaned.trim();
}

function getRandomComic(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}