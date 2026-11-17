# spark-feedback-strapi

Strapi 5 (Community, MIT): the place where editors manage the **Spark Feedback** questionnaires — questions, wording in
English / Bahasa Melayu / 中文 / தமிழ், and the YES / NO / ANY branches. Draft & publish is on; the API uses the most
recently published questionnaire per channel (NFTF, FTF, GENERAL).

Content is stored in the `strapi` schema of the Postgres that belongs to `spark-feedback-api`.

## Run

1. Start the API stack first (it creates the shared network `spark_feedback_net` and Postgres):
   `cd ../spark-feedback-api && docker compose up -d --build`
2. `cp .env.example .env` (keep `POSTGRES_PASSWORD` equal to the API's), then `docker compose up -d --build`
3. Admin: http://localhost:1337/admin (first start seeds the questions and creates the admin from `STRAPI_ADMIN_EMAIL` / `STRAPI_ADMIN_PASSWORD`).

The API reaches it at `http://strapi:1337` over the shared network (`STRAPI_URL`). Port 1337 is bound to localhost only.
Seed data: `src/seed/data.js`. Content types: `src/api/*`.
