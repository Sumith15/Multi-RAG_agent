import qrcode
import socket
import os

# 1. Get your Local IP Address automatically
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))
local_ip = s.getsockname()[0]
s.close()

# 2. Create the URL for the Mobile Server
mobile_url = f"http://{local_ip}:8000"
print(f"Generating QR Code for: {mobile_url}")

# 3. Generate QR Image
qr = qrcode.QRCode(box_size=10, border=4)
qr.add_data(mobile_url)
qr.make(fit=True)
img = qr.make_image(fill_color="black", back_color="white")

# 4. Save to your Flask 'static' folder
# UPDATE THIS PATH to your actual Flask static folder
save_path = "static/ingest_qr.png" 

# Create static folder if it doesn't exist
os.makedirs("static", exist_ok=True)
img.save(save_path)
print(f"QR Code saved to: {save_path}")