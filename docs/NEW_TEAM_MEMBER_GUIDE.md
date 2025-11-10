# 👋 Welcome New Team Member! (Complete Beginner Guide)

**Never coded before? Perfect! This guide assumes ZERO experience.**

We'll take this step-by-step. By the end, you'll have the project running on your computer!

---

## 🎯 What We're Going to Do

1. Install some programs on your computer
2. Download the project code
3. Start the project
4. Make a small change
5. Send your change back to the team

**Time needed:** About 30-45 minutes (first time)

---

## Part 1: Installing Programs (One-Time Setup)

### What is a Program vs An App?

Think of these like apps on your phone, but for your computer. We need 4 of them.

---

### Step 1.1: Install Git

**What is Git?** It's like Google Docs for code. It lets many people work on the same project.

**Install it:**

**Windows:**
1. Go to: https://git-scm.com/download/win
2. Click the download link (it downloads automatically)
3. Find the file in your Downloads folder (called `Git-2.xx.x-64-bit.exe`)
4. Double-click it
5. Click "Next" on everything (the defaults are fine)
6. Click "Install"
7. Click "Finish"

**Mac:**
1. Open "Terminal" (Search for "Terminal" in Spotlight)
2. Type this and press Enter: `git --version`
3. If a popup appears, click "Install" and follow the instructions
4. If nothing happens, Git is already installed!

**How to know it worked:**
- Open a new terminal/command window
- Type: `git --version`
- You should see: `git version 2.xx.x`

---

### Step 1.2: Install Python

**What is Python?** It's a programming language. Our backend (server) is written in Python.

**Install it:**

1. Go to: https://www.python.org/downloads/
2. Click the big yellow "Download Python 3.xx.x" button
3. Find the file in your Downloads folder
4. **IMPORTANT:** Check the box that says "Add Python to PATH" ✅
5. Click "Install Now"
6. Wait for it to finish
7. Click "Close"

**How to know it worked:**
- Open a new terminal/command window
- Type: `python --version`
- You should see: `Python 3.xx.x`

**If that doesn't work, try:** `python3 --version`

---

### Step 1.3: Install Node.js

**What is Node.js?** It runs JavaScript code. Our frontend (website) needs it.

**Install it:**

1. Go to: https://nodejs.org/
2. Click the button that says "LTS" (Left side, usually green)
3. Find the file in your Downloads folder
4. Double-click it
5. Click "Next" on everything
6. Click "Install"
7. Click "Finish"

**How to know it worked:**
- Open a new terminal/command window
- Type: `node --version`
- You should see: `v18.xx.x` or `v20.xx.x`

---

### Step 1.4: Install VS Code (Code Editor)

**What is VS Code?** It's like Microsoft Word, but for code.

**Install it:**

1. Go to: https://code.visualstudio.com/
2. Click "Download for [Your OS]"
3. Find the file in your Downloads folder
4. Double-click it and follow the installation
5. **Check these boxes:**
   - ✅ Add "Open with Code" action
   - ✅ Add to PATH

**Open VS Code:**
- Windows: Search for "Visual Studio Code" in Start Menu
- Mac: Search for "Visual Studio Code" in Spotlight

---

## Part 2: Understanding The Terminal

### What is a Terminal?

The terminal is a way to talk to your computer by typing commands. It looks old-fashioned but it's powerful!

### How to Open Terminal:

**Windows:**
1. Press the Windows key
2. Type: `powershell`
3. Click "Windows PowerShell"
4. A blue window opens - that's your terminal!

**Mac:**
1. Press Cmd + Space
2. Type: `terminal`
3. Press Enter
4. A white window opens - that's your terminal!

### Understanding Terminal Commands

When you see something like this:
```bash
cd Desktop
```

It means:
1. Type: `cd Desktop`
2. Press Enter
3. Wait for it to finish

**What does `cd` mean?** 
- `cd` = "Change Directory" = Go to a folder
- Like clicking on a folder, but by typing

**Common commands you'll use:**
- `cd foldername` = Go into a folder
- `cd ..` = Go back one folder
- `ls` (Mac) or `dir` (Windows) = See what's in this folder
- `pwd` (Mac) or `cd` (Windows) = Where am I?

---

## Part 3: Getting The Project Code

### What is GitHub?

Think of GitHub like Dropbox, but for code. All our project files are stored there.

### What does "Clone" mean?

"Cloning" means downloading a copy of the project to your computer.

### Let's Clone the Project:

**Step 3.1: Pick Where to Put It**

Open your terminal and type each line (press Enter after each):

```bash
cd Desktop
```

This puts you on your Desktop. You'll see a new folder appear there.

**Want it somewhere else?**
- Documents folder: `cd Documents`
- Specific folder: `cd path/to/your/folder`

**Step 3.2: Clone the Project**

Copy this EXACT command and paste it into your terminal:

```bash
git clone https://github.com/SFitz911/Carrier_Broker_Saas.git
```

**Press Enter**

**What you'll see:**
```
Cloning into 'Carrier_Broker_Saas'...
remote: Counting objects...
remote: Compressing objects...
Receiving objects: 100%
```

**This means:** Git is downloading all the project files.

**Wait until you see your cursor again** (the $ or > symbol)

**Step 3.3: Go Into the Project Folder**

```bash
cd Carrier_Broker_Saas
```

**What this does:** Goes inside the project folder you just downloaded.

**Step 3.4: Open it in VS Code**

```bash
code .
```

**What this does:** Opens the project in VS Code.

**You should see:** VS Code opens with a file tree on the left side!

---

## Part 4: Starting the Backend (Server)

### What is a Backend?

The backend is the "brain" of the application. It handles data and logic.

### What is a Virtual Environment?

It's like a separate container for this project's code. Keeps things organized.

### Let's Start It:

**Step 4.1: Open a Terminal in VS Code**

In VS Code:
1. Click "Terminal" at the top
2. Click "New Terminal"
3. A terminal appears at the bottom of VS Code!

**Step 4.2: Go to Backend Folder**

In the terminal at the bottom, type:

```bash
cd backend
```

**What you'll see:** The path changes to include `backend`

**Step 4.3: Create Virtual Environment**

Type this (exactly):

```bash
python -m venv venv
```

**If that doesn't work, try:**
```bash
python3 -m venv venv
```

**What this does:** Creates a folder called `venv` with Python tools.

**Wait until the cursor comes back** (takes 10-30 seconds)

**Step 4.4: Activate Virtual Environment**

**On Windows:**
```bash
venv\Scripts\activate
```

**On Mac/Linux:**
```bash
source venv/bin/activate
```

**What you should see:**
Your terminal line now starts with `(venv)` 

Example: `(venv) PS C:\Users\...\backend>`

**This means it worked!**

**Step 4.5: Install Python Packages**

```bash
pip install -r ../requirements.txt
```

**What this does:** Installs all the tools the backend needs.

**You'll see:** Lots of text scrolling by - this is normal!

**Wait 1-3 minutes** for it to finish.

**Step 4.6: Start the Backend Server**

```bash
python main.py
```

**What you should see:**
```
✓ Configuration loaded from: credentials.json
Starting Carrier Board API on port 8000
Debug mode: True
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**🎉 Your backend is running!**

**DON'T CLOSE THIS TERMINAL!** Leave it running.

**To test it:** Open a web browser and go to: http://localhost:8000
You should see: `{"message":"Carrier Board API"}`

---

## Part 5: Starting the Frontend (Website)

### What is Frontend?

The frontend is what users see - the website, buttons, colors, etc.

### Let's Start It:

**Step 5.1: Open ANOTHER Terminal**

**Important:** Keep the backend terminal running!

In VS Code:
1. Click the **+** button next to your terminal tabs
2. Or click "Terminal" → "New Terminal"

**You should now have 2 terminals:**
- Terminal 1: Backend (still running)
- Terminal 2: New one (empty)

**Step 5.2: Go to Frontend Folder**

In the NEW terminal:

```bash
cd frontend
```

**Step 5.3: Install Node Packages**

```bash
npm install
```

**What this does:** Downloads all the tools the frontend needs.

**You'll see:** Lots of text and a progress bar.

**Wait 2-5 minutes** for it to finish.

**When it's done, you'll see:**
```
added xxx packages
```

**Step 5.4: Start the Frontend Server**

```bash
npm run dev
```

**What you should see:**
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

**🎉 Your frontend is running!**

**Step 5.5: See Your Website!**

1. Open your web browser (Chrome, Firefox, etc.)
2. Go to: http://localhost:3000
3. **You should see the Carrier Board website!**

**🎊 YOU DID IT! The project is running on your computer!**

---

## Part 6: Making Your First Change

Let's change the text on the homepage!

### Step 6.1: Find the File

In VS Code, on the left side:
1. Click to expand `frontend` folder
2. Click to expand `src` folder
3. Click to expand `pages` folder
4. Click on `index.tsx`

**The file opens in the middle of VS Code!**

### Step 6.2: Find the Text to Change

Scroll down until you see (around line 18):

```typescript
<h1 className="text-5xl font-bold text-gray-900 mb-4">
  🚛 Carrier Board
</h1>
```

### Step 6.3: Add Your Name

Right after that closing `</h1>`, add this:

```typescript
<p className="text-xl text-blue-600 mb-2">
  Built by [YOUR NAME]!
</p>
```

**Replace [YOUR NAME] with your actual name!**

**Full example:**
```typescript
<h1 className="text-5xl font-bold text-gray-900 mb-4">
  🚛 Carrier Board
</h1>
<p className="text-xl text-blue-600 mb-2">
  Built by Sarah Johnson!
</p>
```

### Step 6.4: Save the File

Press:
- **Windows:** Ctrl + S
- **Mac:** Cmd + S

### Step 6.5: See Your Change!

Go back to your browser at http://localhost:3000

**The page automatically updates!**

**You should see your name on the homepage!**

**🎉 YOU JUST MADE YOUR FIRST CODE CHANGE!**

---

## Part 7: Saving Your Changes to GitHub

### What is a Branch?

Think of it like making a copy of the project so you can change it without affecting others.

### What is a Commit?

It's like clicking "Save" and adding a note about what you changed.

### What is a Push?

It's like uploading your changes to Google Drive so others can see them.

### Let's Do It:

**Step 7.1: Open the Main Terminal**

In VS Code, click the **+** to add another terminal, or use terminal 1/2.

Make sure you're in the main project folder:
```bash
cd ..
```

(If you're in backend or frontend, go back to main folder)

**Step 7.2: Check What Changed**

```bash
git status
```

**You'll see:**
```
modified:   frontend/src/pages/index.tsx
```

**This shows what files you changed!**

**Step 7.3: Create Your Branch**

```bash
git checkout -b feature/add-my-name
```

**Replace `add-my-name` with your actual name** like: `feature/sarah-first-change`

**What you'll see:**
```
Switched to a new branch 'feature/add-my-name'
```

**Step 7.4: Add Your Changes**

```bash
git add .
```

**The dot (.) means "add everything I changed"**

**Step 7.5: Commit (Save) Your Changes**

```bash
git commit -m "feat: add my name to homepage"
```

**What the parts mean:**
- `git commit` = Save my changes
- `-m` = With this message:
- `"feat: add my name to homepage"` = The description

**What you'll see:**
```
[feature/add-my-name abc1234] feat: add my name to homepage
 1 file changed, 3 insertions(+)
```

**Step 7.6: Push to GitHub**

```bash
git push origin feature/add-my-name
```

**What this does:** Uploads your changes to GitHub.

**You might see:** A message asking for GitHub username/password. Enter them!

**What you'll see when done:**
```
To https://github.com/SFitz911/Carrier_Broker_Saas.git
 * [new branch]      feature/add-my-name -> feature/add-my-name
```

**🎉 YOUR CHANGES ARE NOW ON GITHUB!**

---

## Part 8: Creating a Pull Request

### What is a Pull Request?

It's like saying "Hey team! I made some changes. Can you review them?"

### Let's Create One:

**Step 8.1: Go to GitHub**

Open your browser and go to:
https://github.com/SFitz911/Carrier_Broker_Saas

**Step 8.2: You'll See a Yellow Banner**

It says: "feature/add-my-name had recent pushes"

Click the **"Compare & pull request"** button

**Step 8.3: Fill Out the Form**

**Title:** Already filled in (your commit message)

**Description:** Write something like:
```
This is my first contribution! I added my name to the homepage.
```

**Step 8.4: Create Pull Request**

Click the green **"Create pull request"** button

**🎊 YOU CREATED YOUR FIRST PULL REQUEST!**

Now the team will review it and merge it into the main project!

---

## 🎉 You Did It! What Now?

### You Just Learned:
- ✅ How to install development tools
- ✅ How to use the terminal
- ✅ How to run a web application
- ✅ How to edit code
- ✅ How to use Git and GitHub
- ✅ How to make a pull request

### Next Steps:

1. **Join the Discord** - Meet the team!
2. **Look at GitHub Issues** - Find something to work on
3. **Ask Questions** - We're here to help
4. **Keep Learning** - You're doing great!

---

## 💬 Common Problems & Solutions

### "Command not found"

**Problem:** Terminal says `command not found`

**Solution:**
1. Close the terminal
2. Open a NEW terminal
3. Try again

**Why:** The terminal needs to restart to see new programs.

### "Permission denied"

**Problem:** Can't run a command

**Solution (Windows):**
1. Close terminal
2. Right-click PowerShell
3. Click "Run as administrator"

**Solution (Mac):**
- Add `sudo` before the command
- Example: `sudo npm install`
- It will ask for your password

### "Port already in use"

**Problem:** Can't start backend/frontend

**Solution:**
1. Something else is using port 3000 or 8000
2. Close other programs
3. Or close the other terminal running it
4. Try again

### "Module not found"

**Problem:** Error about missing module

**Solution:**
```bash
# Backend:
cd backend
pip install -r ../requirements.txt

# Frontend:
cd frontend
npm install
```

### Page Doesn't Update

**Problem:** Made a change but don't see it

**Solution:**
1. Make sure you saved the file (Ctrl+S / Cmd+S)
2. Refresh the browser (F5)
3. Check the terminal for errors
4. Make sure frontend is running

---

## 📚 Understanding Terms

**Repository (Repo):** The project folder with all the code

**Clone:** Download a copy of the project

**Branch:** A copy where you can make changes safely

**Commit:** Save your changes with a message

**Push:** Upload your changes to GitHub

**Pull Request (PR):** Ask the team to review your changes

**Merge:** Accepting changes into the main project

**Terminal:** Window where you type commands

**Backend:** The server/brain of the app

**Frontend:** The website users see

**API:** How frontend talks to backend

---

## 🆘 Get Help

**Stuck? Don't worry!**

1. **Discord:** Ask in #help channel
2. **GitHub:** Tag @SFitz911 in your issue
3. **Google:** Copy the error message and search
4. **Ask a teammate:** Everyone was new once!

**Remember:** There are no stupid questions! We all learn by asking.

---

## 📖 Learning Resources for Complete Beginners

### Terminal Basics:
- [Terminal Tutorial](https://www.codecademy.com/articles/command-line-commands)
- [Command Line for Beginners](https://www.youtube.com/watch?v=5XgBd6rjuDQ)

### Git & GitHub:
- [Git Tutorial (Beginner)](https://www.youtube.com/watch?v=HVsySz-h9r4)
- [GitHub Tutorial](https://guides.github.com/activities/hello-world/)

### General Coding:
- [freeCodeCamp](https://www.freecodecamp.org/)
- [Codecademy](https://www.codecademy.com/)

---

**Welcome to the team! You're going to do great! 🌟**

*Remember: Every expert was once a beginner. You got this!*

---

*Last updated: November 10, 2025*
