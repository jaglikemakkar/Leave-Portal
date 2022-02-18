from flask import Flask, render_template, url_for, request, session, redirect
from flask_pymongo import PyMongo
from matplotlib.pyplot import connect
from pymongo import MongoClient
from flaskext.mysql import MySQL
from authlib.integrations.flask_client import OAuth
import bcrypt

app = Flask(__name__)

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

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login', methods = ['GET', 'POST'])
def login():
    google = oauth.create_client('google')  # create the google oauth client
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri)


@app.route('/authorize')
def authorize():
    google = oauth.create_client('google')  # create the google oauth client
    token = google.authorize_access_token()  # Access token from google (needed to get user info)
    resp = google.get('userinfo')  # userinfo contains stuff u specificed in the scope
    user_info = resp.json()
    user = oauth.google.userinfo()  # uses openid endpoint to fetch user info
    
    print('============= USER INFO ==============')
    print(user_info, '\n')
    email_id = user_info['email']
    connect = db.connect()
    cursor = connect.cursor()
    cursor.execute("SELECT * FROM user_auth WHERE email_id = %s",(email_id))
    data = cursor.fetchall()
    if not data:
        session.clear()
        return render_template('home.html')
    else:
        session['logged_in'] = True
        session['profile'] = user_info
        session.permanent = True
        print('============= SESSION ==============')
        print(session, '\n')
        return redirect('/')


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
