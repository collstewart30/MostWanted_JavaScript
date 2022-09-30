/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
            //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            app();
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);    // calling app you're in
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help                          DONE
            let personInfo = displayPerson(person[0]);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help      spouse, siblings, parents - function for each   DONE
            let personFamily = findPersonFamily(person[0], people);        
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////            DONE
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    ); 
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////  DONE
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `Date of Birth: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();     // trims off white space left and right ex "   yes " is just "yes"
    } while (!response || !valid(response));        // !response -> "if there is no response", !valid -> "if there is no valid response"
    return response;    // keep doing var response if no valid response or no response. this is validating bad input - keeps you in function until gets good input
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";   // toLowerCase - makes lower case ex "YeS" becomes "yes"
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

// EXAMPLE OF PERSON
// {
//     "id": 313207561,
//     "firstName": "Mattias",
//     "lastName": "Madden",
//     "gender": "male",
//     "dob": "2/19/1966",
//     "height": 70,
//     "weight": 110,
//     "eyeColor": "blue",
//     "occupation": "assistant",
//     "parents": [693243224, 888201200],
//     "currentSpouse": 313997561
// },


function findPersonSpouse(person, people){
    let newArray = people.filter(function(el) {
     if(el.id == person.currentSpouse) {
        return true;
     }
    })
    return newArray;
}


function findPersonParents(person, people){
    let newArray = people.filter(function(el){
        if((person.parents).includes(el.id)) {
            return true;
        }
    })
    return newArray;
}

function findPersonSiblings(person, people){
    let newArray = people.filter(function(el){
        if (person.id == el.id) {
            return false;
        }
        if(person.parents.includes(el.parents[0]) || person.parents.includes(el.parents[1])) {
            return true;
        }
    })
    return newArray;
}


// using helper functions
function findPersonFamily(person, people){
    let newArray = [];
    let personSpouse = findPersonSpouse(person, people);
    let personParents = findPersonParents(person,people);
    let personSiblings = findPersonSiblings(person,people);

    if (personSpouse != null) {
        // for loop is starting point ;go until this changes; how you get there
        for(let i = 0; i < personSpouse.length; i++) {
            newArray += `Spouse: ${personSpouse[i].firstName} ${personSpouse[i].lastName}\n`
        }
    }
    if (personParents != null) {
        for(let i = 0; i < personParents.length; i++) {
            newArray += `Parent: ${personParents[i].firstName} ${personParents[i].lastName}\n`
        }
    }
    if (personSiblings != null) {
        for(let i = 0; i < personSiblings.length; i++) {
            newArray += `Sibling: ${personSiblings[i].firstName} ${personSiblings[i].lastName}\n`
        }
    }
    return newArray;
}


function findPersonDescendants(person, people = []){
    let results = people.filter(el => el.parents.includes(person.id));  // results will be an array
    // base case - have we reached the end of a branch (leaf)
    if (results.length === 0) return results;

    // recursive case - calling function (might consider using in for-loop)
    for (let i = 0; i < results.length; i++) {
        results = results.concat(
            findPersonDescendants(person[i])   // recursive function, person to pass in
        );
    }
    return displayPeople(results);      // where to label "Descendant"
}


// function searchByTraitsFunction(array){    
//     alert("Trait search options are: \ngender\ndob\nheight\nweight\neyeColor\noccupation")
//     let userInputTrait = prompt("Please enter a trait to search by:")    
//     let userInputVal = prompt("Please enter a trait specification: ")   
//     let foundPerson = array.filter(function(el){
//         try {
//             if(el[userInputTrait].includes(userInputVal)){
//                 return true;
//             }
//         } catch (error){
//             alert("I did not find that value. Please try again.")
//             return searchByTraits(people);
//         }
//         finally{
//             if(el[userInputTrait]===parseInt(userInputVal)){
//                 return true;
//             }
//         }
//     });
//     return displayPeople(foundPerson);
// }

function searchByTraits(people){
    let searchByTraitsResult = searchByTraitsFunction(people)
    return searchByTraitsResult;
}



function searchByTraitsFunction(array){    
    alert("Trait search options are: \ngender\ndob\nheight\nweight\neyeColor\noccupation")    
    let numTraitSearches = prompt("How many traits would you like to search by? (max 5)")
    let userInputTrait = prompt("Please enter a trait to search by:")    
    let userInputVal = prompt("Please enter a trait specification: ")   
    let foundPerson = array.filter(function(el){
    switch (numTraitSearches) {
        case 1:        
                try {
                    if(el[userInputTrait].includes(userInputVal)){
                        return true;
                    }
                } catch (error){
                    alert("I did not find that value. Please try again.")
                    return searchByTraits(people);
                }
                finally{
                    if(el[userInputTrait]===parseInt(userInputVal)){
                        return true;
                    }
                }
                break;  
                case 2:
                    for (let i = 0; i < array.length; i++) {
                        ;                
                    }
                    break;
                    default:
                        app(people);
                        break;
        }
    });
    return displayPeople(foundPerson);
}