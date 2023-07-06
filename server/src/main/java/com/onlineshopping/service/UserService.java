package com.onlineshopping.service;

import com.onlineshopping.dao.UserDao;
import com.onlineshopping.entity.Order;
import com.onlineshopping.entity.Permission;
import com.onlineshopping.entity.User;
import com.onlineshopping.exception.UserException;
import com.onlineshopping.security.AuthUserDetail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

//import javax.transaction.Transactional;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {
    private UserDao userDao;
    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Transactional
    public List<User> getAllUsers() {
        List<User> users =  userDao.getAllUsers();
        return users;
    }

    @Transactional
    public User getUserById(int id) {
        return userDao.getUserById(id);
    }

    @Transactional
    public void deleteUserById(int id) {
        User user = userDao.getUserById(id);
        if(user == null) return;
        userDao.deleteUser(user);
    }

    @Transactional
    public void createUser(User... users) {
        for (User u : users) {
            userDao.addUser(u);
        }
    }
    @Transactional
    public void setUserActiveById(int id, boolean isActive) {
        User user = userDao.getUserById(id);
        if(user == null) return;
        userDao.setUserActive(user, isActive);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOptional = userDao.loadUserByUsername(username);
        if (!userOptional.isPresent()){
            throw new UsernameNotFoundException("Username does not exist");
        }

        User user = userOptional.get(); // database user
        //getAuthoritiesFromUser
        return AuthUserDetail.builder() // spring security's userDetail
                .username(user.getUsername())
                .password(new BCryptPasswordEncoder().encode(user.getPassword()))
                .authorities(getAuthoritiesFromUser(user))
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .enabled(true)
                .build();
    }

    @Transactional
    public List<GrantedAuthority> getAuthoritiesFromUser(User user){
        List<GrantedAuthority> userAuthorities = new ArrayList<>();

        for (Permission permission :  userDao.getAllPermission(user)){
            userAuthorities.add(new SimpleGrantedAuthority(permission.getValue()));
        }

        return userAuthorities;
    }

    @Transactional
    public List<Order> getOrderFromUser(String username){
        User u= userDao.getAll().stream()
                .filter(user -> user.getUsername().equals(username)).collect(Collectors.toList()).get(0);
        for(Order o: u.getOrders()) o.getOrderStatus();
        return u.getOrders();
    }
    @Transactional
    public Optional<User> validateRegister(String newuserName) {
        Optional<User> userOptional = userDao.loadUserByUsername(newuserName);
        return userOptional;
    }

        @Transactional
    public Optional<User> validateLogin(String username, String password) throws UserException{
        Optional<User> possibleUser =  userDao.getAllUsers().stream()
                .filter(user -> user.getUsername().equals(username)
                        && user.getPassword().equals(password) && user.isActive())
                .findAny();
        if(possibleUser.isPresent()) {
            return possibleUser;
        } else {
            Optional<User> u =  userDao.getAllUsers().stream()
                    .filter(user -> user.getUsername().equals(username))
                    .findAny();
            if(!u.isPresent()) throw new UserException("User "+username+" does not exist.");
            else {
                if(!u.get().getPassword().equals(password)) throw new UserException("Invalid password.");
                if(!u.get().isActive()) throw new UserException("Inactive user.");
            }
            return possibleUser;
        }
    }



}
