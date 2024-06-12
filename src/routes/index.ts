import { Router } from 'express';
import { PatientController } from '../controllers/patient';

export default class MainRouter {

    router: Router;
    patientController: PatientController;

    constructor() {

        this.patientController = new PatientController();

        this.router = Router({ mergeParams: true });
        this.userRoutes();

    }

    private userRoutes() {
        this.router.route('/heartrate')
            .post(this.patientController.create);
    }


}