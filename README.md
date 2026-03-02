# Multi-RAG Agent

[![GitHub Repo](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Sumith15/Multi-RAG_agent)

**Multi-RAG Agent** is an advanced multi-agent Retrieval-Augmented Generation (RAG) system designed to enhance the capabilities of large language models by incorporating multiple specialized agents for retrieval, reasoning, and response generation. This project enables more accurate, context-aware, and efficient handling of complex queries through collaborative AI agents.

## Team

**Team Name:** UnBounded

**Team Members:**
1. Nuka Sumith Chandra  
2. Gongalreddy Sri Venkat Reddy  
3. V Vijay Chandra
4. SK Neha
5. Tadipatri Soumya Murthy
6. Edupuganti Dheeraj Chandra

## 📖 Overview

**Uni-RAG Agent** addresses the critical gap in modern AI adoption: handling messy, disconnected, and sensitive data without relying on the public cloud.

Unlike standard RAG tools, this system is a **"Sovereign Knowledge Engine."** It brings intelligence *to* the data. It runs entirely offline, processes mixed media (handwritten notes, PDFs, images), organizes chaos through agentic file routing, and provides visualized insights—all while maintaining an air-gapped security posture.

## 🚀 Key Features

### 🧠 Core Intelligence
1.  **Multimodal RAG Agent:** Seamlessly ingests and retrieves context from diverse file formats (`.pdf`, `.pptx`, `.docx`, `.txt`).
2.  **Advanced OCR Engine:** Deciphers handwritten notes, scanned forms, and "dark data" that standard text parsers miss.
3.  **High-Volume Processing:** optimized ingest pipeline capable of reading and indexing 100+ documents simultaneously.
4.  **Visual Data Extraction:** sophisticated understanding of images, diagrams, and figures embedded within documents.

### 🛡️ Trust & Security
5.  **Hallucination Prevention:** Every response includes strict **Source Citations**, linking the answer directly to the specific file and page number.
6.  **100% Offline Capability:** Powered by local LLMs (e.g., Llama 3, Mistral) ensuring zero data leakage. No internet connection required.
7.  **Wireless Air-Gapped Storage:** Data resides on a secure remote server; interaction happens via a client device without requiring wired connections or public internet.

### ⚡ Agentic Automation
8.  **The "Auto-Filer" (Document Router):** An autonomous agent that analyzes the *content* of unorganized files (e.g., invoices, reports) and physically moves them to their correct directory structures.
9.  **Mobile Companion App:** A dedicated app to scan physical documents and sync them directly to the secure host via local network protocols.
10. **Instant Business Intelligence:** Converts raw CSV/Excel data into visual graphs and pie charts on demand using a text-to-visualization engine.
11. **Remote Execution:** Supports a "Thin Client" architecture, allowing users to trigger heavy RAG functions on a powerful main server from a lightweight remote laptop.

---

## 🏗️ Architecture & Workflow



1.  **Ingestion:** Documents are uploaded via the Mobile App or Direct Folder Drop.
2.  **Processing:**
    * **Text:** Parsed via PyPDF/LangChain loaders.
    * **Image/Handwriting:** Processed via OCR (Tesseract/PaddleOCR) and Vision Models.
3.  **Indexing:** Data is chunked and stored in a local Vector Database (ChromaDB/FAISS).
4.  **Routing (Agentic Layer):** The Auto-Filer evaluates document semantic meaning and executes file system operations (`os/shutil`).
5.  **Retrieval:** User queries are matched against the vector store.
6.  **Generation:** Local LLM synthesizes the answer with citations or generates visualization code.

---

## 🛠️ Tech Stack

* **Language:** Python 3.10+
* **Interface:** Streamlit / FastAPI
* **LLM Engine:** Ollama / LlamaCPP (Running Llama 3 / Mistral)
* **Orchestration:** LangChain / LlamaIndex
* **Vector Database:** ChromaDB (Local persistence)
* **OCR & Vision:** Tesseract / PaddleOCR / GPT-4o-mini (if hybrid) or LLaVA (for purely local)
* **Visualization:** Matplotlib / Plotly / PandasAI

---

## ⚡ Quick Start

### Prerequisites
* Python 3.10 or higher installed.
* [Ollama](https://ollama.com/) installed and running (for local LLM inference).
* Git installed.

### Installation

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/yourusername/uni-rag-agent.git](https://github.com/yourusername/uni-rag-agent.git)
    cd uni-rag-agent
    ```

2.  **Create a Virtual Environment**
    ```bash
    python -m venv venv
    # Windows
    .\venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate
    ```

3.  **Install Dependencies**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Run the Application**
    ```bash
    streamlit run app.py
    ```

---

## 🌍 Real-World Use Cases

| Problem Area | How Uni-RAG Solves It |
| :--- | :--- |
| **Legal Discovery** | Automatically sorts thousands of mixed scanned evidence files into "Contracts," "Invoices," and "Correspondence." |
| **Defense/Intel** | Summarizes sensitive field reports in a bunker without internet access, ensuring data sovereignty. |
| **Healthcare** | Reads handwritten nurse notes and cross-references them with digital patient records for holistic diagnosis support. |
| **Corporate Strategy** | Instantly turns a CSV of quarterly sales data into a comparative market share graph for executive review. |

---

## 🤝 Contributing

Contributions are welcome! Please open an issue to discuss proposed changes or submit a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
