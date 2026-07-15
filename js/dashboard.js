/*
=========================================================
Content Intelligence AI
Smart Content Renderer
Version: 5.0

Purpose:
Cleanly displays AI-generated platform campaigns.
=========================================================
*/


const generateButton = document.getElementById("generateButton");

const results = document.getElementById("results");



generateButton.addEventListener("click", async function(){


    const topic = document.getElementById("topic").value.trim();

    const audience = document.getElementById("audience").value.trim();

    const goal = document.getElementById("goal").value;

    const tone = document.getElementById("tone").value;



    const platforms = [];


    document
    .querySelectorAll(".platform-selector input:checked")
    .forEach(item => {

        platforms.push(item.value);

    });



    if(!topic){

        alert("Please enter a content idea.");

        return;

    }



    results.innerHTML = `

    <div class="result-card">

        <h2>Generating Campaign...</h2>

        <p>

        Creating platform-specific content.

        </p>

    </div>

    `;



    try{


        const response = await fetch(

            "/.netlify/functions/generate-content",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    topic,

                    audience,

                    goal,

                    tone,

                    platforms

                })

            }

        );



        const data = await response.json();



        if(!data.content){

            throw new Error(

                data.error || "No content returned"

            );

        }



        renderCampaign(data.content);



    }


    catch(error){


        results.innerHTML = `

        <div class="result-card">

        <h2>Error</h2>

        <p>

        ${error.message}

        </p>

        </div>

        `;

    }


});







function renderCampaign(content){


    results.innerHTML = "";



    const copyAll=document.createElement("button");


    copyAll.className="primary-button";


    copyAll.innerText="Copy Entire Campaign";



    copyAll.onclick=function(){


        navigator.clipboard.writeText(content);


        copyAll.innerText="Copied!";


        setTimeout(()=>{

            copyAll.innerText="Copy Entire Campaign";

        },1500);


    };



    results.appendChild(copyAll);




    const sections = extractPlatforms(content);




    sections.forEach(section=>{


        const card=document.createElement("div");


        card.className="result-card";



        card.innerHTML = `


        <div class="result-header">


            <h2>

            ${section.title}

            </h2>


            <button class="copy-button">

            Copy ${section.title}

            </button>


        </div>



        <div class="generated-content">

        ${formatOutput(section.content)}

        </div>


        `;



        results.appendChild(card);



    });



    activateCopy();


}








function extractPlatforms(content){


    const names=[

        "FACEBOOK",
        "INSTAGRAM",
        "LINKEDIN",
        "PINTEREST",
        "TIKTOK",
        "THREADS",
        "X",
        "YOUTUBE"

    ];



    const regex = new RegExp(

        "^(" + names.join("|") + ")\\s*$",

        "gmi"

    );



    const matches=[...content.matchAll(regex)];



    let sections=[];



    matches.forEach((match,index)=>{


        const title=match[1];


        const start=match.index + match[0].length;


        const end =

        matches[index+1]

        ? matches[index+1].index

        : content.length;



        const body = content

        .substring(start,end)

        .trim();



        sections.push({

            title:title,

            content:body

        });



    });



    return sections;


}








function formatOutput(text){


    return text

    .replace(

        /\n/g,

        "<br>"

    )

    .replace(

        /\*\*(.*?)\*\*/g,

        "<strong>$1</strong>"

    )

    .replace(

        /_(.*?)_/g,

        "<strong>$1</strong>"

    );


}








function activateCopy(){


    document

    .querySelectorAll(".copy-button")

    .forEach(button=>{


        button.onclick=function(){


            const text =

            this

            .parentElement

            .nextElementSibling

            .innerText;



            navigator.clipboard.writeText(text);



            this.innerText="Copied!";



            setTimeout(()=>{


                this.innerText=

                this.innerText.replace(

                    "Copied!",

                    "Copy"

                );


            },1500);



        };


    });


}
