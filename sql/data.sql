
INSERT INTO patient (patient_id, name, region, address, language, gender, contact) values (78910111213, "Timetheus", "Western Cape", "Khayelitsha Site B", "Zulu", "Male", "0767389883"),
INSERT INTO patient (patient_id, name, region, address, language, gender, contact) values (91011121314, "Zen", "Eastern Cape", "Maclear", "Xhosa", "Female", "0678393993"),
INSERT INTO patient (patient_id, name, region, address, language, gender, contact) values (91011121315, "Timothy", "Eastern Cape", "Tsolo mbidlana", "Xhosa", "Male", "0783637772"),
INSERT INTO patient (patient_id, name, region, address, language, gender, contact) values (96773899999, "Sive", "Western Cape", "Khayelitsha Site C", "Zulu", "Female", "079382222"),
INSERT INTO patient (patient_id, name, region, address, language, gender, contact) values (99738930382, "Teddy", "Western Cape", "Mandalay", "Zulu", "Male", "0723334445"),
INSERT INTO patient (patient_id, name, region, address, language, gender, contact) values (63788993937, "Jarred", "Eastern Cape", "Khayelitsha Site C", "Xhosa", "mMle", "0777389883"),
INSERT INTO patient (patient_id, name, region, address, language, gender, contact) values (00037385367, "Roxanne", "Western Cape", "Khayelitsha Spine Road", "Xhosa", "Female", "0785565744"),
INSERT INTO patient (patient_id, name, region, address, language, gender, contact) values (00037385367, "Leonardo", "Eastern Cape", "Mitchells plain", "Tshwana", "Male", "0796768432"),
INSERT INTO patient (patient_id, name, region, address, language, gender, contact) values (00037385367, "Mikayla", "Western Cape", "Khayelitsha Site C", "Xhosa", "Male", "0654638992"),
INSERT INTO patient (patient_id, name, region, address, language, gender, contact) values (00037385367, "Nick", "Western Cape", "Pinelands", "English", "Male", "0612345647"),
INSERT INTO patient (patient_id, name, region, address, language, gender, contact) values (00037385367, "Katleho", "Free State", "Pitoli", "Tshwana", "Male", "0768880044"),

INSERT INTO patient (doctor_id, department, role, hospital_id, name, password) values (1234567891011, "Dr David Jeremiah", 'Hospital', 'Doctor', 1, '$2b$10$HczQxpCnf.IcZKu8vSp97Oi21f6Oc48XBvkixArHLUNugmMuLFXOy'),
INSERT INTO patient (doctor_id, department, role, hospital_id, name, password) values (5678910111213, "Lovina", 'Clinic', 'Nurse', NULL, '$2b$10$HczQxpCnf.IcZKu8vSp97Oi21f6Oc48XBvkixArHLUNugmMuLFXOy'),
INSERT INTO patient (doctor_id, department, role, hospital_id, name, password) values (3456789101112, "Dr Samthing", , 'Hospital', 'Doctor', 2, '$2b$10$HczQxpCnf.IcZKu8vSp97Oi21f6Oc48XBvkixArHLUNugmMuLFXOy'),

INSERT INTO patient (department, role, hospital_id, name, password) values ("Lovina", 'Clinic', 'Nurse', 1, '$2b$10$HczQxpCnf.IcZKu8vSp97Oi21f6Oc48XBvkixArHLUNugmMuLFXOy'),
INSERT INTO patient (department, role, hospital_id, name, password) values ("Dr Samthing", , 'Hospital', 'Doctor', 1, '$2b$10$HczQxpCnf.IcZKu8vSp97Oi21f6Oc48XBvkixArHLUNugmMuLFXOy'),

INSERT INTO report (patient_id, type, datetime, description, completed) values (78910111213, 'Appointment', datetime),