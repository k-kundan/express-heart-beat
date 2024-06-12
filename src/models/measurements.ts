import database from '../config/db';
import sequelize from 'sequelize';

let databaseInstance = new database().database;

export interface MeasurementInterface {
    patientId: string
    typeId: number;
    type: string;
    unit: number;
    name: string;
    timestamp: Date;
}

export const Measurement: sequelize.Model<MeasurementInterface, {}> = databaseInstance.define<MeasurementInterface, {}>("Measurement", {
    patientId: {
        type: sequelize.STRING,
        allowNull: false
    },
    typeId: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    unit: {
        type: sequelize.STRING,
        allowNull: false
    },
    timestamp: {
        type: sequelize.DATE,
        allowNull: false
    }
}, {
        timestamps: false
    });