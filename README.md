# location-images-service
The service provides functionality to keeping images as well as APIs for interacting with it.

The following APIs are exposed by the service:

* Register user
    * POST - $basePath/auth/signup
* Login
    * POST - $basePath/auth/login
* Get all images
    * GET - $basePath/images
* Add images
    * POST - $basePath/images

### Not done yet.

* Update image
    * PUT - $basePath/images/$name

* Delete image
    * DELETE - $basePath/images/$name



## Install, run instructions 

### Installing the service:

* Ensure the following tools are installed:
    * npm v5.6.x
    * node > v8.9.4
* Run the following in command line:
    * npm install

### Configuring service settings:

* To change configurations(such as port, dbhost, etc) edit corresponding values in config/envSettings.json.

### Running the service:

* Ensure the service is installed and configured.
* Ensure the MongoDB is running.
* Ensure MongoDB have database "images".
* Run the following in command line:
    * npm start

