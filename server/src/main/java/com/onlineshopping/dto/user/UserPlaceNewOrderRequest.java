package com.onlineshopping.dto.user;

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
public class UserPlaceNewOrderRequest {
    @NotNull(message = "product id cannot be blank")
    Integer productId;
    @NotBlank(message = "quantity cannot be blank")
    Integer quantity;
}