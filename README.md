## Techno
Node.js with express
Mongodb

## Token sender
token, envoyer par headers x-access-token

## data format
date_naissance format MM-DD-YYYY

## token
tokenExpiration 1mn
delai desactivation compte 2mn

## register
https://apiauthnode.herokuapp.com/register    METHODE: POST body: {"firstname": "xxxx", .....}

## login
https://apiauthnode.herokuapp.com/login   METHODE: POST body: {"email": "emailxxx", "password": "xxxx"}

## user
https://apiauthnode.herokuapp.com/user    METHODE: GET headers: {"x-access-token": "{token}"}

## edit user
https://apiauthnode.herokuapp.com/user    METHODE: PUT headers: {"x-access-token": "{token}"}  body: {"firstname": "xxxx", .....}

## get all users
https://apiauthnode.herokuapp.com/users   METHODE: GET headers: {"x-access-token": "{token}"}

## logout
https://apiauthnode.herokuapp.com/users   METHODE: DELETE
