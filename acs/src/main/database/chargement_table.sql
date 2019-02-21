SET autocommit=0;

use acs;

INSERT INTO ARTICLE
(TYPE,INTITULE,DESCRIPTION,QUANTITE,DESTINATAIRE)
VALUES(
'BARNUM', 'BARNUM 7.5 x 5', 
'Barnum bleu mono pente de 7.5m par 5m',
'1','ASSOCIATION'),
('BARNUM','BARNUM PARAPLUIE 5 x 5',
'Barnum blanc de type parapluie de 5m par 5m, pouvant être joint à deux autres pour en faire un seul de 15m par 5m',
'3','ALL'),
('BARNUM','CARRE BUVETTE 3 x 3',
'Carré buvette de 3m par 3m de couleur bleu',
'1','ALL'),
('TABLE', 'TABLE 2.20m',
'Table de brasserie en bois de 2.20m',
'60','ALL'),
('BANC','BANC 2.20m',
'BANC pour table de 2.20m',
'120','ALL'),
('TABLE', 'TABLE 3.20m',
'Table 3.20m avec leurs 3 treteaux',
'18','ASSOCIATION'),
('BANC','BANC 3.20m',
'BANC pour table de 3.20m',
'36','ASSOCIATION'),
('TABLE', 'TABLE PLIANTE 1.80m',
'Table pliante en plastique de 1.80m',
'12','ALL'),
('BANC', 'BANC 1.80m',
'BANC pour table de 1.80m',
'24','ALL'),
('SONO','SONO','SONO','1','ALL'),
('PERCO','PERCOLATEUR','Percolateur de 10 litres','1','ALL'),
('MALAXEUR','MALAXEUR','1 malaxeur professionnel pour la réalisation de pâte à crêpes',
'1','ALL');

INSERT INTO ROLE(name) VALUES('ROLE_USER');
INSERT INTO ROLE(name) VALUES('ROLE_ADMIN');