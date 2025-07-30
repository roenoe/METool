-- Table: civ
CREATE TABLE IF NOT EXISTS civ (
  id INTEGER PRIMARY KEY,
  pri INTEGER NOT NULL UNIQUE,
  name TEXT NOT NULL UNIQUE
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
  (18, 'Parthia')
;

-- Table: ast
CREATE TABLE IF NOT EXISTS ast (
  id INTEGER PRIMARY KEY,
  point INTEGER NOT NULL UNIQUE,
  basic TEXT,
  expert TEXT
);

-- Populate ast table
INSERT OR IGNORE INTO ast (point, basic, expert)
VALUES
  (0, 'None', 'None'),
  (5, 'None', 'None'),
  (10, 'None', 'None'),
  (15, 'None', 'None'),
  (20, 'None (1, 2) // 2C', 'None (1, 2, 10, 13) // 3C'),
  (25, '2C', '3C'),
  (30, '2C', '3C'),
  (35, '2C (1, 2, 5, 7, 13, 18) // 3C + 3ADV', '3C + 5VP'),
  (40, '3C + 3ADV', '3C + 5VP'),
  (45, '3C + 3ADV', '3C + 5VP'),
  (50, '3C + 3ADV > 100', '4C + 12ADV'),
  (55, '3C + 3ADV > 100', '4C + 12ADV'),
  (60, '3C + 3ADV > 100', '4C + 12ADV'),
  (65, '4C + 2ADV > 200', '5C + 10ADV < 100 + 38VP'),
  (70, '5C + 3ADV > 200', '6C + all 17ADV < 100 + 56VP'),
  (75, 'N/A', '6C + all 17ADV < 100 + 56VP'),
  (80, 'N/A', 'N/A')
;

-- Table: game
CREATE TABLE IF NOT EXISTS game (
  id INTEGER PRIMARY KEY,
  expert INTEGER NOT NULL
);

-- Populate game table
INSERT OR IGNORE INTO game (expert) VALUES (0);

-- Table: player
CREATE TABLE IF NOT EXISTS player (
  id INTEGER PRIMARY KEY,
  civid INTEGER NOT NULL,
  name TEXT,
  military INTEGER NOT NULL,
  census INTEGER NOT NULL,
  astpoint INTEGER NOT NULL,
  adv INTEGER,
  FOREIGN KEY (civid) REFERENCES civ(id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
  FOREIGN KEY (astpoint) REFERENCES ast(point)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

