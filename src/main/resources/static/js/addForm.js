// const username = document.getElementById('name')
// const surname = document.getElementById('lastName')
// const age = document.getElementById('age')
// const email = document.getElementById('email')
// const password = document.getElementById('password')
// const role = document.getElementById('rolesId')
// const addForm = document.querySelector('.addForm333')
//
// addForm.addEventListener('submit', e => {
//     e.preventDefault();
//
//     const formData = new FormData(addForm);
//     const object = {
//         roles:[]
//     };
//
//     formData.forEach((value, key) => {
//         if (key === "rolesId"){
//
//             const roleId = value.split(" ")[0];
//             const roleName = value.split(" ")[1];
//             const role = {
//                 id : roleId,
//                 name : roleName
//             };
//             object.roles.push(role);
//         } else {
//             object[key] = value;
//         }
//     });
//     console.log('Form submitted');
//     console.log(role.value)
//
//     fetch("admin/api/", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(user = {
//             name: username.value,
//             lastName: surname.value,
//             age: age.value,
//             email: email.value,
//             password: password.value,
//             roles: object.roles
//         })
//     }).then(()=> getUsers())
//         .then(() => addForm.reset())
//


//
const addForm = document.getElementById("addForm333");
addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(addForm);
    const object = {
        roles:[]
    };

    formData.forEach((value, key) => {
        if (key === "rolesId"){

            const roleId = value.split(" ")[0];
            const roleName = value.split(" ")[1];
            const role = {
                id : roleId,
                name : roleName
            };
            object.roles.push(role);
        } else {
            object[key] = value;
        }
    });

    fetch("admin/api/", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(user = {
            name: this.name3.value,
            lastName: this.lastName.value,
            age: this.age.value,
            email: this.email.value,
            password: this.password.value,
            roles: object.roles
        })
    })
        .then(() => getUsers())
        .then(() => addForm.reset());


    return show('Page1','Page2');

})