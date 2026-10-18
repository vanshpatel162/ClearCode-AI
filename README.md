# ClearCode AI 🐍

**An AI-powered Python error analyzer built with FastAPI and Google Gemini.**

ClearCode AI helps Python learners understand errors, identify likely causes, and discover possible fixes with the help of AI. Simply paste your Python code into the editor and get an easy-to-understand analysis with corrected code and prevention tips.

## 🚀 Features

- **AI-Powered Error Analysis:** Understand Python errors in simple language.
- **Likely Cause Detection:** Discover what might be causing an error.
- **Fix Suggestions:** Receive step-by-step suggestions to fix issues.
- **Corrected Code:** Get a suggested version of your code.
- **Prevention Tips:** Learn how to avoid similar errors in the future.
- **Syntax-Highlighted Editor:** Write or paste Python code into the editor.
- **Copy Code:** Copy the suggested corrected code easily.
- **Input Validation:** Validate incoming API requests using Pydantic.
- **Error Handling:** Return appropriate error responses when analysis fails.
- **Automated Tests:** Test API endpoints and error-handling behavior.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| FastAPI | REST API development |
| Google Gemini API | AI-powered code analysis |
| Pydantic | Request and response validation |
| HTML5 | Frontend structure |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend interactions and API calls |
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

**File descriptions:**

- `main.py` — Creates the FastAPI application, serves the frontend, and defines API endpoints.
- `ai_service.py` — Integrates the Google Gemini API for Python code analysis.
- `schemas.py` — Defines and validates request and response data using Pydantic.
- `test_api.py` — Contains automated API tests.
- `requirements.txt` — Lists the Python dependencies.
- `.env` — Stores local environment variables, including the Gemini API key.
- `.gitignore` — Excludes sensitive files and unnecessary files from Git.
- `static/index.html` — Defines the user interface.
- `static/style.css` — Contains the application styling.
- `static/script.js` — Handles frontend interactions and API requests.

## ⚙️ Installation and Setup

### Prerequisites

- Python 3.12 or a compatible Python version
- Git
- A Google Gemini API key
- Visual Studio Code or another code editor

### 1. Clone the repository

```bash
git clone https://github.com/vanshpatel162/ClearCode-AI.git
cd ClearCode-AI
```

### 2. Create a virtual environment

**Windows:**

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks environment activation, use Command Prompt:

```bat
venv\Scripts\activate.bat
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Replace the placeholder with your own API key.

**Important:** Never upload your real `.env` file or expose your API key in frontend JavaScript, GitHub, screenshots, or public logs. Use environment variables in your deployment environment as well.

### 5. Run the application

```bash
uvicorn main:app --reload
```

Open the application in your browser:

- **Web app:** http://127.0.0.1:8000
- **Health check:** http://127.0.0.1:8000/health
- **API documentation:** http://127.0.0.1:8000/docs

## 🔌 API Endpoint

### Analyze Python Code

`POST /api/analyze-code`

**Request body:**

```json
{
  "code": "print(10 / 0)"
}
```

The API validates the submitted code, sends it to the AI service for analysis, validates the returned result, and provides the analysis to the frontend.

**Successful response structure:**

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

The example response above illustrates the expected structure; actual analysis depends on the submitted code and AI output.

## 🧪 Running Tests

Run the automated test suite:

```bash
pytest -q
```

The current test suite contains six tests covering:

1. Homepage response.
2. Health-check endpoint.
3. Successful code analysis using a mocked AI response.
4. Rejection of empty code.
5. Rejection of missing code.
6. Handling of AI service failures.

The six tests passed in the development environment. Test results may vary after changes to the code or dependencies.

## ☁️ Deployment

ClearCode AI is deployed on Render.

To deploy your own instance:

1. Push the project to a GitHub repository.
2. Create a new Web Service on Render and connect the repository.
3. Configure the build command:

   ```bash
   pip install -r requirements.txt
   ```

4. Configure the start command:

   ```bash
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

5. Add `GEMINI_API_KEY` in the Render environment variables.
6. Deploy the application and test the homepage and API.

**Live demo:** Add your deployed Render URL here.

## 🔒 Important Notes

- Submitted Python code is analyzed as text and is not executed by the application.
- AI-generated explanations and corrected code may not always be accurate. Review suggestions before using them.
- Keep API keys and other secrets private.
- Protect the public API and monitor your Gemini API usage and quota.
- Do not submit sensitive or confidential source code to an external AI service unless you are authorized to do so.

## 🎯 Project Goal

The goal of ClearCode AI is to make Python debugging easier for beginners while providing practical experience with backend development, API integration, data validation, frontend-backend communication, testing, and cloud deployment.

## 👨‍💻 Author

**Vansh Patel**

- GitHub: [@vanshpatel162](https://github.com/vanshpatel162)

---

*Built as a hands-on Python backend and generative AI project.*
