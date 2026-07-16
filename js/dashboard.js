/*
=========================================================
Content Intelligence AI
Dashboard Engine
Version: 5.0

Handles:
- AI campaign generation
- Platform result cards
- Copy functions
=========================================================
*/


const generateButton = document.getElementById("generateButton");

const resultsContainer = document.getElementById("results");

const copyCampaignButton = document.getElementById("copyCampaign");





generateButton.addEventListener("click", async function(){



    const brand =
    document.getElementById("brand").value;



    const topic =
    document.getElementById("topic").value;



    const audience =
    document.getElementById("audience").value;



    const goal =
    document.getElementById("goal").value;



    const tone =
    document.getElementById("tone").value;



    const contentType =
    document.getElementById("contentType").value;





    const platforms = Array.from(

        document.querySelectorAll(
            ".platform-selector input:checked"
        )

    ).map(item => item.value);







    if(!topic.trim()){


        alert(
            "Please enter a content idea."
        );


        return;


    }






    generateButton.disabled = true;


    generateButton.innerText =
    "Creating Campaign...";





    resultsContainer.innerHTML = `

        <div class="placeholder">

            <h3>
            Creating your AI campaign...
            </h3>

            <p>
            Optimising content for each platform.
            </p>

        </div>

    `;







    try{



        const response = await fetch(

            "/.netlify/functions/generate-content",

            {


                method:"POST",


                headers:{


                    "Content-Type":
                    "application/json"


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








        const data =
        await response.json();







        if(!data.content){


            throw new Error(

                data.error ||
                "AI generation failed"

            );


        }






        displayCampaign(
            data.content
        );





    }

    catch(error){



        resultsContainer.innerHTML = `


        <div class="placeholder">


            <h3>
            Error
            </h3>


            <p>
            ${error.message}
            </p>


        </div>


        `;


    }





    finally{


        generateButton.disabled=false;


        generateButton.innerText =
        "Generate Campaign";


    }




});








function displayCampaign(content){



    const sections =
    splitContent(content);




    resultsContainer.innerHTML="";





    Object.entries(sections).forEach(
        
        ([platform,text])=>{



        const card =
        document.createElement("div");



        card.className =
        "result-card";






        card.innerHTML = `


        <div class="result-header">


            <h3>
            ${platform}
            </h3>


            <button class="copy-button">

            Copy ${platform}

            </button>


        </div>


        <div class="generated-content">

        ${formatText(text)}

        </div>


        `;








        const button =
        card.querySelector(
            ".copy-button"
        );



        button.addEventListener(
            "click",

            function(){


                navigator.clipboard.writeText(
                    text
                );


                button.innerText =
                "Copied!";


                setTimeout(()=>{


                    button.innerText =
                    `Copy ${platform}`;


                },1500);



            }


        );






        resultsContainer.appendChild(card);



    });


}








function splitContent(content){



    const platforms=[


        "FACEBOOK",

        "INSTAGRAM",

        "LINKEDIN",

        "PINTEREST",

        "TIKTOK",

        "THREADS",

        "X",

        "YOUTUBE"


    ];





    const sections={};



    let current=null;






    content.split("\n").forEach(line=>{



        const clean =
        line.trim();





        const found =
        platforms.find(

            platform =>
            clean.toUpperCase()
            === platform

        );





        if(found){


            current=found;


            sections[current]="";


        }


        else if(current){


            sections[current]
            += line + "\n";


        }




    });







    if(
        Object.keys(sections).length===0
    ){


        sections["CAMPAIGN"] =
        content;


    }





    return sections;


}








function formatText(text){


    return text

    .replace(
        /\n/g,
        "<br>"
    );


}









copyCampaignButton.addEventListener(
    
    "click",

    function(){



        const content =
        document.getElementById(
            "results"
        ).innerText;





        navigator.clipboard.writeText(
            content
        );





        copyCampaignButton.innerText =
        "Copied!";





        setTimeout(()=>{


            copyCampaignButton.innerText =
            "Copy Entire Campaign";


        },1500);





    }

);
