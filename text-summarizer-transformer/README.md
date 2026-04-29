# 🚀 AI-Powered Text Summarizer (T5 + FastAPI)

A production-style NLP system for abstractive text summarization using a **T5 Transformer model**, served via **FastAPI**, with a simple frontend using **HTML, CSS, and JavaScript**.

---

# 📌 Project Overview

This project performs abstractive text summarization using a **T5 Transformer model**.

It converts long-form text into short, meaningful summaries using a real-time API-based system.

---

# 🧠 Key Features

- Abstractive summarization using T5 Transformer 🤖  
- FastAPI backend for real-time inference ⚡  
- Simple frontend (HTML, CSS, JavaScript) 🌐  
- Supports CPU and GPU execution 💻  
- Basic text preprocessing pipeline 🧹  
- Lightweight and modular design 📦  

---

# 🏗️ System Architecture

Step 1: User enters text  
↓  
Step 2: Frontend (HTML / JS) sends request  
↓  
Step 3: FastAPI backend receives input  
↓  
Step 4: Text preprocessing is applied  
↓  
Step 5: T5 model generates summary  
↓  
Step 6: Output is returned to UI  

---

# 🛠️ Tech Stack

- Model → T5 (Hugging Face Transformers)  
- Backend → FastAPI  
- Frontend → HTML, CSS, JavaScript  
- Framework → PyTorch  
- Tokenizer → T5Tokenizer  

---

# 📁 Project Structure

AI-POWERED-TEXT-SUMMARIZER/

├── app.py  
├── templates/  
│   └── index.html  
├── .gitignore  
├── requirements.txt  
└── README.md  

---

# ⚙️ Installation & Setup (Step-by-Step)

## Step 1: Clone Repository
git clone https://github.com/YOUR_USERNAME/AI-POWERED-TEXT-SUMMARIZER.git  
cd AI-POWERED-TEXT-SUMMARIZER  

---

## Step 2: Create Virtual Environment
python -m venv venv  

---

## Step 3: Activate Environment

Windows:  
venv\Scripts\activate  

Linux / Mac:  
source venv/bin/activate  

---

## Step 4: Install Dependencies
pip install -r requirements.txt  

---

## Step 5: Run Application
uvicorn app:app --reload  

---

# 🧹 Text Preprocessing Pipeline

- Remove extra spaces  
- Remove HTML tags  
- Convert text to lowercase  
- Clean special characters and noise  

---

# 🧠 Model Details

- Model Type: T5 (Text-to-Text Transformer)  
- Task: Abstractive Text Summarization  
- Input: Raw long text  
- Output: Short meaningful summary  

---

# 🚀 Future Improvements

- Add BART / PEGASUS models  
- Docker containerization 🐳  
- Cloud deployment (AWS / GCP / Render) ☁️  
- Authentication system 🔐  
- React frontend upgrade ⚛️  
- Streaming response support  

---

# 👨‍💻 Author

Faizan  
AI Developer | Deep Learning Enthusiast  

LinkedIn: www.linkedin.com/in/faizanur-rahman  

---

# ⭐ Support

- Star this repository ⭐  
- Share the project 📢  
- Contributions are welcome 🤝  
```
