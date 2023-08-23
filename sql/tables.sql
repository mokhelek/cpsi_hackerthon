CREATE TABLE patient (
    patient_id VARCHAR(13) NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    region TEXT NOT NULL,
    address TEXT NOT NULL,
	language TEXT NOT NULL,
	gender TEXT NOT NULL,
	contact TEXT NOT NULL
)

CREATE TABLE hospital (
    hospital_id SERIAL NOT NULL PRIMARY KEY,
    hospital_name TEXT NOT NULL,
    region TEXT NOT NULL,
    address TEXT NOT NULL,
    password VARCHAR(60) NOT NULL
)

CREATE TABLE doctor (
    doctor_id VARCHAR(13) NOT NULL PRIMARY,
    hospital_id INT,
    FOREIGN KEY (hospital_id) REFERENCES hospital(hospital_id)
    name TEXT NOT NULL
)


CREATE TABLE report (
    report_id SERIAL NOT NULL PRIMARY KEY,
    patient_id VARCHAR(13),
    FOREIGN KEY (patient_id) REFERENCES patient(patient_id),
    doctor_id VARCHAR(13),
    FOREIGN KEY (doctor_id) REFERENCES doctor(doctor_id),
    type TEXT NOT NULL,
    datetime TEXT NOT NULL,
    description TEXT NOT NULL
)