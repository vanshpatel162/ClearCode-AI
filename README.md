# ClearCode AI 🐍

**An AI-powered Python error analyzer built with FastAPI and Google Gemini.**

ClearCode AI helps Python learners understand errors, identify likely causes, and discover possible fixes with the help of AI. Paste your Python code into the editor and receive an easy-to-understand analysis, suggested corrected code, and prevention tips.

## 🌐 Live Demo

**Try ClearCode AI:** [https://clearcode-ai.onrender.com/](https://clearcode-ai.onrender.com/)

The application is deployed on Render and accessible directly through your browser.

## ✨ Features

- **AI-Powered Code Analysis:** Get explanations of potential Python errors in simple language.
- **Error Meaning:** Understand what an error means.
- **Likely Cause Detection:** Identify possible reasons behind an error.
- **Step-by-Step Fixes:** Receive suggestions to help resolve issues.
- **Corrected Code:** Get AI-generated corrected code suggestions.
- **Prevention Tips:** Learn how to avoid similar errors in the future.
- **Syntax-Highlighted Editor:** Write or paste Python code into the editor.
- **Copy Code:** Copy suggested corrected code with one click.
- **Input Validation:** Validate incoming requests using Pydantic.
- **Error Handling:** Handle invalid AI responses and service failures.
- **Automated Testing:** Test API endpoints and error-handling behavior.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| FastAPI | REST API development |
| Google Gemini API | AI-powered code analysis |
| Pydantic | Request and response validation |
| HTML5 | Frontend structure |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend interactions and API requests |
| CodeMirror | Syntax-highlighted code editor |
| Pytest | Automated testing |
| Render | Cloud deployment |
| Git and GitHub | Version control and source code hosting |

## 📂 Project Structure

```text
ClearCode-AI/
├── main.py
├── ai_service.py
├── schemas.py
├── requirements.txt
├── .env
├── .gitignore
├── test_api.py
└── static/
    ├── index.html
    ├── style.css
    └── script.js
```

### File Descriptions

- `main.py` — Creates the FastAPI application, serves the frontend, and defines API endpoints.
- `ai_service.py` — Integrates Google Gemini for AI-powered code analysis.
- `schemas.py` — Defines and validates request and response data using Pydantic.
- `test_api.py` — Contains automated API tests.
- `requirements.txt` — Lists the Python dependencies required by the project.
- `.env` — Stores local environment variables, including the Gemini API key.
- `.gitignore` — Excludes sensitive and unnecessary files from Git.
- `static/index.html` — Defines the user interface.
- `static/style.css` — Contains the application styling.
- `static/script.js` — Handles frontend interactions and API requests.

## ⚙️ Installation and Setup

### Prerequisites

- Python 3.12 or another compatible Python version
- Git
- A Google Gemini API key
- Visual Studio Code or another code editor

### 1. Clone the Repository

```bash
git clone https://github.com/vanshpatel162/ClearCode-AI.git
cd ClearCode-AI
```

### 2. Create a Virtual Environment

For Windows PowerShell:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, use Command Prompt:

```bat
venv\Scripts\activate.bat
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Replace the placeholder with your own Gemini API key.

**Security note:** Never upload your real `.env` file or expose your API key in frontend JavaScript, GitHub, screenshots, or public logs. Configure the key as an environment variable in Render as well.

### 5. Run the Application Locally

```bash
uvicorn main:app --reload
```

Open these URLs in your browser:

- **Web application:** http://127.0.0.1:8000
- **Health check:** http://127.0.0.1:8000/health
- **Interactive API documentation:** http://127.0.0.1:8000/docs

## 🔌 API Documentation

### Analyze Python Code

**Endpoint:** `POST /api/analyze-code`

This endpoint accepts Python code and returns an AI-generated analysis.

#### Example Request

```json
{
  "code": "print(10 / 0)"
}
```

#### Example Response

```json
{
  "success": true,
  "analysis": {
    "error_meaning": "Explanation of the error",
    "likely_cause": "Possible cause of the error",
    "fix_steps": [
      "Review the operation causing the error",
      "Apply an appropriate fix"
    ],
    "corrected_code": "Suggested corrected Python code",
    "prevention_tip": "A tip to help avoid this error"
  }
}
```

The response above illustrates the expected structure. Actual explanations and suggestions depend on the submitted code and AI output.

### Health Check

**Endpoint:** `GET /health`

Used to check whether the API is responding.

Example response:

```json
{
  "status": "ok"
}
```

## 🧪 Running Tests

Run the automated test suite with:

```bash
pytest -q
```

The current test suite contains six tests covering:

1. Homepage response.
2. Health-check endpoint.
3. Successful analysis using a mocked AI response.
4. Rejection of empty code.
5. Rejection of missing code.
6. Handling of AI service failures.

**Development test result:** All six tests passed in the development environment. Test results may vary if the code or dependencies change.

## ☁️ Deployment on Render

ClearCode AI is deployed on Render.

To deploy your own instance:

1. Push your project to a GitHub repository.
2. Create a Web Service on Render and connect your repository.
3. Set the build command:

   ```bash
   pip install -r requirements.txt
   ```

4. Set the start command:

   ```bash
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

5. Add `GEMINI_API_KEY` under your Render service's environment variables.
6. Deploy the application.
7. Test the live website and API endpoints.

**Live application:** [https://clearcode-ai.onrender.com/](https://clearcode-ai.onrender.com/)

## 🔒 Important Notes

- Submitted Python code is analyzed as text and is not executed by the application.
- AI-generated explanations and corrected code may not always be accurate. Review suggestions before using them.
- Keep API keys and other secrets private.
- Monitor Gemini API usage and quota.
- Avoid submitting confidential or sensitive source code to an external AI service unless authorized.
- The public API may be subject to usage limits imposed by the hosting provider or AI service.

## 🎯 Project Goal

ClearCode AI aims to make Python debugging easier for beginners while providing hands-on experience with:

- Python backend development.
- REST API development using FastAPI.
- Generative AI integration.
- Data validation using Pydantic.
- Frontend and backend communication.
- Automated testing with Pytest.
- Environment variable management.
- Cloud deployment using Render.
- Version control using Git and GitHub.

## 👨‍💻 Author

**Vansh Patel**

- **GitHub:** [@vanshpatel162](https://github.com/vanshpatel162)
- **Project Repository:** [ClearCode AI](https://github.com/vanshpatel162/ClearCode-AI)
- **Live Demo:** [clearcode-ai.onrender.com](https://clearcode-ai.onrender.com/)

---

*Built as a hands-on Python backend and generative AI project.*
