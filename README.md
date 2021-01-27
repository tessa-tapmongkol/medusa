# qwerhacks2021
A google chrome extension that blocks a user's phobias and/or triggers by blurring out any images of them present on the current web page.

# How to run the backend:
1. Obtain `secret.json`
2. Place `secret.json` in the backend folder
3. Open your terminal
4. cd to the backend/parser_api folder
5. `export GOOGLE_APPLICATION_CREDENTIALS="../secret.json"`
6. Run `node app.js`
7. On your terminal, it should print "Example app listening on port 3000!"

# How to use image API

1. needToBlur  
**POST 'localhost:3000/parse'**  
**Body:**  

| Key      | Description |
| ----------- | ----------- |
| src      | image source       |
| triggers   | list of triggers specified by users         |


Response: a boolean true if image contains a trigger, otherwise false

Example
```
curl --location --request POST 'localhost:3000/parse' \
--header 'Content-Type: application/json' \
--data-raw '{
    "src": "./dog.jpg",
    "triggers": [
        "dog"
    ]
}'
```

# Run this extension on your browser
1. Follow the "How to run the backend" guide 
2. Clone this repo
3. Go to chrome://extensions
4. Choose "Load Unpacked"
5. Upload this folder
6. The extension is ready to run!

