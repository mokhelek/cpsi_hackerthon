export default function handleReport(db){ 

    async function addReport(){
       await db.none('INSERT INTO report(patient_id,doctor_id,type,date,description) VALUES ($1,$2,$3,$4,$5)', ['0105158745012','9818168745012','Prescription','12-25-2023','a detailed description from a doctor about the patient'] );
    }




}