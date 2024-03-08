import re
from TTS.utils.synthesizer import Synthesizer
from base64 import b64encode
import asyncio
import pydub
import os, time

def start_tts_generation(tts_processes, syn, id):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(generate_tts(tts_processes, syn, id))
    loop.close()

def first_letters(input):
    input = re.sub(r'[*&^$#@-]', '', input).replace("+", "").replace("\"", "").replace("'", "")
    words = input.split()
    result = ''
    for word in words:
        if word:
            result += word[0]
    return result

async def generate_tts(tts_processes, syn: Synthesizer, id: str):
    try:
        print(f"Generating audio ID: {id}")
        wav_path = f"audio/{id}.wav"
        abs_wav_path = os.path.abspath(wav_path)
        tts_processes[id]["status"] = "processing"
        text_to_synthesize = re.sub(r'[*&^$#@]', '', tts_processes[id]["answer"])
        text_to_synthesize = text_to_synthesize.replace("\n", ".").replace("\r", "").replace("...", ".").replace("..", ". ").replace(". .", ". ")
        print(f"Synthesizing text: {text_to_synthesize}")
        outputs = syn.tts(text_to_synthesize, split_sentences=True, max_decoder_steps=10000)
        syn.save_wav(outputs, wav_path)
        # sound = pydub.AudioSegment.from_wav(abs_wav_path)
        # sound.export(f"audio/{id}.mp3", format="mp3")

        # if os.path.exists(abs_wav_path):
        #     os.remove(abs_wav_path)
        tts_processes[id]["status"] = "done"
        print(f"Done generating audio ID: {id}")
    except Exception as e:
        tts_processes[id] = {"status": "error"}
        print(f"Error generating audio ID {id}: {str(e)}")

def get_audio(tts_processes, syn, id):
    field = tts_processes[id]
    print(field)
    while field:
        if field["status"] == "done":
            enc = b64encode(open(f"audio/{id}.wav", "rb").read()).decode('utf-8')
            return str(enc)
        elif field["status"] == "processing":
            time.sleep(0.5)
        else:
            start_tts_generation(tts_processes, syn, id)
            return "nope"

    return "nope"