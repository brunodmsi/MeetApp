import jwt from 'jsonwebtoken';
import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        message: 'Este email não foi encontrado.',
      });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({
        message: 'Senhá inválida.',
      });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },

      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.ttl,
      }),
    });
  }
}

export default new SessionController();
