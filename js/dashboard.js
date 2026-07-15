/*
=========================================================
Content Intelligence AI
Dashboard AI Connector
Version: 2.0
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
    .forEach(item=>{

        platforms.push(item.value);

    });



    if(!topic){

        alert("Please enter a content idea.");

        return;

    }



    results.innerHTML = `

    <div class="result-card">

        <h2>Generating AI Content...</h2>

        <p>
        Creating platform-specific content.
        Please wait...
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



        if(data.content){


            displayResults(data.content);


        }

        else{


            results.innerHTML = `

            <div class="result-card">

            <h2>Error</h2>

            <p>

            ${data.error || "No AI response received"}

            </p>

            </div>

            `;

        }



    }

    catch(error){


        results.innerHTML = `

        <div class="result-card">

        <h2>Connection Error</h2>

        <p>

        ${error.message}

        </p>

        </div>

        `;


    }



});





function displayResults(content){


    results.innerHTML = "";



    const sections = content.split(/\n(?=[A-Z ]+:)/);



    sections.forEach(section=>{


        if(section.trim()){


            const card=document.createElement("div");


            card.className="result-card";


            card.innerHTML = `

            <div class="result-header">

            <h2>
            ${section.split("\n")[0]}
            </h2>

            <button class="copy-button">
            Copy
            </button>

            </div>


            <div class="generated-content">

            ${section.replace(section.split("\n")[0],"")}

            </div>

            `;


            results.appendChild(card);


        }


    });



    addCopyButtons();


}




function addCopyButtons(){


    document
    .querySelectorAll(".copy-button")
    .forEach(button=>{


        button.addEventListener("click",()=>{


            const content = 
            button
            .parentElement
            .nextElementSibling
            .innerText;



            navigator.clipboard.writeText(content);



            button.innerText="Copied!";


            setTimeout(()=>{


                button.innerText="Copy";


            },1500);



        });


    });



}
