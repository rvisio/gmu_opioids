import requests
from flask import Flask,Response,json
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route('/query/doctor/<npi>')
def getDoctorByNPI(npi):
    endpoint = 'https://npiregistry.cms.hhs.gov/api/?number=' + str(npi)
    r = requests.get(endpoint)

    response = Response(
        response=json.dumps(r.text),
        status=200,
        mimetype='application/json'
    )

    return response


