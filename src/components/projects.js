export default function initProjects() {
    const projectsContainerDiv = document.getElementById('projects-container');
    const openProjectDiv = document.getElementById('open-project');
    const title = document.getElementById('project-title');
    const stack = document.getElementById('project-stack');
    const desc1 = document.getElementById('project-description');
    const desc2 = document.getElementById('project-description-2');
    const projImages = document.getElementById('project-images');
    const mainContainer = document.getElementById('main-container');
    const linkElement = document.getElementById("project-link");

    const projects = [
        [
            "PROTECTIUM",
            "HTML, CSS, JS, MySQL, Flask, VSCode",
            "Protectium is a web-based Multi-Factor Authentication (MFA) system, requiring three verification factors for accessing resources such as applications or online accounts. This approach substantially enhances security, effectively minimizing the vulnerability to cyber attacks.",
            "The project aims to improve the connection between customers and their private accounts, ensuring a secure and convenient login experience. It prioritizes enhancing customer interactions while safeguarding their access to individual accounts.",
            [
                "/assets/Projects/Protectium/Protectium1.png",
                "/assets/Projects/Protectium/Protectium2.png",
                "/assets/Projects/Protectium/Protectium3.png",
                "/assets/Projects/Protectium/Protectium4.png",
                "/assets/Projects/Protectium/Protectium5.png",
                "/assets/Projects/Protectium/Protectium6.png"
            ],
            "https://github.com/mayankpandit00/Protectium"
        ],

        [
            "AUTO MEET",
            "Python, Selenium, Chromdriver, Static and Dynamic Web Scraping, PyCharm",
            "Auto Meet is an automated program designed to streamline Google Meet management. It efficiently manages tasks, monitors participant data, and compiles it into a singular, user-friendly file. This integration enhances user convenience by providing a comprehensive overview of the meet's proceedings and participants' information.",
            "In the wake of the COVID-19 pandemic, numerous offices, schools, and educational institutions shifted online. Managing participants and technical glitches during virtual meetings became challenging. Auto Meet emerged to streamline these tasks, offering a user-friendly platform for convenient online meetings.",
            [
                "/assets/Projects/AutoMeet/AutoMeet1.png",
                "/assets/Projects/AutoMeet/AutoMeet2.png",
                "/assets/Projects/AutoMeet/AutoMeet3.png",
                "/assets/Projects/AutoMeet/AutoMeet4.png",
                "/assets/Projects/AutoMeet/AutoMeet5.png"
            ],
            "https://github.com/mayankpandit00"
        ],

        [
            "FLAPPY",
            "Python, CV2, Mediapipe, PyGame, PyCharm",
            "Flappy is a simple game where players navigate a bird, endeavoring to glide through narrow pipe columns without collision. Accumulating points hinges on successfully traversing obstacles. The player's score increases with each pipe cleared, adding an element of challenge as they strive to achieve higher scores.",
            "Flappy Bird, devised by Vietnamese game artist and programmer Dong Nguyen, gained fame for its simplicity. To infuse novelty, players guide the bird through hand gestures.",
            [
                "/assets/Projects/Flappy/Flappy1.png",
                "/assets/Projects/Flappy/Flappy2.jpg",
                "/assets/Projects/Flappy/Flappy3.jpg",
                "/assets/Projects/Flappy/Flappy4.jpg"
            ],
            "https://github.com/mayankpandit00/Flappy-Bird"
        ],

        [
            "CRIC WIN",
            "Python, NumPy, Pandas, Matpltlib, Seaborn, Sklearn, Google Colab",
            "Cric Win performs comprehensive data analysis on the IPL dataset, employing a machine learning model for winner prediction. This advanced approach leverages insights from data to forecast the victor, enhancing the accuracy and informed decision-making within the realm of cricket.",
            "The Indian Premier League, a professional 20-20 cricket league in India, takes place annually from March to May. Teams representing diverse cities and states of India compete, showcasing a dynamic blend of cricket talent and regional pride.",
            [
                "/assets/Projects/CricWin/CricWin1.png",
                "/assets/Projects/CricWin/CricWin2.png",
                "/assets/Projects/CricWin/CricWin3.png",
                "/assets/Projects/CricWin/CricWin4.png",
                "/assets/Projects/CricWin/CricWin5.png",
            ],
            "https://github.com/mayankpandit00/IPL_DataAnalysis_ML"
        ],

        [
            "JET HIGH",
            "HTML, CSS, JS, VSCode",
            "The Airline Ticketing System (ATS) is a web-based platform that simplifies flight booking, enabling users to search, select, and reserve flights between specified cities and dates. It ensures efficient and user-friendly online air travel reservations.",
            "ATS strives to elevate customer convenience during flight bookings and optimize airline procedures, nurturing positive customer connections, loyalty, and streamlined air travel administration.",
            [
                "/assets/Projects/JetHigh/JetHigh1.jpg",
                "/assets/Projects/JetHigh/JetHigh2.jpg",
                "/assets/Projects/JetHigh/JetHigh3.jpg",
                "/assets/Projects/JetHigh/JetHigh4.jpg",
                "/assets/Projects/JetHigh/JetHigh5.jpg"
            ],
            "https://github.com/mayankpandit00"
        ],

        [
            "PANDEMETER",
            "Python, Static and Dynamic Web Scraping, Tkinter, PyCharm",
            "Pandemter is a computerized system designed to gather real-time data about COVID-19. It presents this information on a single window, enhancing user convenience. By providing a comprehensive overview of the pandemic's status, Pandemter aids in informed decision-making and ensures quick access to essential information for users.",
            "In December 2019, the coronavirus outbreak unfolded, triggering global havoc. With varying and inaccurate information on websites, finding reliable sources became challenging. Pandemter emerged to meet the high demand for accurate and trustworthy information during the crisis.",
            [
                "/assets/Projects/Pandemeter/Pandemeter1.png",
                "/assets/Projects/Pandemeter/Pandemeter2.png",
                "/assets/Projects/Pandemeter/Pandemeter3.png",
                "/assets/Projects/Pandemeter/Pandemeter4.png",
                "/assets/Projects/Pandemeter/Pandemeter5.png",
                "/assets/Projects/Pandemeter/Pandemeter6.png",
            ],
            "https://github.com/mayankpandit00/Covid19-Tracker"
        ]
    ]

    function openProject(id) {

        document.body.classList.add('body-stop-scroller');
        const project = projects[id];

        let lastScrollY;
        lastScrollY = window.scrollY;

        title.textContent = project[0];
        stack.textContent = "Stack: " + project[1];
        desc1.textContent = project[2];
        desc2.textContent = project[3];
        linkElement.href = project[5] || "#";

        projImages.innerHTML = "";

        project[4].forEach(imgSrc => {
            const img = document.createElement("img");
            img.src = imgSrc;
            img.alt = project[0];
            img.classList.add("project-image");
            projImages.appendChild(img);
        });

        openProjectDiv.scrollTop = 0;
        projectsContainerDiv.classList.add("hidden");
        openProjectDiv.classList.add("visible");
    }

    function closeProject() {

        document.body.classList.remove('body-stop-scroller');

        openProjectDiv.classList.remove("visible");

        projectsContainerDiv.classList.remove("hidden");
    }

    window.openProject = openProject;
    window.closeProject = closeProject;
}