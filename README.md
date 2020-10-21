
## MusicManParmFixer (React)

This project is the front-end portion rewrite of a previous 
node/express monolithic
version of _MusicManParmFixer_, which contained both front end and backend logic. 

It's purpose is to provide a more modern front end that written in React, that
 accepts corrected data for the Alexa Music Man service. 
Some words that Alexa hears when the customers provide input 
(for artists or venues) are misinterpreted, such
to not allow the SongKick api to find data. 
e.g Alexa sometimes hears **_'Reanna', not 'Rhianna'_**

The corrections made using this app get sent to a backend REST API via API Gateway, 
and onto a serverless lambda Database app. 
([GoMusicManParmFix](https://github.com/rodellison/GoConchRepublicBackEnd)),
The Alexa Music Man service can then use the database to 
locate corrected values to use for it's SongKick API lookup.

## Notes
REQUIRED, but not included in this repo.. A **.env** file should be created at the 
root of the project, and should contain an environmental variable:
<code>
**_REACT_APP_COGNITO_URL_**='YOUR_COGNITO_AUTHENTICATION_URL'
</code>

This ENV is used in the index.js file for redirecting for authentication.  The Cognito URL looks something like: 

<code>
https://YOUR_APP_NAME.auth.us-east-1.amazoncognito.com/login?client_id=YOUR_CLIENT_ID&response_type=token&scope=email+openid&redirect_uri=YOUR_CALLBACK_URL
</code>
