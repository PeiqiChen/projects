package com.onlineshopping.controller;

import com.onlineshopping.dto.product.ProductResponse;
import com.onlineshopping.dto.common.DataResponse;
import com.onlineshopping.dto.user.UserPlaceNewOrderRequest;
import com.onlineshopping.entity.Order;
import com.onlineshopping.entity.OrderItem;
import com.onlineshopping.entity.Product;
import com.onlineshopping.exception.NoTokenException;
import com.onlineshopping.exception.ProductException;
import com.onlineshopping.security.AuthUserDetail;
import com.onlineshopping.security.JwtProvider;
import com.onlineshopping.service.ProductService;
import com.onlineshopping.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class OrderController {
    private final UserService userService;
    private final ProductService productService;
    public OrderController(UserService userService, ProductService productService) {
        this.userService = userService;
        this.productService = productService;
    }
    private JwtProvider jwtProvider;
    @Autowired
    public void setJwtProvider(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @GetMapping("/orders/all")
    @ResponseBody
    public ResponseEntity<DataResponse> getAllOrders(HttpServletRequest request) throws NoTokenException, UsernameNotFoundException {
        Optional<AuthUserDetail> authUserDetail = jwtProvider.resolveToken(request);
        String username = authUserDetail.get().getUsername();
        List<Order> orders = userService.getOrderFromUser(username);

        //Returns the token as a response to the frontend/postman
        DataResponse response = DataResponse.builder()
                .success(true)
                .message("Success")
                .data(orders)
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/orders")
    @ResponseBody
    public ResponseEntity<DataResponse> purchaseProduct(
            HttpServletRequest request, @RequestBody UserPlaceNewOrderRequest req) throws NoTokenException, UsernameNotFoundException, ProductException {
        Optional<AuthUserDetail> authUserDetail = jwtProvider.resolveToken(request);
        String username = authUserDetail.get().getUsername();

        productService.purchaseProduct(username, req.getProductId(), req.getQuantity());

        //Returns the token as a response to the frontend/postman
        DataResponse response = DataResponse.builder()
                .success(true)
                .message("Success")
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/orders/{id}")
    @ResponseBody
    public ResponseEntity<DataResponse> getOrderById(
            HttpServletRequest request, @PathVariable int id)
            throws NoTokenException, UsernameNotFoundException, ProductException {

        Optional<AuthUserDetail> authUserDetail = jwtProvider.resolveToken(request);
//        String username = authUserDetail.get().getUsername();
        Order order = productService.getOrderById(id);

        DataResponse response = DataResponse.builder()
                .success(true)
                .message("Success")
                .data(order)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/orderItems/{id}")
    @ResponseBody
    public ResponseEntity<DataResponse> getOrderItemByOrderId(
            HttpServletRequest request, @PathVariable int id)
            throws NoTokenException, UsernameNotFoundException, ProductException {

        Optional<AuthUserDetail> authUserDetail = jwtProvider.resolveToken(request);
//        String username = authUserDetail.get().getUsername();
        Order order = productService.getOrderById(id);
        List<ProductResponse> data= new ArrayList<>();
        for(OrderItem oi: order.getOrderItems()) {
            Product p = oi.getProduct();
            p.getName(); // force load
            data.add(new ProductResponse(p.getId(), p.getDescription(),
                    p.getName(), oi.getQuantity(), oi.getPurchasedPrice()));
        }

        DataResponse response = DataResponse.builder()
                .success(true)
                .message("Success")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/orders/{id}/{newStatus}")
    @ResponseBody
    public ResponseEntity<DataResponse> modifyOrderStatus(
            HttpServletRequest request,
            @PathVariable(name="id") int id,
            @PathVariable(name="newStatus") String newStatus )
            throws NoTokenException, UsernameNotFoundException, ProductException {

        Optional<AuthUserDetail> authUserDetail = jwtProvider.resolveToken(request);
//        String username = authUserDetail.get().getUsername();
        productService.modifyOrderStatus(id, newStatus);
//        order.setOrderStatus(newStatus);

        DataResponse response = DataResponse.builder()
                .success(true)
                .message("Success")
                .build();
        return ResponseEntity.ok(response);
    }


}
