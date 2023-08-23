export default function handleReport(db){ 

    async function addReport(patientId, doctorId, prescriptionType, date, description){
       await db.none(`INSERT INTO report(patient_id,doctor_id,type,date,description) VALUES ($1,$2,$3,$4,$5)`, [patientId,doctorId,prescriptionType,date,description] );
    }

    return {
        addReport
    };
}