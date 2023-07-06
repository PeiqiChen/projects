package com.onlineshopping.dto.product;
import lombok.*;


@Data
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Integer id;
    private String description;
    private String name;
    private int quantity;
    private double purchasedPrice;
}
