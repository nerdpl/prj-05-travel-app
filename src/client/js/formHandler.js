function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let userUrl = document.getElementById('name').value;
    // send the url to server and get evaluation
    postData('/sentiment', { link: userUrl })
}
 
const postData = async (url = '', data = {})=> {
    // send the url
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(data) 
    })
    try {
        //get results
        const newData = await response.json()
        // update DOM with the results
        document.getElementById('results').innerHTML = JSON.stringify(newData)
        return newData
    } catch(error) {
        console.log("Error: " + error)
    }
}

export { handleSubmit }