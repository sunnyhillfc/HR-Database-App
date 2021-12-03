//root url for the web service
const wsUrl = 'https://localhost:44358/RoiWebService.asmx/';

// Create GET request to a URL
async function getRequest(url, data = {}) {
    
    // Build URL with data attached
    url += '?' + new URLSearchParams(data);

    // Make request, wait for response
    const response = await fetch(url, {
        method: 'GET',
        cache: 'no-cache', // Ignore caching
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
    })
    // Check for errors, e.g. 400, 500
    .then(handleFetchError);

    // Return response data
    return response.json();
}

// Create POST request to a URL
async function postRequest(url, data = {}) {
    
    // Make request, wait for response
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        cache: 'no-cache', // Ignore caching
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
    })
    // Check for errors, e.g. 400, 500
    .then(handleFetchError);

    // Return response data
    return response.json();
}

// Check for 400-500 errors and check for custom message from server
async function handleFetchError(response) {

  // Check for errors, e.g. 400, 500
  if (!response.ok) {

    // Check for custom error message from web service
    let responseData = await response.clone().json().then(data => responseData = data);
    if (responseData.d) {
      throw Error(JSON.parse(responseData.d).Message);
    } else {
      throw Error('Error response code: ' + response.statusCode);
    }
  }

  return response;
}

//get departments
export function RoiGetDepartments(){
    //web service method name 
    const wsMethod ='GetDepartments';

    //call web service method
    return getRequest(wsUrl+wsMethod)
        .then(response => {
            //If request is successful, return json data
            return JSON.parse(response.d)
        })

}
//get people
export function RoiGetPeople(){
    //web service method name 
    const wsMethod ='GetPeople';

    //call web service method
    return getRequest(wsUrl+wsMethod)
        .then(response => {
            //
            return JSON.parse(response.d)
        })

}

//get a person 
export function RoiGetPerson(personId){
    //web service method name 
    const wsMethod ='GetPerson';

        //call web service method
        return getRequest(wsUrl+wsMethod, {personId})
        .then(response => {
            //
            return JSON.parse(response.d)
        })
}

//Delete person 
export function RoiDeletePerson(personId){
    //web service method name 
    const wsMethod ='DeletePerson';

        //call web service method
        return postRequest(wsUrl+wsMethod, {personId})
        .then(response => {
            //
            return JSON.parse(response.d)
        })
}
//Add person
export function RoiAddPerson(name, phone, departmentId, street, city, state, zip, country){
    //web service method name 
    const wsMethod ='AddPerson';

        //call web service method
        return postRequest(wsUrl+wsMethod, {name, phone, departmentId, street, city, state, zip, country})
        .then(response => {
            //
            return JSON.parse(response.d)
        })
}

//Update person
export function RoiUpdatePerson(personId, name, phone, departmentId, street, city, state, zip, country){
    //web service method name 
    const wsMethod ='UpdatePerson';

        //call web service method
        return postRequest(wsUrl+wsMethod, {personId, name, phone, departmentId, street, city, state, zip, country})
        .then(response => {
            //
            return JSON.parse(response.d)
        })
}