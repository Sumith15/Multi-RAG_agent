import os
import io
import socket
from datetime import datetime
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse
from PIL import Image
import uvicorn

app = FastAPI()

# --- CONFIGURATION ---
# Change this to your desired upload folder
UPLOAD_DIR = r"C:\Users\vijay\OneDrive\Desktop\test"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# --- FRONTEND (Mobile UI) ---
@app.get("/", response_class=HTMLResponse)
async def main():
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>UNI-RAG NEURAL UPLINK</title>
        <style>
            :root { --neon-cyan: #00f3ff; --deep-space: #020408; --panel-bg: rgba(10, 25, 40, 0.9); }
            body { background-color: var(--deep-space); color: white; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
            .container { width: 90%; max-width: 450px; text-align: center; }
            .card { background: var(--panel-bg); border: 1px solid var(--neon-cyan); border-radius: 20px; padding: 30px 20px; box-shadow: 0 0 30px rgba(0, 243, 255, 0.15); }
            h1 { margin: 0; text-transform: uppercase; font-weight: 800; letter-spacing: 2px; }
            .btn { display: block; width: 100%; padding: 16px; margin: 12px 0; font-weight: bold; border-radius: 12px; cursor: pointer; text-transform: uppercase; border: none; }
            .btn-camera { background: linear-gradient(135deg, #0066ff, #0044aa); color: white; box-shadow: 0 4px 15px rgba(0, 102, 255, 0.4); }
            .btn-file { background: transparent; color: var(--neon-cyan); border: 2px solid var(--neon-cyan); }
            #preview-img { width: 100%; border-radius: 10px; margin-top: 15px; border: 1px solid var(--neon-cyan); display: none; }
            #uploadBtn { background: var(--neon-cyan); color: black; font-weight: 800; margin-top: 20px; box-shadow: 0 0 20px var(--neon-cyan); display: none; }
        </style>
    </head>
    <body>
        <div class="container">
            <div style="font-size: 3rem; margin-bottom: 10px;">🧠</div>
            <h1>Uni-RAG Agent</h1>
            <p style="color: var(--neon-cyan); letter-spacing: 4px; font-size: 0.8rem; margin-bottom: 30px;">SECURE NEURAL UPLINK</p>

            <div class="card">
                <label class="btn btn-camera">📸 Capture Document <input type="file" id="cameraInput" accept="image/*" capture="environment" style="display:none"></label>
                <label class="btn btn-file">📂 Select File <input type="file" id="fileInput" accept="image/*, application/pdf" multiple style="display:none"></label>
                
                <img id="preview-img" src="">
                <div id="status" style="margin-top:15px; min-height:20px;"></div>
                <button id="uploadBtn" class="btn">⚡ CONVERT & TRANSMIT</button>
            </div>
        </div>

        <script>
            const previewImg = document.getElementById('preview-img');
            const uploadBtn = document.getElementById('uploadBtn');
            const statusDiv = document.getElementById('status');
            let selectedFiles = null;

            function handleFile(e) {
                const files = e.target.files;
                if (!files.length) return;
                selectedFiles = files;
                if (files[0].type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => { previewImg.src = e.target.result; previewImg.style.display = 'block'; };
                    reader.readAsDataURL(files[0]);
                } else {
                    previewImg.style.display = 'none';
                    statusDiv.innerHTML = '<span style="color:#00f3ff">PDF Selected. Ready.</span>';
                }
                uploadBtn.style.display = 'block';
            }

            document.getElementById('cameraInput').addEventListener('change', handleFile);
            document.getElementById('fileInput').addEventListener('change', handleFile);

            uploadBtn.addEventListener('click', async () => {
                if (!selectedFiles) return;
                statusDiv.innerText = 'Transmitting...';
                const formData = new FormData();
                for (let file of selectedFiles) formData.append('file', file);

                try {
                    const res = await fetch('/uploadfile/', { method: 'POST', body: formData });
                    if (res.ok) {
                        const data = await res.json();
                        statusDiv.innerHTML = '<span style="color:#0f0">>> SUCCESS: ' + data.filename + '</span>';
                        setTimeout(() => location.reload(), 2000);
                    } else throw new Error('Upload failed');
                } catch (e) { statusDiv.innerHTML = '<span style="color:#f00">>> ERROR: Connection Lost</span>'; }
            });
        </script>
    </body>
    </html>
    """

# --- BACKEND LOGIC ---
@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    print(f"--- Receiving: {file.filename} ---")
    if not file.filename: return {"info": "No file"}
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # 1. Handle Images (Convert to PDF)
    if file.content_type.startswith("image/"):
        try:
            image_data = await file.read()
            image = Image.open(io.BytesIO(image_data)).convert('RGB')
            pdf_name = f"{timestamp}_{os.path.splitext(file.filename)[0]}.pdf"
            save_path = os.path.join(UPLOAD_DIR, pdf_name)
            image.save(save_path, "PDF", resolution=100.0)
            print(f"Saved PDF: {save_path}")
            return {"info": "Converted", "filename": pdf_name}
        except Exception as e:
            print(f"Error: {e}")
            return {"error": str(e)}

    # 2. Handle PDFs (Save directly)
    else:
        save_name = f"{timestamp}_{file.filename}"
        save_path = os.path.join(UPLOAD_DIR, save_name)
        with open(save_path, "wb+") as f:
            f.write(await file.read())
        print(f"Saved File: {save_path}")
        return {"info": "Saved", "filename": save_name}

def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # Doesn't handle a connection, just tries to reach an external IP
        s.connect(('8.8.8.8', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

if __name__ == "__main__":
    ip_address = get_ip()
    print(f"\n=============================================")
    print(f"MOBILE UPLINK ONLINE")
    print(f"Access URL: http://{ip_address}:5000")
    print(f"=============================================\n")
    uvicorn.run(app, host="0.0.0.0", port=5000)