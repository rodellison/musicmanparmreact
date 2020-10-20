
## MusicManParmFixer (React)

This project is the front-end portion rewrite of a node/express monolithic
version which contained front end and backend logic. 
It's purpose is to provide the front end that accepts correction data for the 
Alexa Music Man service. 
Some words that Alexa hears when the customers provide input 
(for artists or venues) are misinterpreted, such
to not allow the SongKick api to find data. 
**_e.g Reanna, not Rhianna_**

The corrections made using this app get sent to a backend API/Database
([GoMusicManParmFix](https://github.com/rodellison/GoConchRepublicBackEnd)),
The Alexa Music Man service can then use the database to 
locate the corrected values and use that for the SongKick API lookup.

