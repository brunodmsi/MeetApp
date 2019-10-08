import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    console.log(`Queue executed with action on ${meetup.title}`);

    await Mail.sendMail({
      to: `${meetup.organizer.name} <${meetup.organizer.email}>`,
      subject: '+1 inscrição realizada',
      template: 'subscription',
      context: {
        user: user.name,
        meetup: meetup.title,
        organizer: meetup.organizer.name,
        email: user.email,
      },
    });
  }
}

export default new SubscriptionMail();
