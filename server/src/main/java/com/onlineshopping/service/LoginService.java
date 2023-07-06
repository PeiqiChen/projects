package com.onlineshopping.service;

import com.onlineshopping.dao.UserDao;
import com.onlineshopping.entity.User;
import com.onlineshopping.exception.UserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {
    private final UserService userService;

    @Autowired
    public LoginService(UserService userService) {this.userService = userService; }

    public Optional<User> validateLogin(String username, String password) throws UserException {
        return userService.validateLogin(username, password);
    }


}
