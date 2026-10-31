# Sumora AI — Fine-Tuned T5 Dialogue Summarizer

An end-to-end NLP application that transforms lengthy conversations into concise, meaningful summaries using a fine-tuned **T5-small Transformer**.

Sumora AI combines deep learning, a FastAPI backend, and a responsive three-page web application.

---

## Project Overview

Sumora AI is designed to simplify the process of understanding lengthy conversations.

The model is fine-tuned on the **SAMSum dialogue summarization dataset** and generates abstractive summaries that capture the important information from conversations.

The project includes a functional web interface where users can enter dialogue, generate summaries, and manage the output.

## Key Features

- **Abstractive Summarization:** Generate natural-language summaries using a fine-tuned T5 model.
- **Interactive Workspace:** Enter conversations and generate summaries through a web interface.
- **Example Dialogue:** Test the application using a built-in conversation.
- **Text Statistics:** Display input word counts, character counts, and summary word counts.
- **Copy and Clear:** Copy summaries and reset inputs.
- **Responsive Design:** Supports desktop and mobile devices.
- **Modern UI:** Warm Editorial design, Lucide icons, and subtle animations.
- **FastAPI Backend:** Provides an API endpoint for model inference.
- **CPU/GPU Support:** Uses available hardware for inference.

## Technology Stack

| Component | Technology |
|---|---|
| Programming | Python |
| Deep Learning | PyTorch |
| NLP Model | T5-small |
| Model Framework | Hugging Face Transformers |
| Training Dataset | SAMSum |
| Backend | FastAPI |
| Template Engine | Jinja2 |
| Frontend | HTML, CSS, JavaScript |
| Icons | Lucide |
| Model Format | Safetensors |

## System Architecture

```text
User enters dialogue
        |
        v
Sumora AI Workspace
        |
        v
JavaScript sends POST request
        |
        v
FastAPI /summarize/
        |
        v
Text Preprocessing
        |
        v
Fine-Tuned T5 Transformer
        |
        v
Generated Summary
        |
        v
Workspace displays the result
```

## Project Structure

```text
sumora_ai/
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
├── saved_summary_model/
│   ├── config.json
│   ├── generation_config.json
│   ├── tokenizer.json
│   └── tokenizer_config.json
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── workspace.html
│   └── about.html
└── static/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── icons/
        └── favicon.svg
```

**Note:** The trained `model.safetensors` weights are stored separately from regular Git commits because the file exceeds GitHub's standard file-size limit. They are required to run inference.

## Model Details

- **Architecture:** T5-small (Text-to-Text Transfer Transformer)
- **Task:** Abstractive dialogue summarization
- **Dataset:** SAMSum
- **Framework:** PyTorch and Hugging Face Transformers
- **Maximum input length:** 512 tokens
- **Maximum output length:** 150 tokens
- **Beam search:** 4 beams
- **Early stopping:** Enabled

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Faizan-2419/deep-learning-projects.git
cd deep-learning-projects/sumora_ai
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

Activate on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Add the trained model

Place the compatible `model.safetensors` file in the `saved_summary_model/` directory alongside its configuration and tokenizer files.

### 5. Run the application

```bash
uvicorn app:app --reload
```

Open `http://127.0.0.1:8000` in your browser.

## API Endpoint

**POST** `/summarize/`

Request:

```json
{
  "dialogue": "Alex: Is the presentation ready? Sam: Almost, we need to review the conclusion."
}
```

Example response format:

```json
{
  "summary": "Alex and Sam discuss the remaining presentation review."
}
```

Actual generated summaries depend on the model output.

## Website Pages

**Home:** Introduces Sumora AI, its benefits, features, and workflow.

**Workspace:** Provides the interface for entering dialogue and generating summaries.

**About:** Explains the project's purpose, technology, and approach.

## Future Improvements

- Public cloud deployment
- Optimized inference performance
- Expanded model evaluation
- Support for longer conversations
- Additional summarization controls

## Author

**Faizanur Rahman**

AI/ML | Deep Learning | NLP

**GitHub:** https://github.com/Faizan-2419

**LinkedIn:** https://www.linkedin.com/in/faizanur-rahman
