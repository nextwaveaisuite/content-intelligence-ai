/*
=========================================================
Content Intelligence AI
Dashboard Engine
Version: 1.0
=========================================================
*/

const generateButton = document.getElementById("generateButton");
const results = document.getElementById("results");

generateButton.addEventListener("click", generateContent);

function generateContent() {

    const topic = document.getElementById("topic").value.trim();
    const audience = document.getElementById("audience").value.trim();
    const goal = document.getElementById("goal").value;
    const tone = document.getElementById("tone").value;

    const platforms = [];

    document.querySelectorAll(".platform-selector input:checked")
        .forEach(platform => {
            platforms.push(platform.value);
        });

    if (topic === "") {

        alert("Please enter a content idea.");

        return;

    }

    results.innerHTML = "";

    platforms.forEach(platform => {

        const card = document.createElement("div");

        card.className = "result-card";

        card.innerHTML = `

            <div class="result-header">

                <h2>${platform}</h2>

                <button class="copy-button">

                    Copy

                </button>

            </div>

            <div class="generated-content">

${generatePlatformContent(platform, topic, audience, goal, tone)}

            </div>

        `;

        results.appendChild(card);

    });

    enableCopyButtons();

}

function generatePlatformContent(platform, topic, audience, goal, tone){

switch(platform){

case "Facebook":

return `

<strong>FACEBOOK POST</strong>

<br><br>

Topic:

${topic}

<br><br>

Audience:

${audience}

<br><br>

Goal:

${goal}

<br><br>

Tone:

${tone}

<br><br>

This is where the AI-generated Facebook content will appear after the OpenAI integration is connected.

`;

case "Instagram":

return `

<strong>INSTAGRAM CAPTION</strong>

<br><br>

Topic:

${topic}

<br><br>

Audience:

${audience}

<br><br>

Goal:

${goal}

<br><br>

Tone:

${tone}

<br><br>

This is where the AI-generated Instagram caption will appear after the OpenAI integration is connected.

`;

case "LinkedIn":

return `

<strong>LINKEDIN POST</strong>

<br><br>

Professional AI content will appear here.

`;

case "Pinterest":

return `

<strong>PINTEREST TITLE & DESCRIPTION</strong>

<br><br>

Pinterest AI content will appear here.

`;

case "TikTok":

return `

<strong>TIKTOK VIDEO SCRIPT</strong>

<br><br>

Hook

Scene Ideas

Voice Over

CTA

`;

case "Threads":

return `

<strong>THREADS POST</strong>

<br><br>

Threads content will appear here.

`;

case "X":

return `

<strong>X POST</strong>

<br><br>

Short-form AI content will appear here.

`;

case "YouTube":

return `

<strong>YOUTUBE SCRIPT</strong>

<br><br>

Hook

Introduction

Main Content

Call To Action

`;

default:

return `

AI Content

`;

}

}

function enableCopyButtons(){

const buttons = document.querySelectorAll(".copy-button");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

const text = button.parentElement.nextElementSibling.innerText;

navigator.clipboard.writeText(text);

button.innerHTML="Copied!";

setTimeout(()=>{

button.innerHTML="Copy";

},2000);

});

});

}
