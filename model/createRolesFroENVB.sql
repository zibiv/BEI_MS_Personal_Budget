-- Active: 1678801485485@@127.0.0.1@5432@envb
--создания группы для чтения
CREATE ROLE readonly_envb;
GRANT CONNECT ON DATABASE envb TO readonly_envb;
GRANT USAGE ON SCHEMA envb_user TO readonly_envb;
GRANT SELECT ON ALL TABLES IN SCHEMA envb_user TO readonly_envb;

--создание группы для чтения и записи 
CREATE ROLE readwrite_envb;
GRANT CONNECT ON DATABASE envb TO readwrite_envb;
GRANT USAGE ON SCHEMA envb_user TO readwrite_envb;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA envb_user TO readwrite_envb;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA envb_user TO readwrite_envb;
--создание роли для доступа к данным таблицы
CREATE USER envb_operator WITH PASSWORD 'envb_test!' IN ROLE readwrite_envb;