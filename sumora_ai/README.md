# Sumora AI — Intelligent Dialogue Summarization

**Fine-Tuned T5 Transformer | FastAPI | PyTorch | Hugging Face | NLP**

Sumora AI is an end-to-end AI-powered dialogue summarization platform that transforms lengthy conversations into concise, meaningful summaries using a **fine-tuned T5-small Transformer model**.

Built with PyTorch and Hugging Face Transformers, the application combines an NLP inference pipeline with a responsive, three-page web interface powered by FastAPI, Jinja2, HTML, CSS, and JavaScript.

**[Live Demo](https://sumora-ai-pjj3.onrender.com) · [Trained Model](https://huggingface.co/Faizan-2419/sumora-ai-t5-dialogue-summarizer) · [GitHub Repository](https://github.com/Faizan-2419/deep-learning-projects)**

---

## 1. Project Overview

Long conversations often contain valuable information scattered across multiple messages. Reviewing them manually can be time-consuming, especially when the goal is to identify the most important decisions, updates, or takeaways.

**Sumora AI** addresses this problem through abstractive dialogue summarization.

The system uses a T5-small Transformer fine-tuned on the SAMSum dataset to produce shorter, natural-language summaries of conversational text.

Unlike simple text extraction, abstractive summarization generates a new representation of the input, aiming to preserve its key meaning.

The application integrates the trained model into a browser-based workflow, making it accessible without requiring users to interact with Python code.

## 2. Live Application

**Website:** https://sumora-ai-pjj3.onrender.com

The application includes three pages:

| Page | Purpose |
|---|---|
| **Home** | Introduces the product, its benefits, features, and workflow |
| **Workspace** | Allows users to enter conversations and generate AI summaries |
| **About** | Explains the project, its objectives, and the technologies used |

**Note:** The application is hosted on Render's free instance. It may take additional time to respond after a period of inactivity due to cold starts.

## 3. Key Features

### AI and NLP

- Fine-tuned T5-small model for abstractive dialogue summarization
- SAMSum-based dialogue summarization approach
- Text preprocessing before inference
- Beam-search-based summary generation
- CPU-compatible inference
- Hugging Face Hub integration for trained model storage

### Interactive Workspace

- Dialogue input editor
- AI-generated summary panel
- Example conversation for demonstration
- Input word and character counters
- Generated summary word count
- Copy summary functionality
- Clear input, clear summary, and reset controls
- Loading states and error feedback

### Web Experience

- Responsive layouts for desktop and mobile
- Three-page website with shared navigation
- Warm Editorial visual design
- Lucide icon integration
- Subtle transitions and scroll animations
- Custom SVG favicon
- Keyboard-navigation and reduced-motion considerations

## 4. Technology Stack

| Layer | Technology |
|---|---|
| Programming language | Python 3.10 |
| Deep learning | PyTorch |
| NLP architecture | T5-small Transformer |
| Model framework | Hugging Face Transformers |
| Training dataset | SAMSum |
| Model serialization | Safetensors |
| Model hosting | Hugging Face Hub |
| Backend | FastAPI |
| ASGI server | Uvicorn |
| Template engine | Jinja2 |
| Frontend | HTML5, CSS3, JavaScript |
| Icon library | Lucide |
| Application hosting | Render |
| Version control | Git and GitHub |

## 5. System Architecture

```text
                  USER
                   |
                   v
          SUMORA AI WEBSITE
       HTML + CSS + JavaScript
                   |
                   v
            FASTAPI BACKEND
              POST /summarize/
                   |
                   v
            TEXT PREPROCESSING
                   |
                   v
          TOKENIZATION (T5)
           Max input: 512 tokens
                   |
                   v
        FINE-TUNED T5 TRANSFORMER
              PyTorch Inference
                   |
                   v
             BEAM SEARCH
               num_beams=4
                   |
                   v
            TEXT DECODING
                   |
                   v
           GENERATED SUMMARY
                   |
                   v
          WORKSPACE OUTPUT
```

### Architecture Components

**Frontend:** A Jinja2-rendered interface allows users to submit dialogue and view generated summaries.

**Backend:** FastAPI handles the HTTP request, invokes the model inference pipeline, and returns a JSON response.

**Model:** The fine-tuned T5 Transformer generates summaries using tokenized conversational text.

**Model Storage:** The trained weights and tokenizer are hosted on Hugging Face Hub and loaded by the application.

**Deployment:** Render runs the FastAPI application, serves the website, and executes inference.

## 6. Model Details

| Property | Configuration |
|---|---|
| Base architecture | T5-small |
| Task | Abstractive dialogue summarization |
| Fine-tuning dataset | SAMSum |
| Framework | PyTorch |
| Approximate parameters | 60.5 million |
| Model format | Safetensors (FP32) |
| Maximum input length | 512 tokens |
| Maximum generated length | 150 tokens |
| Beam search | 4 beams |
| Early stopping | Enabled |

### How the model works

1. The user provides a conversation.
2. The backend cleans and preprocesses the input.
3. The tokenizer converts the text into token IDs.
4. The fine-tuned T5 model processes the tokenized sequence.
5. Beam search produces a candidate output.
6. The generated tokens are decoded into a readable summary.
7. FastAPI returns the result to the Workspace.

### Trained Model

The fine-tuned weights are published on Hugging Face:

**[Faizan-2419/sumora-ai-t5-dialogue-summarizer](https://huggingface.co/Faizan-2419/sumora-ai-t5-dialogue-summarizer)**

The model weights are stored separately from GitHub because the weight file exceeds GitHub's standard per-file size limit.

## 7. Project Structure

```text
sumora_ai/
│
├── app.py
├── requirements.txt
├── .python-version
├── .gitignore
├── README.md
│
├── saved_summary_model/
│   ├── config.json
│   ├── generation_config.json
│   ├── tokenizer.json
│   └── tokenizer_config.json
│
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── workspace.html
│   └── about.html
│
└── static/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── icons/
        └── favicon.svg
```

**Note:** The deployed application loads the model from Hugging Face Hub. The local model configuration files are retained in the project repository.

## 8. Installation and Local Setup

### Prerequisites

- Python 3.10
- Git
- Internet connection for the initial model download
- Sufficient RAM to load PyTorch and T5

### Step 1 — Clone the repository

```bash
git clone https://github.com/Faizan-2419/deep-learning-projects.git
cd deep-learning-projects/sumora_ai
```

### Step 2 — Create a virtual environment

```bash
python -m venv venv
```

On Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

On Linux or macOS:

```bash
source venv/bin/activate
```

### Step 3 — Install dependencies

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

For CPU-only Linux deployments, use an appropriate CPU build of PyTorch. See the [official installation guide](https://pytorch.org/get-started/locally/).

### Step 4 — Start the application

```bash
uvicorn app:app --reload
```

Open the application at:

**http://127.0.0.1:8000**

The first startup may require downloading the model from Hugging Face.

## 9. API Reference

### Endpoint

`POST /summarize/`

### Request

```json
{
  "dialogue": "Alex: Are we ready for tomorrow's presentation?\nSam: Almost. We need to update the conclusion.\nAlex: Let's meet at 10 AM.\nSam: Sounds good. I'll prepare the final slides."
}
```

### Response format

```json
{
  "summary": "Alex and Sam discuss completing the presentation and meeting at 10 AM to review the final slides."
}
```

*The response above illustrates the JSON format. Actual summaries depend on model inference.*

### Interactive API Documentation

When the server is running, FastAPI provides documentation at:

- `/docs` — Swagger UI
- `/redoc` — ReDoc

## 10. Deployment

Sumora AI is deployed using Render with its source code maintained on GitHub.

### Deployment Configuration

| Setting | Value |
|---|---|
| Repository | `Faizan-2419/deep-learning-projects` |
| Branch | `main` |
| Root directory | `sumora_ai` |
| Runtime | Python 3 |
| Hosting platform | Render |
| Model source | Hugging Face Hub |

### Render Build Command

```bash
python -m pip install --upgrade pip && python -m pip install torch==2.11.0 --extra-index-url https://download.pytorch.org/whl/cpu && python -m pip install -r requirements.txt
```

### Render Start Command

```bash
uvicorn app:app --host 0.0.0.0 --port $PORT
```

### Model Integration

The application loads the published model using its Hugging Face repository ID:

```python
MODEL_ID = "Faizan-2419/sumora-ai-t5-dialogue-summarizer"
```

This separates application source code from trained model storage.

**Live Deployment:** https://sumora-ai-pjj3.onrender.com

## 11. Testing and Verification

The deployed application was manually checked for:

- Successful loading of Home, Workspace, and About pages
- Correct display of frontend styling and icons
- Example dialogue insertion
- Summary generation using the deployed model
- Copy and Clear functionality
- Responsive website behavior

The Render deployment logs also confirmed successful dependency installation, model loading, FastAPI startup, and homepage response.

Automated regression tests and performance benchmarks are planned improvements.

## 12. Limitations

Sumora AI is a portfolio and demonstration application, not a production-validated document processing service.

Current limitations include:

- **Input length:** The model processes a maximum of 512 input tokens. Longer conversations may be truncated.
- **Model reliability:** Abstractive summaries can omit details or occasionally introduce inaccurate information.
- **Domain specialization:** Fine-tuning on conversational data does not guarantee equivalent performance on technical, legal, medical, or other specialized documents.
- **Hosting constraints:** Free-tier CPU and memory resources may affect startup and inference performance.
- **Sensitive information:** Users should avoid submitting confidential or sensitive conversations.

Generated summaries should be reviewed before use in consequential decisions.

## 13. Future Improvements

- Add API input limits and rate limiting
- Improve model inference efficiency
- Add automated backend and frontend tests
- Evaluate using ROUGE and other summarization metrics
- Support longer conversations using chunking or a long-context model
- Add configurable summary length
- Improve deployment monitoring and reliability
- Expand the Hugging Face model documentation

## 14. Key Learning Outcomes

This project involved:

- Fine-tuning a pretrained Transformer for an NLP task
- Preparing conversational data for sequence-to-sequence learning
- Implementing and integrating model inference
- Building a REST API using FastAPI
- Connecting an AI backend to a custom web interface
- Publishing trained model artifacts on Hugging Face
- Managing application source code with Git and GitHub
- Deploying a machine learning application on Render

The project demonstrates the complete workflow from model development to a publicly accessible AI application.

---

## Author

**Faizanur Rahman**

Computer Science Undergraduate | AI/ML and Deep Learning

**[GitHub](https://github.com/Faizan-2419) · [LinkedIn](https://www.linkedin.com/in/faizanur-rahman) · [Live Project](https://sumora-ai-pjj3.onrender.com)**

---

**Sumora AI — Less reading. More understanding.**
