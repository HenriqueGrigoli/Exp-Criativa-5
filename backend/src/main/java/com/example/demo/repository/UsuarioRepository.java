package com.example.demo.repository;

import com.example.demo.model.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {

    Usuario findByEmail(String email);
    boolean existsByEmail(String email);
}
