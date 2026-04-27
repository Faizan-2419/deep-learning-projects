import streamlit as st
from youtube_analyzer import build_youtube_agent

#page setting
st.set_page_config(
    page_title="YouTube Video Analyzer",
    layout="centered"
)

#UI styling
st.markdown("""
<style>
    .stApp {
        background-color: #0e1a21;
    }
    h1, h2, h3, h4, h5, h6 {
        color: #E6EDF3;
    }
    p, div, span {
        color: #e5e7eb;
    }
    .stTextInput > div > div > input {
        background-color: #111C24;
        color: #D1D9E0;
        border: 0.90px solid #2A3A46;
        border-radius: 8px;
        padding: 10px 14px;
    }
    .stButton > button {
        background-color: #186399;
        color: #e6edf3;
        height: 40px;
        border: 1px solid #2A3A46;
        padding: 0 16px;
        border-radius: 8px;
    }
    .stButton > button:active {
        transform: translateY(1.5px);
    }
    .output-box {
        background: #111C24;
        color: #E6EDF3;
        padding: 16px;
        border-radius: 14px;
        border: 1px solid #2A3A46;
        margin-top: 15px;
        line-height: 1.6;
        font-size: 15px;
        box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
        max-height: 500px;
        overflow-y: auto;
    }
    .output-box:hover {
        border-color: #3b5b6b;
    }
    .output-box h1,
    .output-box h2,
    .output-box h3 {
        font-size: 16px;
        margin: 6px 0;
    }
</style>
""", unsafe_allow_html=True)

st.title("🎥 AI YouTube Video Analyzer")

@st.cache_resource
def get_agent():
    
    return build_youtube_agent()
agent=get_agent()

#input box
video_url=st.text_input("Enter You-Tube Video Link")
button=st.button("Analyze video")

if video_url and button:
    with st.spinner("wait a moment..."):
        response=agent.run(
            f"Analyze this video:{video_url}"
        )
    st.markdown("""
        <h1 style="font-size:32px; font-weight:700; color:#E6EDF3; margin-bottom:15px; text-align:center;">
        📊 Video Analysis
        </h1>
        """, unsafe_allow_html=True)
    st.markdown(
        f"""<div class="output-box">{response.content}</div>""",
        unsafe_allow_html=True
    )
