# 🎥 AI YouTube Video Analyzer
### **Agentic AI Knowledge Extraction System**

This project is an AI-powered YouTube video analyzer that converts any YouTube video into a structured, easy-to-read knowledge document. It utilizes an **Agentic AI** approach rather than simple summarization, allowing the model to process video context in steps and generate high-level structured insights.

---

## 🚀 What this project does
When you provide a YouTube video link, the system:
* **Transcript Extraction:** Fetches the video transcript using specialized YouTube tools.
* **Agentic Analysis:** Analyzes the full content using an autonomous AI agent.
* **Contextual Understanding:** Identifies the topic, tone, and logical structure of the video.
* **Knowledge Synthesis:** Generates a professional document including summaries, key points, and timestamp breakdowns.

---

## 🧠 How the AI Agent Works
This project uses an **Agno Agent** powered by a **Groq-hosted LLM**. The agent follows a specific "Chain of Thought" instruction set:

1. **Context Parsing:** Reads and understands the full video transcript.
2. **Structural Decomposition:** Breaks content into logical sections (Introduction, Core, Conclusion).
3. **Concept Extraction:** Identifies and defines technical terms or important concepts.
4. **Temporal Mapping:** Creates an approximate timestamp-based breakdown.
5. **Adaptive Output:** Adjusts the final document based on whether the content is **Educational** or **Technical**.

### **The Engine**
* **Model:** `Qwen 3 (32B)` via Groq API (High-speed inference).
* **Framework:** Agno Agent Framework.
* **Tools:** `YouTubeTools` for metadata and transcript retrieval.

---

## 📊 Output Format
For every video, the agent generates a comprehensive report:
1. **Title:** Extracted video title.
2. **Short Summary:** 4–6 line executive overview.
3. **Detailed Explanation:** 2–4 paragraphs explaining core ideas in simple language.
4. **Key Points:** 6–10 high-impact bullet points.
5. **Timestamp Breakdown:** Chronological topic navigation (e.g., `[03:45] Key explanation`).
6. **Concepts/Terms:** Simple definitions of jargon used in the video.
7. **Practical Takeaways:** Real-world applications or learning outcomes.
8. **Dynamic Sections:** Tailored "Learnings" for education or "Code Insights" for technical videos.

---

## 🛠 Tech Stack
* **Language:** Python
* **Frontend:** Streamlit (Custom Dark UI)
* **Agent Logic:** Agno Agent
* **Inference:** Groq API
* **Environment Management:** `python-dotenv`

---

## ⚙️ How to Run the Project
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
   cd YOUR_REPO_NAME
Install dependencies:

Bash
pip install -r requirements.txt
Add Environment Variables:
Create a .env file in the root directory:

Code snippet
GROQ_API_KEY=your_api_key_here
Launch the App:

Bash
streamlit run ui.py
📌 Project Structure
Plaintext
PROJECT/
│── ui.py                # Streamlit frontend & UI styling
│── youtube_analyzer.py  # Agentic logic & Agno configuration
│── .env                 # API keys (Hidden via .gitignore)
│── requirements.txt     # Project dependencies
│── README.md            # Project documentation
└── .gitignore           # File to exclude venv/ & cache


Connect with me

LinkedIn:www.linkedin.com/in/faizanur-rahman




