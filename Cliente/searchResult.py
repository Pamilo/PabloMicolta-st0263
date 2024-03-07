from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from search import Search
object_search = Search()

class RequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        ip = object_search.run()
        print(ip)
        object_search.nombre_archivo
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        response = {'ip': ip}
        self.wfile.write(json.dumps(response).encode('utf-8'))
        
def set_o_s_file(new_file_name):
    object_search.set_nombre_archivo(new_file_name)

def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    server_address = ('localhost', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()

def down_server():
    pass

if __name__ == '__main__':
    run()
