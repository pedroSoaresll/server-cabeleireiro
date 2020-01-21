import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  address_postalcode: String,
  address_number: Number,
  address_name: String,
  address_city: String,
  address_neighborhood: String,
  address_state: String
});

const establishmentSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  googleId: String,
  name: String,
  address: addressSchema,
  status: String
});

export default mongoose.model('Establishment', establishmentSchema);
