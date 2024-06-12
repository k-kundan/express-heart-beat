import database from '../config/db';
import sequelize from 'sequelize';

let databaseInstance = new database().database;

export interface HeartRateInterface {
    patientId: string;
    measurement: string;
    uom: string;
    onDate: Date;
}

export const HeartRate: sequelize.Model<HeartRateInterface, {}> = databaseInstance.define<HeartRateInterface, {}>("HeartRate", {
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