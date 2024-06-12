import database from '../config/db';
import sequelize from 'sequelize';

let databaseInstance = new database().database;

export interface PatientInterface {
    patientId: string;
    orgId: string;
    fromHealthkitSync: boolean;
    timestamp: Date;
}

export const Patient: sequelize.Model<PatientInterface, {}> = databaseInstance.define<PatientInterface, {}>("Patient", {
    patientId: {
        type: sequelize.STRING,
        primaryKey: true
    },
    orgId: {
        type: sequelize.STRING,
        allowNull: false
    },
    fromHealthkitSync: {
        type: sequelize.BOOLEAN,
        allowNull: false
    },
    timestamp: {
        type: sequelize.DATE,
        allowNull: false
    }
}, {
        timestamps: false
    });