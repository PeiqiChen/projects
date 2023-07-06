package com.onlineshopping.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="Product")
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "product_id")
    private Integer id;

    @Column
    private String description;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false, name = "retail_price")
    private double retailPrice;

    @Column(nullable = false, name = "wholesale_price")
    private double wholesalePrice;

    @JsonManagedReference
    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER, cascade = CascadeType.ALL) // LAZY because ibernate.loader.MultipleBagFetchException: cannot simultaneously fetch multiple bags
    @ToString.Exclude
    private List<OrderItem> orderItems = new ArrayList<>();
    public void addItems(OrderItem item) {
        this.orderItems.add(item);
        item.setProduct(this);
    }

    @JsonManagedReference
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL) // LAZY because ibernate.loader.MultipleBagFetchException: cannot simultaneously fetch multiple bags
    @ToString.Exclude
    private List<WatchList> watchLists = new ArrayList<>();
    public void addWatchList(WatchList watchList) {
        this.watchLists.add(watchList);
        watchList.setProduct(this);
    }
}
