Simple dockerized react application.

Use `docker-compose build` to build the image.

Then `docker-compose up` to run it.

If you get an error along the lines of sh: react-scripts not found then delete the package-lock.json. And do a `docker-compose down -v` before doing another build and then another up.