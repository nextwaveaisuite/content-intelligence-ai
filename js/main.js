/*
=========================================================
Content Intelligence AI
Main Website JavaScript
Version: 1.0
=========================================================
*/


document.addEventListener("DOMContentLoaded", function(){


    /*
    Smooth scrolling for internal navigation links
    */

    const links = document.querySelectorAll('a[href^="#"]');


    links.forEach(link => {


        link.addEventListener("click", function(e){


            const target = document.querySelector(
                this.getAttribute("href")
            );


            if(target){

                e.preventDefault();

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }


        });


    });



    /*
    Simple navigation animation
    */

    const navButton = document.querySelector(".nav-button");


    if(navButton){


        navButton.addEventListener("mouseenter",()=>{


            navButton.style.transform="translateY(-2px)";


        });


        navButton.addEventListener("mouseleave",()=>{


            navButton.style.transform="translateY(0)";


        });


    }



});
