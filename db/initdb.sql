-- Table: civ
CREATE TABLE IF NOT EXISTS civ (
  id INTEGER PRIMARY KEY,
  pri INTEGER NOT NULL UNIQUE,
  name TEXT NOT NULL UNIQUE
);

-- Table: player
CREATE TABLE IF NOT EXISTS player (
  id INTEGER PRIMARY KEY,
  civid INTEGER NOT NULL,
  military INTEGER NOT NULL,
  census INTEGER NOT NULL,
  ast INTEGER NOT NULL,
  FOREIGN KEY (civid) REFERENCES civ(id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Populate civ table
INSERT OR IGNORE INTO civ (pri, name)
VALUES
(1, 'Minoa'),
(2, 'Saba'),
(3, 'Assyria'),
(4, 'Maurya'),
(5, 'Celt'),
(6, 'Babylon'),
(7, 'Carthage'),
(8, 'Dravidia'),
(9, 'Hatti'),
(10, 'Kushan'),
(11, 'Rome'),
(12, 'Persia'),
(13, 'Iberia'),
(14, 'Nubia'),
(15, 'Hellas'),
(16, 'Indus'),
(17, 'Egypt'),
(18, 'Parthia');
