# picturesearch-Angular
An angular app to search for pictures based on location details

## How it works:
User can given input in the form of location name or coordinates or can even choose from given preset list and the list of images is diplayed below.
If any location details is not present with the application, the details will be saved and the images will be displayed.
User can even add images to favourites list by clicking on any image.
Images are displayed 10 ietms per page. User can navigate through pages using the navigation buttons.

## Setting up the application:
In the project's root folder install the required libraries
> npm install  

Check for the connection to the backend api. Use the apiUrl given in _environment.ts_ to connect to local backend service or the _environment.prod.ts_ file's apiUrl to connect to the backend service hosted in heroku. For using the _environment.prod.ts_ file's variables while developing, copy the required variables to _environment.ts_ file and import it in respective component.

If any new component is required, create it by using the command
> ng g c component_name  

It will automatically be imported in the project's module file.

Run the application by
> ng serve  

By default it runs with port 4200, you can access it by visiting localhost:4200 in any browser. Here it uses the environment.ts file by default.

The default route points to /home where the user can provide the inputs.
The text input accepts input in the form of place name or coordinates.
The select input gives a preset list of cities where the user can choose from any of them.

User can add images to favourites or navigate through pages using the navigation buttons.
After adding images to favourites, user can view them by clicking on the favourites link present at the top right of home component.

For building the application for production environment,
> ng build --prod  

Here the environment.prod.ts file is used instead od the environment.ts. So make sure the variables are properly set.
The output of the built project is _dist/project_name_ folder. It can be changed in _angular.json_ file