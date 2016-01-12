# We-Tube
A Diagram JPG is available in this directory

#APIs Used
We used the Passport API to provide Google Authentication and log in functionality for the App. We used the Youtube API to gather details about the videos being watched (but not to embed the video into the screen). 

#Styling
Styling was done using Google's Material Design guidelines and theme. We used Angular-Material to quickly integrate Google Material Design elements into our app. 


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