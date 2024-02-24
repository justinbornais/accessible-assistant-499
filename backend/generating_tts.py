from TTS.utils.synthesizer import Synthesizer
import asyncio

def start_tts_generation(tts_processes, syn, input, id):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(generate_tts(tts_processes, syn, input, id))
    loop.close()

def first_letters(input):
    words = input.split()
    result = ''
    for word in words:
        if word:
            result += word[0]
    return result

async def generate_tts(tts_processes, syn: Synthesizer, input: str, id: str):
    try:
        tts_processes[id] = {"status": "processing", "path": id}
        outputs = syn.tts(input, split_sentences=True)
        syn.save_wav(outputs, f"audio/{id}.wav")
        tts_processes[id] = {"status": "done", "path": id}
    except:
        tts_processes[id] = {"status": "error"}