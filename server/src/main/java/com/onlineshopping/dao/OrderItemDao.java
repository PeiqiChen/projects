package com.onlineshopping.dao;
import com.onlineshopping.entity.Order;
import com.onlineshopping.entity.OrderItem;
import com.onlineshopping.entity.Product;
import com.onlineshopping.exception.ProductException;
import org.aspectj.weaver.ast.Or;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;
@Repository
public class OrderItemDao extends AbstractHibernateDao<OrderItem> {
    public OrderItemDao() {setClazz(OrderItem.class);}
    public void addOrderItem(OrderItem orderItem) {this.add(orderItem);}

    public List<OrderItem> getAllOrderItem() {return this.getAll();}
}
