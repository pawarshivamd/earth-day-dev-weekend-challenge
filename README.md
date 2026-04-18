# DEV Weekend Challenge: Earth Replies to Your Future 🌍

*This is a submission for the [DEV Weekend Challenge: Earth Day](https://dev.to/devteam/dev-weekend-challenge-1000-in-prizes-across-ten-winners-4eaf).*

## Overview
**"Earth Replies to Your Future"** is an immersive, highly cinematic storytelling experience built to honor Earth Day. 

At its core, the project poses a single, poignant question: *"What if the Earth could reply to you... and show you your future?"* 

There are plenty of dashboards and data charts about climate change, but raw data doesn't always inspire empathy. I wanted to build an award-winning style atmospheric digital experience that connects humans and nature emotionally. 

## Demo
*(Add a 1-minute video link or a couple of beautiful screenshots of your UI here. Showcase the deeply colored gradients, the cinematic video layers, the Gemini response typing out, and the Good/Bad future outcomes!)*
[Insert Demo link / Images here]

---

## What is this side project?
**"Earth Replies to Your Future"** is an experimental, interactive short-film built for the browser. Rather than a standard dashboard or blog, I wanted to create an emotionally resonant, game-like experience for Earth Day. It is designed to make users reflect on their environmental footprint by immersing them in a responsive, atmospheric narrative where their choices matter.

## Your Journey Inside the Project
Here is the step-by-step experience of what users do inside the application:
1. **The Entry:** You are greeted with a cinematic visual background and an ambient wind soundtrack, asking: *"What if Earth could reply to you?"*
2. **The Output:** You are invited to send a custom, emotional text message directly to the Earth. (If you don't know what to write, a custom "Dice Roll" button will auto-generate an idea for you).
3. **The Voice:** Once transmitted, Google Gemini immediately assumes the persona of the Earth. A beautiful, sorrowful, but hopeful response is generated on the fly and typed out on the screen letter-by-letter, while the browser dynamically reads it to you out loud.
4. **The Crossroads:** You are presented with a decision on what to do next: either continue ignoring warnings, make small localized changes, or take aggressive green actions.
5. **The Future:** Upon deciding, the app jumps through time, crossfading into a breathtaking visualization of the future. The screen might visibly shake under an orange ash-filled sky, or it might stabilize into a vibrant lush sanctuary, depending entirely on the choice you made.

## What APIs did I use?
This submission targets the **"Best use of Google Gemini"** prize category!
1. **Google Gemini API (`gemini-1.5-flash`)**: This is the emotional "brain" of the project. Because of Gemini, no two playthroughs are identical. The user's input directly alters how the Earth relates to them, bringing unparalleled immersion.
2. **Web SpeechSynthesis API**: A native browser API that I utilized to literally "speak" the words that Google Gemini generates out loud in real time.
3. **Page Visibility API**: Used to track if the user switches browser tabs, intelligently pausing the heavy background video and drone audio until they return for optimal performance.

## What did I do here? (Tech Stack & Features)
I built an end-to-end cinematic frontend application. Instead of basic page routing, I used **React** paired heavily with **Framer Motion** to mount and unmount "scenes" seamlessly without refreshing, giving it the feel of an interactive film. 

I integrated local HD looping video backgrounds (`.mp4`), layered them under **Tailwind CSS** glassmorphism UI components, built a complete "Dice Roll" auto-suggest feature for users suffering from writer's block, and connected it all to real-time generative AI using environmental variables.

## What did I learn?
Building an immersive web experience taught me a lot of unique edge-cases:
- **Prompt Engineering for Tone:** I learned how to strictly constrain an LLM. By tweaking the Gemini prompt to act as an ancient entity and avoid robotic "technical strings", I achieved a highly emotional and poetic output that fit the theme flawlessly.
- **Browser Media Policies:** I learned how to navigate strict browser auto-play blockers! Because modern browsers block audio on load, I had to architect my state machine to trigger the ambient background music only *after* the user interacts with the very first "Start" button.
- **Multimedia Synchronization & Cleanup:** Synchronizing the Framer Motion typewriter effect so it matches the pacing of the `speechSynthesis` utterance API, as well as cleaning up `useEffect` timeouts and destroying audio hooks when the user clicks 'Restart', was a fantastic exercise in React lifecycle management!

---
*Built over the weekend for the DEV Challenge. Code source available in this repository.*
