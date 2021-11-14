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
https://apiauthnode.herokuapp.com/register body: {"firstname": "xxxx", .....}

## login
https://apiauthnode.herokuapp.com/  body: {"email": "emailxxx", "password": "xxxx"}

## user
https://apiauthnode.herokuapp.com/ headers: {"x-access-token": "{token}"}
