package com.example.demo.repository;

import com.example.demo.model.Imigrante;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ImigranteRepository extends MongoRepository<Imigrante, Integer> {

    Imigrante findByid(Integer id);
}
