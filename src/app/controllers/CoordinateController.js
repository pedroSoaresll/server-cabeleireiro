import Coordinate from '../models/Coordinate';

const EARTH_SIZE = 3963.2;
const MILE_MEASUREMENT = 1609.34;

class CoordinateController {
  async store(req, res) {
    const { establishmentId, latitude, longitude } = req.body;
    const coordinate = await Coordinate.create({
      establishmentId,
      location: {
        type: 'Point',
        coordinates: [latitude, longitude]
      }
    });

    res.json(coordinate);
  }

  async index(req, res) {
    const { coordinate } = req.params;
    const { distance = 500 } = req.query;
    const [latitude, longitude] = coordinate.split(',');

    const miles = distance / MILE_MEASUREMENT;

    const establishmentsNear = await Coordinate.where('location').within({
      center: [latitude, longitude],
      radius: miles / EARTH_SIZE,
      spherical: true
    });

    res.json(establishmentsNear);
  }
}

export default new CoordinateController();
