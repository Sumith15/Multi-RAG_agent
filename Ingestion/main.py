import os
import io
from datetime import datetime
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse
from PIL import Image  # Handles Image-to-PDF conversion
import uvicorn

app = FastAPI()

# Create the folder for saving files
UPLOAD_DIR = "C:\\Users\\vijay\\OneDrive\\Desktop\\test"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# --- THE FRONTEND (HTML/CSS/JS) ---
@app.get("/", response_class=HTMLResponse)
async def main():
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>UNI-RAG NEURAL UPLINK</title>
        <style>
            :root {
                --neon-cyan: #00f3ff;
                --neon-blue: #0066ff;
                --deep-space: #020408;
                --panel-bg: rgba(10, 25, 40, 0.85);
            }
            
            * { box-sizing: border-box; }

            body {
                background-color: var(--deep-space);
                color: white;
                font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                margin: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background-image: 
                    linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px);
                background-size: 40px 40px;
            }

            .container {
                width: 90%;
                max-width: 450px;
                text-align: center;
            }

            .header-icon {
                font-size: 3rem;
                margin-bottom: 10px;
                filter: drop-shadow(0 0 10px var(--neon-cyan));
            }
            
            h1 {
                font-size: 2rem;
                margin: 0;
                text-transform: uppercase;
                background: linear-gradient(to right, #fff, #aaa);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                letter-spacing: 2px;
                font-weight: 800;
            }

            .subtitle {
                color: var(--neon-cyan);
                font-size: 0.8rem;
                letter-spacing: 4px;
                margin-bottom: 30px;
                text-transform: uppercase;
                opacity: 0.9;
                text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
            }

            .card {
                background: var(--panel-bg);
                border: 1px solid rgba(0, 243, 255, 0.3);
                border-radius: 20px;
                padding: 30px 20px;
                box-shadow: 0 0 30px rgba(0, 102, 255, 0.15), inset 0 0 20px rgba(0, 243, 255, 0.05);
                backdrop-filter: blur(10px);
                position: relative;
                overflow: hidden;
            }

            /* Animated Scan Line */
            .card::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 5px;
                background: var(--neon-cyan);
                box-shadow: 0 0 15px var(--neon-cyan);
                opacity: 0.5;
                animation: scan 3s linear infinite;
            }

            @keyframes scan {
                0% { top: -10%; opacity: 0; }
                50% { opacity: 0.5; }
                100% { top: 110%; opacity: 0; }
            }

            input[type="file"] { display: none; }

            .btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                padding: 16px;
                margin: 12px 0;
                font-size: 1rem;
                font-weight: 600;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.2s ease;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .btn-camera {
                background: linear-gradient(135deg, var(--neon-blue), #0044aa);
                color: white;
                border: none;
                box-shadow: 0 4px 15px rgba(0, 102, 255, 0.4);
            }

            .btn-file {
                background: transparent;
                color: var(--neon-cyan);
                border: 2px solid var(--neon-cyan);
                box-shadow: 0 0 10px rgba(0, 243, 255, 0.1);
            }

            .btn:active { transform: scale(0.98); }

            #preview-container {
                margin-top: 25px;
                display: none;
                animation: fadeIn 0.5s ease;
            }
            
            #preview-img {
                width: 100%;
                border-radius: 10px;
                border: 1px solid var(--neon-cyan);
                box-shadow: 0 0 15px rgba(0, 243, 255, 0.2);
            }

            #uploadBtn {
                background: var(--neon-cyan);
                color: #000;
                font-weight: 800;
                margin-top: 20px;
                box-shadow: 0 0 20px var(--neon-cyan);
                border: none;
            }

            .status-text {
                margin-top: 15px;
                font-size: 0.85rem;
                min-height: 20px;
            }
            
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        </style>
    </head>
    <body>

        <div class="container">
            <div class="header-icon">🧠</div>
            <h1>Uni-RAG Agent</h1>
            <div class="subtitle">Secure Neural Uplink</div>

            <div class="card">
                <label for="cameraInput" class="btn btn-camera">
                    📸 Capture Document
                </label>
                <input type="file" id="cameraInput" accept="image/*" capture="environment">

                <label for="fileInput" class="btn btn-file">
                    📂 Select File
                </label>
                <input type="file" id="fileInput" accept="image/*, application/pdf" multiple>

                <div id="preview-container">
                    <p style="color: var(--neon-cyan); font-size: 0.8rem; margin-bottom: 10px;">>> ASSET ACQUIRED</p>
                    <img id="preview-img" src="">
                    <button id="uploadBtn" class="btn">
                        ⚡ CONVERT & TRANSMIT
                    </button>
                </div>

                <div id="status" class="status-text"></div>
            </div>
        </div>

        <script>
            const cameraInput = document.getElementById('cameraInput');
            const fileInput = document.getElementById('fileInput');
            const previewContainer = document.getElementById('preview-container');
            const previewImg = document.getElementById('preview-img');
            const uploadBtn = document.getElementById('uploadBtn');
            const statusDiv = document.getElementById('status');
            
            let selectedFiles = null;

            function handleFileSelect(event) {
                const files = event.target.files;
                if (files && files.length > 0) {
                    selectedFiles = files;
                    const file = files[0];

                    // Preview Logic
                    if (file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            previewImg.src = e.target.result;
                            previewImg.style.display = 'block';
                            previewContainer.style.display = 'block';
                            statusDiv.innerHTML = '<span style="color: var(--neon-cyan)">Ready for neural processing.</span>';
                        };
                        reader.readAsDataURL(file);
                    } else {
                        // PDF Preview (Hide image, show text)
                        previewImg.style.display = 'none';
                        previewContainer.style.display = 'block';
                        statusDiv.innerHTML = '<span style="color: var(--neon-cyan)">PDF Document Locked.</span>';
                    }
                }
            }

            cameraInput.addEventListener('change', handleFileSelect);
            fileInput.addEventListener('change', handleFileSelect);

            uploadBtn.addEventListener('click', async () => {
                if (!selectedFiles) return;

                const formData = new FormData();
                for (let i = 0; i < selectedFiles.length; i++) {
                    formData.append('file', selectedFiles[i]);
                }

                statusDiv.innerHTML = 'Converting to PDF...';
                uploadBtn.disabled = true;
                uploadBtn.style.opacity = "0.5";

                try {
                    const response = await fetch('/uploadfile/', {
                        method: 'POST',
                        body: formData
                    });

                    if (response.ok) {
                        const result = await response.json();
                        statusDiv.innerHTML = '<span style="color: #0f0;">>> UPLINK SUCCESSFUL: ' + result.filename + '</span>';
                        setTimeout(() => {
                            previewContainer.style.display = 'none';
                            uploadBtn.disabled = false;
                            uploadBtn.style.opacity = "1";
                            statusDiv.innerHTML = '';
                        }, 3000);
                    } else {
                        throw new Error('Upload failed');
                    }
                } catch (error) {
                    statusDiv.innerHTML = '<span style="color: #f00;">>> ERROR: CONNECTION SEVERED.</span>';
                    uploadBtn.disabled = false;
                    uploadBtn.style.opacity = "1";
                }
            });
        </script>
    </body>
    </html>
    """

# --- THE BACKEND (FILE HANDLING + PDF CONVERSION) ---
# @app.post("/uploadfile/")
# async def create_upload_file(file: UploadFile = File(...)):
#     if not file.filename:
#         return {"info": "No file selected"}

#     # Generate timestamp to prevent overwriting files
#     timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
#     # Logic: If it is an Image, Convert to PDF. If PDF, just save it.
#     content_type = file.content_type
    
#     if content_type.startswith("image/"):
#         try:
#             # 1. Read image data from memory
#             image_data = await file.read()
#             image = Image.open(io.BytesIO(image_data))
            
#             # 2. Convert to RGB (Required for saving as PDF)
#             rgb_image = image.convert('RGB')
            
#             # 3. Rename file to .pdf
#             # e.g., "myphoto.jpg" -> "20251212_1030_myphoto.pdf"
#             original_name_no_ext = os.path.splitext(file.filename)[0]
#             pdf_filename = f"{timestamp}_{original_name_no_ext}.pdf"
#             save_path = f"{UPLOAD_DIR}/{pdf_filename}"
            
#             # 4. Save file
#             rgb_image.save(save_path, "PDF", resolution=100.0)
            
#             return {"info": "Converted to PDF", "filename": pdf_filename}
            
#         except Exception as e:
#             return {"error": f"Image conversion failed: {str(e)}"}
            
#     else:
#         # It's already a PDF or text file
#         save_filename = f"{timestamp}_{file.filename}"
#         save_path = f"{UPLOAD_DIR}/{save_filename}"
        
#         with open(save_path, "wb+") as file_object:
#             file_object.write(await file.read())
            
#         return {"info": "File saved", "filename": save_filename}

# # --- STARTUP COMMAND ---

# --- THE BACKEND (DEBUG VERSION) ---
@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    print(f"--- Receiving file: {file.filename} ---") # Debug Print
    
    if not file.filename:
        return {"info": "No file selected"}

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    content_type = file.content_type
    print(f"Detected Type: {content_type}") # Debug Print

    # Check if it is an image
    if content_type.startswith("image/"):
        try:
            print("Attempting Image -> PDF Conversion...") # Debug Print
            
            # 1. Read image data
            image_data = await file.read()
            
            # 2. Open with Pillow
            image = Image.open(io.BytesIO(image_data))
            print(f"Image Opened: {image.format} size={image.size}") # Debug Print
            
            # 3. Convert to RGB
            rgb_image = image.convert('RGB')
            
            # 4. Save as PDF
            original_name = os.path.splitext(file.filename)[0]
            pdf_filename = f"{timestamp}_{original_name}.pdf"
            save_path = f"C:/Users/vijay/OneDrive/Desktop/test/{pdf_filename}"
            
            rgb_image.save(save_path, "PDF", resolution=100.0)
            print(f"SUCCESS: Saved to {save_path}") # Debug Print
            
            return {"info": "Converted to PDF", "filename": pdf_filename}
            
        except Exception as e:
            # THIS PRINT WILL SHOW US THE ERROR
            print(f"!!! CONVERSION ERROR: {e}") 
            return {"error": f"Conversion Failed: {str(e)}"}
            
    else:
        # Non-image files (like existing PDFs)
        print("File is not an image. Saving directly.") # Debug Print
        save_filename = f"{timestamp}_{file.filename}"
        save_path = f"C:/Users/vijay/OneDrive/Desktop/test/{save_filename}"
        
        with open(save_path, "wb+") as file_object:
            file_object.write(await file.read())
            
        return {"info": "File saved", "filename": save_filename}
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
