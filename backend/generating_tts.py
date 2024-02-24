from TTS.utils.synthesizer import Synthesizer

async def generate_tts(tts_processes, syn: Synthesizer, input: str, id: str):
    try:
        tts_processes[id] = {"status": "processing", "path": id}
        outputs = syn.tts(input, split_sentences=True)
        syn.save_wav(outputs, f"audio.wav")
        tts_processes[id] = {"status": "done", "path": id}
    except:
        tts_processes[id] = {"status": "error"}