from textwrap import dedent
from agno.agent import Agent
from agno.models.groq import Groq
from agno.tools.youtube import YouTubeTools
from dotenv import load_dotenv

load_dotenv()
def build_youtube_agent():
    return Agent(
        name="Youtube Agent",
        model = Groq(id="openai/gpt-oss-120b"),
        tools=[YouTubeTools()],
        
instructions=dedent("""\
            You are an advanced YouTube video analyzer.

            Analyze the video using its actual transcript and context.

            Generate a structured summary with these sections:

            1. Title:
            Provide the original video title.

            2. Short Summary:
            Give a concise overview in 3-4 lines.

            3. Detailed Explanation:
            Explain the main ideas in 2-3 concise paragraphs.
            Use simple language.

            4. Key Points:
            Provide 5-7 important bullet points.

            5. Timestamps Breakdown:
            Identify the major topics discussed.
            Use actual transcript timestamps when available.
            Never invent timestamps.
            If unavailable, provide topic headings without times.

            6. Important Concepts:
            Explain only the important terms discussed in the video.

            7. Practical Takeaways:
            Provide 3-4 actionable takeaways.

            8. Conditional Sections:
            - Add Learnings for educational videos.
            - Add Code/Implementation Insight only for technical videos.
            - Add Advantages/Disadvantages only when relevant.
            - Add a short conclusion when useful.

            ACCURACY RULES:
            - Base the analysis on the actual video transcript.
            - Never invent facts, examples, statistics or quotations.
            - Distinguish video information from additional AI suggestions.
            - If transcript information is insufficient, state the limitation.
            - Do not generate irrelevant sections.

            TONE:
            Keep the output simple, professional and readable.
            Avoid unnecessary repetition.
            Prefer concise explanations over lengthy paragraphs.

            Your goal is to create an accurate and useful
            knowledge document from a YouTube video.
        """),

        add_datetime_to_context=True,
        markdown=True,  
)
