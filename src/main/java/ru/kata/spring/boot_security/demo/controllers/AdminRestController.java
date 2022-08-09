package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/admin/api/")
public class AdminRestController {

    private final UserService userService;

    @Autowired
    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<List<User>> getAllUser() {
        return ResponseEntity.ok(userService.allUsers());
    }

    @PostMapping()
    public ResponseEntity<List<User>> createUser(@RequestBody User user) {
//        System.out.println("VOT eto vxodit " + user.toString());
//
//
//        User userNew = new User();
//
//        userNew.setPassword(user.getPassword());
//        userNew.setEmail(user.getEmail());
//        userNew.setAge(user.getAge());
//        userNew.setLastName(user.getLastName());
//        userNew.setName(user.getName());
//        userNew.setRoles(user.getRoles());
////        User userAdd = user;
////        userAdd.setRoles(user.getRoles());
//        System.out.println("VOT eto peredaetsa " + userNew.toString());
        userService.saveUser(user);
        return ResponseEntity.ok(userService.allUsers());
    }

    @PutMapping()
    public ResponseEntity<List<User>> updateUser(@RequestBody User user) {
//        user.setRoles(user.getRoles());
//        userService.updateUser(user);
        System.out.println("VOT eto vxodit " + user.toString());


        userService.updateUser(user);
        return ResponseEntity.ok(userService.allUsers());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<User>> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(userService.allUsers());
    }
}