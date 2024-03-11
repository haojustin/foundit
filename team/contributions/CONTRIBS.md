## Victor Li

I made the settings page. The post page involved mainly me and Justin. I'm also responsible for improving the UI and keeping its design consistent across the app. The commits graph seems accurate. It does say I have a lot of lines coded,
but the number is inflated due to automated changes in certain files due to installing dependencies and such.

## Justin Hao

I am mostly responsible for the current post page and features, Victor additionally worked on the post and was the vision behind the general UI. I worked to create the main features of posting such as the camera (and all associated features), uploading photos, pinning location, and tagging items within a post. I worked on Firebase services such as uploading media, updating getPost, and addPost with all needed data. I also helped clean out the UI of the home page, making the preview for the post look better while also adding photos. Worked with Kevin a little on the location modal to improve functionality such as pin dropping, user current location, and saving pin drop location across the application.


## Alex Castelein



## Baimin Wang

I am responsible for the homepage features. Justin did some modification on it during the week. We reorganized the code structure and the display structure of the posts. Added service functions that's used to get posts data, get user data, get userID, etc. Fixed the issue that posting new content on phone will generate USERID = 0 in backends, which may be a blockage for searching some posts by content or by userID. I also helped cleaned out posting page conding, making USERID an asynchronous variable and updating with different users.


## Kendrick Lee



## Kevin Lavelle

I am responsible for creating the map functions. When the user opens the app and tries to post, the device should ask the user for permissions 
to access geolocation and other sensitive data. I am responsible for reverse geocoding latitude and longitude coordinates to transalte it to a street address. Justin helped me with moving an interactive pin around for the user to create their own location. This weekend, I will be adding code for users to filter posts by location. 


## Zixiao Jin

I am responsible for the authentication services. I created the sign-in page, sign-up page, and forgot password page and users can access them from the profile page. The authentication I'm using is the Firebase email auth. Users can create an account with any emails they have, a password, a username, and a phone number. Users can then log in with the email and password. User can also change their password using the forgot password function which will send an email of changing password to the email they used for FoundIt.
