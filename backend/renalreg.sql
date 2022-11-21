CREATE TABLE IF NOT EXISTS users(
pkuserid bigserial PRIMARY KEY,	
username VARCHAR(50) NOT NULL,
password text NOT NULL,
createdon TIMESTAMPTZ NOT NULL,	
updatedon TIMESTAMPTZ NULL, 
lastlogin TIMESTAMPTZ NULL,
isadmin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS patientregistration(
pkpatientid bigserial PRIMARY KEY,	
identifierselection VARCHAR(255) NOT NULL,
identifiervalue VARCHAR(255) NOT NULL,
healthinstitution VARCHAR(255) NOT NULL,
unitnumber VARCHAR(255) NOT NULL,
surname VARCHAR(255) NOT NULL,
name VARCHAR(255) NOT NULL,
dateofbirth DATE NOT NULL,
gender VARCHAR(50) NOT NULL,
address VARCHAR(255) NOT NULL,
homenumber VARCHAR(255) NOT NULL,
mobilenumber VARCHAR(255) NOT NULL,
emailaddress VARCHAR(255) NOT NULL,
height double precision NOT NULL, 
weight  double precision NOT NULL,
birthweight  double precision NOT NULL,
ethnicgroup VARCHAR(50) NOT NULL,
maritalstatus VARCHAR(50) NOT NULL,
occupation VARCHAR(255) NOT NULL,
currentemployment VARCHAR(255) NOT NULL,
previousoccupation VARCHAR(255) NOT NULL, 
primaryrenaldiagnosis VARCHAR(255) NOT NULL,
secondaryrenaldiagnosis VARCHAR(255) NOT NULL,
patientondialysis BOOLEAN NOT NULL,
latestcreatinine double precision NOT NULL,
egfr double precision NOT NULL,
latesthb double precision not null,
dateperformed date not null, 
createdon TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS assessment(
pkassessmentid bigserial PRIMARY KEY,	
pkpatientid bigserial NOT NULL,	
clinicalfrailtyscale integer NOT NULL,
smokingstatus VARCHAR(50) NOT NULL,
alcoholusedisorder VARCHAR(50) NOT NULL,
hepatitisb VARCHAR(50) NOT NULL,
hepatitisc VARCHAR(50) NOT NULL,
hiv VARCHAR(50) NOT NULL,  
createdon TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS healthinstitutions(
pkhealthinstitutionid bigserial PRIMARY KEY,	
code VARCHAR(255) NOT NULL,
description VARCHAR(255) NOT NULL,
createdon TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS hemodialysisunit(
pkhemodialysisunitid bigserial PRIMARY KEY,	
code VARCHAR(255) NOT NULL,
description VARCHAR(255) NOT NULL,
createdon TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS comorbiditiesmaster(
pkcomorbidityid bigserial PRIMARY KEY,	 
name VARCHAR(255) NOT NULL,
createdon TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS disabilitiesmaster(
pkdisabilityid bigserial PRIMARY KEY, 
name VARCHAR(255) NOT NULL,
createdon TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS comorbidities(
pkcomorbidityid bigserial PRIMARY KEY,	
pkassessmentid bigserial NOT NULL,
name VARCHAR(255) NOT NULL,
createdon TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS disabilities(
pkdisabilityid bigserial PRIMARY KEY,
pkassessmentid bigserial NOT NULL,	
name VARCHAR(255) NOT NULL,
createdon TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS stopdialysis(    
pkstopdialysisid bigserial PRIMARY KEY,	
pkpatientid bigserial NOT NULL,	
dateoflastdialysis date NOT NULL,
reason VARCHAR(255) NOT NULL,
dateofdeath date NOT NULL, 
causeofdeath VARCHAR(255) NOT NULL,
createdon TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS modeofdialysis(    
pkmodeofdialysisid bigserial PRIMARY KEY,	
pkpatientid bigserial NOT NULL,	
pkassessmentid bigserial NOT NULL,	
hdunit VARCHAR(255) NOT NULL,
accessonfirsthemodialysis VARCHAR(50) NOT NULL,
hemodialysisstartedinprivate boolean not null,
pdwholedaysbeforefirstexchange integer not null,
pdcatheterinsertiontechnique VARCHAR(255) NOT NULL, 
krtmodality VARCHAR(255) NOT NULL, 
dtmodechange DATE NOT NULL,
firstkrt BOOLEAN NOT NULL,
visitbeforekrt VARCHAR(255) NOT NULL, 
seendaysbeforekrt VARCHAR(255) NOT NULL, 
lastcreatininebeforekrt double precision NOT NULL,
lastegfrbeforekrt double precision NOT NULL,
lasthbbeforekrt double precision NOT NULL,
completedhepb VARCHAR(255) NOT NULL, 
dialysisdelay BOOLEAN NOT NULL,
daysofdelay VARCHAR(255) NOT NULL, 
whynotavgavf VARCHAR(255) NOT NULL, 
createdby VARCHAR(255) NOT NULL, 
hdunitcode VARCHAR(255) NOT NULL,
hdunitdescription VARCHAR(255) NOT NULL,
createdon TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS dialysis(
pkdialysisid bigserial PRIMARY KEY,	  
pkpatientid bigserial NOT NULL,	
pkassessmentid bigserial NOT NULL,	 
currentmodeofdialysis VARCHAR(50) NOT NULL,
ureareductionratio double precision NOT NULL,
postdialysisweight double precision NOT NULL,
dialysisefficiency double precision NOT NULL,
hdunit VARCHAR(255) NOT NULL,
lastaccessusedfordialysis VARCHAR(50) NOT NULL,
sessionsperweek integer NOT NULL,
hourspersession integer NOT NULL, 
hemoglobin double precision NOT NULL,
transferrinsaturation double precision NOT NULL,
calcium double precision NOT NULL,
bicarbonate double precision NOT NULL,
ferritin double precision NOT NULL,
glycosylatedhemoglobin double precision NOT NULL,
albumin double precision NOT NULL,
parathyroidhormone double precision NOT NULL,
phosphate double precision NOT NULL, 
esaweekly double precision NOT NULL,
esaeachtwoweeks double precision NOT NULL,
esaeachfourweeks double precision NOT NULL,
irondose double precision NOT NULL, 
insulin VARCHAR(50) NOT NULL,
sulphonylureas VARCHAR(50) NOT NULL,
dpp4i VARCHAR(50) NOT NULL,
glp1a VARCHAR(50) NOT NULL,
meglitinides VARCHAR(50) NOT NULL,
sglt2i VARCHAR(50) NOT NULL,
acarbose VARCHAR(50) NOT NULL,
metformin VARCHAR(50) NOT NULL,
other VARCHAR(50) NOT NULL, 
acei VARCHAR(50) NOT NULL,
arb VARCHAR(50) NOT NULL,
ccblocker VARCHAR(50) NOT NULL,
betablocker VARCHAR(50) NOT NULL,
alphablocker VARCHAR(50) NOT NULL,
centrallyacting VARCHAR(50) NOT NULL,
peripheralvasodilators VARCHAR(50) NOT NULL,
loopdiuretics VARCHAR(50) NOT NULL,
mineralocorticosteroidreceptorantagonists VARCHAR(50) NOT NULL,
thiazides VARCHAR(50) NOT NULL,
renininhibitors VARCHAR(50) NOT NULL,
others VARCHAR(50) NOT NULL, 
createdon TIMESTAMPTZ NOT NULL,
hdunitcode VARCHAR(255) NOT NULL,
hdunitdescription VARCHAR(255) NOT NULL,
pdexchangesperday text not null,
pdfluidlitresperday text not null,
pdadequacy text not null,
bp text not null,
whyntc text not null,
createdby text not null
);    


CREATE TABLE IF NOT EXISTS icd10table(    
pkicd10id bigserial PRIMARY KEY,	 
code VARCHAR(50) NOT NULL ,
description VARCHAR(255) NOT NULL 
);

CREATE TABLE IF NOT EXISTS TestTable(    
pktestid bigserial PRIMARY KEY,	 
values VARCHAR(255) NOT NULL 
);
INSERT INTO TestTable(values) VALUES('PostgreSQL Tutorial');


insert into comorbiditiesmaster(name,createdon) values ('Valvular Heart Diseases',current_timestamp);
insert into comorbiditiesmaster(name,createdon) values ('Malignancy',current_timestamp);
insert into comorbiditiesmaster(name,createdon) values ('Gangrene/septic foot',current_timestamp);
insert into comorbiditiesmaster(name,createdon) values ('Disease Lung chronic',current_timestamp);
insert into comorbiditiesmaster(name,createdon) values ('Disease Liver chronic',current_timestamp);
insert into comorbiditiesmaster(name,createdon) values ('PTCA/CABG',current_timestamp);
insert into comorbiditiesmaster(name,createdon) values ('Diabetes',current_timestamp);
insert into comorbiditiesmaster(name,createdon) values ('CVA Ischaemic',current_timestamp);
insert into comorbiditiesmaster(name,createdon) values ('CVA Haemorrhagic',current_timestamp);
insert into comorbiditiesmaster(name,createdon) values ('Amputation for PVD',current_timestamp);
insert into comorbiditiesmaster(name,createdon) values ('IHD Uncomplicated',current_timestamp);
insert into comorbiditiesmaster(name,createdon) values ('Cardiac Failure',current_timestamp);
insert into comorbiditiesmaster(name,createdon) values ('AF Non-valvular',current_timestamp);
insert into comorbiditiesmaster(name,createdon) values ('Acute Coronary Syndromes',current_timestamp);
insert into comorbiditiesmaster(name,createdon) values ('AA/angioplasty/stent/graft',current_timestamp);

insert into disabilitiesmaster(name,createdon) values ('Cognitive/Learning',current_timestamp);
insert into disabilitiesmaster(name,createdon) values ('Mobility',current_timestamp);
insert into disabilitiesmaster(name,createdon) values ('Sight impaired',current_timestamp);

CREATE TABLE IF NOT EXISTS eraedta(
pkeraedtaid bigserial PRIMARY KEY,
code integer NOT NULL,
description text NOT NULL
);

 
insert into healthinstitutions(code,description,createdon) values ('A','AG Jeetoo Hospital',current_timestamp);
insert into healthinstitutions(code,description,createdon) values ('B','Bruno Cheong Hospital',current_timestamp);
insert into healthinstitutions(code,description,createdon) values ('J','Jawaharlal Nehru Hospital',current_timestamp);
insert into healthinstitutions(code,description,createdon) values ('S','SSR National Hospital',current_timestamp);
insert into healthinstitutions(code,description,createdon) values ('V','Victoria Hospital',current_timestamp);
insert into healthinstitutions(code,description,createdon) values ('D','Clinique Darne',current_timestamp);
insert into healthinstitutions(code,description,createdon) values ('W','Wellkin Hospital',current_timestamp);
insert into healthinstitutions(code,description,createdon) values ('P','Private Practitioner',current_timestamp);



insert into hemodialysisunit(code,description,createdon) values ('MA1','AG Jeetoo H Main',current_timestamp);
insert into hemodialysisunit(code,description,createdon) values ('MA2','AG Jeetoo H Second',current_timestamp);
insert into hemodialysisunit(code,description,createdon) values ('MBB','B Cheong Hospital Main',current_timestamp);
insert into hemodialysisunit(code,description,createdon) values ('MJJ','J Nehru Hospital',current_timestamp);
insert into hemodialysisunit(code,description,createdon) values ('MJS','Souillac Hospital',current_timestamp);
insert into hemodialysisunit(code,description,createdon) values ('MSS','SSRN Hospital Main',current_timestamp);
insert into hemodialysisunit(code,description,createdon) values ('MSL','Long Mountain Hospital',current_timestamp);
insert into hemodialysisunit(code,description,createdon) values ('MVV','Victoria Hospital',current_timestamp);
insert into hemodialysisunit(code,description,createdon) values ('MHO','Home HD',current_timestamp);

insert into hemodialysisunit(code,description,createdon) values ('CCS','Christy Shifa Clinic',current_timestamp);
insert into hemodialysisunit(code,description,createdon) values ('CWH','Wellkin Hospital',current_timestamp);
insert into hemodialysisunit(code,description,createdon) values ('CNO','Clinique du Nord',current_timestamp);
insert into hemodialysisunit(code,description,createdon) values ('CAU','AURAM',current_timestamp);
insert into hemodialysisunit(code,description,createdon) values ('CNE','Clinique Nephron',current_timestamp);
insert into hemodialysisunit(code,description,createdon) values ('CPX','NDC, Phoenix',current_timestamp);

insert into hemodialysisunit(code,description,createdon) values ('PDA','Clinique Darne',current_timestamp);
insert into hemodialysisunit(code,description,createdon) values ('PWH','Wellkin Hospital',current_timestamp);
insert into hemodialysisunit(code,description,createdon) values ('PHO','Home HD',current_timestamp); 