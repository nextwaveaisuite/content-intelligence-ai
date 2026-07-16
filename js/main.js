/*
=========================================================
Content Intelligence AI
Frontend Core Engine
Version: 5.0

Handles:
- Navigation
- Smooth scrolling
- Basic UI interactions
=========================================================
*/





document.addEventListener(
    "DOMContentLoaded",
    function(){





        /*
        ==============================================
        Smooth scrolling
        ==============================================
        */


        const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );



        links.forEach(link=>{


            link.addEventListener(
                "click",
                function(event){



                    const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );



                    if(target){



                        event.preventDefault();



                        target.scrollIntoView({

                            behavior:"smooth"

                        });



                    }



                }

            );



        });









        /*
        ==============================================
        Navigation shadow on scroll
        ==============================================
        */



        const header =
        document.querySelector(
            "header"
        );



        if(header){



            window.addEventListener(
                "scroll",
                function(){



                    if(window.scrollY > 20){



                        header.style.boxShadow =
                        "0 10px 30px rgba(0,0,0,.25)";



                    }

                    else{


                        header.style.boxShadow =
                        "none";


                    }



                }

            );


        }








        /*
        ==============================================
        Button hover enhancement
        ==============================================
        */


        const buttons =
        document.querySelectorAll(
            ".primary-button"
        );



        buttons.forEach(button=>{


            button.addEventListener(
                "mouseenter",
                function(){


                    this.style.transform =
                    "translateY(-2px)";


                }
            );



            button.addEventListener(
                "mouseleave",
                function(){


                    this.style.transform =
                    "translateY(0)";


                }
            );



        });






    }

);
