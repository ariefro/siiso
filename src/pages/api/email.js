import { sendMail } from '../../utils/email';

const handler = async (req, res) => {
  try {
    const { method, body } = req;
    switch (method) {
      case 'POST': {
        await sendMail(body.name, body.email, body.message);

        res.status(200).send('Success to send message');
        break;
      }

      case 'GET': {
        res.status(200).send(req.auth_data);
        break;
      }

      default:
        res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export default handler;
