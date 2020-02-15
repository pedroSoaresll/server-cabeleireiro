import axios from 'axios';
import { getAddressFromGoogle } from '../../services/google-geolocation';

interface Params {
  establishmentId: string;
  addressName: string;
  addressNeighborhood: string;
  addressNumber: number;
  webhookTargetResponse: string;
}

export const handler = async event => {
  return new Promise(resolve => {
    event.Records.forEach(async ({ body }) => {
      const {
        establishmentId,
        addressName,
        addressNeighborhood,
        addressNumber,
        webhookTargetResponse
      }: Params = JSON.parse(body);

      const { data } = await getAddressFromGoogle(
        [addressName, addressNumber, addressNeighborhood].join(', ')
      );

      const {
        lat: latitude,
        lng: longitude
      } = data.results[0].geometry.location;

      await axios.post(`${webhookTargetResponse}`, {
        establishmentId,
        latitude,
        longitude
      });

      resolve(true);
    });
  });
};
