# App Setup

1) Install dependencies
    npm i

2) Change db config in config/db.ts or add .env file

3) Build the app
    npm run build

4) Run server
 npm run dev

# API Details

1) API to consume and process clinical metrics data 
URL: http://localhost:3000
path: /heart-rate
payload: clinical metrics data json data

response: {
    "message": "success",
    "result": {
        "clinical_data": {
            "HEART_RATE": {
                "uom": "beats/min",
                "data": [
                    {
                        "from_date": "2020-10-06T06:48:17.503Z",
                        "to_date": "2020-10-06T07:15:06.645Z",
                        "measurement": {
                            "low": "148",
                            "high": "66"
                        }
                    },
                    {
                        "from_date": "2020-10-06T07:15:06.645Z",
                        "to_date": "2020-10-06T07:38:24.969Z",
                        "measurement": {
                            "low": "162",
                            "high": "134"
                        }
                    }
                ],
                "name": "Heart Rate"
            },
            "WEIGHT": {
                "uom": "Kg",
                "name": "Weight"
            },
            "BLOOD_GLUCOSE_LEVELS": {
                "uom": "mmol/L",
                "name": "Blood Glucose"
            },
            "HEIGHT": {
                "uom": "cm",
                "name": "Height"
            },
            "BP": {
                "uom": "mmHg",
                "name": "Blood Pressure"
            },
            "STEPS": {
                "uom": "",
                "data": [
                    {
                        "on_date": "2020-10-05T13:00:00.000000Z",
                        "measurement": "11031",
                        "patientId": "gk6dhgh-9a60-4980-bb8b-787bf82689d7",
                        "onDate": "2020-10-05T13:00:00.000000Z",
                        "uom": ""
                    }
                ],
                "name": "Steps"
            }
        },
        "patient_id": "gk6dhgh-9a60-4980-bb8b-787bf82689d7",
        "from_healthkit_sync": true,
        "orgId": "8gj4djk6s-a5ad-444b-b58c-358dcbd72dc3",
        "timestamp": "2020-10-09T05:36:31.381Z"
    }
}