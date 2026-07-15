exports.handler = async function(event) {

    try {

        const body = JSON.parse(event.body);


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
                            "You create platform-specific social media content."
                        },

                        {
                            role:"user",
                            content:
                            `
Create unique content for:

Idea:
${body.topic}

Audience:
${body.audience}

Goal:
${body.goal}

Tone:
${body.tone}

Platforms:
${body.platforms.join(", ")}

Make each platform different.
`
                        }

                    ],

                    temperature:0.8

                })

            }
        );


        const data = await response.json();


        console.log(data);


        if(!data.choices){

            return {

                statusCode:500,

                body:JSON.stringify({

                    error:"OpenAI Error",

                    details:data

                })

            };

        }


        return {

            statusCode:200,

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
