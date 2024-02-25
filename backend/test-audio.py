from TTS.utils.manage import ModelManager
from TTS.utils.synthesizer import Synthesizer

path = "./TTS/TTS/.models.json"
model_manager = ModelManager(path)
model_name = "tacotron2-DCA"

model_path, config_path, model_item = model_manager.download_model(f"tts_models/en/ljspeech/{model_name}")
voc_path, voc_config_path, _ = model_manager.download_model(model_item["default_vocoder"])

syn = Synthesizer(
    tts_checkpoint=model_path,
    tts_config_path=config_path,
    vocoder_checkpoint=voc_path,
    vocoder_config=voc_config_path,
    verbose=False
)

text = "Our whole universe was in a hot, dense state. Then nearly fourteen billion years ago expansion started, wait.... The earth began to cool, the autotrophs began to drool. Neanderthals developed tools. We built a wall (we built the pyramids). Math, science, history, unraveling the mysteries That all started with the big bang."
outputs = syn.tts(text, split_sentences=True)
syn.save_wav(outputs, f"audio-{model_name}.wav")

text = "Eat feces. If you don't, then fuck you."
outputs = syn.tts(text, split_sentences=False)
syn.save_wav(outputs, f"audio-{model_name}2.wav")