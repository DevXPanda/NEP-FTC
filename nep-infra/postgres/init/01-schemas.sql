-- Runs automatically the first time the postgres volume is initialized.
-- Each NEP capability owns exactly one schema inside the shared "nep" database.
CREATE SCHEMA IF NOT EXISTS identity AUTHORIZATION nep;

-- Add future capability schemas here as services come online, e.g.:
-- CREATE SCHEMA IF NOT EXISTS inventory AUTHORIZATION nep;
-- CREATE SCHEMA IF NOT EXISTS sales     AUTHORIZATION nep;
