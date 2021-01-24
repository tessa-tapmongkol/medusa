# qwerhacks2021

# How to run the backend:
1. Obtain `secret.json`
2. Place `secret.json` in the backend folder
3. Open your terminal
4. cd to the backend/parser_api folder
5. `export GOOGLE_APPLICATION_CREDENTIALS="../secret.json"`

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
