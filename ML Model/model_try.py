import requests
from PIL import Image
from io import BytesIO
import matplotlib.pyplot as plt
import tempfile
import os

from inference_sdk import InferenceHTTPClient

# Initialize the inference client with Roboflow
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="YoG4SVJnZZJMD9xWywUA"
)

def upload_and_infer(image_path, model_id):
    try:
        # Open the image file
        with open(image_path, "rb") as image_file:
            # Read the image data
            image_data = image_file.read()

        # Save the image data to a temporary file as required by the infer method
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
            temp_file.write(image_data)
            temp_file_path = temp_file.name
        
        # Perform inference using the temporary file path
        result = CLIENT.infer(temp_file_path, model_id=model_id)

        # Remove the temporary file after inference
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
            plt.gca().add_patch(
                plt.Rectangle((x - w / 2, y - h / 2), w, h, 
                              edgecolor='red', facecolor='none', linewidth=2)
            )
            plt.text(
                x - w / 2, y - h / 2, label, color='red', fontsize=12, 
                verticalalignment='top', 
                bbox=dict(facecolor='white', alpha=0.5)
            )

        # Show the image with annotations
        plt.show()

        # Display detected diseases
        if detections:
            print("Detected diseases:")
            for detection in detections:
                print(f"- {detection['class']} with confidence: {detection['confidence']:.2f}")
        else:
            print("No diseases detected.")

    except Exception as e:
        print(f"Error during inference: {e}")

# Provide the path to the image and model ID
image_path = "eye.jpeg"
model_id = "multiple-fish-disease/3"
upload_and_infer(image_path, model_id)