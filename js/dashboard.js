/*
=========================================================
Content Intelligence AI
Dashboard Engine
Version: 3.0

Handles:
- Campaign generation
- Platform content rendering
- Copy entire campaign
=========================================================
*/


const generateButton = document.getElementById("generateButton");

const resultsContainer = document.getElementById("results");

const copyCampaignButton = document.getElementById("copyCampaign");





generateButton.addEventListener("click", async function(){


    const topic = document.getElementById("topic").value;

    const audience = document.getElementById("audience").value;

    const goal = document.getElementById("goal").value;

    const tone = document.getElementById("tone").value;

    const brand = document.getElementById("brand").value;

    const contentType = document.getElementById("contentType").value;



    const platforms = Array.from(

        document.querySelectorAll(
            ".platform-selector input:checked"
        )

    ).map(platform => platform.value);





    if(!topic){

        alert("Please enter a content idea.");

        return;

    }





    generateButton.innerText = "Generating Campaign...";

    generateButton.disabled = true;




    resultsContainer.innerHTML = `

        <div class="placeholder">

            <h3>Creating your campaign...</h3>

            <p>Optimising content for each platform.</p>

        </div>

    `;





    try {



        const response = await fetch(
            
            "/.netlify/functions/generate-content",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify({

                    brand,

                    topic,

                    audience,

                    goal,

                    tone,

                    contentType,

                    platforms

                })

            }

        );





        const data = await response.json();





        if(!data.content){


            throw new Error(
                data.error || "No AI response received"
            );


        }





        renderCampaign(data.content);





    }


    catch(error){


        resultsContainer.innerHTML = `

        <div class="placeholder">

            <h3>Error</h3>

            <p>${error.message}</p>

        </div>

        `;


    }




    finally{


        generateButton.innerText = "Generate Campaign";

        generateButton.disabled = false;


    }



});








function renderCampaign(content){


    const sections = splitPlatforms(content);



    resultsContainer.innerHTML = "";




    Object.keys(sections).forEach(platform => {



        const card = document.createElement("div");


        card.className = "result-card";



        card.innerHTML = `


        <div class="result-header">


            <h2>${platform}</h2>


            <button class="copy-button">

                Copy ${platform}

            </button>


        </div>



        <div class="generated-content">

            ${sections[platform]}

        </div>


        `;





        const copyButton = card.querySelector(".copy-button");



        copyButton.addEventListener(
            
            "click",

            ()=>{


                navigator.clipboard.writeText(

                    sections[platform]

                );


                copyButton.innerText="Copied!";


                setTimeout(()=>{

                    copyButton.innerText=`Copy ${platform}`;

                },1500);



            }

        );





        resultsContainer.appendChild(card);



    });



}








function splitPlatforms(content){


    const platforms = [

        "FACEBOOK",

        "INSTAGRAM",

        "LINKEDIN",

        "PINTEREST",

        "TIKTOK",

        "THREADS",

        "X",

        "YOUTUBE"

    ];




    const output = {};



    let current = null;



    content
    .split("\n")
    .forEach(line=>{


        const clean = line.trim();



        const match = platforms.find(

            platform => clean.toUpperCase() === platform

        );




        if(match){


            current = match;

            output[current]="";


        }


        else if(current){


            output[current] += line + "\n";


        }



    });




    if(Object.keys(output).length === 0){


        output["CAMPAIGN"] = content;


    }



    return output;



}








copyCampaignButton.addEventListener(

"click",

()=>{


    const text = document.querySelector(
        "#results"
    ).innerText;



    navigator.clipboard.writeText(text);



    copyCampaignButton.innerText="Copied!";



    setTimeout(()=>{


        copyCampaignButton.innerText="Copy Entire Campaign";


    },1500);



}

);
