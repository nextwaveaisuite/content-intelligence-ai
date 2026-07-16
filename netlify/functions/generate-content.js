/*
=========================================================
Content Intelligence AI
AI Content Generation Engine
Version: 3.0

Purpose:
Creates platform-native social media campaigns.

Platforms:
Facebook
Instagram
LinkedIn
Pinterest
TikTok
Threads
X
YouTube
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



    try {



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

You are an expert social media strategist,
brand strategist, copywriter and platform growth specialist.


Your job:

Create a complete social media campaign from one idea.

Every platform must receive content specifically designed for that platform.

Never copy the same message between platforms.

Adapt:

- Writing style
- Length
- Audience behaviour
- Engagement style
- Hashtag strategy
- Visual direction
- Call to action



BRAND:

${brand || "Not provided"}



CONTENT TYPE:

${contentType}



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





IMPORTANT RULES:

- Do not say "Here is your content".
- Do not explain your process.
- Do not mention AI.
- Do not use fake URLs.
- Do not use placeholders.
- Do not repeat content.
- Create publish-ready content.



RETURN EXACTLY THIS FORMAT:



FACEBOOK

Post:

Write the complete Facebook post.

Visual:

Describe the image or video.

Hashtags:

Provide hashtags.



INSTAGRAM

Caption:

Write Instagram caption.

Visual:

Describe carousel, reel or image.

Hashtags:

Provide hashtags.



LINKEDIN

Post:

Write professional LinkedIn content.

Visual:

Describe professional visual.

Hashtags:

Provide hashtags.



PINTEREST

Title:

Create SEO-friendly Pinterest title.

Description:

Create Pinterest description.

Keywords:

Provide search keywords.



TIKTOK

Hook:

Create first 3 second hook.

Script:

Create full video script.

Visual:

Describe scenes.

CTA:

Create call to action.



THREADS

Post:

Create conversational Threads post.

Hashtags:

Provide hashtags.



X

Post:

Create concise X post.

Hashtags:

Provide hashtags.



YOUTUBE

Title:

Create video title.

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

                            "You are an expert platform-specific content strategist."



                        },


                        {


                            role:"user",


                            content:prompt


                        }


                    ],



                    temperature:0.75


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
