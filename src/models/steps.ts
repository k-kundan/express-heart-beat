import database from '../config/db';
import sequelize from 'sequelize';

let databaseInstance = new database().database;

export interface StepInterface {
    patientId: string;
    measurement: string;
    uom: string;
    onDate: Date;
}

export const Step: sequelize.Model<StepInterface, {}> = databaseInstance.define<StepInterface, {}>("Step", {
    patientId: {
        type: sequelize.STRING,
        allowNull: false
    },
    measurement: {
        type: sequelize.STRING,
        allowNull: false
    },
    uom: {
        type: sequelize.STRING,
        allowNull: false
    },
    onDate: {
        type: sequelize.DATE,
        allowNull: false
    }
}, {
        timestamps: false
    });