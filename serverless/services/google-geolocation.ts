import axios from 'axios';

const GOOGLE_API_KEY = 'AIzaSyBBHfDUD4haTmK5rVl0iNydDlsry6KU0aM';

export const getAddressFromGoogle = (address: string) =>
  axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${GOOGLE_API_KEY}`
  );
