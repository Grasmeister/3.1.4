package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
        if (roleService.listRoles().isEmpty()) {
            roleService.addRole(new Role("ADMIN"));
            roleService.addRole(new Role("USER"));
        }
    }

    /**
     * Админ панель
     *
     * @param model
     * @return
     */
    @GetMapping()
    public String userList(Model model, Principal principal) {

        model.addAttribute("users", userService.allUsers());
        model.addAttribute("roles", roleService.listRoles());
        model.addAttribute("admin", userService.findUserByName(principal.getName()));
        model.addAttribute("newUser", new User());

        return "/admin";
    }

    /**
     * Удаления пользователя из админ панели.
     *
     * @param id
     * @return
     */
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }

    /**
     * Создание пользователя пост запрос.
     *
     * @param user
     * @return
     */
    @PostMapping("/create")
    public String createUser(@ModelAttribute("user") User user) {

        userService.saveUser(user);
        return "redirect:/admin";
    }

    @PostMapping("/update/{id}")
    public String updateUser(@ModelAttribute("user") User user, @RequestParam(value = "role") String role) {
        user.setRoles(roleService.findRolesByName(role));
        userService.updateUser(user);
        return "redirect:/admin";
    }

}
