# Multi-RAG Agent

[![GitHub Repo](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Sumith15/Multi-RAG_agent)

**Multi-RAG Agent** is an advanced multi-agent Retrieval-Augmented Generation (RAG) system designed to enhance the capabilities of large language models by incorporating multiple specialized agents for retrieval, reasoning, and response generation. This project enables more accurate, context-aware, and efficient handling of complex queries through collaborative AI agents.

## Team

**Team Name:** SpongeBoB

**Team Members:**
1. Nuka Sumith Chandra  
2. Edupuganti Dheeraj Chandra  
3. Gongalreddy Sri Venkat Reddy  
4. V Vijay Chandra  

## Features

- **Multi-Agent Architecture**: Multiple specialized agents work collaboratively to handle different aspects of query processing (e.g., retrieval, validation, synthesis).
- **Retrieval-Augmented Generation**: Integrates external knowledge retrieval to ground responses in accurate, up-to-date information.
- **Modular Design**: Easy to extend with new agents or data sources.
- **Support for Various Data Sources**: Compatible with vector databases, web search, or custom knowledge bases (configurable).
- **Efficient Query Handling**: Improves response quality for complex, multi-step questions.

## Technologies Used

- Python  
- LangChain / LlamaIndex (or similar RAG frameworks)  
- Large Language Models (e.g., via OpenAI, Groq, or local models)  
- Vector Stores (e.g., FAISS, Pinecone, Chroma)  
- Other dependencies (listed in `requirements.txt`)  

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sumith15/Multi-RAG_agent.git
   cd Multi-RAG_agent
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your API keys (LLMs, vector DBs, etc.)

## Usage

Run the main script:
```bash
python main.py --query "Your question here"
```

Or launch the interactive interface (if available):
```bash
streamlit run app.py
```

### Example
```python
from multi_rag_agent import MultiRAGAgent

agent = MultiRAGAgent()
response = agent.query("Explain quantum computing with recent advancements.")
print(response)
```

## Project Structure

```text
Multi-RAG_agent/
├── agents/             # Individual agent implementations
├── retrieval/          # Retrieval tools and vector store setup
├── utils/              # Helper functions
├── main.py             # Entry point
├── requirements.txt    # Dependencies
├── .env.example        # Environment variables template
└── README.md           # This file
```

## Contributing

Contributions are welcome!  
Feel free to open issues or submit pull requests.

1. Fork the repository  
2. Create a feature branch  
3. Commit your changes  
4. Open a Pull Request  

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**SpongeBoB Team 🚀**  
Building smarter AI agents, one RAG at a time!
