export default function handleReport(db){ 

    async function addReport(patientName,patientId, prescriptionType, description, dateTime ){
       await db.none(`INSERT INTO report(patient_id,doctor_id,type,datetime,description,completed) VALUES ($1,$2,$3,$4,$5,$6)`, [patientId,'9818168745012',prescriptionType, dateTime,description,false] );
    }

    return {
        addReport
    };
}