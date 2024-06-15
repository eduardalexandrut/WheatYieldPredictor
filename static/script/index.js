document.addEventListener('DOMContentLoaded',()=> {
    const available_countries = ['Australia', 'India', 'Egypt', 'Algeria', 'Kazakhstan',
        'Netherlands', 'Madagascar', 'Eritrea', 'Greece', 'Iraq',
        'Azerbaijan', 'Mali', 'Thailand', 'Spain', 'Colombia', 'Lebanon',
        'United Kingdom', 'Brazil', 'Libya', 'Germany', 'Switzerland',
        'Belgium', 'Romania', 'Hungary', 'Burundi', 'Morocco', 'Denmark',
        'Argentina', 'Bangladesh', 'Qatar', 'Cameroon', 'Ireland',
        'South Africa', 'Tajikistan', 'Mexico', 'Pakistan', 'Botswana',
        'Guatemala', 'Ecuador', 'Zimbabwe', 'Finland', 'Japan', 'Sudan',
        'Uganda', 'Nepal', 'Ukraine', 'Rwanda', 'Canada', 'Malawi', 'Peru',
        'Portugal', 'Slovenia', 'Chile', 'Angola', 'Zambia', 'Mozambique',
        'Lesotho', 'Saudi Arabia', 'Italy', 'Belarus', 'Uruguay', 'Kenya',
        'Niger', 'Mauritania', 'Norway', 'France', 'Montenegro', 'Latvia',
        'Bulgaria', 'Sweden', 'Estonia', 'Honduras', 'Albania', 'Tunisia',
        'Austria', 'Lithuania', 'Poland', 'New Zealand', 'Namibia',
        'Armenia', 'Croatia']
    const paths = document.querySelectorAll('path')
    const svg = document.getElementById('svg')
    const tooltip = document.getElementById('tooltip')
    let selectedCountry = "";

    //Make unavailable countries un-selectable.
    paths.forEach((path) => setToUnselectable(path))

    //Add event listeners to the selectable countries.
    paths.forEach(
        (path) => {
            if(path.getAttribute('available') == 'true') {
                path.setAttribute("data-bs-toggle","modal")
                path.setAttribute("data-bs-target","#exampleModal")
                path.addEventListener('click', ()=> selectCountry(path))
                path.addEventListener('mouseover',(e)=> showTooltip(path,e))
                //path.addEventListener('mouseout', hideTooltip);
                path.innerHTML = `<p>${path.classList[0]}</p>`
            }
        }
    )

    function updateSvgDimensions() {
         const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          //svg.setAttribute('viewBox', `0 0 ${viewportWidth} ${viewportHeight}`);
          //svg.setAttribute('height', `${viewportHeight}`);
         //svg.setAttribute('width',`${viewportWidth}`)
          console.log(viewportHeight,viewportWidth)
    }

    function setToUnselectable(path) {
        let name = "";
        if (path.getAttribute('name') != undefined) {
            name = path.getAttribute('name')
        } else if (path.classList[0] != undefined){
            name = path.classList[0]
            if(path.classList[1] != undefined) {
                name = `${name} ${path.classList[1]}`
            }
        }
        
        if(!available_countries.includes(name)) {
            path.style.opacity = .2;
            path.setAttribute("available","false");
        } else {
            path.setAttribute("available","true")
        }
    }

    function selectCountry(path) {
        let name = "";
        if (path.getAttribute('name') != undefined) {
            name = path.getAttribute('name')
        } else if (path.classList[0] != undefined){
            name = path.classList[0]
            if(path.classList[1] != undefined) {
                name = `${name} ${path.classList[1]}`
            }
        }
        selectedCountry = name
        document.querySelector("#exampleModalLabel").textContent = selectedCountry
    }

    function showTooltip(path,e) {
        let name = "";
        if (path.getAttribute('name') != undefined) {
            name = path.getAttribute('name')
        } else if (path.classList[0] != undefined){
            name = path.classList[0]
            if(path.classList[1] != undefined) {
                name = `${name} ${path.classList[1]}`
            }
        }
        //console.log("ciao")
        tooltip.textContent = name;
        tooltip.style.display = 'block'
        positionTooltip(e.clientX, e.clientY)
    }

    function hideTooltip(){
        tooltip.style.display = 'none';
    }

    function positionTooltip(x, y) {
        tooltip.style.left = `${x + 10}px`; // Offset to avoid mouse cursor overlap
        tooltip.style.top = `${y + 10}px`;
    }

    updateSvgDimensions()
    window.addEventListener('resize',updateSvgDimensions)
   // document.addEventListener('mousemove', (e)=>positionTooltip(e.clientX, e.clientY))
}, false)