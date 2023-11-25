import openai

# optional; defaults to `os.environ['OPENAI_API_KEY']`
openai.api_key = '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'

# all client options can be configured just like the `OpenAI` instantiation counterpart
# openai.base_url = "https://..."
openai.default_headers = {"x-foo": "true"}

completion = openai.chat.completions.create(
    model="gpt-3.5-turbo-instruct",
    messages=[
        {
            "role": "user",
            "content": "How do I output all files in a directory using Python?",
        },
    ],
)
print(completion.choices[0].message.content)