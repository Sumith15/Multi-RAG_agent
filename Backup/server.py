import os
import http.server
import socketserver
import socket
import zipfile
import io

# === CONFIGURATION ===
# Where to save files received from the main laptop
STORAGE_FOLDER = "C:/Users/nukas/OneDrive/Desktop/server-storage" 
PORT = 8000
# =====================

if not os.path.exists(STORAGE_FOLDER):
    os.makedirs(STORAGE_FOLDER)

class StorageHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # 🟢 THE RETRIEVAL LOGIC (The "Button")
        if self.path == '/retrieve_all':
            print("🚀 Client requested all files. Zipping now...")
            
            # Create an in-memory zip of the storage folder
            memory_file = io.BytesIO()
            with zipfile.ZipFile(memory_file, 'w', zipfile.ZIP_DEFLATED) as zf:
                for root, dirs, files in os.walk(STORAGE_FOLDER):
                    for file in files:
                        file_path = os.path.join(root, file)
                        arcname = os.path.relpath(file_path, STORAGE_FOLDER)
                        zf.write(file_path, arcname)
            
            # Send the zip file back
            memory_file.seek(0)
            self.send_response(200)
            self.send_header('Content-type', 'application/zip')
            self.send_header('Content-Disposition', 'attachment; filename="server_backup.zip"')
            self.end_headers()
            self.wfile.write(memory_file.read())
            print("✅ Backup sent to client.")
        else:
            # Default behavior (useful for checking if server is up)
            super().do_GET()

    def do_POST(self):
        # 🔵 THE UPLOAD LOGIC (Real-time Sync)
        try:
            # Get the filename from headers
            filename = self.headers.get('Filename')
            if not filename:
                filename = "unknown_file.dat"
            
            # Read the file data
            content_length = int(self.headers.get('Content-Length', 0))
            file_data = self.rfile.read(content_length)
            
            # Save it
            save_path = os.path.join(STORAGE_FOLDER, filename)
            with open(save_path, 'wb') as f:
                f.write(file_data)
            
            print(f"📥 Received: {filename}")
            
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"Upload Received")
        except Exception as e:
            print(f"❌ Error: {e}")

def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

# Start the Server
my_ip = get_ip()
print(f"✅ SERVER RUNNING ON: {my_ip}")
print(f"📁 Saving files to: {STORAGE_FOLDER}")
print(f"👉 Use this IP in your client script: {my_ip}")

with socketserver.TCPServer(("0.0.0.0", PORT), StorageHandler) as httpd:
    httpd.serve_forever()