import Meetup from '../models/Meetup';

class OrganizerController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const user_id = req.userId;

    const meetups = await Meetup.findAll({
      where: { user_id },
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(meetups);
  }
}

export default new OrganizerController();
