DROP DATABASE IF EXISTS reaction;
CREATE DATABASE reaction;
USE reaction;

CREATE TABLE users (
  id        int         NOT NULL AUTO_INCREMENT,
  username varchar(40)  NOT NULL,
  password varchar(255) NOT NULL,
  salt varchar(255) NOT NULL,
  PRIMARY KEY (ID),
  UNIQUE KEY (username)
);

CREATE TABLE projects (
  id          int            NOT NULL AUTO_INCREMENT,
  projectname varchar(255)   NOT NULL,
  tree        varchar(1000)  NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE permissions (
  id         int          NOT NULL AUTO_INCREMENT,
  permission varchar(255) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE user_project (
  id            int NOT NULL AUTO_INCREMENT,
  user_id       int NOT NULL,
  project_id    int NOT NULL,
  permission_id int NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (user_id)       REFERENCES users (id)       ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (project_id)    REFERENCES projects (id)    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (permission_id) REFERENCES permissions (id) ON DELETE CASCADE ON UPDATE CASCADE
);
