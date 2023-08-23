CREATE TABLE patient (
    patient_id VARCHAR(13) NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    region TEXT NOT NULL,
    address TEXT NOT NULL
)

CREATE TABLE hospital (
    hospital_id SERIAL NOT NULL PRIMARY KEY,
    hospital_name TEXT NOT NULL,
    region TEXT NOT NULL,
    address TEXT NOT NULL,
    password INT NOT NULL
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
    FOREIGN KEY (doctor_id) REFERENCES hospital(hospital_id),
    type TEXT NOT NULL,
    date TEXT NOT NULL,
    description TEXT NOT NULL
)