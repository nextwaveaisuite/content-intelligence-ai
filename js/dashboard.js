/*
=========================================================
Content Intelligence AI
Dashboard Workspace Engine
Version: 4.0

Features:
- OpenAI connection
- Full platform output display
- Keeps Visuals, Hashtags, Scripts, CTAs
- Copy individual platforms
- Copy complete campaign
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

        <h2>Creating Campaign...</h2>

        <p>

        Adapting your content for each platform.

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
                data.error || "No content generated"
            );

        }



        displayCampaign(data.content);



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





function displayCampaign(content){


    results.innerHTML = "";



    const copyAll = document.createElement("button");


    copyAll.className="primary-button";


    copyAll.innerText="Copy Entire Campaign";



    copyAll.onclick=function(){


        navigator.clipboard.writeText(content);


        copyAll.innerText="Copied!";


        setTimeout(()=>{

            copyAll.innerText="Copy Entire Campaign";

        },2000);


    };



    results.appendChild(copyAll);




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





    let sections = splitPlatforms(

        content,

        platforms

    );





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

        ${formatContent(section.content)}

        </div>


        `;



        results.appendChild(card);



    });




    addCopyButtons();



}







function splitPlatforms(content, platforms){


    let sections=[];



    platforms.forEach((platform,index)=>{


        const start =
        content.toUpperCase()
        .indexOf(platform);



        if(start === -1){

            return;

        }



        let end=content.length;



        for(
            let i=index+1;
            i<platforms.length;
            i++
        ){


            const next =

            content
            .toUpperCase()
            .indexOf(
                platforms[i],
                start+1
            );



            if(next !== -1){

                end=next;

                break;

            }


        }



        sections.push({


            title:platform,

            content:

            content
            .substring(start,end)
            .trim()


        });



    });



    return sections;


}






function formatContent(text){


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
        "<em>$1</em>"
    );


}







function addCopyButtons(){


    document
    .querySelectorAll(".copy-button")
    .forEach(button=>{


        button.onclick=function(){


            const content =

            this
            .parentElement
            .nextElementSibling
            .innerText;



            navigator.clipboard.writeText(content);



            this.innerText="Copied!";


            setTimeout(()=>{


                this.innerText=
                this.innerText
                .replace("Copied!","Copy");


            },1500);



        };


    });


}
