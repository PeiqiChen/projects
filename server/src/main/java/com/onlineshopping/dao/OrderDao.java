package com.onlineshopping.dao;
import com.onlineshopping.entity.Order;
import com.onlineshopping.entity.Product;
import com.onlineshopping.exception.ProductException;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

@Repository
public class OrderDao extends AbstractHibernateDao<Order>{
    public OrderDao() {setClazz(Order.class);}
    public void addOrder(Order order) {this.add(order);}

    public Optional<Order> getOrderById(int oId) {

        return this.getAll().stream().filter(order -> order.getId() == oId).findAny();
    }

    public void modifyOrderStatus(int oId, String status) throws ProductException{
        Optional<Order> possibleOrder = this.getAll().stream().filter(order -> order.getId() == oId).findAny();
        if(possibleOrder.isPresent()) {
            Order order = possibleOrder.get();
            order.setOrderStatus(status);
        } else throw new ProductException("Order do not exist.");
    }
    public List<Order> getAllOrder() {return this.getAll();}

}
