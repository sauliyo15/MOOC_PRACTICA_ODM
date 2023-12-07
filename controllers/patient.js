// Cargamos los modelos para usarlos posteriormente
const Patient = require("../models/patient");

exports.list = async function () {
  try {
    const patients = await Patient.find();
    return patients;
  } catch (error) {
    console.error("Error leyendo los pacientes:", error);
    throw error;
  }
};

exports.read = async function (patientId) {
  try {
    const patient = await Patient.findOne({ _id: patientId });
    return patient;
  } catch (error) {
    console.error("Error al buscar el paciente:", error);
    throw error;
  }
};

exports.create = async function (body) {
    
};

exports.update = async function (patientId, body) {
  // Rellene aqui ...
  console.log("BODY: ", body);
  console.log("patientId: ", patientId);
};

exports.delete = async function (patientId) {
  // Rellene aqui ...
};

exports.filterPatientsByCity = async function (city) {
  // Rellene aqui ...
};

exports.filterPatientsByDiagnosis = async function (diagnosis) {
  // Rellene aqui ...
};

exports.filterPatientsBySpeacialistAndDate = async function (
  specialist,
  sDate,
  fDate
) {
  // Rellene aqui ...
};

exports.addPatientHistory = async function (patientId, medicalRecord) {
  // Rellene aqui ...
};
