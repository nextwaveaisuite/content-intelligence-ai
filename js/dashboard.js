/*
=========================================================
Content Intelligence AI
Dashboard Engine
Version: 3.0

Features:
- OpenAI connection
- Platform result separation
- Clean AI formatting
- Individual copy buttons
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
    .forEach(platform => {

        platforms.push(platform.value);

    });



    if(!topic){

        alert("Please enter a content idea.");

        return;

    }



    results.innerHTML = `

    <div class="result-card">

        <h2>Creating Content...</h2>

        <p>
        AI is adapting your idea for each platform.
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
                data.error || "No AI content returned"
            );

        }



        displayPlatformResults(data.content);



    }


    catch(error){


        results.innerHTML = `

        <div class="result-card">

        <h2>Error</h2>

        <p>${error.message}</p>

        </div>

        `;


    }



});





function displayPlatformResults(content){


    results.innerHTML = "";



    const cleanedContent = content

    .replace(/^Sure!.*?:/i,"")

    .replace(/^Here.*?:/i,"")

    .trim();



    const platforms = [

        "Facebook",

        "Instagram",

        "LinkedIn",

        "Pinterest",

        "TikTok",

        "Threads",

        "X",

        "YouTube"

    ];



    let sections = [];



    platforms.forEach((platform,index)=>{


        const start = cleanedContent.indexOf(
            platform
        );


        if(start !== -1){


            let end = cleanedContent.length;



            for(
                let i=index+1;
                i<platforms.length;
                i++
            ){


                const next =
                cleanedContent.indexOf(
                    platforms[i],
                    start+1
                );


                if(next !== -1){

                    end = next;

                    break;

                }

            }



            sections.push({

                title:platform,

                content:
                cleanedContent
                .substring(start,end)

                .replace(/^#+/,"")

                .trim()

            });


        }


    });




    if(sections.length===0){


        sections.push({

            title:"Generated Content",

            content:cleanedContent

        });


    }




    sections.forEach(section=>{


        const card =
        document.createElement("div");


        card.className="result-card";



        card.innerHTML = `

        <div class="result-header">


            <h2>

            ${section.title}

            </h2>


            <button class="copy-button">

            Copy

            </button>


        </div>


        <div class="generated-content">

        ${formatText(section.content)}

        </div>


        `;



        results.appendChild(card);



    });



    addCopyButtons();


}





function formatText(text){


    return text

    .replace(
        /\n/g,
        "<br>"
    )

    .replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );


}





function addCopyButtons(){


    document
    .querySelectorAll(".copy-button")
    .forEach(button=>{


        button.addEventListener(
            "click",
            function(){


                const content =

                this
                .parentElement
                .nextElementSibling
                .innerText;



                navigator.clipboard.writeText(
                    content
                );


                this.innerText="Copied!";


                setTimeout(()=>{


                    this.innerText="Copy";


                },1500);



            }

        );


    });


}
