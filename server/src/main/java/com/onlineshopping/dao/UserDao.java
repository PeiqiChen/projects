package com.onlineshopping.dao;

import com.onlineshopping.entity.Order;
import com.onlineshopping.entity.Permission;
import com.onlineshopping.entity.User;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class UserDao extends AbstractHibernateDao<User> {


    public UserDao() {
        setClazz(User.class);
    }

    public void setUserActive(User user, boolean isActive) {
        user.setActive(isActive);
    }

    public Optional<User> loadUserByUsername(String username){
        return this.getAll().stream().filter(user -> username.equals(user.getUsername())).findAny();
    }

    public User getUserById(int id) {
        return this.findById(id);
    }

    public List<User> getAllUsers() {
        return this.getAll();
    }

    public void addUser(User user) {
        this.add(user);
    }

    public void deleteUser(User user) {
        this.delete(user);
    }

    public List<Permission> getAllPermission(User user) {return user.getPermissions();}

    public List<Order> getAllOrderForUser(User user) {return user.getOrders();}
}
