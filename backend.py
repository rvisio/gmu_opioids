import requests
from flask import Flask,Response,json
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route('/query/doctor/<npi>')
def getDoctorByNPI(npi):
    try:
        endpoint = 'https://npiregistry.cms.hhs.gov/api/?number=' + str(npi)
        r = requests.get(endpoint)

        response = Response(
            response=json.dumps(r.text),
            status=200,
            mimetype='application/json'
        )
        return response
    except:
        response = Response(
            status=500,
        )

        return response


@app.route('/geocode/<address>')
def geocodeAddress(address):
    endpoint = 'https://maps.googleapis.com/maps/api/geocode/json?address='
    apiKey = 'AIzaSyDjp_hwGsHn7ledcZ8VuGvtRKe63OjBgvg'


    try:
        requestEndpoint = endpoint+ str(address)+'&key=' + apiKey

        r = requests.get(requestEndpoint)

        response = Response(
            response = json.dumps(r.text),
            status=200,
            mimetype='application/json'
        )

        return response

    except:
        response = Response(
            status=500,
        )
        return response


#
# def queryDb(npi):
#     conn = pymssql.connect(server="[redacted]", user="[redacted]", password="[redacted]", database="[redacted]",
#                            port="666")
#
#     try:
#         cursor = conn.cursor()
#     except:
#         print('exception')
#
#     query = """SELECT * FROM [gmu data - raw].[dbo].[drugs_prescribed_by_doctor] where npi='"""+npi+"""'"""
#
#     df_verses = psql.read_sql(query,conn)
#
#     print(df_verses)
#
#     return



