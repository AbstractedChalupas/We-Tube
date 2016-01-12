# greenfield
A Diagram JPG is available in this directory


Server Side API routes | Function
----------------------|---------
/api/loggedin| GET request to determine whether not a user has been authenticated with Google
/api/logout | GET request which removes the token to log a user out. This does not log the user out of their Google Account however.
/auth/google| GET request which will send the user through the Google authentication process
/auth/google/callback| GET request for the callback which will redirect the user either to the /#stream route on a successful authentication or the /#login route on a failed authentication