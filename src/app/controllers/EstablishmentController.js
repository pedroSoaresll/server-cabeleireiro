import Establishment from '../models/Establishment';

class EstablishmentController {
  async store(req, res) {
    const newEstablishment = await Establishment.create({
      googleId: 'ola-mundo-google',
      name: 'CabeleCarol',
      address: {
        address_postalcode: 'endereco',
        address_number: 300,
        address_name: 'endereco',
        address_city: 'endereco',
        address_neighborhood: 'endereco',
        address_state: 'endereco'
      },
      status: 'ACTIVE'
    });

    res.json(newEstablishment);
  }
}

export default new EstablishmentController();
