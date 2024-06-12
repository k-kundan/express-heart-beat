import { Request, Response } from 'express';
import database from '../config/db';
let databaseInstance = new database().database;
import { Patient } from '../models/patient';
import { HeartRate } from '../models/heart-rate'
import { Step } from '../models/steps'
import { Measurement, MeasurementInterface } from '../models/measurements'
import { processMetricDate } from '../utils/util';
import { ClinicalDataTypes } from '../types';

export class PatientController {
  
  constructor() { }

  async create(req: Request, res: Response) {
    const reqBody = req.body;
    const resData = req.body;
    const { clinical_data } = reqBody;
    let heartRateRecord = clinical_data['HEART_RATE'];
    let stepsRecord = clinical_data['STEPS'];
    const measurementRecord: MeasurementInterface[] = [];
    const clinicalDataKey = Object.keys(clinical_data);
    clinicalDataKey.forEach((key: string) => {
      const typeId = ClinicalDataTypes.indexOf(key.toUpperCase());
      measurementRecord.push({
        patientId: reqBody.patient_id,
        typeId: typeId,
        type: clinical_data[key],
        unit: clinical_data[key]['uom'],
        name: clinical_data[key].name || key.toLowerCase(),
        timestamp: reqBody.timestamp
      })
    });
    
    stepsRecord = clinical_data['STEPS'].data.map((step: any) => {
      step.patientId = reqBody.patient_id;
      step.onDate = step.on_date;
      step.uom = clinical_data['STEPS']['uom'];
      return step;
    });
    heartRateRecord = clinical_data['HEART_RATE'].data.map((rate: any) => {
      rate.patientId = reqBody.patient_id;
      rate.onDate = rate.on_date;
      rate.uom = clinical_data['HEART_RATE']['uom'];
      return rate;
    });
    const patientRecord = {
      patientId: reqBody.patient_id,
      orgId: reqBody.orgId,
      fromHealthkitSync: reqBody.from_healthkit_sync,
      timestamp: reqBody.timestamp
    };

    try {
      await databaseInstance.transaction(async t => {
        await Patient.create(
          patientRecord,
          { transaction: t },
        );
        await HeartRate.bulkCreate(
          heartRateRecord,
          { transaction: t },
        );

        await Measurement.bulkCreate(
          measurementRecord,
          {transaction: t}
        )

        await Step.bulkCreate(
          stepsRecord,
          { transaction: t },
        );
        resData.clinical_data.HEART_RATE.data = await processMetricDate(clinical_data['HEART_RATE'].data);
        res.json({
          message: 'success',
          result: resData
        });
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: 'failed',
        error: error
      });
    }
  }
}