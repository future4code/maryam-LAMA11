import connection from "./connection"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTables = () => connection.raw(`
CREATE TABLE IF NOT EXISTS lama_group (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    music_genre VARCHAR(255) NOT NULL,
    responsible VARCHAR(255) UNIQUE NOT NULL 
  );
  
  CREATE TABLE IF NOT EXISTS lama_shows (
    id VARCHAR(255) PRIMARY KEY,
    week_day VARCHAR(255) NOT NULL,
    start_time INT NOT NULL,
    end_time INT NOT NULL,
    band_id VARCHAR(255) NOT NULL,
    FOREIGN KEY(band_id) REFERENCES lama_group(id)
  );
  
  CREATE TABLE IF NOT EXISTS lama_users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
  );
  
  CREATE TABLE IF NOT EXISTS lama_tickets (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price FLOAT NOT NULL,
  quantity int NOT NULL,
  sold INT DEFAULT 0, 
  show_id VARCHAR(255) NOT NULL,
  FOREIGN KEY (show_id) REFERENCES lama_shows(id)
  );
  
  CREATE TABLE lama_bought_tickets (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  ticket_id VARCHAR(255) NOT NULL,
  quantity int NOT NULL, 
  FOREIGN KEY (user_id) REFERENCES lama_users(id),
  FOREIGN KEY (ticket_id) REFERENCES lama_tickets(id)
  );
  
  CREATE TABLE lama_photos (
  id VARCHAR(255) PRIMARY KEY, 
  url VARCHAR(255) NOT NULL,
  show_id VARCHAR(255) NOT NULL,
  FOREIGN KEY (show_id) REFERENCES lama_shows(id)
  );
`)
    .then(() => { console.log("Tabelas criadas") })
    .catch(printError)

createTables() 