import os
from openai import OpenAI
os.environ["OPENAI_API_KEY"] = "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"
client = OpenAI()

completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {
            "role": "user",
            "content": "Hello",
        },
    ],
)
print(completion.choices[0].message.content)