Dockerized pokemon react appolication. Can be run normally without docker with npm start.

Also can be found on heroku at https://galvanize-pokemon-react.herokuapp.com/

Previous doesn't properly get the last set of pokemon when searching by name.

Also, previous and next can go out of bounds when looking at collection.

Use `docker-compose build` to build the image.

Then `docker-compose up` to run it.

If you get an error along the lines of sh: react-scripts not found then delete the package-lock.json. And do a `docker-compose down -v` before doing another build and then another up.
