import requests
import json
import pika
import searchResult

with open('../network.json') as network:
    networkData = json.load(network)
with open('../self.json') as me:
    meData = json.load(me)

def sendInfoRequest():
    url = 'http://localhost:8000'  # Replace with the actual server URL
    data = {'key': 'value'}  # Replace with the data you want to send in the request

    # Send POST request to the server
    response = requests.post(url, json=data)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Decode and print the response from the server
        response_data = json.loads(response.content)
        print("Response from server:", response_data.get("ip",""))
        connection = pika.BlockingConnection(pika.ConnectionParameters(response_data.get("ip",""), 5672, '/',
        pika.PlainCredentials(meData.get("rabitMQUser",""), meData.get("rabitMQPassword",""))))
        channel = connection.channel()
        def callback(ch, method, properties, body):
            print(f'{body} is received')
        channel.basic_consume(queue=meData["rabiMQQue"], on_message_callback=callback, auto_ack=True)
        channel.start_consuming()
    else:
        print("Error:", response.status_code)

if __name__ == '__main__':
    sendInfoRequest()
