import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import User from '../models/User';
import Meetup from '../models/Meetup';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Meetup.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          required: true,
        },
      ],
      attributes: ['id', 'user_id', 'meetup_id'],
      order: [[Meetup, 'date']],
    });

    return res.json(subscriptions);
  }
}

export default new SubscriptionController();
