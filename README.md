
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

