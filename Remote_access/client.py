# import requests

# # REPLACE THIS with the IP you found in Step 1
# SERVER_IP = "12.12.10.39" 
# PORT = "8000"
# URL = f"http://{SERVER_IP}:{PORT}/ask"

# def chat_loop():
#     print(f"Connected to Uni-RAG Server at {SERVER_IP}")
#     print("Type 'exit' to quit.\n")

#     while True:
#         user_query = input("You: ")
#         if user_query.lower() in ['exit', 'quit']:
#             break

#         try:
#             # Send the query to the server
#             response = requests.post(URL, json={"text": user_query}, timeout=120)
            
#             if response.status_code == 200:
#                 data = response.json()
#                 print(f"Uni-RAG: {data['response']}\n")
#             else:
#                 print(f"Error: Server returned status {response.status_code}")
#                 print(response.text)

#         except requests.exceptions.ConnectionError:
#             print("Error: Could not connect to the server. Check IP or Firewall.")
#         except Exception as e:
#             print(f"An error occurred: {e}")

# if __name__ == "__main__":
#     chat_loop()





# import streamlit as st
# import requests
# import time

# # --- Page Configuration ---
# st.set_page_config(
#     page_title="Uni-RAG Interface",
#     page_icon="🤖",
#     layout="centered"
# )

# # --- Sidebar for Connection Settings ---
# with st.sidebar:
#     st.header("🔌 Connection Settings")
#     # Default to the IP you found earlier, but allow changing it
#     server_ip = st.text_input("Server IP Address", value="12.12.10.39")
#     server_port = st.text_input("Server Port", value="8000")
    
#     st.markdown("---")
#     st.info(f"Connecting to: http://{server_ip}:{server_port}")
    
#     if st.button("Clear Chat History"):
#         st.session_state.messages = []
#         st.rerun()

# # --- Main Interface ---
# st.title("🧠 Uni-RAG Agent")
# st.markdown("Ask queries to your local RAG server.")

# # Initialize chat history in session state if it doesn't exist
# if "messages" not in st.session_state:
#     st.session_state.messages = []

# # Display chat messages from history on app rerun
# for message in st.session_state.messages:
#     with st.chat_message(message["role"]):
#         st.markdown(message["content"])

# # --- Handle User Input ---
# if prompt := st.chat_input("Type your query here..."):
#     # 1. Display user message immediately
#     with st.chat_message("user"):
#         st.markdown(prompt)
    
#     # 2. Add user message to history
#     st.session_state.messages.append({"role": "user", "content": prompt})

#     # 3. Send to Server (PC 1)
#     url = f"http://{server_ip}:{server_port}/ask"
    
#     with st.chat_message("assistant"):
#         message_placeholder = st.empty()
        
#         try:
#             with st.spinner("Uni-RAG is thinking..."):
#                 # Send the request
#                 response = requests.post(url, json={"text": prompt}, timeout=300)
                
#             if response.status_code == 200:
#                 answer = response.json().get("response", "No response key found.")
#                 message_placeholder.markdown(answer)
                
#                 # Add assistant response to history
#                 st.session_state.messages.append({"role": "assistant", "content": answer})
#             else:
#                 error_msg = f"❌ Error: Server returned {response.status_code}"
#                 message_placeholder.error(error_msg)
                
#         except requests.exceptions.ConnectionError:
#             message_placeholder.error(f"❌ Connection Failed. Is the server running on {server_ip}?")
#         except requests.exceptions.ReadTimeout:
#             message_placeholder.error("❌ Timeout. The model took too long to respond.")
#         except Exception as e:
#             message_placeholder.error(f"❌ An error occurred: {e}")

import streamlit as st
import requests
import time

# --- Page Configuration ---
st.set_page_config(
    page_title="Uni-RAG Interface",
    page_icon="🤖",
    layout="centered"
)

# --- Sidebar for Connection Settings ---
with st.sidebar:
    st.header("🔌 Connection Settings")
    # Default to the IP you found earlier, but allow changing it
    server_ip = st.text_input("Server IP Address", value="192.168.14.107")
    server_port = st.text_input("Server Port", value="8000")
    
    st.markdown("---")
    st.info(f"Connecting to: http://{server_ip}:{server_port}")
    
    if st.button("Clear Chat History"):
        st.session_state.messages = []
        st.rerun()

# --- Main Interface ---
st.title("🧠 Uni-RAG Agent")
st.markdown("Ask queries to your local RAG server.")

# Initialize chat history in session state if it doesn't exist
if "messages" not in st.session_state:
    st.session_state.messages = []

# Display chat messages from history on app rerun
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# --- Handle User Input ---
if prompt := st.chat_input("Type your query here..."):
    # 1. Display user message immediately
    with st.chat_message("user"):
        st.markdown(prompt)
    
    # 2. Add user message to history
    st.session_state.messages.append({"role": "user", "content": prompt})

    # 3. Send to Server (PC 1)
    url = f"http://{server_ip}:{server_port}/ask"
    
    with st.chat_message("assistant"):
        message_placeholder = st.empty()
        
        try:
            with st.spinner("Uni-RAG is thinking..."):
                # Send the request
                response = requests.post(url, json={"text": prompt}, timeout=300)
                
            if response.status_code == 200:
                answer = response.json().get("response", "No response key found.")
                message_placeholder.markdown(answer)
                
                # Add assistant response to history
                st.session_state.messages.append({"role": "assistant", "content": answer})
            else:
                error_msg = f"❌ Error: Server returned {response.status_code}"
                message_placeholder.error(error_msg)
                
        except requests.exceptions.ConnectionError:
            message_placeholder.error(f"❌ Connection Failed. Is the server running on {server_ip}?")
        except requests.exceptions.ReadTimeout:
            message_placeholder.error("❌ Timeout. The model took too long to respond.")
        except Exception as e:
            message_placeholder.error(f"❌ An error occurred: {e}")
