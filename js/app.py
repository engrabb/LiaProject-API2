import openai


openai.api_key = 'API_NYCKEL'

def generate_image(prompt, model="image-alpha-001", num_images=1):
    response = openai.Image.create(
        model=model,
        prompt=prompt,
        n=num_images,
    )
    image_urls = [result['url'] for result in response['data']]
    return image_urls


prompt = "A surreal landscape with floating islands"
generated_images = generate_image(prompt)


for image_url in generated_images:
    print(f"Generated Image: {image_url}")
