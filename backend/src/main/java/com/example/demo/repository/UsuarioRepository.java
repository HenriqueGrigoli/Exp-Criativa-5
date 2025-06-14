package com.example.demo.repository;

import com.example.demo.model.Usuario;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    Usuario findByEmail(String email);
    boolean existsByEmail(String email);
    List<Usuario> findByAprovado(boolean aprovado);
    List<Usuario> findByAprovadoTrueAndQuartosDisponiveisGreaterThanEqual(int quartosDisponiveis);
}