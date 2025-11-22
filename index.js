const colorSelected = document.getElementById('color-selected')
const getColorBtn = document.getElementById('color-btn')
const displayColors = document.getElementById('display-colors')
const modeSelected = document.getElementById('mode')

getColorBtn.addEventListener('click', ()=>{
    const color = colorSelected.value.slice(1)
    const mode = modeSelected.value
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=5`)
        .then(res => res.json())
        .then(data => {
            displayColors.innerHTML = ""
            
            data.colors.forEach(colorsObj => {
                const hex = colorsObj.hex.value
                
                const div = document.createElement('div')
                div.classList.add('color-box')
                div.style.backgroundColor = hex
                // div.innerHTML = `<p class="hex-text">${hex}</p>`

                const hexText = document.createElement('p')
                hexText.classList.add('hex-text')
                hexText.textContent = hex
                
                div.appendChild(hexText)
                displayColors.appendChild(div)
                
                hexText.addEventListener('click', ()=>{

                    const originalHex = hex;

                    navigator.clipboard.writeText(originalHex)
                        .then(() => {
                            hexText.textContent = `Copied ✅`
                            setTimeout(() => hexText.textContent = originalHex, 1200)
                        })
                })
            })       
        })
})