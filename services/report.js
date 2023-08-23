export default function handleReport(db){ 

    async function addReport(patientName,patientId, prescriptionType, description){
       await db.none(`INSERT INTO report(patient_id,doctor_id,type,datetime,description,completed) VALUES ($1,$2,$3,$4,$5,$6)`, [patientId,'9818168745012',prescriptionType,'15-08-2023',description,false] );
    }

    return {
        addReport
    };
}