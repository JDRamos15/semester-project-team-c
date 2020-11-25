
const url = "http://localhost:8080/api/";

export const Server = {
    getGuides,
    getUsers,
    getCustomers,
    // getLocations,
    // getCompanies,
    // getEvent,
    // getReview,
    addGuide,
    addCustomer,
    // addLocation,
    // addCompany,
    // addUser,
    // addEvent,

};
//User
const user = "user/";
function getUsers() {
    return fetch(url + user +"all-users").then(receivedData => receivedData.json());
}
//Guide
const guide = "guide/"
function getGuides() {
    return fetch(url + guide + "all-guides").then(receivedData => receivedData.json());
}
function addGuide(data){
    const req = {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: data 
    };
    return fetch(url + guide + "add-guide",req).then(receivedData => receivedData.json());
}

//Company
const company = "company/";

//Customer
const customer = "customer/";

function getCustomers() {
    return fetch(url + customer + "all-customers").then(receivedData => receivedData.json());
}

function addCustomer(data){
    const req = {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: data 
    };
    return fetch(url + customer + "add-customer",req).then(response => response.json());
}

export default Server