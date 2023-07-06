package com.onlineshopping.dao;
import com.onlineshopping.entity.WatchList;
import com.onlineshopping.exception.ProductException;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

@Repository
public class WatchListDao extends AbstractHibernateDao<WatchList>{
    public WatchListDao() {setClazz(WatchList.class);}

    public List<WatchList> getAllWatchList() {
        return this.getAll();
    }

    public List<WatchList> getWatchListForUser(String username) {
        return this.getAll().stream().filter(
                watchList -> watchList.getUser().getUsername().equals(username)
        ).collect(Collectors.toList());
    }
    public void addToWatchList(WatchList watchList) {
        this.add(watchList);
    }
    public void deleteWatchList(WatchList watchList) {this.delete(watchList);}


}
