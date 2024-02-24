import json
from flask import Flask, redirect, url_for, render_template, request
from flask_cors import CORS
import os
from openai import OpenAI
from TTS.utils.manage import ModelManager
from TTS.utils.synthesizer import Synthesizer

# Setup OpenAI key.
os.environ["OPENAI_API_KEY"] = "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"
client = OpenAI()

# Setup Flask app.
app = Flask(__name__)
CORS(app)

# Setup the TTS model.
model_json_path = "./TTS/TTS/.models.json"
model_manager = ModelManager(model_json_path)
model_name = "tacotron2-DCA"

model_path, config_path, model_item = model_manager.download_model(f"tts_models/en/ljspeech/{model_name}")
voc_path, voc_config_path, _ = model_manager.download_model(model_item["default_vocoder"])

syn = Synthesizer(
    tts_checkpoint=model_path,
    tts_config_path=config_path,
    vocoder_checkpoint=voc_path,
    vocoder_config=voc_config_path
)

# Setup dictionary of TTS processes.
tts_processes = dict()

@app.route("/chats/ask", methods=['POST'])
def askGPT():
    message = request.json
    print(message)
    print(message['question'])

    # completion = client.chat.completions.create(
    #     model="gpt-3.5-turbo",
    #     messages=[
    #         {
    #             "role": "user",
    #             "content": message['question'],
    #         },
    #     ],
    # )

    response = {'answer': 'the wff is a subwff of itself because the wff contains itself'}
    return response
    return(completion.choices[0].message.content)

@app.route("/admin/")
def admin():
    return redirect(url_for("user", name="unauthorized user"))

@app.route("/chats", methods=['POST','GET'])
def recieve_data():
    if request.method == "POST":
        data = request.get_data()
        data = json.loads(data)
        print(data)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/<name>")
def user(name):
    return f"Sup {name}."

if __name__ == "__main__":
    app.run()