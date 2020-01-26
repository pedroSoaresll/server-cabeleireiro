import AWS from '../../libs/aws-sdk';
import Establishment from '../models/Establishment';
import EstablishmentStatusEnum from '../enums/establishment/status';

const { SQS } = AWS();

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

  async update(req, res) {
    const { establishment } = req;
    const {
      address: {
        address_postalcode: addressPostalCode,
        address_number: addressNumber
      }
    } = req.body;

    const establishmentUpdated = await establishment.updateOne(req.body);

    // chamar SQS aqui para calculo de lat long
    const sqs = new SQS();

    const QueueUrl = `${process.env.AWS_SQS_ENDPOINT}/WorkerGeolocationGetLatitudeLongitude`;
    const MessageBody = JSON.stringify({
      establishmentId: establishment._id,
      addressPostalCode,
      addressNumber
    });

    sqs.sendMessage(
      {
        MessageBody,
        QueueUrl
      },
      err =>
        err &&
        console.log(
          'error to send message to worker geolocation get latitude longitude',
          { establishment },
          { err }
        )
    );

    return res.json(establishmentUpdated);
  }
}

export default new EstablishmentController();
