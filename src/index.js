'use strict';

const sets = require('./seed/data');

const QUESTIONNAIRE = 'api::questionnaire.questionnaire';
const QUESTION = 'api::question.question';

/** The Spark API reads questions without a login (internal network only), so the Public role may read these two types. */
async function openReadAccess(strapi) {
  const role = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
  if (!role) return;
  const actions = [`${QUESTIONNAIRE}.find`, `${QUESTIONNAIRE}.findOne`, `${QUESTION}.find`, `${QUESTION}.findOne`];
  for (const action of actions) {
    const exists = await strapi.db.query('plugin::users-permissions.permission').findOne({ where: { action, role: role.id } });
    if (!exists) await strapi.db.query('plugin::users-permissions.permission').create({ data: { action, role: role.id } });
  }
}

async function seed(strapi) {
  const existing = await strapi.documents(QUESTIONNAIRE).count({});
  if (existing > 0) return;
  strapi.log.info('Seeding the starter question sets (NFTF, FTF, general)...');
  for (const set of sets) {
    const qn = await strapi.documents(QUESTIONNAIRE).create({
      data: { key: set.key, channel: set.channel, title: set.title },
      status: 'published',
    });
    for (const question of set.questions) {
      await strapi.documents(QUESTION).create({
        data: { ...question, questionnaire: qn.documentId },
        status: 'published',
      });
    }
  }
}

module.exports = {
  register() {},
  async bootstrap({ strapi }) {
    await openReadAccess(strapi);
    await seed(strapi);
  },
};
