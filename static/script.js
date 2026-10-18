
const analyzeBtn = document.getElementById("analyzeBtn");
const statusMessage = document.getElementById("statusMessage");
const resultsSection = document.getElementById("resultsSection");

const errorMeaning = document.getElementById("errorMeaning");
const likelyCause = document.getElementById("likelyCause");
const fixSteps = document.getElementById("fixSteps");
const correctedCode = document.getElementById("correctedCode");
const preventionTip = document.getElementById("preventionTip");
const copyCodeBtn = document.getElementById("copyCodeBtn");

// Add styling classes to the analysis result cards.
errorMeaning.closest(".result-card").classList.add("result-meaning");
likelyCause.closest(".result-card").classList.add("result-cause");
fixSteps.closest(".result-card").classList.add("result-fixes");
correctedCode.closest(".result-card").classList.add("result-code");
preventionTip.closest(".result-card").classList.add("result-tip");

// Display status and feedback messages.
function showStatus(message, type = "") {
    statusMessage.textContent = message;
    statusMessage.className = "status-message";

    if (type) {
        statusMessage.classList.add(`status-${type}`);
    }
}

// Update the Analyze button during requests.
function setLoading(loading) {
    analyzeBtn.disabled = loading;
    analyzeBtn.classList.toggle("is-loading", loading);

    analyzeBtn.innerHTML = loading
        ? "Analyzing your code..."
        : '<span class="analyze-button-label">Analyze Code</span><span class="button-arrow" aria-hidden="true">→</span>';
}

// Check whether the AI response contains the required fields.
function isValidAnalysis(analysis) {
    return (
        analysis &&
        typeof analysis.error_meaning === "string" &&
        analysis.error_meaning.trim() !== "" &&
        typeof analysis.likely_cause === "string" &&
        analysis.likely_cause.trim() !== "" &&
        Array.isArray(analysis.fix_steps) &&
        analysis.fix_steps.length > 0 &&
        analysis.fix_steps.every(step => typeof step === "string") &&
        typeof analysis.corrected_code === "string" &&
        typeof analysis.prevention_tip === "string" &&
        analysis.prevention_tip.trim() !== ""
    );
}

// Analyze the Python code using the existing FastAPI endpoint.
analyzeBtn.addEventListener("click", async () => {
    const code = window.codeEditor.getValue().trim();

    if (!code) {
        resultsSection.hidden = true;
        showStatus("Please enter some Python code first.", "error");
        window.codeEditor.focus();
        return;
    }

    setLoading(true);
    resultsSection.hidden = true;
    showStatus("Checking your code with AI. Please wait.");

    try {
        const response = await fetch("/api/analyze-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code })
        });

        // Handle invalid JSON responses from the server.
        let data;

        try {
            data = await response.json();
        } catch {
            throw new Error(
                "The server returned an invalid response. Please try again."
            );
        }

        // Display errors returned by the backend.
        if (!response.ok) {
            throw new Error(
                typeof data.detail === "string"
                    ? data.detail
                    : `Request failed with status ${response.status}.`
            );
        }

        // Verify the AI response before displaying the results.
        if (data.success !== true || !isValidAnalysis(data.analysis)) {
            throw new Error(
                "The AI response was incomplete. Please try again."
            );
        }

        const analysis = data.analysis;

        // Display the analysis.
        errorMeaning.textContent = analysis.error_meaning;
        likelyCause.textContent = analysis.likely_cause;
        preventionTip.textContent = analysis.prevention_tip;
        correctedCode.textContent = analysis.corrected_code;

        // Display the suggested fix steps.
        fixSteps.replaceChildren();

        analysis.fix_steps.forEach(step => {
            const item = document.createElement("li");
            item.textContent = step;
            fixSteps.appendChild(item);
        });

        // Reset the Copy button.
        copyCodeBtn.textContent = "Copy corrected code";
        copyCodeBtn.classList.remove("copied");

        // Show the results and success message.
        resultsSection.hidden = false;
        showStatus("Analysis completed successfully.", "success");

        // Smoothly scroll to the analysis results.
        resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    } catch (error) {
        showStatus(
            error instanceof TypeError
                ? "Cannot connect to the server. Check your connection and try again."
                : error.message || "Something went wrong. Please try again.",
            "error"
        );

    } finally {
        setLoading(false);
    }
});

// Copy the corrected Python code.
copyCodeBtn.addEventListener("click", async () => {
    const code = correctedCode.textContent;

    if (!code) {
        showStatus("There is no corrected code to copy.", "error");
        return;
    }

    try {
        await navigator.clipboard.writeText(code);

        copyCodeBtn.textContent = "✓ Copied successfully";
        copyCodeBtn.classList.add("copied");

        showStatus("Corrected code copied to clipboard.", "success");

        window.setTimeout(() => {
            copyCodeBtn.textContent = "Copy corrected code";
            copyCodeBtn.classList.remove("copied");
        }, 2000);

    } catch {
        showStatus(
            "Copy failed. Please select and copy the code manually.",
            "error"
        );
    }
});
