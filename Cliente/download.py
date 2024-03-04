import requests
import json
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('127.0.0.1', 5672, '/',
pika.PlainCredentials('user', 'password')))
channel = connection.channel()
nombreArchivo = 'ejemplo'
params = {'ip':'127.0.0.1','archivo':nombreArchivo}
channel.basic_publish(exchange='my_exchange', routing_key='test', body=params)
print("Runnning Producer Application...")

connection.close()

def send_request():
    url = 'http://localhost:8000'  # Replace with the actual server URL
    data = {'key': 'value'}  # Replace with the data you want to send in the request

    # Send POST request to the server
    response = requests.post(url, json=data)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Decode and print the response from the server
        response_data = json.loads(response.content)
        print("Response from server:", response_data["ip"])
    else:
        print("Error:", response.status_code)

if __name__ == '__main__':
    send_request()
