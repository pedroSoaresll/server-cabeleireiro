import AWS from '../../libs/aws-sdk';
import Establishment from '../models/Establishment';
import EstablishmentStatusEnum from '../enums/establishment/status';

const { SQS } = AWS();

class EstablishmentController {
  async store(req, res) {
    const { googleId } = req.body;

    const establishment = await Establishment.findOne({
      googleId
    });

    if (establishment) {
      return res.json({
        payload: establishment,
        existent: true
      });
    }

    const newEstablishment = await Establishment.create({
      ...req.body,
      status: EstablishmentStatusEnum.ACTIVE
    });

    return res.json({
      payload: newEstablishment,
      existent: false
    });
  }

  async update(req, res) {
    const { establishment } = req;
    const {
      address: {
        address_name: addressName,
        address_number: addressNumber,
        address_neighborhood: addressNeighborhood
      }
    } = req.body;

    const establishmentUpdated = await establishment.updateOne(req.body);

    // chamar SQS aqui para calculo de lat long
    const sqs = new SQS();

    const QueueUrl = `${process.env.AWS_SQS_ENDPOINT}/WorkerGeolocationGetLatitudeLongitude`;
    const MessageBody = JSON.stringify({
      establishmentId: establishment._id,
      addressName,
      addressNumber,
      addressNeighborhood,
      webhookTargetResponse: `${process.env.APP_HOST}/coordinates`
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
