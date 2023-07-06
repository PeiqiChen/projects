package com.onlineshopping.controller;

import com.onlineshopping.domain.response.LoginResponse;
import com.onlineshopping.dto.common.DataResponse;
import com.onlineshopping.entity.User;
import com.onlineshopping.dto.user.UserCreationRequest;
import com.onlineshopping.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Controller
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    @ResponseBody
    public DataResponse getAllUser() {

        System.out.println("gettign users");
        List<User> data = userService.getAllUsers();
        System.out.println("back in /users");
        // getAuthoritiesFromUser
        System.out.println("/users");
        return DataResponse.builder()
                .success(true)
                .message("Success")
                .data(data)
                .build();
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<DataResponse> addUser(@Valid @RequestBody UserCreationRequest request, BindingResult result) {
        System.out.println(request.getPassword());
        System.out.println(request.toString());
        System.out.println(result.toString());


        if (result.hasErrors()) {
            DataResponse res =  DataResponse.builder()
                    .success(false)
                    .message("Something went wrong")
                    .build();
            return ResponseEntity.badRequest().body(res);
        }
        String usrname = request.getUsername();
        Optional<User> pu = userService.validateRegister(usrname);
        if(pu.isPresent()) {
            DataResponse res = DataResponse.builder()
                    .success(false)
                    .message("Username exists")
                    .build();
            return ResponseEntity.badRequest().body(res);
        }


        User user = User.builder()
                .username(request.getUsername())
                .firstName(request.getName().split(" ")[0])
                .lastName(request.getName().split(" ")[1])
                .password(request.getPassword())
                .isActive(true)
                .build();

        userService.createUser(user);

        DataResponse res = DataResponse.builder()
                .success(true)
                .message("Success")
                .build();
        return ResponseEntity.ok(res);
    }


    @DeleteMapping("/user")
    @ResponseBody
    public DataResponse deleteUser(@Valid @RequestParam(value = "id") Integer request) {

        userService.deleteUserById(request);

        return DataResponse.builder()
                .success(true)
                .message("Success")
                .build();
    }

    @PatchMapping("/user/{id}")
    @ResponseBody
    public DataResponse activeOrSuspendUser(@Valid @RequestParam(value = "status") boolean request, @PathVariable int id) {

        userService.setUserActiveById(id, request);

        return DataResponse.builder()
                .success(true)
                .message("Success")
                .build();
    }

    @GetMapping("/user")
    @ResponseBody
    public DataResponse getUserById(@Valid @RequestParam(value = "id") Integer request) {
        User user = userService.getUserById(request);
        if(user == null)
            return DataResponse.builder()
                    .success(false)
                    .message("No such user")
                    .build();
        return DataResponse.builder()
                .success(true)
                .message("Success")
                .data(user)
                .build();
    }



}
