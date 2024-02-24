from TTS.utils.manage import ModelManager
from TTS.utils.synthesizer import Synthesizer

path = "./TTS/TTS/.models.json"
model_manager = ModelManager(path)
model_name = "speedy-speech"

model_path, config_path, model_item = model_manager.download_model(f"tts_models/en/ljspeech/{model_name}")
voc_path, voc_config_path, _ = model_manager.download_model(model_item["default_vocoder"])

syn = Synthesizer(
    tts_checkpoint=model_path,
    tts_config_path=config_path,
    vocoder_checkpoint=voc_path,
    vocoder_config=voc_config_path
)

text = "Our whole universe was in a hot, dense state. Then nearly fourteen billion years ago expansion started, wait.... The earth began to cool, the autotrophs began to drool. Neanderthals developed tools. We built a wall (we built the pyramids). Math, science, history, unraveling the mysteries That all started with the big bang."
outputs = syn.tts(text)
syn.save_wav(outputs, f"audio-{model_name}.wav")

text = "If there's a third world war, then all countries will go crazy and blow stuff up. It will be so serious that Joe Biden will even put down his chocolate chocolate-chip ice cream to give a press conference."
outputs = syn.tts(text)
syn.save_wav(outputs, f"audio-{model_name}2.wav")