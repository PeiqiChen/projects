package com.onlineshopping.controller;

import com.onlineshopping.domain.request.LoginRequest;
import com.onlineshopping.domain.response.LoginResponse;
import com.onlineshopping.dto.common.DataResponse;
import com.onlineshopping.dto.user.UserCreationRequest;
import com.onlineshopping.entity.User;
import com.onlineshopping.exception.UserException;
import com.onlineshopping.response.ErrorResponse;
import com.onlineshopping.security.AuthUserDetail;
import com.onlineshopping.security.JwtProvider;
import com.onlineshopping.service.LoginService;
import com.onlineshopping.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Optional;

@RestController
public class LoginController {
    private AuthenticationManager authenticationManager;
    private LoginService loginService;
    private UserService userService;

    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }
    @Autowired
    public void setLoginService(LoginService loginService) {
        this.loginService = loginService;
    }


    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    private JwtProvider jwtProvider;

    @Autowired
    public void setJwtProvider(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    //User trying to log in with username and password
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) throws UserException{
        System.out.printf("login... for %s %s\n", request.getUsername(), request.getPassword());


        Optional<User> possibleUser = loginService.validateLogin(request.getUsername(), request.getPassword());
        if(!possibleUser.isPresent()) {
            LoginResponse response = LoginResponse.builder()
                    .message("user not exist")
                    .build();
            return ResponseEntity.internalServerError().body(response);
        }
        if(!possibleUser.get().getUsername().equals(request.getUsername())) {
            LoginResponse response = LoginResponse.builder()
                    .message("user not exist")
                    .build();
            return ResponseEntity.internalServerError().body(response);
        }
        if(!possibleUser.get().getPassword().equals(request.getPassword())) {
            LoginResponse response = LoginResponse.builder()
                    .message("user not exist")
                    .build();
            return ResponseEntity.internalServerError().body(response);
        }
        if(!possibleUser.get().isActive()) {
            LoginResponse response = LoginResponse.builder()
                    .message("user not exist")
                    .build();
            return ResponseEntity.internalServerError().body(response);
        }

        Authentication authentication;
//        List<> auth = new String[]
//        if(request.getRole().toLowerCase().equals("Admin"))

        //Try to authenticate the user using the username and password
        try{
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        } catch (AuthenticationException e){
            e.printStackTrace();
            throw new BadCredentialsException("Provided credential is invalid.");
        }

        System.out.print("authentication: ");
        System.out.println(authentication);
        //Successfully authenticated user will be stored in the authUserDetail object
        AuthUserDetail authUserDetail = (AuthUserDetail) authentication.getPrincipal(); //getPrincipal() returns the user object

        //A token wil be created using the username/email/userId and permission
        String token = jwtProvider.createToken(authUserDetail);

        //Returns the token as a response to the frontend/postman
        LoginResponse response = LoginResponse.builder()
                    .message("Welcome " + authUserDetail.getUsername())
                    .token(token)
                    .build();
        return ResponseEntity.ok(response);
    }


}
