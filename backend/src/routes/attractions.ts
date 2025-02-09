import {Attraction} from "../types/attractionType";

module.exports = function (app) {
  // variables
  let attractions : Attraction[] = []

  app.post('/addAttractions', function (req, res) {
    const data = req.body;
    const attractionsList : Attraction[] = data['attractions'];
    console.log("Got attractions", attractionsList);

    attractions.push(...attractionsList);
    attractions.push({attractionName: "another attraction?"});

    console.log("now is", attractions)

    res.sendStatus(200);
  })

  app.get('/getAttractions', function (req, res) {
    res.status(200).json({
      attractions: attractions
    });
  })
}