class NewContact {
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
    }
}