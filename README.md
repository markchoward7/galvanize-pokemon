Dockerized pokemon react appolication. Can be run normally without docker with npm start.

Also can be found on heroku at https://galvanize-pokemon-react.herokuapp.com/

Tends to load improperly if actions are taken to load a new set of pokemon prior to the old one being completely loaded.

Also, the next/previous buttons continue to try to process data outside of range.

Finally, previous doesn't properly get the last set of pokemon when searching by name.

Use `docker-compose build` to build the image.

Then `docker-compose up` to run it.

If you get an error along the lines of sh: react-scripts not found then delete the package-lock.json. And do a `docker-compose down -v` before doing another build and then another up.
