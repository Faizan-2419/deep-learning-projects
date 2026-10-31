
/* =========================================
   SUMORA AI — MAIN JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // Initialize Lucide icons throughout the website
    if (window.lucide) {
        window.lucide.createIcons();
    }

    
    // =====================================
    // SCROLL REVEAL ANIMATIONS
    // =====================================

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        !reduceMotion &&
        "IntersectionObserver" in window
    ) {
        const revealElements = document.querySelectorAll(
            ".section-heading, " +
            ".benefit-card, " +
            ".feature-card, " +
            ".step-card, " +
            ".usecase-card, " +
            ".showcase-content, " +
            ".showcase-visual, " +
            ".faq-intro, " +
            ".faq-list, " +
            ".about-problem-card, " +
            ".about-tech-card, " +
            ".about-usecase-item, " +
            ".workspace-info-card"
        );

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            "is-visible"
                        );

                        observerInstance.unobserve(
                            entry.target
                        );
                    }
                });
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px 20px 0px"
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            observer.observe(element);
        });
    }


    // =====================================
    // 1. SHARED WEBSITE ELEMENTS
    // =====================================

    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");
    const copyrightYear = document.getElementById("copyright-year");

    // Automatically update footer year
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // Mobile navigation
    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });

        // Close menu when a navigation link is clicked
        mainNav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {
                mainNav.classList.remove("is-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });

        });

        // Close navigation with Escape
        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {
                mainNav.classList.remove("is-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });
    }


    // =====================================
    // 2. WORKSPACE ELEMENTS
    // =====================================

    const form = document.getElementById("summarization-form");

    // Home and About do not have a summarization form.
    // Their shared scripts have already been initialized.
    if (!form) return;

    const dialogueInput = document.getElementById("dialogue-input");

    const summarizeButton = document.getElementById("summarize-button");
    const sampleButton = document.getElementById("sample-button");

    const clearInputButton = document.getElementById("clear-input-button");
    const clearSummaryButton = document.getElementById("clear-summary-button");
    const clearAllButton = document.getElementById("clear-all-button");

    const copySummaryButton = document.getElementById("copy-summary-button");

    const inputWordCount = document.getElementById("input-word-count");
    const inputCharCount = document.getElementById("input-char-count");

    const summaryWordCount = document.getElementById("summary-word-count");
    const summaryStatus = document.getElementById("summary-status");

    const summaryText = document.getElementById("summary-text");
    const summaryEmptyState = document.getElementById("summary-empty-state");
    const summaryLoading = document.getElementById("summary-loading");

    const toast = document.getElementById("toast");


    // =====================================
    // 3. STATE
    // =====================================

    let isProcessing = false;
    let currentSummary = "";
    let toastTimeout = null;
    let activeController = null;
    let requestVersion = 0;


    // =====================================
    // 4. SAMPLE DIALOGUE
    // =====================================

    const sampleDialogue = `Alex: Hi Sam, have we finalized the project presentation?

Sam: Almost. We have completed most of the slides, but the conclusion needs some changes.

Alex: Should we schedule a meeting tomorrow to review everything?

Sam: Yes, let's meet at 10 AM. We can review the conclusion and make the final edits.

Alex: Sounds good. I'll prepare the updated notes and share them with the team.

Sam: Perfect. Once we finish the review, we can submit the presentation.`;



    // =====================================
    // 5. TEXT COUNTING
    // =====================================

    function countWords(text) {

        const cleanedText = text.trim();

        if (!cleanedText) {
            return 0;
        }

        return cleanedText.split(/\s+/).length;
    }


    function updateInputStats() {

        const text = dialogueInput.value;

        inputWordCount.textContent = countWords(text);
        inputCharCount.textContent = text.length;

        summarizeButton.disabled =
            isProcessing || !text.trim();
    }


    // =====================================
    // 6. NOTIFICATIONS
    // =====================================

    function showToast(message) {

        if (!toast) return;

        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        toast.textContent = message;
        toast.hidden = false;

        toastTimeout = setTimeout(() => {
            toast.hidden = true;
        }, 3000);
    }


    // =====================================
    // 7. SUMMARY DISPLAY
    // =====================================

    function showEmptyState() {

        summaryEmptyState.hidden = false;
        summaryText.hidden = true;
        summaryLoading.hidden = true;

        summaryText.textContent = "";

        summaryWordCount.textContent = "0";
        summaryStatus.textContent = "Awaiting input";

        currentSummary = "";

        copySummaryButton.disabled = true;
        clearSummaryButton.disabled = true;
    }


    function showLoadingState() {

        summaryEmptyState.hidden = true;
        summaryText.hidden = true;
        summaryLoading.hidden = false;

        summaryStatus.textContent = "Generating...";
        summaryWordCount.textContent = "0";

        currentSummary = "";

        copySummaryButton.disabled = true;
        clearSummaryButton.disabled = true;
    }


    function showSummary(summary) {

        currentSummary = summary;

        summaryEmptyState.hidden = true;
        summaryLoading.hidden = true;

        summaryText.hidden = false;
        summaryText.textContent = summary;

        summaryWordCount.textContent = countWords(summary);
        summaryStatus.textContent = "Summary generated";

        copySummaryButton.disabled = false;
        clearSummaryButton.disabled = false;
    }


    function showError(message) {

        currentSummary = "";

        summaryEmptyState.hidden = true;
        summaryLoading.hidden = true;

        summaryText.hidden = false;
        summaryText.textContent = message;

        summaryWordCount.textContent = "0";
        summaryStatus.textContent = "Error";

        copySummaryButton.disabled = true;
        clearSummaryButton.disabled = false;
    }


    // =====================================
    // 8. PROCESSING STATE
    // =====================================

    function setProcessing(processing) {

        isProcessing = processing;

        summarizeButton.disabled =
            processing || !dialogueInput.value.trim();

        
        summarizeButton.innerHTML = processing
            ? `<span class="button-spinner" aria-hidden="true"></span>
            Generating...`
            : `<i data-lucide="sparkles" aria-hidden="true"></i>
            Generate Summary
            <span aria-hidden="true">↗</span>`;

        if (window.lucide) {
            window.lucide.createIcons();
        }


        // Prevent simultaneous actions while processing
        sampleButton.disabled = processing;
        clearInputButton.disabled = processing;
        clearSummaryButton.disabled = processing;
        clearAllButton.disabled = processing;
    }


    // =====================================
    // 9. GENERATE SUMMARY
    // =====================================

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        if (isProcessing) return;

        const dialogue = dialogueInput.value.trim();

        if (!dialogue) {
            showToast("Please enter a conversation first.");
            return;
        }

        const version = ++requestVersion;
        activeController = new AbortController();

        setProcessing(true);
        showLoadingState();

        try {

            // Existing FastAPI API — unchanged
            const response = await fetch("/summarize/", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    dialogue: dialogue
                }),

                signal: activeController.signal

            });


            if (!response.ok) {
                throw new Error(
                    `Server error: ${response.status}`
                );
            }


            const data = await response.json();

            // Ignore outdated results
            if (version !== requestVersion) return;

            if (!data.summary ||
                typeof data.summary !== "string" ||
                !data.summary.trim()) {

                throw new Error("No summary returned by the model.");
            }

            showSummary(data.summary);

            showToast("Your summary is ready.");

        } catch (error) {

            if (version !== requestVersion) return;

            if (error.name === "AbortError") return;

            console.error("Summarization error:", error);

            showError(
                "Something went wrong while generating " +
                "the summary. Please try again."
            );

            showToast("Unable to generate summary.");

        } finally {

            if (version === requestVersion) {
                activeController = null;
                setProcessing(false);
            }
        }

    });


    // =====================================
    // 10. INPUT CHANGES
    // =====================================

    dialogueInput.addEventListener("input", () => {

        updateInputStats();

        // Existing output remains visible while editing.
        // A new request will replace it when generated.

    });


    // =====================================
    // 11. SAMPLE TEXT BUTTON
    // =====================================

    sampleButton.addEventListener("click", () => {

        if (isProcessing) return;

        dialogueInput.value = sampleDialogue;

        updateInputStats();
        showEmptyState();

        dialogueInput.focus();

        showToast("Example conversation added.");

    });


    // =====================================
    // 12. CLEAR INPUT BUTTON
    // =====================================

    clearInputButton.addEventListener("click", () => {

        if (isProcessing) return;

        dialogueInput.value = "";

        updateInputStats();

        dialogueInput.focus();

        showToast("Input cleared.");

    });


    // =====================================
    // 13. CLEAR SUMMARY BUTTON
    // =====================================

    clearSummaryButton.addEventListener("click", () => {

        if (isProcessing) return;

        showEmptyState();

        showToast("Summary cleared.");

    });


    // =====================================
    // 14. CLEAR ALL BUTTON
    // =====================================

    clearAllButton.addEventListener("click", () => {

        if (isProcessing) return;

        dialogueInput.value = "";

        showEmptyState();
        updateInputStats();

        dialogueInput.focus();

        showToast("Workspace cleared.");

    });


    // =====================================
    // 15. COPY SUMMARY
    // =====================================

    copySummaryButton.addEventListener("click", async () => {

        if (!currentSummary) return;

        try {

            await navigator.clipboard.writeText(
                currentSummary
            );

            showToast("Summary copied to clipboard.");

        } catch (error) {

            console.error("Clipboard error:", error);

            showToast(
                "Unable to copy automatically. " +
                "Please select and copy the text."
            );

        }

    });


    // =====================================
    // 16. INITIALIZE WORKSPACE
    // =====================================

    updateInputStats();
    showEmptyState();

});
