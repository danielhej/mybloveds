from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///friends.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

frontend_folder = os.path.join(os.getcwd(), "..", "frontend", )
dist_folder = os.path.join(frontend_folder, "dist")

# Server Static Files From The <dist> Folder Under the <frontend> Directory


@app.route("/", defaults={"filename": ""})
@app.route("/<path:filename>")
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder, filename)


# Api Routs
import routes  # noqa: E402, F401

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
