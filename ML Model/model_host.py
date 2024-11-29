import requests
from PIL import Image
from io import BytesIO
import matplotlib.pyplot as plt
import json
import tempfile
import os

from inference_sdk import InferenceHTTPClient

#The model is hosted at roboflow 
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="YoG4SVJnZZJMD9xWywUA"
)

def upload_and_infer(image_path, model_id):
    # Open the image file
    with open(image_path, "rb") as image_file:
        # Read the image
        image_data = image_file.read()
    
    # Save the image data to a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
        temp_file.write(image_data)
        temp_file_path = temp_file.name
    
    # Perform inference using the temporary file path
    result = CLIENT.infer(temp_file_path, model_id=model_id)
    
    # Remove the temporary file
    os.remove(temp_file_path)
    
    # Display the image with bounding boxes
    image = Image.open(BytesIO(image_data))
    plt.imshow(image)
    plt.axis('off')
    
    # Parse the result
    detections = result["predictions"]
    
    # Annotate the image with disease labels
    for detection in detections:
        label = detection["class"]
        x = detection["x"]
        y = detection["y"]
        w = detection["width"]
        h = detection["height"]
        
        # Draw the bounding box
        plt.gca().add_patch(plt.Rectangle((x - w / 2, y - h / 2), w, h, edgecolor='red', facecolor='none'))
        plt.text(x - w / 2, y - h / 2, label, color='red', fontsize=12, verticalalignment='top', bbox=dict(facecolor='white', alpha=0.5))
    
    # Show the image with annotations
    plt.show()

    # Display detected diseases
    if detections:
        print("Detected diseases:")
        for detection in detections:
            print(f"- {detection['class']}")
    else:
        print("No diseases detected.")


image_path = "eye_dis.jpeg"  
model_id = "multiple-fish-disease/3"
upload_and_infer(image_path, model_id)