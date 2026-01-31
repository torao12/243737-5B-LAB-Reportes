DROP ROLE IF EXISTS app_reporter;
CREATE ROLE app_reporter WITH LOGIN PASSWORD 'NextPassword2026';

GRANT CONNECT ON DATABASE actividad_db TO app_reporter;
GRANT USAGE ON SCHEMA public TO app_reporter;

GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_reporter;