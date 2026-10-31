
from fastapi import FastAPI, Request
from pydantic import BaseModel
from transformers import T5ForConditionalGeneration, T5Tokenizer
import torch
import re

from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles


# ----------------------------------
# FASTAPI APPLICATION
# ----------------------------------

app = FastAPI(
    title="Sumora AI",
    description="AI-Powered Dialogue Summarization",
    version="1.0"
)


# ----------------------------------
# EXISTING T5 MODEL
# ----------------------------------

model = T5ForConditionalGeneration.from_pretrained(
    "./saved_summary_model"
)

tokenizer = T5Tokenizer.from_pretrained(
    "./saved_summary_model"
)


# Device selection
if torch.backends.mps.is_available():
    device = torch.device("mps")

elif torch.cuda.is_available():
    device = torch.device("cuda")

else:
    device = torch.device("cpu")

model.to(device)


# ----------------------------------
# FRONTEND CONFIGURATION
# ----------------------------------

templates = Jinja2Templates(directory="templates")

app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static"
)


# ----------------------------------
# REQUEST SCHEMA
# ----------------------------------

class DialogueInput(BaseModel):
    dialogue: str


# ----------------------------------
# EXISTING TEXT PROCESSING
# ----------------------------------

def clean_data(text):
    text = re.sub(r"\r\n", " ", text)
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"<.*?>", " ", text)
    text = text.strip().lower()

    return text


# ----------------------------------
# EXISTING SUMMARIZATION FUNCTION
# ----------------------------------

def summarize_dialogue(dialogue: str) -> str:

    dialogue = clean_data(dialogue)

    inputs = tokenizer(
        dialogue,
        padding="max_length",
        max_length=512,
        truncation=True,
        return_tensors="pt"
    ).to(device)

    targets = model.generate(
        input_ids=inputs["input_ids"],
        attention_mask=inputs["attention_mask"],
        max_length=150,
        num_beams=4,
        early_stopping=True
    )

    summary = tokenizer.decode(
        targets[0],
        skip_special_tokens=True
    )

    return summary


# ----------------------------------
# EXISTING SUMMARIZATION API
# ----------------------------------

@app.post("/summarize/")
async def summarize(dialogue_input: DialogueInput):

    summary = summarize_dialogue(
        dialogue_input.dialogue
    )

    return {"summary": summary}



# PAGE 1 — HOME

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={"active_page": "home"}
    )


# PAGE 2 — WORKSPACE

@app.get("/workspace", response_class=HTMLResponse)
async def workspace(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="workspace.html",
        context={"active_page": "workspace"}
    )


# PAGE 3 — ABOUT

@app.get("/about", response_class=HTMLResponse)
async def about(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="about.html",
        context={"active_page": "about"}
    )
