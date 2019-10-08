import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import User from '../models/User';
import Meetup from '../models/Meetup';
import Queue from '../../lib/Queue';

import SubscriptionMail from '../jobs/SubscriptionMail';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
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

  async store(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(id, {
      include: [{ model: User, as: 'organizer' }],
    });

    if (!meetup) {
      return res.status(401).json({
        message: 'Meetup não existe',
      });
    }

    if (meetup.user_id === req.userId) {
      return res.status(401).json({
        message: 'Você já esta organizando este meetup',
      });
    }

    if (meetup.past) {
      return res.status(401).json({
        message: 'Este meetup já passou',
      });
    }

    const checkUserAvailability = await Subscription.findOne({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkUserAvailability) {
      return res.status(401).json({
        message: 'Você já registrado para outro meetup nesta mesma data',
      });
    }

    const subscription = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
