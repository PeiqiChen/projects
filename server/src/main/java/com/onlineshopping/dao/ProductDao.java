package com.onlineshopping.dao;
import com.onlineshopping.entity.Product;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

@Repository
public class ProductDao extends AbstractHibernateDao<Product>{
    public ProductDao() {setClazz(Product.class);}

    public void addProduct(Product product) {this.add(product);}
    public void deleteProduct(Product product) {this.delete(product);}

    public Optional<Product> getProductById(int product_id) {
        return getAllProduct().stream()
                .filter(product -> product.getId() == product_id)
                .findAny();
    }
    public List<Product> getAllProduct() {
        return this.getAll();
    }

    public List<Product> getAllInStockProduct() {
        // get in-stock product
        return this.getAll().stream().filter(product -> product.getQuantity() > 0).collect(Collectors.toList());
    }
}
