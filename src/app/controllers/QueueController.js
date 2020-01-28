import Establishment from '../models/Establishment';
import redis from '../../libs/redis';
import { mountQueueKey, mountRoomKey } from '../../utils/redis';

class QueueController {
  async update(req, res) {
    const { token } = req.headers;
    const { id } = req.params;
    const { newQueue } = req.body;

    const establishment = await Establishment.findOne({
      _id: id,
      googleId: token
    });

    if (!establishment) {
      return res.status(401).json({
        error: 'Token is invalid for this user'
      });
    }

    if (!Number.isInteger(newQueue)) {
      return res.status(400).json({
        error: 'newQueue must be a integer'
      });
    }

    await redis.set(mountQueueKey(establishment._id), newQueue);
    req.io.to(mountRoomKey(establishment._id)).emit(newQueue);

    return res.json({
      newQueue
    });
  }

  async index(req, res) {
    const { id } = req.params;
    const establishment = await Establishment.findById(id);

    if (!establishment) {
      return res.status(401).json({
        error: 'Token is invalid for this user'
      });
    }

    const currentQueue = await redis.get(mountQueueKey(establishment._id));

    return res.json({
      currentQueue
    });
  }
}

export default new QueueController();
