package com.onlineshopping.dto.product;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.web.bind.annotation.RequestParam;


@Data
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductCreationRequest {
    @NotNull(message = "name cannot be blank")
    String name;
    @NotBlank(message = "description cannot be blank")
    String description;
    @NotBlank(message = "wholesalePrice cannot be blank")
    double wholesalePrice;
    @NotBlank(message = "retailPrice cannot be blank")
    double retailPrice;
    @NotBlank(message = "quantity cannot be blank")
    int quantity;
}