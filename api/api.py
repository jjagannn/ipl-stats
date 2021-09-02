import logging
#from flask import Flask
import flask
from flask_pymongo import PyMongo
import logging
from flask import request, Flask
app = Flask(__name__)

from bson.objectid import ObjectId
from .nosql_api import NoSQLAPI
from .sql_api import SQLAPI





class FlaskApp(Flask):

    def __init__(self, *args, **kwargs):
        super(FlaskApp, self).__init__(*args, **kwargs)
        #self.complex_object = create_my_object()

#Initialise sql and nosql instances
sql_api = SQLAPI()
nosql_api = NoSQLAPI()

@app.route('/api/addOneUser')
def add_one_user():
    sql_api.add()
    return {"message":"Added one user successfully"}

@app.route('/api/getAllUsers', methods=['GET'])
def users():
    users = nosql_api.users()
    return users

@app.route('/api/getAllCricketData', methods=['GET'])
def allCricketData():
    cricket_data = nosql_api.allCricketData()
    return cricket_data

@app.route('/api/getTeamData/<team>', methods=['GET'])
def teamData(team):
    print(team)
    #print(request.json)
    team_data = nosql_api.getTeamData(team)
    return team_data

@app.route('/api/getTeams', methods=['GET'])
def getTeams():
    team_data = nosql_api.getTeams()
    return team_data
    


#@app.route('/api/insertCSV', methods=['GET','POST','PUT','OPTIONS','PATCH'])
#def insertCSV():
#    try:
#        nosql_api.insertData2Mongo()
#        return {"message": "csv records have been uploaded to MongoDB"}
#    except Exception as e:
#        logging.info(e)
#        print('A problem has occurred from the Problematic code: ', e)
#    finally:
#        e=Exception
#        return {"message":f"finally{e}"}

@app.route('/api/login', methods=['POST'])
def login():
    req = flask.request.get_json(force=True)
    username = req.get('username', None)
    password = req.get('password', None)
    if username and password:
        ret = sql_api.login(username,password)
    return ret, 200

@app.route('/api/signup', methods=['POST'])
def signup():
    #Signing a user to the database by a POST request and redirect him to login page
    req = flask.request.get_json(force=True)
    username = req.get('username', None)
    password = req.get('password', None)
    if username and password:
        ret = sql_api.signup(username,password)
    return ret, 200

@app.route('/api/refresh', methods=['POST'])
def refresh():
    print("refresh request")
    old_token = flask.request.get_data()
    if old_token:
        ret = sql_api.refresh(old_token)
        return ret, 200

@app.route('/api/protected')
def protected():
        return sql_api.protected()


@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found: ' + flask.request.url,
    }
    resp = flask.jsonify(message)
    resp.status_code = 404

    return resp