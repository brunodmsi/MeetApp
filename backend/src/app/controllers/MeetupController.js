import * as Yup from 'yup';
import {
  isBefore,
  startOfHour,
  parseISO,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async index(req, res) {
    const { date, page = 1 } = req.query;

    const where = {};
    if (date) {
      const searchDate = parseISO(date);
      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    const meetups = await Meetup.findAll({
      where,
      order: ['date'],
      attributes: ['id', 'past', 'title', 'description', 'location', 'date'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(meetups);
  }

  async show(req, res) {
    const { id } = req.params;

    const meetup = await Meetup.findByPk(id, {
      attributes: ['id', 'past', 'title', 'description', 'location', 'date'],
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!meetup) {
      return res.status(401).json({
        message: 'Meetup não encontrado',
      });
    }

    return res.json(meetup);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      banner_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({
        message: 'Erro de validação',
      });
    }

    const { date } = req.body;

    const dateParsed = parseISO(date);
    const isBeforeDate = isBefore(dateParsed, new Date());
    if (isBeforeDate) {
      return res.status(401).json({
        message: 'Datas passadas não são permitidas',
      });
    }

    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(401).json({
        message: 'Usuário não existente',
      });
    }

    const meetup = await Meetup.create({
      ...req.body,
      user_id: req.userId,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
      banner_id: Yup.number(),
    });

    const { id } = req.params;

    const meetup = await Meetup.findByPk(id);
    if (!meetup) {
      return res.status(401).json({
        message: 'Este Meetup não existe',
      });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({
        message: 'Você não pode modificar este meetup',
      });
    }

    if (meetup.past) {
      return res.status(401).json({
        message: 'Você não pode modificar meetups que já passaram',
      });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({
        message: 'Erro de validação',
      });
    }

    const { date } = req.body;
    const hourStart = startOfHour(parseISO(date));
    if (isBefore(hourStart, new Date())) {
      return res.status(401).json({
        message: 'Datas passadas não são permitidas',
      });
    }

    await meetup.update(req.body);

    const { title, description, location, banner_id } = await Meetup.findByPk(
      req.userId,
      {
        includes: [
          {
            model: File,
            as: 'banner',
            attributes: ['id', 'path', 'ur;'],
          },
        ],
      }
    );

    return res.json({
      title,
      description,
      location,
      date,
      banner_id,
    });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const meetup = await Meetup.findByPk(id);

    if (!meetup) {
      return res.status(401).json({
        message: 'Este Meetup não existe',
      });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({
        message: 'Você não pode deletar este meetup',
      });
    }

    if (meetup.past) {
      return res.status(401).json({
        message: 'Você não pode deletar meetups que já passaram',
      });
    }

    await meetup.destroy();

    return res.json({
      message: 'Deletado com sucesso',
    });
  }
}

export default new MeetupController();
