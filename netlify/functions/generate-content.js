/*
=========================================================
Content Intelligence AI
Netlify AI Generation Function
Version: 1.0
=========================================================
*/


exports.handler = async function(event) {


    if(event.httpMethod !== "POST"){

        return {

            statusCode:405,

            body:JSON.stringify({

                error:"Method not allowed"

            })

        };

    }



    try{


        const {

            topic,

            audience,

            goal,

            tone,

            platforms


        } = JSON.parse(event.body);



        const platformList = platforms.join(", ");



        const prompt = `

You are Content Intelligence AI.

Your job is to transform one content idea into unique platform-native content.

IMPORTANT:

Do not create the same post for every platform.

Every platform must have its own style, structure, length, tone and best practices.


CONTENT IDEA:

${topic}


TARGET AUDIENCE:

${audience}


CONTENT GOAL:

${goal}


BRAND TONE:

${tone}


CREATE CONTENT FOR:

${platformList}



Generate:


FACEBOOK:

- Create a community-focused Facebook post.
- Include storytelling.
- Include suitable hashtags.


INSTAGRAM:

- Create an engaging caption.
- Include emojis where appropriate.
- Include hashtags.


TIKTOK:

- Create a short video script.
- Include:
  Hook
  Scene ideas
  Voiceover
  Call to action


LINKEDIN:

- Create a professional brand-focused post.


PINTEREST:

- Create:
  Pin title
  Pin description
  Keywords


THREADS:

- Create a conversational short post.


X:

- Create a concise engaging post within platform limits.


YOUTUBE:

- Create:
  Video title
  Description
  Short script outline


Return the result clearly separated by platform headings.

`;



        const response = await fetch(

            "https://api.openai.com/v1/chat/completions",

            {

                method:"POST",

                headers:{


                    "Content-Type":"application/json",


                    "Authorization":

                    `Bearer ${process.env.OPENAI_API_KEY}`


                },


                body:JSON.stringify({


                    model:"gpt-4.1-mini",


                    messages:[


                        {


                            role:"system",


                            content:

                            "You are an expert social media content strategist."

                        },


                        {


                            role:"user",


                            content:prompt

                        }


                    ],


                    temperature:0.8


                })


            }

        );



        const data = await response.json();



        if(!data.choices){


            return {


                statusCode:500,


                body:JSON.stringify({

                    error:"AI response failed",

                    details:data

                })


            };


        }




        return {


            statusCode:200,


            headers:{


                "Content-Type":"application/json"


            },


            body:JSON.stringify({


                content:

                data.choices[0].message.content


            })


        };



    }


    catch(error){



        return {


            statusCode:500,


            body:JSON.stringify({


                error:error.message


            })


        };


    }


};
