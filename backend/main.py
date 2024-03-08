import json
from flask import Flask, redirect, url_for, render_template, request
from flask_cors import CORS
import os
from openai import OpenAI
from TTS.utils.manage import ModelManager
from TTS.utils.synthesizer import Synthesizer
import asyncio
from threading import Thread
from generating_tts import first_letters, start_tts_generation, get_audio

# Setup OpenAI key.
os.environ["OPENAI_API_KEY"] = "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"
client = OpenAI()

# Setup Flask app.
app = Flask(__name__)
CORS(app)

if not os.path.exists("audio"):
    os.makedirs("audio")

# Setup the TTS model.
model_json_path = "./.models.json"
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

@app.route("/chats/get-audio", methods=['GET'])
def getAudio():
    id = request.args.get("id")
    print(id)
    data = get_audio(tts_processes, syn, id)
    print(data[:10])
    return {'data': data}
@app.route("/chats/generateImage",methods=['POST'])
def generateImg():
    message = request.json
    print(message['question'])
    #Insert image generation API code
    answer = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAATXAJyEPVcLcgVaRS_FtRngDPJQh916rZGDEyI6fA%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1&ipt=66f6058cc652007677362d877207a93afc81be95e5af41873715447926556b3c&ipo=images"
    response = {'answer':answer}
    return response

@app.route("/chats/ask", methods=['POST'])
def askGPT():
    message = request.json
    print(message)
    print(message['question'])
    question = f"{message['question']}\n\nPlease make your answer very concise and use simple words. Surround important words with two asterisks (**). Separate every two sentences with two line breaks."

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": question,
            },
        ],
    )
    answer = "The well-formed formula is a sub well-formed formula of itself because the well-formed formula contains itself."
    answer = completion.choices[0].message.content
    id = first_letters(answer)
    response = {'answer': answer, "response-id": id}
    tts_processes[id] = {"status": "msg", "path": id, "answer": answer}
    Thread(target=start_tts_generation, args=(tts_processes,syn,id,)).start()
    
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