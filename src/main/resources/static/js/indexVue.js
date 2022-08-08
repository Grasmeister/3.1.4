function getIndex(list, id) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return i;
        }
    }
    return -1;
}

var adminApi = Vue.resource('/admin{id}')

Vue.component('person-form', {
    props: ['persons', 'personAttr'],
    data: function () {
        return {
            id: '',
            name: '',
            password: '',
            lastName: '',
            age: '',
            email: '',
        }
    },
    watch: {
        personAttr: function (newVal, oldVal) {
            this.name = newVal.name;
            this.password = newVal.password;
            this.lastName = newVal.lastName;
            this.age = newVal.age;
            this.email = newVal.email;
            this.id = newVal.id;

        }
    },
    template:
        '<div>' +
        '<label htmlFor="name">First name</label> <br>' +
        '<input th:field="*{name}" type="text" id="name" v-model="name"/>' +
        '<br><br> <label htmlFor="password">Password</label> <br>' +
        '<input th:field="*{password}" type="text" id="password" v-model="password"/>' +
        '<br><br><label htmlFor="lastName">Last name</label><br>' +
        '<input th:field="*{lastName}" type="text" id="lastName" v-model="lastName"/>' +
        '<br><br> <label htmlFor="age">Age</label> <br> ' +
        '<input th:field="*{age}" type="number" id="age" v-model="age"/>' +
        ' <br><br> <label htmlFor="email">Email:</label> <br> ' +
        '<input th:field="*{email}" type="text" id="email" v-model="email"/>' +
        '<p> <input type="button" value="Save" v-on:click="save"/> </p>' +
        '</div>',
    methods: {
        save: function () {
            var person = {
                name: this.name,
                password: this.password,
                lastName: this.lastName,
                age: this.age,
                email: this.email
            };
            if (this.id) {
                adminApi.update({id: this.id}, person).then(result =>
                    result.json().then(data => {
                            var index = getIndex(this.persons, data.id);
                            this.persons.splice(index, 1, data);
                        }
                    )
                )
            } else {
                adminApi.save({}, person).then(result =>
                    result.json().then(data => {
                        this.persons.push(data);
                    })
                )
            }
        }
    }
});

Vue.component('person-row', {
    props: ['person', 'editPerson', 'persons'],
    template:
        '<div>' +
        '<i>({{ person.id }})</i> {{ person.name }} {{ person.age }}  {{ person.email }} ' +
        '<span>' +
        '<input type="button" value="edit" @click="edit" />' +
        '<input type="button" value="delete" @click="del" />' +
        '</span> ' +
        '</div>',
    methods: {
        edit: function () {
            this.editPerson(this.person);
        },
        del: function () {
            adminApi.remove({id: this.person.id}).then(result => {
                if (result.ok) {
                    this.persons.splice(this.persons.indexOf(this.person), 1)
                }
            })
        }
    }
});

Vue.component('person-list', {
    props: ['persons'],
    data: function () {
        return {
            person: null
        }
    },
    template:
        '<div> ' +
        ' <person-form :persons="persons" :personAttr="person"  />' +
        '<person-row v-for="person in persons" v-bind:key="person.id" :person="person"' +
        ':persons="persons" :editPerson="editPerson" />' +
        '</div>',
    created: function () {
        adminApi.get().then(result =>
            result.json().then(data =>
                data.forEach(person => this.persons.push(person))
            )
        )
    },
    methods: {
        editPerson: function (person) {
            this.person = person;
        }
    }
});


var app = new Vue({
    el: '#app',
    template: '<person-list :persons="persons" />',
    data: {
        persons: [


            // {id: '1', name: 'Anton', lastName: 'S', age: '36', password: 'password', email: 'AntonS@mail.ru'},
            // {id: '2', name: 'Sergei', lastName: 'S', age: '37', password: 'password2', email: 'SergeiS@mail.ru'},
            // {id: '3', name: 'Ivan', lastName: 'A', age: '3', password: 'password3', email: 'IvanA@mail.ru'}
        ]
    }
});