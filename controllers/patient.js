// Cargamos los modelos para usarlos posteriormente
const Patient = require('../models/patient');

exports.list = async function() {
    // Rellene aqui ...
    console.log("entra en el método list")
    const patients = await Patient.find();
    console.log("patients: ", patients);
    return patients;
}

exports.read = async function(patientId) {
    // Rellene aqui ...
}

exports.create = async function(body) {
    // Rellene aqui ...
    console.log("BODY: ", body);

}

exports.update= async function(patientId, body) {
    // Rellene aqui ...
    console.log("BODY: ", body);
    console.log("patientId: ", patientId);
}

exports.delete = async function(patientId) {
    // Rellene aqui ...
}

exports.filterPatientsByCity = async function (city) {
    // Rellene aqui ...
}

exports.filterPatientsByDiagnosis = async function (diagnosis) {
    // Rellene aqui ...
}

exports.filterPatientsBySpeacialistAndDate = async function (specialist, sDate,fDate) {
    // Rellene aqui ...
}

exports.addPatientHistory = async function (patientId, medicalRecord) {
    // Rellene aqui ...
}