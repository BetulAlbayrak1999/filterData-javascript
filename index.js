/*try {*/
    let data = [];
const fetchData = () => {
    //verinin çekildiği yer
    
    fetch("data.json")
    .then(response => {
        return response.json();
    })
    .then(responseData => {
        //json'dan okunan verinin data array'ine atanması
        data = responseData;

        //veri geldikten sonra filtreleme butonu görünür olmaı için 
        let filterButtonDom = document.querySelector("#filterButton");
        filterButtonDom.setAttribute("style", "");

        const checkAdult = document.querySelector("#checkAdult")
        checkAdult.setAttribute("style", "");
        const checkAdultLabelDom = document.querySelector("#checkAdultLabel")
        checkAdultLabelDom.setAttribute("style", "");

        const checkActive = document.querySelector("#checkActive")
        checkActive.setAttribute("style", "");
        const checkActiveLabelDom = document.querySelector("#checkActiveLabel")
        checkActiveLabelDom.setAttribute("style", "");

        const checkCharacter = document.querySelector("#checkCharacter")
        checkCharacter.setAttribute("style", "");
        checkCharacter.maxLength = 1;
        checkCharacter.placeholder = "please enter only one character";
        const checkCharacterLabelDom = document.querySelector("#checkCharacterLabel")
        checkCharacterLabelDom.setAttribute("style", "");
        
        //verinin html içerisinde listelendiği fonksiyon
        newList = listData(responseData);
        
    })
}/*}catch (err) {
    alert (err)
}*/
let a=0, b=0, c =0
const check = () => {
    
    if(checkActive.checked === true){
        a = 1
    }
    if(checkAdult.checked === true){
        b = 1
    }
    if(checkCharacter.value.length == 1){
        c = 1
    }
}
//verinin ul tag'i içerisinde listelenmesini sağlayan fonksiyon
const listData = (data) => {
    let list = document.querySelector(".list");
    list.innerHTML = data.map(element => {
        return `
        <li id=${element.id}>
            <span class='bold'>name:</span> ${element.name}
            <span class='bold'>email:</span> ${element.email}
            <span class='bold'>age:</span> ${element.age}
            <span class='bold'>city:</span> ${element.city}
            <span class='bold'>isActive:</span> ${element.isActive}
        </li>
        `;
    })
}

//verinin filtrelenmesini sağlayan fonksiyon

const filterData = () => {
    if(a == 1 && b == 1 && c == 1){
        let filterdData = data.filter(element => (element.isActive === true) && (element.age >= 18) && (element.name.charAt(0).toUpperCase() == checkCharacter.value.toUpperCase()));
        listData(filterdData);
    }           
    else if(a == 0 && b == 0 && c == 1){
        let filterdData = data.filter(element => (element.name.charAt(0).toUpperCase() == checkCharacter.value.toUpperCase()));
        listData(filterdData);
    } 
    else if(a == 1 && b == 0 && c == 1){
        let filterdData = data.filter(element => (element.isActive === true) && (element.name.charAt(0).toUpperCase() == checkCharacter.value.toUpperCase()));
        listData(filterdData);
    }
    else if(a == 0 && b == 1 && c == 1){
        let filterdData = data.filter(element => (element.age >= 18) && (element.name.charAt(0).toUpperCase() == checkCharacter.value.toUpperCase()));
        listData(filterdData);
    }
    else if(a == 1 && b == 1 && c == 0){
        let filterdData = data.filter(element => (element.isActive === true) && (element.age >= 18));
        listData(filterdData);
    }
    else if(a == 1 && b == 0 && c == 0){
        let filterdData = data.filter(element => (element.isActive === true));
        listData(filterdData);
    }
    else if(a == 0 && b == 1 && c == 0){
        let filterdData = data.filter(element => (element.age >= 18));
        listData(filterdData);
    }

}

