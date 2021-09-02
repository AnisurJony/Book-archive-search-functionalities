
/*----------------------------------------------------------------  Assignment -6 --------------------------------------------------------------------*/
/*------------------------------------------------------------------ Created by ----------------------------------------------------------------------*/
/*----------------------------------------------------------------- Anisur Rahman ---------------------------------------------------------------------*/

/*   the function is called by the button and it is work for all field value content removing and get the input value for daynamicaly call the API   */

const searchText = () => {

            // --------- get the container which is contain all the information card-------//

            const cardHolder = document.getElementById('search-Container');

            // -------------get the search result number shown field---------//

            const numberOfResult = document.getElementById('result-found');

            // -----------get the search field Inpute Value-----------//

            const searchText = document.getElementById('input-value');

            // ----call the getData function with the parameter that you will get frome input field of search box----//

            getSearchValue(searchText);

            //-------erase the container, search result number, and input field to show next result according to search box ----------//

            cardHolder.textContent = '';

            numberOfResult.innerText = '';

            searchText.value = '';

}



/*---------------------- search result and API intrigration Function--------------------- */


const getSearchValue = data => {

            // ---API link Changes with search value dynamically------//
            const url = `https://openlibrary.org/search.json?q=${data.value}`;

            fetch(url)
                        .then(res => res.json())
                        .then(data => getData(data));
}


/*---------- function for get the jason data from getData function and manipulation of the loaded data ------------------ */

const getData = data => {

            //----------------- get the container again to append data dynamically-------------//

            const cardHolder = document.getElementById('search-Container');

            // --------------- get the result found field to show the result number that you found by search----------//

            const numberOfResult = document.getElementById('result-found');

            //---- condition for warning message if some one enter nothing and non-sense meaning word--------//

            if (data.numFound === 0) {

                        //--- warning message---//
                        numberOfResult.innerText = `Enter something meaningful`;
            }

            //-------------- condition for valid search----------------------//

            if (data.numFound !== 0) {
                        // ------------------ set the result found value to the respective field--------//

                        numberOfResult.innerText = `Result Found:${data.numFound}`;

                        //-------get the first 20 result from many reasch result rest of them we can use for next page with pagination button but now we ignore it by instruction and looping with forEach for get every element of the array-----------//

                        data.docs.slice(0, 20).forEach(element => {

                                    //---we use cover_i Number dynamically in Image url by templete string to get the image for respective value-----//

                                    const url = `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`;

                                    //------- creat a div element for append to the container-----------//

                                    const div = document.createElement('div');

                                    div.classList.add('col');

                                    //---------- condition for  found no year for first publish but i do not use for author name because i found no book here without an author name----------------//

                                    if (element.first_publish_year === undefined) {

                                                div.innerHTML = `<div class="card h-100 text-center py-4 bg-primary bg-opacity-75">
                                                <img src="${url}" class="card-img-top w-50 mx-auto d-block img-thumbnail" alt="...">
                                                            <div class="card-body">
                                                                        <h5 class="card-title book-title">${element.title}</h5>
                                                                        <p class="card-text"><h6>Author</h6><span class="info-text" >${element.author_name[0]}</span><br>
                                                                        <h6>Publish by</h6><span class="info-text">${element.publisher[0]}</span><br>
                                                                        <h6>First Publish</h6><span class="info-text"> Unkhown</span>
                                                                        </p >
                                                            </div >
                        
                                                </div > `;

                                                // -----------append div to the container---------//
                                                cardHolder.appendChild(div);
                                    }


                                    else {
                                                div.innerHTML = `<div class="card h-100 text-center py-4 bg-primary bg-opacity-75">
                                                <img src="${url}" class="card-img-top w-50 mx-auto d-block img-thumbnail" alt="...">
                                                            <div class="card-body">
                                                                        <h5 class="card-title book-title">${element.title}</h5>
                                                                        <p class="card-text"><h6>Author</h6><span class="info-text">${element.author_name}</span><br>
                                                                        <h6>Publish by</h6><span class="info-text">${element.publisher[0]}</span><br>
                                                                        <h6>First Publish</h6><span class="info-text">${element.first_publish_year}</span >
                                                                        </p >
                                                            </div >
                        
                                                </div > `;

                                                //------------append div to the container-----------//
                                                cardHolder.appendChild(div);

                                    }




                        })
            }












}

