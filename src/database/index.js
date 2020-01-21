import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/cabeleireiro', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 5000
});

mongoose.connection.once('open', () => {
  console.log('mongo connected');
});
