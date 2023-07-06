package com.onlineshopping.AOP;

import com.onlineshopping.exception.NoTokenException;
import com.onlineshopping.exception.ProductException;
import com.onlineshopping.exception.UserException;
import com.onlineshopping.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class MyExceptionHandler {

    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity handleException(Exception e){
        e.printStackTrace();
        return new ResponseEntity(ErrorResponse.builder().message("Different Message").build(), HttpStatus.OK);
    }

    @ExceptionHandler(value = {NoTokenException.class})
    public ResponseEntity handleNoTokenException(NoTokenException e){
        return new ResponseEntity(ErrorResponse.builder().message(e.getMessage()).build(), HttpStatus.OK);
    }

    @ExceptionHandler(value = {UserException.class})
    public ResponseEntity<ErrorResponse> handleDemoNotFoundException(UserException e){
        return new ResponseEntity(ErrorResponse.builder().message(e.getMessage()).build(), HttpStatus.OK);
    }

    @ExceptionHandler(value = {ProductException.class})
    public ResponseEntity<ErrorResponse> handleProductException(ProductException e){
        return new ResponseEntity(ErrorResponse.builder().message(e.getMessage()).build(), HttpStatus.OK);
    }

}