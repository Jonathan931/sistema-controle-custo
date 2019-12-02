import * as Yup from 'yup';
import Departamento from '../models/Departamento';
import Funcionario from '../models/Funcionario';
import FuncionarioDepartamento from '../models/FuncionarioDepartamento';

class FuncionarioController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const funcionarios = await Funcionario.findAll({
      order: ['nome'],
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(funcionarios);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      departamentos: Yup.array().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { id, nome } = await Funcionario.create({ nome: req.body.nome });
    req.body.departamentos.map(dep => {
      FuncionarioDepartamento.create({
        funcionario_id: id,
        departamento_id: dep,
      });
    });

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

export default new FuncionarioController();
