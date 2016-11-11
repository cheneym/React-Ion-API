DROP DATABASE IF EXISTS reaction;
CREATE DATABASE reaction;
USE reaction;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  user_name varchar(40) NOT NULL,
  PRIMARY KEY (ID),
  UNIQUE KEY (user_name)
);

CREATE TABLE outlines (
  id int NOT NULL AUTO_INCREMENT,
  value varchar(1000)  NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE user_config (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  outline_id int NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (outline_id) REFERENCES outlines (id) ON DELETE CASCADE ON UPDATE CASCADE
);
