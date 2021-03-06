class Contact {
    constructor(name, phonenumber) {
        this.name = name;
        this.phonenumber = phonenumber;
    }
}

class UI {
    static displayNewContacts() {
        const contacts = Store.getContacts();
        
        contacts.forEach((contact) => UI.addContactToList(contact));
    }
    static addContactToList(contact) {
        const list = document.querySelector('#name-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.phonenumber}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    
    static deleteContact(target) {
       if(target.classList.contains('delete')) {
           target.parentElement.parentElement.remove();
       }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        //anything with class alert should be removed in 3000 miliseconds 
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#number').value = '';
    }
}

//class to handle storage of info
//methods are static to call on them directly without having to instantiate store class
//key value pairs, string version of entire array of contacts, because we cannot store objects in local storage, we have to stringify it first and then parse it 
class Store {
    static getContacts() {
        let contacts;
        if(window.localStorage.getItem('contact') === null) {
            contacts = [];
        } else {
            contacts = JSON.parse(window.localStorage.getItem('contacts'));
        }
         return contacts;
    }

    static addContact(contact) {
        const contacts = Store.getContacts();
        contacts.push(contact);
        window.localStorage.setItem('contacts', JSON.stringify(contacts));

    }

    static removeContact(name) {
        const contacts = Store.getContacts();

        contacts.forEach((contact, index) => {
            if(contact.name === name) {
                contacts.splice(index, 1);
            }
        });

        window.localStorage.setItem('contacts', JSON.stringify(contacts));
    }
}
     //event: display contacts
document.addEventListener('DOMContentLoaded', UI.displayNewContacts);

//form values

document.querySelector('#book-form').addEventListener('submit', (e) => {
//prevent actual submit
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const number = document.querySelector('#number').value;

    //validating

    if(name === '' || number === '') {
        UI.showAlert('Please fill in the information', 'danger');
    } else {
        //instantiating contact
    const contact = new Contact(name, number);

    //console.log(contact)
    //add contact to ui
    UI.addContactToList(contact);

    //add contact to local storage
    Store.addContact(contact);

    //success message
    UI.showAlert('Contact Added', 'success');

    UI.clearFields();
 
    }

});
//remove a contact 
document.querySelector('#name-list').addEventListener('click', (e) => {
//remove contact from UI
    UI.deleteContact(e.target)
//remove contact from localstorage
    Store.removeContact(e.target.parentElement.previousElementSibling.textContent);
//warning allert for removing contact 
    UI.showAlert('Contact Removed', 'warning');
});