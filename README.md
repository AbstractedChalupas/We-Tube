# We-Tube
We-Tube is a video syncing service for YouTube videos that allows users to watch the same video simultaneously and chat about their thoughts. The videos are synced so that each user is watching as if the video is a live stream. Each user can play/pause the video, but only the host of the video can seek to a new location in the video. New users are able to join the stream at any point and they will watch from wherever other viewers were watching the video. 

A Diagram explaining how the clients and server communicate to sync video is available in this directory. 

#APIs Used
We used the Passport API to provide Google Authentication and log in functionality for the App. We used the Youtube API to gather details about the videos being watched (but not to embed the video into the screen). 

#Styling
Styling was done using Google's Material Design guidelines and theme. We used Angular-Material to quickly integrate Google Material Design elements into our app. 

#Database
We used MongoDB for our database. Initially, we were planning on users being able to have friends and a history of watched videos (able to stored as arrays, so it made a lot of sense to use Mongo. In the end, the database mainly stored user data to help with authentication and to deliver a more customized experience (Google profile used for chat). The schema for our database is as follows.
'''

var UserSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true
	},
	photo: {
		type: String
	},
	email: {
		type: String,
	},
	friends: {
		type: Array,
		required: false,
	},
	history: {
		type: Array,
		required: false
	}
})

'''

#Routing
Server Side API routes | Function
----------------------|---------
/api/loggedin| GET request to determine whether not a user has been authenticated with Google
/api/logout | GET request which removes the token to log a user out. This does not log the user out of their Google Account however.
/auth/google| GET request which will send the user through the Google authentication process
/auth/google/callback| GET request for the callback which will redirect the user either to the /#stream route on a successful authentication or the /#login route on a failed authentication


Client Side Routing | Function
--------------------|----------
/| Basic static login page. User can log in with Google.
/#stream | Static video page. User can select videos from the available rooms on this page or create a room by pasting a youtube link into the text input field. The video will display on this page as well. To view all available streams, the user can refresh the page. A chat will load at the bottom for each video (Although messages do not persist).


#Testing
A range of basic client side testing was performed to check that front-end routing was working as specified and the type of data we were receiving and handling with our controllers was consistent. 

