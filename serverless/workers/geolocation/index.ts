import axios from 'axios';
import { getAddressFromGoogle } from '../geolocation/services/google-geolocation';

export const handler = async event => {
  return new Promise(resolve => {
    event.Records.forEach(async ({ body }) => {
      const {
        establishmentId,
        addressPostalCode,
        addressNumber,
        webhookTargetResponse
      } = JSON.parse(body);

      const { data } = await getAddressFromGoogle(
        [addressPostalCode, addressNumber].join(',')
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
