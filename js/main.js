 /*
=========================================================
Content Intelligence AI
Landing Page Engine
Version: 1.0

Handles:
- Smooth navigation
- Landing page interactions
=========================================================
*/


document.addEventListener("DOMContentLoaded", function(){



    const links = document.querySelectorAll(
        'a[href^="#"]'
    );



    links.forEach(link=>{


        link.addEventListener(
            "click",

            function(e){


                const target = document.querySelector(
                    this.getAttribute("href")
                );



                if(target){


                    e.preventDefault();



                    target.scrollIntoView({

                        behavior:"smooth"

                    });



                }


            }

        );


    });





});
