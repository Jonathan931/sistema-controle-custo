import * as Yup from 'yup';
import Movimentacoes from '../models/Movimentacoes';

class MovimentacoesController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const movimentacoes = await Movimentacoes.findAll({
      order: ['descricao'],
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(movimentacoes);
  }

  async store(req, res) {
    // const schema = Yup.object().shape({
    //   nome: Yup.string().required(),
    //   departamentos: Yup.array().required(),
    // });
    // if (!(await schema.isValid(req.body))) {
    //   return res.status(400).json({ error: 'Validation fails' });
    // }
    const retorno = await Movimentacoes.create(req.body);

    return res.json(retorno);
  }

  async update(req, res) {}

  async delete(req, res) {}
}

export default new MovimentacoesController();
