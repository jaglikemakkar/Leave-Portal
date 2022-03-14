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

# credentials = open("C:\\Academics\\6th Sem\\CP301_DP\\oAuthCredentials.txt").readlines()
# my_client_id = credentials[0].strip()
# my_secret = credentials[1].strip()

# google = oauth.register(
#     name='google',
#     client_id=my_client_id,
#     client_secret=my_secret,
#     access_token_url='https://accounts.google.com/o/oauth2/token',
#     access_token_params=None,
#     authorize_url='https://accounts.google.com/o/oauth2/auth',
#     authorize_params=None,
#     api_base_url='https://www.googleapis.com/oauth2/v1/',
#     userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',  # This is only needed if using openId to fetch user info
#     client_kwargs={'scope': 'openid email profile'},
# )

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

def insert_leave(l):
    connect = db.connect()
    cursor = connect.cursor()
    cursor.execute("SELECT user_id, department FROM user WHERE email_id = %s",(l['email']))
    data = cursor.fetchall()
    user_id = data[0][0]
    department = data[0][1]

    cursor.execute("INSERT INTO leaves\
        (department, user_id, nature, purpose, is_station, request_date, start_date, end_date, duration, status, level) \
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (department, user_id, l['nature'], l['purpose'], l['isStation'], l['rdate'], l['sdate'], l['edate'], l['duration'], 'Pending', 'Faculty'))
    connect.commit()
    return 1


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
        print("======", session)
        return jsonify(data)
    else:
        return failiure_code


OriginalOTP = -1
def send_otp(email):
    global OriginalOTP
    OTP = random.randint(10**5,10**6-1)
    OriginalOTP = OTP
    msg = "Your OTP for IIT Rpr Leave Management Portal is " + str(OTP)
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
        print("HHHH", session['user_info'])
        return jsonify(session['user_info'])
    else:
        return jsonify("")

@app.route('/leave_application', methods=['POST'])
def leave_application():
    leave = request.json['state']
    status = insert_leave(leave)
    if status:
        return success_code
    else:
        return failiure_code
        
@app.route('/dashboard',methods = ["POST","GET"])
def dashboard():
    print('================' , session)
    email = session['user_info']['email']
    user_data = get_user_data(email)
    user_data = user_data[0]
    print(user_data)

    data = dict()
    data['name'] = user_data[1]
    data['email'] = user_data[2]
    data['level'] = user_data[3]
    data['department'] = user_data[4]
    data['total_leaves'] = user_data[5]
    data['av_leaves'] = user_data[6]
    data['imageURL'] = session['user_info']['imageUrl']

    return jsonify(data)

@app.route('/fetchLeaves', methods = ['POST'])
def fetchLeaves():
    user_id = request.json['user_id']
    connect = db.connect()
    cursor = connect.cursor()
    cursor.execute("SELECT * FROM leaves WHERE user_id = %s",(user_id))
    data = cursor.fetchall()
    payload = []
    for i in data:
        # department, user_id, nature, purpose, is_station, request_date, start_date, end_date, duration, status, level
        content = {'id': i[0], 'department': i[1], 'user_id': i[2],'nature': i[3],'purpose': i[4],'is_station': i[5],'request_date': i[6],'start_date': i[7],'end_date': i[8], 'authority_comment': i[9], 'duration': i[10],'status': i[11],'level': i[12]}
        payload.append(content)
        
    return jsonify(result=payload)

@app.route('/check_leaves',methods = ['GET','POST'])
def check_leaves():
    email = session['user_info']['email']
    data = get_user_data(email)[0]
    user_id = data[0]
    user_id = request.json['user_id']
    connect = db.connect()
    cursor = connect.cursor()
    cursor.execute('SELECT department FROM user WHERE user_id = %s',(user_id))
    department = cursor.fetchall()[0][0]
    cursor.execute('SELECT * FROM leaves WHERE\
         department = %s and status = %s and level = %s',(department,"pending", "Faculty"))
    leaves = cursor.fetchall()
    payload = []
    for i in leaves:
        content = {'id': i[0], 'department': i[1], 'user_id': i[2],'nature': i[3],'purpose': i[4],'is_station': i[5],'request_date': i[6],'start_date': i[7],'end_date': i[8], 'authority_comment': i[9], 'duration': i[10],'status': i[11],'level': i[12]}
        user_id = i[2]
        connect = db.connect()
        cursor = connect.cursor()
        cursor.execute('SELECT email_id FROM user WHERE user_id = %s',(user_id))
        data = cursor.fetchall()
        email = data[0][0]
        content['email'] = email
        payload.append(content)
    return jsonify(result = payload)

@app.route('/approve_leave', methods = ['POST'])
def approve_leave():
    leave_id = request.json['leave_id']
    connect = db.connect()
    cursor = connect.cursor()
    cursor.execute("UPDATE leaves SET status = 'Approved By Hod' WHERE leave_id = %s",(leave_id))
    connect.commit()
    return success_code
    
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
    return success_code

if __name__ == '__main__':
    app.secret_key='secret123'
    app.run(debug=True)