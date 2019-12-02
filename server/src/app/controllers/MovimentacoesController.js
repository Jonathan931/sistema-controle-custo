import * as Yup from 'yup';
import Movimentacoes from '../models/Movimentacoes';
import Funcionario from '../models/Funcionario';
import FuncionarioDepartamento from '../models/FuncionarioDepartamento';
import Departamento from '../models/Departamento';

class MovimentacoesController {
  async index(req, res) {
    // const { page = 1 } = req.query;
    if (req.params.id) {
      const movimentacoes = await Movimentacoes.findByPk(req.params.id);
      res.json(movimentacoes);
    }
    const movimentacoes = await Movimentacoes.findAll({
      order: ['descricao'],
      where: {},
      // slimit: 8,
      // offset: (page - 1) * 8,
      include: [
        {
          model: Funcionario,
          as: 'funcionario',
          attributes: ['id', 'nome'],
          include: [
            {
              model: Departamento,
              as: 'departamentos',
              required: false,
              attributes: ['id', 'nome'],
              through: {
                model: FuncionarioDepartamento,
                as: 'funcionarioDepartamentos',
                attributes: ['qty'],
              },
            },
          ],
        },
      ],
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

  async update(req, res) {
    const movimentacoes = await Movimentacoes.findByPk(req.body.id);
    const retorno = await movimentacoes.update(req.body);
    return res.json(retorno);
  }

  async delete(req, res) {
    const retorno = Movimentacoes.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json(retorno);
  }
}

export default new MovimentacoesController();
