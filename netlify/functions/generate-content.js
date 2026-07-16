/*
=========================================================
Content Intelligence AI
AI Content Generation Engine
Version: 5.0

Purpose:
Creates complete platform-native marketing campaigns.
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

            brand,

            topic,

            audience,

            goal,

            tone,

            contentType,

            platforms


        } = JSON.parse(event.body);








        const prompt = `


You are Content Intelligence AI.

You are an elite social media marketing strategist,
brand copywriter and content strategist.


Your task:

Create a complete marketing campaign from one idea.

Every platform must receive unique content
created specifically for that platform.



IMPORTANT RULES:


- Do not explain your process.
- Do not say "Sure".
- Do not say "Here is".
- Do not mention AI.
- Do not use placeholders.
- Do not create fake links.
- Do not repeat content between platforms.
- Write ready-to-publish content.
- Include emotional hooks.
- Include visual direction.
- Include relevant hashtags.
- Match the platform culture.





BRAND:

${brand}



CONTENT IDEA:

${topic}



AUDIENCE:

${audience}



CAMPAIGN GOAL:

${goal}



TONE:

${tone}



CONTENT TYPE:

${contentType}



PLATFORMS:

${platforms.join(", ")}





RETURN EXACTLY THIS STRUCTURE:





FACEBOOK


Post:

Create a complete Facebook post.

Visual:

Describe the recommended image/video.

Hashtags:

Provide relevant hashtags.





INSTAGRAM


Caption:

Create an engaging Instagram caption.

Visual:

Describe carousel/photo/video direction.

Hashtags:

Provide relevant hashtags.





LINKEDIN


Post:

Create a professional LinkedIn post.

Visual:

Describe professional visual direction.

Hashtags:

Provide relevant hashtags.





PINTEREST


Title:

Create SEO-friendly Pinterest title.

Description:

Create Pinterest search-optimised description.

Keywords:

Provide Pinterest keywords.





TIKTOK


Hook:

Create a powerful first 3-second hook.


Script:

Create complete short-form video script.


Visual:

Describe video scenes.


CTA:

Create call-to-action.





THREADS


Post:

Create conversational community-focused post.


Hashtags:

Provide relevant hashtags.





X


Post:

Create concise X post under platform limits.


Hashtags:

Provide relevant hashtags.





YOUTUBE


Title:

Create YouTube video title.


Description:

Create YouTube description.


Outline:

Create video structure.





Only return the campaign structure.

`;








        const response = await fetch(


            "https://api.openai.com/v1/chat/completions",


            {


                method:"POST",


                headers:{


                    "Content-Type":

                    "application/json",



                    "Authorization":

                    `Bearer ${process.env.OPENAI_API_KEY}`


                },



                body:JSON.stringify({



                    model:"gpt-4.1-mini",



                    messages:[



                        {


                            role:"system",


                            content:

                            "You create premium platform-specific marketing campaigns."


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








        const data =
        await response.json();









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


                "Content-Type":

                "application/json"


            },


            body:JSON.stringify({


                content:

                data.choices[0]
                .message
                .content


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
