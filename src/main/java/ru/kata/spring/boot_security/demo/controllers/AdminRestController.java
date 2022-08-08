package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

//@RestController
//@RequestMapping("/admin")
public class AdminRestController {

    //    private PersonServiceImpl personService;
//    private PersonRepository personRepository;
    private RoleService roleService;
    private UserService userService;

    public AdminRestController(UserService userService, RoleService roleService) {
//        this.personService = personService;
        this.roleService = roleService;
        this.userService = userService;
//        this.personRepository = personRepository;

    }

    @GetMapping
    public List<User> ind() {
        return userService.allUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") User user) {
        return user;

    }

    @PostMapping("/create")
    public User createUser(@RequestBody User user) {
//
        return userService.saveUser(user);
    }

    @PutMapping("{id}")
    public User updateUser(@RequestBody User user,
                           @PathVariable("id") User userFromDB) {
        BeanUtils.copyProperties(user, userFromDB, "id");
//        userFromDB.setRoles(roleService.findRolesByName(role.getName()));
//        userService.updateUser(user);
//        User userUpdate = userService.findUserById(user.getId());
        return userService.saveUser(userFromDB);
    }


    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Long id) {

        userService.deleteUser(id);
    }


}
