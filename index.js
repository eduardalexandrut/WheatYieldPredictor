document.addEventListener('DOMContentLoaded',()=> {
    const paths = document.querySelectorAll('path')
    const svg = document.getElementById('svg')
    let selectedCountry = "";
    paths.forEach(
        (path) => {
            path.setAttribute("data-bs-toggle","modal")
            path.setAttribute("data-bs-target","#exampleModal")
            path.addEventListener('click', ()=> selectCountry(path))
            path.innerHTML = `<p>${path.classList[0]}</p>`
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
        console.log(path.classList[0])
    }

    updateSvgDimensions()
    window.addEventListener('resize',updateSvgDimensions)
}, false)