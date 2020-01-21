import Establishment from '../models/Establishment';
import EstablishmentStatusEnum from '../enums/establishment/status';

class EstablishmentController {
  async store(req, res) {
    const newEstablishment = await Establishment.create({
      ...req.body,
      status: EstablishmentStatusEnum.ACTIVE
      // address: {
      //   address_postalcode: 'endereco',
      //   address_number: 300,
      //   address_name: 'endereco',
      //   address_city: 'endereco',
      //   address_neighborhood: 'endereco',
      //   address_state: 'endereco'
      // },
    });

    res.json(newEstablishment);
  }
}

export default new EstablishmentController();
