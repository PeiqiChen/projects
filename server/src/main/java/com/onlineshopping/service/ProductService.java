package com.onlineshopping.service;
import com.onlineshopping.dao.*;
import com.onlineshopping.dto.product.ProductCreationRequest;
import com.onlineshopping.dto.product.ProductUpdateRequest;
import com.onlineshopping.entity.*;
import com.onlineshopping.exception.ProductException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private ProductDao productDao;
    @Autowired
    public void setProductDao(ProductDao productDao) {this.productDao = productDao;}

    private UserDao userDao;
    @Autowired void setUserDao(UserDao userDao) {this.userDao = userDao;}

    private OrderDao orderDao;
    @Autowired void setOrderDao(OrderDao orderDao) {this.orderDao = orderDao;}

    private WatchListDao watchListDao;
    @Autowired void setWatchListDao(WatchListDao watchListDao) {this.watchListDao = watchListDao;}

    private OrderItemDao orderItemDao;
    @Autowired void setOrderItemDao(OrderItemDao orderItemDao) {this.orderItemDao = orderItemDao;}

    @Transactional
    public void purchaseProduct(String username, int pId, int quantity) throws ProductException{
        Optional<Product> possibleProduct = productDao.getProductById(pId);

        if(possibleProduct.isPresent()) {
            Product product = possibleProduct.get();
            if(product.getQuantity() < quantity)
                throw new ProductException("Not enough stock for "+quantity+ " "+product.getName()+".");
            else {
                // reduce product quntity
                // add a new order with date
                // add new orderitem current price
                product.setQuantity(product.getQuantity() - quantity);
                Order newOrder = new Order(orderDao.getAll().size()+1,
                        new Date(),
                        "Processing",
                        userDao.loadUserByUsername(username).get(),
                        new ArrayList<OrderItem>());
                orderDao.addOrder(newOrder);
                OrderItem newOrderItem = new OrderItem(
                        orderItemDao.getAllOrderItem().size(),
                        product.getWholesalePrice(),
                        quantity,
                        product.getWholesalePrice(),
                        newOrder,
                        product
                        );
                orderItemDao.add(newOrderItem);
            }
        }
    }
    @Transactional
    public List<Product> getAllInStockProduct() {
        List<Product> products = productDao.getAllInStockProduct();
        for(Product p: products) {
            for(WatchList w: p.getWatchLists()) w.getId(); // force watchlist to fetch, do nothing
        }
        return products;
    }
    @Transactional
    public Product getProductById(int product_id) throws ProductException{
        Optional<Product> possibleProd = productDao.getProductById(product_id);
        if(possibleProd.isPresent()) {
            for(WatchList w: possibleProd.get().getWatchLists()) w.getId(); // force watchlist to fetch, do nothing
            return possibleProd.get();
        } else throw new ProductException("No such product");
    }

    @Transactional
    public Product updateProduct(int pid, ProductUpdateRequest productUpdateRequest) {
        Product p = productDao.getProductById(pid).get();
        for(WatchList watchList: p.getWatchLists()) watchList.getId(); // force load
        if(productUpdateRequest.getDescription() != null)p.setDescription(productUpdateRequest.getDescription());
        if(productUpdateRequest.getWholesalePrice() != 0) p.setWholesalePrice(productUpdateRequest.getWholesalePrice());
        if(productUpdateRequest.getRetailPrice() != 0)p.setRetailPrice(productUpdateRequest.getRetailPrice());
        if(productUpdateRequest.getQuantity() != 0)p.setQuantity(productUpdateRequest.getQuantity());
        return p;
    }
    @Transactional
    public void deleteProduct(int pid) {
        Product p = productDao.getProductById(pid).get();
        productDao.deleteProduct(p);
    }
    @Transactional
    public Product createProduct(ProductCreationRequest request) throws ProductException {
        String name = request.getName();

        Optional<Product>exist = productDao.getAllProduct().stream().filter(product -> product.getName().equals(name)).findAny();
        if(exist.isPresent()) throw new ProductException("Product "+name+" has already exist.");
        else{
            Product product = new Product(
                    productDao.getAllProduct().size(),
                    request.getDescription(),
                    name,
                    request.getQuantity(),
                    request.getRetailPrice(),
                    request.getWholesalePrice(),
                    new ArrayList<OrderItem>(),
                    new ArrayList<WatchList>());
            productDao.addProduct(product);
            return product;
        }
    }

    @Transactional
    public Order getOrderById(int order_id) throws ProductException {
        Optional<Order> possibleOrder = orderDao.getOrderById(order_id);
        if(possibleOrder.isPresent()) {
            for(OrderItem oi: possibleOrder.get().getOrderItems()) {
                Product p = oi.getProduct(); // force load
                p.getDescription();
            }
            return possibleOrder.get();
        } else throw new ProductException("No such order");
    }

    @Transactional
    public void modifyOrderStatus(int order_id, String status) throws ProductException{
        Order order = orderDao.getOrderById(order_id).get();
        status = status.toLowerCase();
        String preStatus = order.getOrderStatus().toLowerCase();
        if(status.toLowerCase().equals("cancel")) {
            if(preStatus.equals("completed")) throw new ProductException("Cannot cancel completed order.");
            else {
                // set order status
                // gather all orderitem and put back in stock
                order.setOrderStatus(status);
                List<OrderItem> orderItems = order.getOrderItems();
                for(OrderItem oi: orderItems) {
                    Product product = oi.getProduct();
                    int quantity = oi.getQuantity();
                    product.setQuantity(product.getQuantity() + quantity);
                }
            }
        } else if(preStatus.toLowerCase().equals(status)){
            System.out.println();
            throw new ProductException("The order has already "+status+" status.");
        }else {
            order.setOrderStatus(status);
        }

    }

    @Transactional
    public List<WatchList> getWatchListForUser(String username) {
        return watchListDao.getWatchListForUser(username);
    }

    @Transactional
    public void addWatchList(String username, int product_id) throws ProductException{
        Optional<WatchList> prexist = watchListDao.getAll().stream()
                .filter(watchList -> watchList.getUser().getUsername().equals(username)
                        && watchList.getProduct().getId().equals(product_id))
                .findAny();
        Product p = productDao.getProductById(product_id).get();
        if(p.getQuantity() <= 0) throw new ProductException("Product " +p.getName()+" out of stock.");
        User u = userDao.loadUserByUsername(username).get();
        if(prexist.isPresent()) throw new ProductException("Product " +p.getName()+" has already in your watchlist.");
        else {
            WatchList watchList = new WatchList(watchListDao.getAll().size()+1, u,p);
            watchListDao.addToWatchList(watchList);
        }
    }

    @Transactional
    public void deleteWatchList(String username, int product_id) throws ProductException{
        Optional<WatchList> prexist = watchListDao.getAll().stream()
                .filter(watchList -> watchList.getUser().getUsername().equals(username)
                        && watchList.getProduct().getId().equals(product_id))
                .findAny();

        if(prexist.isPresent()) {
            watchListDao.deleteWatchList(prexist.get());
        } else {
            throw new ProductException("Cannot find in watchlist");
        }
    }

    @Transactional
    public LinkedHashMap<Product, Double> calculateProfit(int top_n) {
        Map<Product, Double> map = new HashMap<>();
        for(Product product: productDao.getAllProduct()) {
            double profit = 0;
            for(OrderItem orderItem: product.getOrderItems()) {
                if(orderItem.getOrder().getOrderStatus().equalsIgnoreCase("completed"))
                    profit += (orderItem.getPurchasedPrice() - orderItem.getWholesalePrice()) * orderItem.getQuantity();
            }
            map.put(product,profit);
        }


        LinkedHashMap<Product, Double> sortedMap = new LinkedHashMap<>();
        ArrayList<Double> list = new ArrayList<>();
        for (Map.Entry<Product, Double> entry : map.entrySet()) {
            list.add(entry.getValue());
        }
        Collections.sort(list, new Comparator<Double>() {
            public int compare(Double o, Double o1) {
                return (o1).compareTo(o);
            }
        });
        int n = 0;
        top_n = Math.min(top_n, list.size());
        for (int i = 0; i < top_n; ++i) {
            Double d =list.get(i);
            for (Map.Entry<Product, Double> entry : map.entrySet()) {
                if (entry.getValue().equals(d)) {
                    sortedMap.put(entry.getKey(), d);
                }
            }
        }
        for(Map.Entry<Product, Double> entry: sortedMap.entrySet()) {
            System.out.print(entry.getKey().getName());
            System.out.println(entry.getValue());
        }
        return sortedMap;
    }



    @Transactional
    public LinkedHashMap<Product, Integer> calculatePopularity(int top_n) {
        Map<Product, Integer> map = new HashMap<>();
        for(Product product: productDao.getAllProduct()) {
            int popularity = 0;
            for(OrderItem orderItem: product.getOrderItems()) {
                if(orderItem.getOrder().getOrderStatus().equalsIgnoreCase("completed"))
                    popularity += orderItem.getQuantity();
            }
            map.put(product,popularity);
        }


        LinkedHashMap<Product, Integer> sortedMap = new LinkedHashMap<>();
        ArrayList<Integer> list = new ArrayList<>();
        for (Map.Entry<Product, Integer> entry : map.entrySet()) {
            list.add(entry.getValue());
        }
        Collections.sort(list, new Comparator<Integer>() {
            public int compare(Integer o, Integer o1) {
                return (o1).compareTo(o);
            }
        });
        int n = 0;
        top_n = Math.min(top_n, list.size());
        if(top_n == 0) top_n = list.size();
        for (int i = 0; i < top_n; ++i) {
            Integer d =list.get(i);
            for (Map.Entry<Product, Integer> entry : map.entrySet()) {
                if (entry.getValue().equals(d)) {
                    sortedMap.put(entry.getKey(), d);
                }
            }
        }
        for(Map.Entry<Product, Integer> entry: sortedMap.entrySet()) {
            System.out.print(entry.getKey().getName());
            System.out.println(entry.getValue());
        }
        return sortedMap;
    }
}
