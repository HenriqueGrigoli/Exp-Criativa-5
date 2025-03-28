package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/imigrantes")
@CrossOrigin(origins = "http://localhost:3000")
public class ImigranteController {
    private final ImigranteRepository repository;

    public ImigranteController(ImigranteRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Imigrante cadastrarImigrante(@RequestBody Imigrante imigrante) {
        return repository.save(imigrante);
    }
}
