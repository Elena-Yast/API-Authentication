import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "elenayastr";
const yourPassword = "elena";
const yourAPIKey = "c71401fc-ac18-4e5c-85bd-b4159518aa4f";
const yourBearerToken = "0a1ef434-1fc9-4d5a-9dc8-2b0cf794df3a";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  try {
    axios
      .get("https://secrets-api.appbrewery.com/random")
      //The data you get back should be sent to the ejs file as "content"
      .then((response) => {
        const content = JSON.stringify(response.data);
        //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
        res.render("index.ejs", { content });
      });
  } catch (error) {
    // Handle errors
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios
      .get(
        "https://secrets-api.appbrewery.com/all?page=2",

        {
          auth: {
            username: yourUsername,
            password: yourPassword,
          },
        }
      )
      .then((response) => {
        const content = JSON.stringify(response.data);
        res.render("index.ejs", { content });
      });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/apiKey", (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try {
    axios
      .get("https://secrets-api.appbrewery.com/filter", {
        params: {
          score: 5,
          apiKey: yourAPIKey,
        },
      })

      .then((response) => {
        const content = JSON.stringify(response.data);
        res.render("index.ejs", { content });
      });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/bearerToken", (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  try {
    axios
      .get("https://secrets-api.appbrewery.com/secrets/42", {
        headers: {
          Authorization: `Bearer 0a1ef434-1fc9-4d5a-9dc8-2b0cf794df3a`,
        },

        //HINT: This is how you can use axios to do bearer token auth:
        // https://stackoverflow.com/a/52645402
        /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
      })
      .then((response) => {
        const content = JSON.stringify(response.data);
        res.render("index.ejs", { content });
      });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
