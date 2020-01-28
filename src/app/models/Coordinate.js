import mongoose from 'mongoose';

const coordinateSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      coordinates: [Number]
    },
    establishmentId: {
      $type: mongoose.Types.ObjectId,
      ref: 'Establishment',
      required: true
    }
  },
  {
    typeKey: '$type'
  }
);

export default mongoose.model('Coordinate', coordinateSchema);
