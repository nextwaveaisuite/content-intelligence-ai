/*
=========================================================
Content Intelligence AI
AI Content Generation Engine
Version: 2.0

Purpose:
Creates platform-native social content.
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




        const prompt = `

You are Content Intelligence AI.

You are an expert social media strategist.

Your task:

Transform one content idea into UNIQUE content for each social platform.

IMPORTANT RULES:

- Never create the same content twice.
- Each platform must feel native.
- Follow the culture and behaviour of each platform.
- Do not explain what you are doing.
- Do not introduce the response.
- Do not say "Sure", "Here is", "Let me know".
- Do not use fake URLs.
- Do not use placeholders like [link].
- Do not include AI commentary.

CONTENT IDEA:

${topic}


AUDIENCE:

${audience}


GOAL:

${goal}


TONE:

${tone}


PLATFORMS:

${platforms.join(", ")}



RETURN ONLY THIS STRUCTURE:



FACEBOOK

Post:
Write the complete Facebook post.

Visual:
Describe the recommended image/video.

Hashtags:
Provide relevant hashtags.



INSTAGRAM

Caption:
Write the complete Instagram caption.

Visual:
Describe the recommended image/video.

Hashtags:
Provide relevant hashtags.



LINKEDIN

Post:
Write the complete LinkedIn post.

Visual:
Describe professional visual direction.

Hashtags:
Provide relevant hashtags.



PINTEREST

Title:
Create SEO-friendly pin title.

Description:
Create Pinterest description.

Keywords:
Provide search keywords.



TIKTOK

Hook:
Create first 3-second attention hook.

Script:
Create complete short video script.

Visual:
Describe scenes.

CTA:
Create call-to-action.



THREADS

Post:
Create conversational Threads post.

Hashtags:
Provide relevant hashtags.



X

Post:
Create concise X post.

Hashtags:
Provide relevant hashtags.



YOUTUBE

Title:
Create video title.

Description:
Create video description.

Outline:
Create video structure.



Only return the requested structure.

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

                            "You are a professional platform-specific content strategist."

                        },


                        {


                            role:"user",


                            content:prompt

                        }


                    ],


                    temperature:0.7


                })


            }

        );




        const data = await response.json();





        if(!data.choices){



            return {


                statusCode:500,


                body:JSON.stringify({


                    error:"AI generation failed",


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
