package com.example.demo.repository;

import com.example.demo.model.Imigrante;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImigranteRepository extends MongoRepository<Imigrante, String> {

    // Busca imigrantes por família
    List<Imigrante> findByFamiliaId(String familiaId);

    // Busca imigrantes ativos
    List<Imigrante> findByAtivoTrue();

    // Busca imigrantes inativos
    List<Imigrante> findByAtivoFalse();

    // Busca imigrantes por país de origem
    List<Imigrante> findByPaisOrigem(String paisOrigem);

    // Busca imigrantes que possuem documento
    List<Imigrante> findByPossuiDocumentoTrue();

    // Busca imigrantes por situação migratória
    List<Imigrante> findBySituacaoMigratoria(String situacaoMigratoria);
    
    // Busca imigrantes por nome (contendo o termo, case insensitive)
    List<Imigrante> findByNomeCompletoContainingIgnoreCase(String nome);

	List<Imigrante> findAllByFamiliaId(String idFamiliaImigrante);
}