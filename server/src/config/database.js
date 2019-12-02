module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'controlecusto',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
