// IMPORTS
const path = require('path');
const Utils = require('../utils/testutils');
const T_TEST = 2 * 60; // Time between tests (seconds)
const controller = require('../../controllers/patient');
const Patient = require('../../models/patient');
const mongo = require('../utils/test_helper');
const mongoose = require('mongoose');

// CRITICAL ERRORS
let error_critical = null;
let testPatient;

beforeEach( async () => {
	const data = [
	   {
			name: 'Juan',
			surname: 'Rodriguez',
			dni: '123123',
			city: "Madrid",
			profession: [
				"Frutero",
				"Monitor de tiempo libre"
			],
			medicalHistory: [
				{
					"specialist": "Medico de cabecera",
					"diagnosis": "Resfriado",
					"date": new Date( 2017,4,4)
				},
				{
					"specialist": "Dermatólogo",
					"diagnosis": "Escorbuto",
					"date": new Date( 2016,11,14)
				}
			]
		},
		{
			name: 'Andres',
			surname: 'Lopez',
			dni: '222333',
			city: "Cuenca",
			profession: [
				"Futbolista"
			],
			medicalHistory: [
				{
					"specialist": "Medico de cabecera",
					"diagnosis": "Resaca",
					"date": new Date( 2018,11,14)
				},
				{
					"specialist": "Traumatologo",
					"diagnosis": "Fractura de ligamento cruzado",
					"date": new Date( 2015,5,14)
				},
				{
					"specialist": "Traumatologo",
					"diagnosis": "Esguince de tobillo",
					"date": new Date( 2016,4,24)
				}
			]
		},
		{
			name: 'Carlos',
			surname: 'Lechon',
			dni: '333444',
			city: "Madrid",
			profession: [
				"Lechero",
				"Repartidor"
			],
			medicalHistory: [
				{
					"specialist": "Reumatologo",
					"diagnosis": "Osteoporosis",
					"date": new Date( 2016,5,14)
				},
				{
					"specialist": "Medico de cabecera",
					"diagnosis": "Resfriado",
					"date": new Date( 2017,1,5)
				}
			]
		},
		{
			name: 'Diana',
			surname: 'Pintor',
			dni: '555666',
			city: "Melilla",
			profession: [
				"Pintora",
				"Directora de subastas"
			],
			medicalHistory: [
				{
					"specialist": "Medico de cabecera",
					"diagnosis": "Diarrea aguda",
					"date": new Date( 2016,5,14)
				},
				{
					"specialist": "Traumatologo",
					"diagnosis": "Síndrome del tunel carpiano",
					"date": new Date( 2019,3,15)
				}
			]
		},
		{
			name: 'Raquel',
			surname: 'Dueñas',
			dni: '666777',
			city: "Barcelona",
			profession: [
				"Chef",
				"Ayudante de cocina",
				"Camarero"
			],
			medicalHistory: [
				{
					"specialist": "Cardiologo",
					"diagnosis": "Arritmia",
					"date": new Date( 2019,3,26)
				},
				{
					"specialist": "Medico de cabecera",
					"diagnosis": "Dermatitis",
					"date": new Date( 2017,1,5)
				}
			]
		},
		{
			name: 'Mario Alejandro',
			surname: 'Arcentales',
			dni: '777888',
			city: "Oviedo",
			profession: [
				"Minero"
			],
			medicalHistory: [
				{
					"specialist": "Endocrino",
					"diagnosis": "Anemia crónica",
					"date": new Date( 2018,10,26)
				},
				{
					"specialist": "Neumologo",
					"diagnosis": "Silicosis",
					"date": new Date( 2019,10,5)
				}
			]
		},
		{
			_id: new mongoose.Types.ObjectId('5e4a60fb7be8f229b54a16cb'),
			name: 'Ana',
			surname: 'Durcal',
			dni: '555555',
			city: "Huelva",
			profession: [
				"Frutera",
				"Monitora de tiempo libre"
			],
			medicalHistory: []
		}

	];
	testPatient = {
		_id: new mongoose.Types.ObjectId('5e3a60fb7be8f029b54a16c9'),
		name: 'Ana',
		surname: 'Durcal',
		dni: '555555',
		city: "Huelva",
		profession: [
			"Frutera",
			"Monitora de tiempo libre"
		],
		medicalHistory: []
	};
	test = await Patient.collection.insertMany(data);
});

//TESTS
describe("BBDD Tests", function () {
	describe('Creating Patient', function() {
        it('Creating a new Patient', async function() {
            this.score = 1;
            this.msg_err = "The patient has not been created correctly"
            this.msg_ok = "Patient created correctly!"
            const patient = await controller.create(testPatient)
            const patientD = await Patient.findOne({ _id: '5e3a60fb7be8f029b54a16c9' });
            should.equal(!testPatient.isNew, true) ;
            should.equal(patient.toString(), patientD.toString()) ;

        });
    });
    describe('Get Patients list', function() {
        it('Getting the list of all available patients', async function() {
            this.score = 1;
            this.msg_err = "The patients have not been listed correctly"
            this.msg_ok = "Patients listed correctly!"
            const patients = await controller.list();
            should.equal(patients.length, 7)
            should.equal(typeof patients[0], 'object');

        })
    });

    describe('Reading Patient details',function() {
        it('Finding patient with the id 5e4a60fb7be8f229b54a16cb', async function() {
            this.score = 1;
            this.msg_err = "The patient with the id 5e4a60fb7be8f229b54a16cb has not been shown correctly";
            this.msg_ok = "Patient shown correctly!";
            const patient = await controller.read('5e4a60fb7be8f229b54a16cb');
            should.equal(patient._id.toString(), '5e4a60fb7be8f229b54a16cb');
        })
    });

    describe('Update Patient record', function() {
        it('Updating Patient with the id 5e4a60fb7be8f229b54a16cb', async function(){
            this.score = 1;
            this.msg_err = "The patient with the id 5e4a60fb7be8f229b54a16cb has not been updated correctly"
            this.msg_ok = "Patient updated correctly!";
            const patient = await controller.update({ _id: '5e4a60fb7be8f229b54a16cb' },{dni:'777777'});
            const patientD = await Patient.findOne({ _id: '5e4a60fb7be8f229b54a16cb' });
            should.equal(patient.dni,patientD.dni);
        })
    });

    describe('Find Patients by City', function()  {
        it('Finding Patients with city= Madrid', async function(){
            this.score = 1.5;
            this.msg_err = "The patients with city= Madrid have not been retrieved correctly"
            this.msg_ok = "Patients retrieved correctly!";
            const patients= await controller.filterPatientsByCity('Madrid');
			should.equal(patients.length , 2);
			should.equal(typeof patients[0], 'object');
			const patients2 = await controller.filterPatientsByCity('Barcelona');
			should.equal(patients2.length , 1);
			should.equal(typeof patients2[0], 'object');

        })
    });

	describe('Filter Patients by Diagnosis', function() {
		it('Filtering Patients with Diagnosis= Osteoporosis', async function() {
            this.score = 1.5;
            this.msg_err = "The patients with Diagnosis= Osteoporosis have not been retrieved correctly"
            this.msg_ok = "Patients with Diagnosis= Osteoporosis have been retrieved correctly!";
            const patients= await controller.filterPatientsByDiagnosis('Osteoporosis');
            should.equal(patients.length, 1);
            should.equal(typeof patients[0], 'object');
            this.msg_err = "The patients with Diagnosis= Resfriado have not been retrieved correctly"
            this.msg_ok = "Patients with Diagnosis= Resfriado have been retrieved correctly!";
            const patients2= await controller.filterPatientsByDiagnosis('Resfriado');
            should.equal(patients2.length, 2);
            should.equal(typeof patients2[0], 'object');
		})
	});

	/*describe('Filter Patients by Speacialist And Date', function() {
		it('Filtering Patients with Speacialist= Medico de cabecera and dates between 2016-04-14 to 2016-07-15', async function() {
            this.score = 1.5;
            this.msg_err = "The patients Speacialist= Medico de cabecera and dates between 2016-04-14 to 2016-07-15 have not been retrieved correctly"
            this.msg_ok = "Patients with Speacialist= Medico de cabecera and dates between 2016-04-14 to 2016-07-15 have been retrieved correctly!";
            const patients= await controller.filterPatientsBySpeacialistAndDate('Medico de cabecera',new Date(2016, 4, 14),
				new Date(2016, 7, 15));
            should.equal(patients.length ,1 );
            should.equal(typeof patients[0], 'object');
		})
	});*/

	describe('Add Patient History', function() {
		it('Adding record to Patient with the id 5e4a60fb7be8f229b54a16cb', async function() {
            this.score = 2;
            this.msg_err = "The medical record has not been added correctly to the patient with id 5e4a60fb7be8f229b54a16cb"
            this.msg_ok = "The medical record has been added correctly to the patient with id 5e4a60fb7be8f229b54a16cb!";
			var record = {"specialist" : "Endocrinologo", "diagnosis" : "Diabetes", "date" : new Date(2019,10,5) };
            const patient= await controller.addPatientHistory({ _id: '5e4a60fb7be8f229b54a16cb' },record)
            const patient2= await controller.addPatientHistory({ _id: '5e4a60fb7be8f229b54a16cb' },record)
            should.equal(patient.medicalHistory[0].specialist, 'Endocrinologo');
            should.equal(patient.medicalHistory[0].diagnosis,'Diabetes');
            should.equal(patient2.medicalHistory[1].diagnosis,'Diabetes');
            should.equal(patient2.medicalHistory[1].specialist, 'Endocrinologo');
		})
	});

	describe('Remove Patient by ID', function() {
		it('Removing Patient with the ID 5e4a60fb7be8f229b54a16cb', async function() {
            this.score = 1;
            this.msg_err = "The Patient with the ID 5e4a60fb7be8f229b54a16cb has not been removed correctly"
            this.msg_ok = "The Patient with the ID 5e4a60fb7be8f229b54a16cb has been removed correctly!";
            const patient= await controller.delete('5e4a60fb7be8f229b54a16cb');
			const patientD = await Patient.findOne({ _id: '5e4a60fb7be8f229b54a16cb' });
			should.equal(patientD , null);
		})
	});

});
