# 🎥 AI YouTube Video Analyzer

Don't have 40 minutes to watch a video just to find out if it's worth it? Paste a YouTube link, and this app reads the transcript and gives you a clean summary: the main ideas, the key terms explained simply, and what you can actually take away from it.

Built with Streamlit, Agno, and Groq.


**🌐 Live Demo:** [Try it here](https://youtube-video-analyzer-aii.streamlit.app/)

---

## What it does

You paste a YouTube URL. The app pulls the video's transcript, hands it to an AI agent, and returns a structured breakdown:

- **Video title**
- **Short summary** of what the video is about
- **Key points** worth remembering
- **Important concepts** explained in plain language
- **Practical takeaways** you can apply right away

It's meant for learning, so the output stays short and easy to read.

## How it works

1. You enter a YouTube video URL.
2. `YouTubeTools` fetches the video's transcript.
3. An Agno agent reads the transcript and follows a set of instructions for how to summarize it.
4. The model (`openai/gpt-oss-120b`, an open-weight model served through Groq) writes the analysis.
5. Streamlit displays the result.

The agent only works from the transcript, so the summary reflects what was actually said in the video.

## Tech stack

| Tool | What it's used for |
|---|---|
| Python | Core language |
| Streamlit | Web interface |
| Agno | AI agent framework |
| Groq API | Fast LLM inference |
| `openai/gpt-oss-120b` | The language model |
| YouTubeTools | Transcript retrieval |
| python-dotenv | Loading environment variables |

## Run it locally

**You'll need:** Python 3.10+ and a free API key from [Groq](https://console.groq.com).

**1. Clone the repo**

```bash
git clone https://github.com/Faizan-2419/deep-learning-projects.git
cd deep-learning-projects/YouTube-Video-Analyzer
```

**2. Install dependencies**

```bash
pip install -r requirements.txt
```

**3. Add your API key**

Copy `.env.example` to `.env` and add your key:

```env
GROQ_API_KEY=your_groq_api_key
```

**4. Start the app**

```bash
streamlit run ui.py
```

## Project structure

```text
YouTube-Video-Analyzer/
├── ui.py                  # Streamlit interface
├── youtube_analyzer.py    # Agent setup and transcript analysis
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md
```

## Deploying

The easiest option is Streamlit Community Cloud. Add `GROQ_API_KEY` under the app's **Secrets** settings before launching.

## Limitations

- **No transcript, no analysis.** If a video has captions disabled or unavailable, the app can't summarize it.
- **Very long videos** may run into model context limits.
- **Non-English videos** may give weaker results.
- **Rate limits** on the Groq API can slow or block requests during heavy use.
- The summary is only as good as the transcript and the model's output, so it's worth checking anything important against the video itself.

## Ideas for the future

- Support for more languages
- Export summaries to Markdown or PDF
- Ask follow-up questions about the video

## Connect

Built by Faizanur Rahman. Feedback and ideas are welcome.
[LinkedIn](https://www.linkedin.com/in/faizanur-rahman/)
