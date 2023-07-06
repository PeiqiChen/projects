package com.onlineshopping.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="Orders")
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "order_id")
    private Integer id;

    @Column(nullable = false, name ="date_placed")
    private Date datePlaced;

    @Column(name = "order_status", nullable = false)
    private String orderStatus;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonManagedReference
    @OneToMany(mappedBy = "order", fetch = FetchType.EAGER, cascade = CascadeType.ALL) // LAZY because ibernate.loader.MultipleBagFetchException: cannot simultaneously fetch multiple bags
    @ToString.Exclude
    private List<OrderItem> orderItems = new ArrayList<>();
    public void addItems(OrderItem item) {
        this.orderItems.add(item);
        item.setOrder(this);
    }


}
