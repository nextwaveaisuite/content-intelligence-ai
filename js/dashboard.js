/*
=========================================================
Content Intelligence AI
Dashboard Engine
Version: 5.1

Fixes:
- Removes excessive spacing
- Cleans result formatting
- Prevents platform mix-ups
- Keeps AI output unchanged
=========================================================
*/


const generateButton =
document.getElementById("generateButton");


const resultsContainer =
document.getElementById("results");


const copyCampaignButton =
document.getElementById("copyCampaign");





generateButton.addEventListener(
"click",
async function(){



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



const platforms =
Array.from(
document.querySelectorAll(
".platform-selector input:checked"
)
)
.map(item=>item.value);




if(!topic.trim()){

alert("Please enter a content idea.");

return;

}





generateButton.disabled=true;

generateButton.innerText="Creating Campaign...";



resultsContainer.innerHTML=`

<div class="placeholder">

<h3>
Generating Campaign...
</h3>

<p>
Creating platform-specific content.
</p>

</div>

`;





try{


const response =
await fetch(
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





const data =
await response.json();





if(!data.content){

throw new Error(
data.error ||
"AI response failed"
);

}





renderCampaign(
data.content
);




}

catch(error){



resultsContainer.innerHTML=`

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

generateButton.innerText=
"Generate Campaign";


}



});









function renderCampaign(content){



const sections =
parseCampaign(content);



resultsContainer.innerHTML="";





Object.entries(sections)
.forEach(
([platform,text])=>{



const card =
document.createElement("div");


card.className="result-card";



card.innerHTML=`

<div class="result-header">

<h3>
${platform}
</h3>

<button class="copy-button">
Copy ${platform}
</button>


</div>


<div class="generated-content">

${formatContent(text)}

</div>

`;





const button =
card.querySelector(
".copy-button"
);



button.onclick=function(){



navigator.clipboard.writeText(
text.trim()
);



button.innerText="Copied!";



setTimeout(()=>{

button.innerText=
`Copy ${platform}`;

},1500);



};





resultsContainer.appendChild(card);



});


}









function parseCampaign(content){



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



const output={};



let current=null;




content
.split("\n")
.forEach(line=>{


const clean =
line.trim()
.toUpperCase();




const match =
names.find(
name =>
clean === name
);




if(match){


current=match;

output[current]="";


return;


}



if(current){


output[current]+=
line+"\n";


}



});







if(Object.keys(output).length===0){


output["CAMPAIGN"]=content;


}





return output;



}









function formatContent(text){



return text

.trim()

.replace(

/^(Post:|Caption:|Title:|Description:|Visual:|Hashtags:|Keywords:|Hook:|Script:|CTA:|Outline:)/gm,

"<strong>$1</strong>"

)

.replace(
/\n{2,}/g,
"<br><br>"
)

.replace(
/\n/g,
"<br>"
);



}









copyCampaignButton.onclick=function(){



const fullText =
resultsContainer.innerText;



navigator.clipboard.writeText(
fullText
);



copyCampaignButton.innerText=
"Copied!";



setTimeout(()=>{


copyCampaignButton.innerText=
"Copy Entire Campaign";


},1500);



};
