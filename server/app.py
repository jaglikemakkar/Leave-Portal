from flask import Flask, jsonify, render_template, url_for, request, session, redirect, Response
from flask_pymongo import PyMongo
from matplotlib.pyplot import connect
from pymongo import MongoClient
from flaskext.mysql import MySQL
from authlib.integrations.flask_client import OAuth
from flask_cors import CORS, cross_origin
import bcrypt
import random
import smtplib

app = Flask(__name__)
CORS(app, supports_credentials=True)

# oAuth Setup
oauth = OAuth(app)

credentials = open("C:\\Academics\\6th Sem\\CP301_DP\\oAuthCredentials.txt").readlines()
my_client_id = credentials[0].strip()
my_secret = credentials[1].strip()

google = oauth.register(
    name='google',
    client_id=my_client_id,
    client_secret=my_secret,
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',  # This is only needed if using openId to fetch user info
    client_kwargs={'scope': 'openid email profile'},
)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'jaglike'
app.config['MYSQL_DATABASE_DB'] = 'dep'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
db = MySQL(app)

success_code = Response(status=200)
failiure_code = Response(status=400)


def is_valid_email(email_id):
    connect = db.connect()
    cursor = connect.cursor()
    cursor.execute("SELECT * FROM user_auth WHERE email_id = %s",(email_id))
    data = cursor.fetchall()
    if not data:
        session.clear()
        return 0
    else:
        return 1

def get_user_data(email_id):
    connect = db.connect()
    cursor = connect.cursor()
    cursor.execute("SELECT * FROM user WHERE email_id = %s",(email_id))
    data = cursor.fetchall()
    return data
    

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login_oauth', methods = ['POST'])
def login_oauth():
    user_info = request.json["user_info"]
    email = user_info['email']
    if is_valid_email(email):
        session['logged_in'] = True
        session['user_info'] = user_info
        session.permanent = True
        data = get_user_data(email)
        return jsonify(data)
    else:
        return failiure_code


OriginalOTP = -1
def send_otp(email):
    global OriginalOTP
    OTP = random.randint(10**5,10**6-1)
    OriginalOTP = OTP
    msg = "You OTP is " + str(OTP)
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login("sangramjagadale2017@gmail.com", "ifitfwphppuwtgfl")
    s.sendmail('IIT Rpr Leave OTP',email,msg)

@app.route('/login_otp', methods = ['POST'])
def login_otp():
    email = request.json['email']
    if is_valid_email(email):
        send_otp(email)
        return success_code
    else:
        return failiure_code

@app.route('/validate_otp' , methods = ['POST'])
def validate_otp():
    otp = request.json['otp']
    print(otp , OriginalOTP,'==================')
    if str(otp) == str(OriginalOTP):
        return success_code
    else:
        return failiure_code

@app.route('/@me')
def get_current_user():
    if 'user_info' in session:
        return jsonify(session['user_info'])
    else:
        return jsonify("")

# @app.route('/register', methods=['POST', 'GET'])
# def register():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#         connect = db.connect()
#         cursor = connect.cursor()
#         cursor.execute("SELECT * FROM user_auth WHERE username = %s",(username))
#         data = cursor.fetchall()
#         if not data:
#             cursor.execute("INSERT INTO user_auth(username, password) VALUES (%s, %s)",(username, password))
#             connect.commit()
#             cursor.close()
#             session["logged_in"]=1
#             session["username"]=username
#             return render_template('home.html')
#         else:
#             return "Username already exists."
#     return render_template('register.html')

@app.route('/logout')
def logout():
    session.clear()
    return render_template('home.html')

if __name__ == '__main__':
    app.secret_key='secret123'
    app.run(debug=True)