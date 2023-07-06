package com.onlineshopping.controller;
import com.onlineshopping.dto.common.DataResponse;
import com.onlineshopping.dto.product.ProductCreationRequest;
import com.onlineshopping.dto.product.ProductTopResponse;
import com.onlineshopping.dto.product.ProductUpdateRequest;
import com.onlineshopping.entity.Order;
import com.onlineshopping.entity.Product;
import com.onlineshopping.entity.User;
import com.onlineshopping.entity.WatchList;
import com.onlineshopping.exception.NoTokenException;
import com.onlineshopping.exception.ProductException;
import com.onlineshopping.security.AuthUserDetail;
import com.onlineshopping.security.JwtProvider;
import com.onlineshopping.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;

@RestController
public class ProductController {
    private final ProductService productService;
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    private JwtProvider jwtProvider;
    @Autowired
    public void setJwtProvider(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @GetMapping("/products/all")
    @ResponseBody
    public ResponseEntity<DataResponse> getAllInStockProduct(HttpServletRequest request) throws NoTokenException, UsernameNotFoundException {
        Optional<AuthUserDetail> authUserDetail = jwtProvider.resolveToken(request);
//        String username = authUserDetail.get().getUsername();
        List<Product> data = productService.getAllInStockProduct();

        //Returns the token as a response to the frontend/postman
        DataResponse response = DataResponse.builder()
                .success(true)
                .message("Success")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/products/{id}")
    @ResponseBody
    public ResponseEntity<DataResponse> getProductById(
            HttpServletRequest request, @PathVariable int id)
            throws NoTokenException, UsernameNotFoundException, ProductException {

        Optional<AuthUserDetail> authUserDetail = jwtProvider.resolveToken(request);
//        String username = authUserDetail.get().getUsername();
        Product product = productService.getProductById(id);

        DataResponse response = DataResponse.builder()
                .success(true)
                .message("Success")
                .data(product)
                .build();
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/products/{id}")
    @ResponseBody
    public ResponseEntity<DataResponse> updateProduct(
            HttpServletRequest request, @PathVariable int id, @RequestBody ProductUpdateRequest productUpdateRequest)
            throws NoTokenException, UsernameNotFoundException, ProductException {

        Optional<AuthUserDetail> authUserDetail = jwtProvider.resolveToken(request);
//        String username = authUserDetail.get().getUsername();
        Product p = productService.updateProduct(id, productUpdateRequest);

        DataResponse response = DataResponse.builder()
                .success(true)
                .message("Success")
                .data(p)
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/products")
    @ResponseBody
    public ResponseEntity<DataResponse> createProduct(
            HttpServletRequest request, @RequestBody ProductCreationRequest productCreationRequest)
            throws NoTokenException, UsernameNotFoundException, ProductException {

        Optional<AuthUserDetail> authUserDetail = jwtProvider.resolveToken(request);
        Product p = productService.createProduct(productCreationRequest);

        DataResponse response = DataResponse.builder()
                .success(true)
                .message("Success")
                .data(p)
                .build();
        return ResponseEntity.ok(response);
    }


    @GetMapping("/watchlist/products/all")
    @ResponseBody
    public ResponseEntity<DataResponse> getAllWatchlist(
            HttpServletRequest request)
            throws NoTokenException, UsernameNotFoundException, ProductException {

        Optional<AuthUserDetail> authUserDetail = jwtProvider.resolveToken(request);
        String username = authUserDetail.get().getUsername();
        List<WatchList> data = productService.getWatchListForUser(username);

        DataResponse response = DataResponse.builder()
                .success(true)
                .message("Success")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/watchlist/product/{id}")
    @ResponseBody
    public ResponseEntity<DataResponse> addWatchList(
            HttpServletRequest request, @PathVariable int id)
            throws NoTokenException, UsernameNotFoundException, ProductException {

        Optional<AuthUserDetail> authUserDetail = jwtProvider.resolveToken(request);
        String username = authUserDetail.get().getUsername();
        productService.addWatchList(username, id);
        DataResponse response = DataResponse.builder()
                .success(true)
                .message("Success")
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/watchlist/product/{id}")
    @ResponseBody
    public ResponseEntity<DataResponse> deleteWatchList(
            HttpServletRequest request, @PathVariable int id)
            throws NoTokenException, UsernameNotFoundException, ProductException {

        Optional<AuthUserDetail> authUserDetail = jwtProvider.resolveToken(request);
        String username = authUserDetail.get().getUsername();
        productService.deleteWatchList(username, id);
        DataResponse response = DataResponse.builder()
                .success(true)
                .message("Success")
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/products/{id}")
    @ResponseBody
    public ResponseEntity<DataResponse> deleteProduct(
            HttpServletRequest request, @PathVariable int id)
            throws NoTokenException, UsernameNotFoundException, ProductException {

        Optional<AuthUserDetail> authUserDetail = jwtProvider.resolveToken(request);
//        String username = authUserDetail.get().getUsername();
        productService.deleteProduct(id);
        DataResponse response = DataResponse.builder()
                .success(true)
                .message("Success")
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/products/profit/{top}")
    @ResponseBody
    public ResponseEntity<DataResponse> getTopProfitProduct(
            HttpServletRequest request, @PathVariable int top)
            throws NoTokenException, UsernameNotFoundException, ProductException{
        Optional<AuthUserDetail> authUserDetail = jwtProvider.resolveToken(request);
        String username = authUserDetail.get().getUsername();
        LinkedHashMap<Product, Double > map= productService.calculateProfit(top);
        List<ProductTopResponse> data = new ArrayList<>();
        for(Map.Entry<Product, Double> entry: map.entrySet()) {
            Product p = entry.getKey();
            data.add(new ProductTopResponse(p.getId(), p.getDescription(),p.getName(),entry.getValue()));
        }

        DataResponse response = DataResponse.builder()
                .success(true)
                .message("Success")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }
    // calculatePopularity

    @GetMapping("/products/popular/{top}")
    @ResponseBody
    public ResponseEntity<DataResponse> getTopPopularProduct(
            HttpServletRequest request, @PathVariable int top)
            throws NoTokenException, UsernameNotFoundException, ProductException{
        Optional<AuthUserDetail> authUserDetail = jwtProvider.resolveToken(request);
        String username = authUserDetail.get().getUsername();
        LinkedHashMap<Product, Integer > map= productService.calculatePopularity(top);
        List<ProductTopResponse> data = new ArrayList<>();
        for(Map.Entry<Product, Integer> entry: map.entrySet()) {
            Product p = entry.getKey();
            data.add(new ProductTopResponse(p.getId(), p.getDescription(),p.getName(),entry.getValue().intValue()));
        }

        DataResponse response = DataResponse.builder()
                .success(true)
                .message("Success")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }


}
