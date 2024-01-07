import json
from flask import Flask, redirect, url_for, render_template, request
import os
from openai import OpenAI
os.environ["OPENAI_API_KEY"] = "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"
client = OpenAI()
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")
@app.route("/chats", methods=['POST','GET'])
def recieve_data():
    if request.method == "POST":
        data = request.get_data()
        data = json.loads(data)
        print(data)
@app.route("/<name>")
def user(name):
    return f"Sup {name}."

@app.route("/admin/")
def admin():
    return redirect(url_for("user", name="unauthorized user"))

if __name__ == "__main__":
    app.run()

def askGPT(message):
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
            {
                "role": "user",
                "content": message,
            },
        ],
    )
    return(completion.choices[0].message.content)