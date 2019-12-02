import * as Yup from 'yup';
import Departamento from '../models/Departamento';

class DepartamentoController {
  async index(req, res) {
    const departamentos = await Departamento.findAll({
      order: ['nome'],
    });
    return res.json(departamentos);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const departamentoExists = await Departamento.findOne({
      where: { nome: req.body.nome },
    });
    if (departamentoExists) {
      return res.status(400).json({ error: 'Departamento already exists' });
    }

    const { id, nome } = await Departamento.create(req.body);
    return res.json({ id, nome });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const departamento = await Departamento.findByPk(req.body.id);
    const { id, nome } = await departamento.update(req.body);

    return res.json({ id, nome });
  }

  async delete(req, res) {
    const retorno = Departamento.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json(retorno);
  }
}

export default new DepartamentoController();
