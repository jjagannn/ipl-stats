from api.classes import ReadData
import os
import flask
import ssl
import json

from .api import app 

import flask_cors
#import pymongo
from flask_pymongo import PyMongo
#from pymongo.errors import BulkWriteError
from bson.json_util import dumps
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import pandas as pd
from bson.codec_options import CodecOptions
import pytz


cors = flask_cors.CORS()
# Initialize flask app for the example
app.debug = True
app.config['SECRET_KEY'] = 'top secret'
app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}
#app.config["MONGO_URI"] = "mongodb://localhost:27017/cricket_analysis"
app.config["MONGO_URI"] = "mongodb+srv://jagan-admin:Indial00ps@cluster0.wough.mongodb.net/cricket_analysis"

mongodb_client = PyMongo(app, ssl_cert_reqs=ssl.CERT_NONE)
#Database initialization
db = mongodb_client.db
# Initializes CORS so that the api_tool can talk to the example app
cors.init_app(app)

class NoSQLAPI:

    """
    def __init__(self):
        self._mongoClient = pymongo.MongoClient("mongodb+srv://jagan_j:<password>@cluster0.wough.mongodb.net/cricket_analysis?retryWrites=true&w=majority") #GS (tz_aware = True)
        self._mongodb = self._mongoClient.get_database(
            name="cricket_analysis",
            codec_options=CodecOptions(
                tz_aware=True,
                tzinfo=pytz.timezone('Australia/Sydney'),
            )
        )
    """

    def read_my_csv():
        csvPath = '/Users/jagannathan/Excellence/sample-app/matches.csv'
        dict_from_csv = pd.read_csv(csvPath, header=None, index_col=0, squeeze=True).to_dict()
        return dict_from_csv

    #def insertData2Mongo(self):
    #    try:
    #        mydb = db["cricket_analysis"]
    #        mycol = mydb["cricket_data"]
    3        #Calling function
    #        mylist = [NoSQLAPI.read_my_csv()]
    #        #INSERT operation
    #        x = mycol.insert_many(mylist)
    #        #print list of the _id values of the inserted documents:
    #        #print(x.inserted_ids)
    #    except Exception as e:
    #        print('A problem has occurred from the Problematic code: ', e)

    #def getTeamDataSearch(self, team, search):
        #self.team=team
        #team_data = db.cricket_data.find({'$or':[{'team1':{'$ne':team}}, {'team2':{'$ne':team}}]})
        #print(team_data)
        #resp = dumps(team_data)
        #return resp

    def allCricketData(self):
        cricket_data = db.cricket_data.find()
        #print(cricket_data)
        resp = dumps(cricket_data)
        #print(resp)
        return resp

    def getTeamData(self, team):
        self.team=team
        print(team)
        team_data = db.cricket_data.find({'team1':team})
        #team_data = db.cricket_data.find({'$or':[{'team1':{'$ne':team}}, {'team2':{'$ne':team}}]})
        #cricket_data = db.cricket_data.find({},{ "team1": team, "team2": team })
        print(team_data)
        resp = dumps(team_data)
        return resp

    def getTeams(self):
        teams = db.cricket_data.distinct("team1")
        print(type(teams))
        #cnt = len(teams)+1
        #num = range(cnt)
        #teamsData = {x:{x:item} for item in teams for x in num}
        #teamData =  {"teams":teams}
        final = {"team":teams}
        resp = json.dumps(final)
        
        print(resp)
        return resp

    def getVenueData(self, venue):
        self.venue=venue
        venue_data = db.cricket_data.find({'venue':{'$ne':venue}})
        print(venue_data)
        resp = dumps(venue_data)
        return resp

    def getCityData(self, city):
        self.city=city
        city_data = db.cricket_data.find({'city':{'$ne':city}})
        print(city_data)
        resp = dumps(city_data)
        return resp

    def seasonData(self,season):
        self.season=season
        season_data = db.cricket_data.find({'season':season})
        print(season_data)
        resp = dumps(season_data)
        return resp

    def users(self):
        users = db.user_data.find()
        print(users)
        resp = dumps(users)
        return resp

    @app.errorhandler(404)
    def not_found(error=None):
        message = {
            'status': 404,
            'message': 'Not Found: ' + flask.request.url,
        }
        resp = flask.jsonify(message)
        resp.status_code = 404

        return resp

# Run the example
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)