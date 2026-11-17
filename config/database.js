module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'postgres'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'spark'),
      user: env('DATABASE_USERNAME', 'spark'),
      password: env('DATABASE_PASSWORD', 'spark'),
      schema: env('DATABASE_SCHEMA', 'strapi'),
      ssl: false,
    },
    pool: { min: 0, max: 10 },
  },
});
