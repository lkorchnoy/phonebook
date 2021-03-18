class Contact {
    constructor(name, phonenumber) {
        this.name = name;
        this.phonenumber = phonenumber;
    }
}

class UI {
    static displayNewContacts() {
        const StoreContacts = [
            {
                name: 'Isabella',
                phonenumber: '1234567891'
            },
            {
                name: 'Samuel',
                phonenumber: '1234567892'
            },
            {
                name: 'Nikita',
                phonenumber: '1234567893'
            },
            {
                name: 'Alexandra',
                phonenumber: '1234567894'
            },
            {
                name: 'Anastasia',
                phonenumber: '1234567895'
            }
        ];

        const contacts = StoreContacts;

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

    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#number').value = '';
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

    //instantiating contact
    const contact = new Contact(name, number);

    //console.log(contact)
    //add contact to ui
    UI.addContactToList(contact);

    UI.clearFields();
    
});