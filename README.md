# 🌱 Focus Garden Timer

🔗 **Live Demo:** https://jumpflow-pomodoro-timer-jzte.vercel.app  
🔗 **GitHub:** https://github.com/seda22/jumpflow-pomodoro-timer

A minimalist productivity timer built with **React** that visualizes focus sessions as a growing digital garden.

This project combines **time-boxing (Pomodoro logic)** with a small visual reward system to encourage consistency and sustained attention.

---

## ✨ Features

- ⏱ **Focus / Short Break / Long Break cycle**
- 🔁 **Automatic session switching** (every 4 focus sessions → long break)
- 🌿 **Visual growth system** that evolves after each completed focus session
- 🎯 **Real-time circular progress indicator** (SVG animation)
- ⏯ **Start / Pause / Reset controls**
- 📱 Clean, centered layout designed for distraction-free usage
- 🎨 Soft UI styling with subtle motion feedback

---

## 🛠 Tech Stack

- **React (Hooks)** → `useState`, `useEffect` for timer lifecycle  
- **Reactstrap / Bootstrap** → layout and component structure  
- **Custom CSS** → UI styling, motion, and micro-interactions  
- **SVG** → animated circular progress indicator  
- **JavaScript Timing APIs** → controlled interval management  

---

## 🧠 What I Practiced

This project focuses on **state-driven UI behavior** rather than static rendering.

Key implementation topics:

- Managing timer lifecycle with `useEffect`
- Preventing interval duplication and ensuring cleanup
- Deriving UI state from time progression
- Handling controlled mode transitions *(focus → break → focus)*
- Building animated progress using `strokeDashoffset`
- Designing small feedback loops to reinforce user behavior
- Structuring logic to avoid unnecessary re-renders

---

## 🔄 Session Logic

Focus → Short Break → Focus → Short Break → Focus → Short Break → Focus → Long Break

After each focus session:

- Growth stage increases  
- Visual feedback animates  
- Completed session count updates  

---

## 🎯 Why I Built This

I wanted to explore how **frontend logic can shape user behavior**, not just display data.

This project reflects an interest in:

- Human-centered UI decisions  
- State-driven interaction design  
- Building small but meaningful product experiences  

---

## 🚀 Getting Started

```bash
npm install
npm run dev
