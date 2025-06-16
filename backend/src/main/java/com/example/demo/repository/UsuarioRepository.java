package com.example.demo.repository;

import com.example.demo.model.Usuario;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    Usuario findByEmail(String email);
    boolean existsByEmail(String email);
    List<Usuario> findByAprovado(boolean aprovado);
    List<Usuario> findByAprovadoTrueAndQuartosDisponiveisGreaterThanEqual(int quartosDisponiveis);
        @Query("{ 'id' : ?0 }")
    Optional<Usuario> findById(String id);
    
    // Método para atualizar campos específicos
    @Query("{ 'id' : ?0 }")
    void updateUsuarioFields(String id, String nomeCompleto, String email, String cpf, String tipoMoradia);

}