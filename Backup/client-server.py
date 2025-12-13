# import os
# import time
# import requests
# import zipfile
# import io

# # === CONFIGURATION ===
# # The folder on THIS laptop to watch
# SYNC_FOLDER = r"C:/Users/vinna/Downloads/demo-files"

# # The IP Address of the Server Laptop (CHANGE THIS!)
# SERVER_IP = "172.168.8.140" # <--- PUT SERVER IP HERE
# PORT = 8000
# # =====================

# SERVER_URL = f"http://{SERVER_IP}:{PORT}"

# def upload_file(filepath):
#     filename = os.path.basename(filepath)
#     print(f"📤 Detecting change... Sending {filename}...")

#     try:
#         with open(filepath, 'rb') as f:
#             headers = {'Filename': filename}
#             response = requests.post(SERVER_URL, data=f, headers=headers)

#         if response.status_code == 200:
#             print("   ✅ Sent successfully.")
#             return True
#         else:
#             print("   ❌ Server rejected it.")
#             return False
#     except Exception as e:
#         print(f"   ❌ Connection failed: {e}")
#         return False

# def retrieve_all():
#     print("\n🚀 REQUESTING ALL FILES FROM SERVER...")
#     try:
#         response = requests.get(f"{SERVER_URL}/retrieve_all")
#         if response.status_code == 200:
#             # Unzip the received data
#             z = zipfile.ZipFile(io.BytesIO(response.content))
#             z.extractall(SYNC_FOLDER)
#             print(f"✨ SUCCESS! All files restored to {SYNC_FOLDER}")
#         else:
#             print("❌ Server error during retrieval.")
#     except Exception as e:
#         print(f"❌ Could not connect to server: {e}")

# def watch_folder():
#     print(f"👀 Watching {SYNC_FOLDER} for new files...")
#     print("   (Press Ctrl+C to stop watching)")

#     # Keep track of files we have already sent to avoid re-sending loops
#     # We use size + modification time to detect changes
#     sent_files = {}

#     while True:
#         # 1. Scan folder
#         current_files = {}
#         for f in os.listdir(SYNC_FOLDER):
#             filepath = os.path.join(SYNC_FOLDER, f)
#             if os.path.isfile(filepath):
#                 stats = os.stat(filepath)
#                 # Signature = Size + timestamp
#                 signature = (stats.st_size, stats.st_mtime)
#                 current_files[f] = signature

#         # 2. Check for NEW or MODIFIED files
#         for filename, signature in current_files.items():
#             if filename not in sent_files or sent_files[filename] != signature:
#                 # File is new or changed!
#                 success = upload_file(os.path.join(SYNC_FOLDER, filename))
#                 if success:
#                     sent_files[filename] = signature

#         # 3. Handle Deletions (We update our list, but DO NOT tell server to delete)
#         # This fulfills your requirement: "if i delete in this laptop it should not delete in server"
#         sent_files = {f: s for f, s in sent_files.items() if f in current_files}

#         time.sleep(2) # Check every 2 seconds

# if __name__ == "__main__":
#     if not os.path.exists(SYNC_FOLDER):
#         os.makedirs(SYNC_FOLDER)

#     print("--- MENU ---")
#     print("1. Start Automatic Sync (Watch Folder)")
#     print("2. Retrieve All Files (Restore)")
#     choice = input("Enter 1 or 2: ")

#     if choice == "1":
#         watch_folder()
#     elif choice == "2":
#         retrieve_all()


import os
import time
import threading
import requests
import zipfile
import io
import customtkinter as ctk
from tkinter import filedialog, messagebox

# ================= CONFIGURATION =================
# Set appearance to match your image (Dark Mode + Blue/Cyan Accents)
ctk.set_appearance_mode("Dark")
ctk.set_default_color_theme("dark-blue")

# Your Colors based on the image
COLOR_BG = "#050510"  # Deep space black/blue
COLOR_PANEL = "#0a0a1a"  # Slightly lighter panel
COLOR_ACCENT = "#00e5ff"  # Neon Cyan
COLOR_TEXT = "#ffffff"  # White
COLOR_GRID = "#1a1a2e"  # Grid line color

# Server Details (Update this!)
SERVER_IP = "192.168.14.105"
PORT = 8000
SERVER_URL = f"http://{SERVER_IP}:{PORT}"
SYNC_FOLDER = r"/Users/srivenkatreddy/Desktop/client_storage"


# =================================================

class NeuralSyncApp(ctk.CTk):
    def __init__(self):
        super().__init__()

        # Window Setup
        self.title("NEURAL SYNC CORE")
        self.geometry("800x600")
        self.configure(fg_color=COLOR_BG)
        self.resizable(False, False)

        # State Variables
        self.is_watching = False
        self.log_messages = []

        # --- UI LAYOUT ---
        self.create_background_grid()
        self.create_header()
        self.create_main_panel()
        self.create_log_console()

        # Ensure Sync Folder exists
        if not os.path.exists(SYNC_FOLDER):
            os.makedirs(SYNC_FOLDER)

    def create_background_grid(self):
        # A simple visual trick to create the "grid" look from your image
        self.grid_canvas = ctk.CTkCanvas(self, bg=COLOR_BG, highlightthickness=0, width=800, height=600)
        self.grid_canvas.place(x=0, y=0)
        # Draw faint grid lines
        for i in range(0, 800, 40):
            self.grid_canvas.create_line(i, 0, i, 600, fill=COLOR_GRID, width=1)
        for i in range(0, 600, 40):
            self.grid_canvas.create_line(0, i, 800, i, fill=COLOR_GRID, width=1)

    def create_header(self):
        # Logo Text
        self.lbl_title = ctk.CTkLabel(
            self, text="NEURAL SYNC AGENT",
            font=("Orbitron", 32, "bold"),
            text_color=COLOR_ACCENT
        )
        self.lbl_title.place(x=250, y=30)

        self.lbl_subtitle = ctk.CTkLabel(
            self, text="SECURE OFFLINE DATA LINK // CONNECTED",
            font=("Consolas", 12),
            text_color="gray"
        )
        self.lbl_subtitle.place(x=280, y=70)

    def create_main_panel(self):
        # The glowing "card" in the middle
        self.panel = ctk.CTkFrame(
            self, width=600, height=250,
            fg_color=COLOR_PANEL,
            border_color=COLOR_ACCENT,
            border_width=2,
            corner_radius=15
        )
        self.panel.place(x=100, y=120)

        # Status Circle (The "Neural Core" circle from image)
        self.status_indicator = ctk.CTkButton(
            self.panel, text="", width=40, height=40,
            corner_radius=20, fg_color="#333", hover=False,
            border_color=COLOR_ACCENT, border_width=2
        )
        self.status_indicator.place(x=280, y=30)

        self.lbl_status = ctk.CTkLabel(
            self.panel, text="SYSTEM IDLE",
            font=("Roboto Medium", 16), text_color=COLOR_TEXT
        )
        self.lbl_status.place(x=250, y=80)

        # Buttons
        self.btn_sync = ctk.CTkButton(
            self.panel, text="INITIATE SYNC PROTOCOL",
            command=self.toggle_sync,
            width=250, height=45,
            fg_color=COLOR_ACCENT, hover_color="#00b8cc",
            text_color="black", font=("Arial", 12, "bold")
        )
        self.btn_sync.place(x=40, y=150)

        self.btn_retrieve = ctk.CTkButton(
            self.panel, text="RETRIEVE DATA ARCHIVE",
            command=self.start_retrieval,
            width=250, height=45,
            fg_color="transparent", border_color=COLOR_ACCENT, border_width=2,
            text_color=COLOR_ACCENT, font=("Arial", 12, "bold")
        )
        self.btn_retrieve.place(x=310, y=150)

    def create_log_console(self):
        # The terminal-like box at the bottom
        self.log_frame = ctk.CTkFrame(self, width=700, height=180, fg_color="#000")
        self.log_frame.place(x=50, y=400)

        self.log_text = ctk.CTkTextbox(
            self.log_frame, width=680, height=160,
            fg_color="#000", text_color="#0f0",  # Green hacker text
            font=("Consolas", 10)
        )
        self.log_text.place(x=10, y=10)
        self.log(">> SYSTEM INITIALIZED...")
        self.log(f">> TARGET SERVER: {SERVER_IP}")
        self.log(f">> WATCH FOLDER: {SYNC_FOLDER}")

    # --- LOGIC FUNCTIONS ---
    def log(self, message):
        self.log_text.insert("end", message + "\n")
        self.log_text.see("end")

    def toggle_sync(self):
        if not self.is_watching:
            self.is_watching = True
            self.btn_sync.configure(text="TERMINATE SYNC", fg_color="#ff3333", hover_color="#cc0000")
            self.lbl_status.configure(text="NEURAL UPLINK ACTIVE", text_color=COLOR_ACCENT)
            self.status_indicator.configure(fg_color=COLOR_ACCENT)  # Glowing Core

            # Start the watcher thread
            self.thread = threading.Thread(target=self.watch_folder_thread, daemon=True)
            self.thread.start()
            self.log(">> SYNC PROTOCOL STARTED. WATCHING FOLDER...")
        else:
            self.is_watching = False
            self.btn_sync.configure(text="INITIATE SYNC PROTOCOL", fg_color=COLOR_ACCENT, hover_color="#00b8cc")
            self.lbl_status.configure(text="SYSTEM IDLE", text_color="white")
            self.status_indicator.configure(fg_color="#333")  # Dim Core
            self.log(">> SYNC PROTOCOL TERMINATED.")

    def start_retrieval(self):
        self.log(">> INITIATING DATA RETRIEVAL SEQUENCE...")
        threading.Thread(target=self.retrieve_thread, daemon=True).start()

    # --- THREADED TASKS (To keep UI responsive) ---
    def retrieve_thread(self):
        try:
            response = requests.get(f"{SERVER_URL}/retrieve_all")
            if response.status_code == 200:
                z = zipfile.ZipFile(io.BytesIO(response.content))
                z.extractall(SYNC_FOLDER)
                self.log(f">> [SUCCESS] DATA EXTRACTED TO LOCAL CORE.")
                messagebox.showinfo("Success", "All files retrieved from Server!")
            else:
                self.log(f">> [ERROR] SERVER REJECTED REQUEST. CODE: {response.status_code}")
        except Exception as e:
            self.log(f">> [CRITICAL FAILURE] CANNOT REACH SERVER: {e}")

    def watch_folder_thread(self):
        sent_files = {}
        while self.is_watching:
            try:
                current_files = {}
                # Scan
                for f in os.listdir(SYNC_FOLDER):
                    filepath = os.path.join(SYNC_FOLDER, f)
                    if os.path.isfile(filepath):
                        stats = os.stat(filepath)
                        signature = (stats.st_size, stats.st_mtime)
                        current_files[f] = signature

                # Detect Changes
                for filename, signature in current_files.items():
                    if filename not in sent_files or sent_files[filename] != signature:
                        self.log(f">> DETECTED NEW DATA: {filename}")
                        success = self.upload_file(os.path.join(SYNC_FOLDER, filename))
                        if success:
                            sent_files[filename] = signature

                # Clean deleted files from tracker
                sent_files = {f: s for f, s in sent_files.items() if f in current_files}

                time.sleep(2)
            except Exception as e:
                self.log(f">> [ERROR] WATCHER LOOP FAILED: {e}")
                time.sleep(5)

    def upload_file(self, filepath):
        filename = os.path.basename(filepath)
        try:
            with open(filepath, 'rb') as f:
                headers = {'Filename': filename}
                response = requests.post(SERVER_URL, data=f, headers=headers)

            if response.status_code == 200:
                self.log(f">> [UPLOAD COMPLETE] {filename} -> SERVER")
                return True
            else:
                self.log(f">> [UPLOAD FAILED] {filename} REJECTED.")
                return False
        except Exception as e:
            self.log(f">> [NET ERROR] FAILED TO SEND {filename}")
            return False


if __name__ == "__main__":
    app = NeuralSyncApp()
    app.mainloop()
