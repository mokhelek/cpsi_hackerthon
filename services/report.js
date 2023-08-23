export default function handleReport(db){ 

    async function addReport(patientId, doctorId, prescriptionType, date, description){
       await db.none(`INSERT INTO report(patient_id,doctor_id,type,datetime,description,completed) VALUES ($1,$2,$3,$4,$5)`, [patientId,doctorId,prescriptionType,date,description,false] );
    }

    return {
        addReport
    };
}