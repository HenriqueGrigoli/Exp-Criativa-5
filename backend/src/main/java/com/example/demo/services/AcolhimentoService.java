package com.example.demo.services;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AcolhimentoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Optional<Usuario> recomendarMelhorFamilia(int membrosImigrante, List<String> idiomasImigrante, boolean necessidadesEspeciais) {
        // Get all families first (since we don't have findByAprovado)
        List<Usuario> todasFamilias = usuarioRepository.findAll();
        
        // Filter approved families in memory
        List<Usuario> familiasAprovadas = todasFamilias.stream()
                .filter(Usuario::isAprovado)
                .collect(Collectors.toList());

        if (familiasAprovadas.isEmpty()) {
            return Optional.empty();
        }

        // Apply all other filters
        List<Usuario> familiasFiltradas = familiasAprovadas.stream()
                .filter(f -> f.getAntecedentesCriminais() != null && 
                            f.getAntecedentesCriminais().equalsIgnoreCase("nao"))
                .filter(f -> f.getQuartosDisponiveis() != null && 
                            f.getQuartosDisponiveis() >= calcularQuartosNecessarios(membrosImigrante))
                .filter(f -> f.getBanheiros() >= calcularBanheirosNecessarios(membrosImigrante))
                .filter(f -> rendaSuficiente(f.getRendaFamiliar(), 
                                           f.getPessoasDependentes(), 
                                           membrosImigrante))
                .collect(Collectors.toList());

        if (familiasFiltradas.isEmpty()) {
            return Optional.empty();
        }

        // Sorting logic remains the same
        return familiasFiltradas.stream()
                .sorted(Comparator
                        .comparingInt(Usuario::getQuartosDisponiveis).reversed()
                        .thenComparing(f -> -calcularCompatibilidadeIdiomas(f.getIdiomasFalados(), idiomasImigrante))
                        .thenComparingInt(Usuario::getBanheiros).reversed()
                        .thenComparing(this::parseRenda).reversed()
                        .thenComparing(f -> f.getExperienciaPrevia() != null && 
                                           !f.getExperienciaPrevia().isEmpty() ? 1 : 0).reversed()
                )
                .findFirst();
    }

    // Rest of the helper methods remain the same...
    private int calcularQuartosNecessarios(int membrosImigrante) {
        return (int) Math.ceil(membrosImigrante / 2.0);
    }

    private int calcularBanheirosNecessarios(int membrosImigrante) {
        return Math.max(1, (int) Math.ceil(membrosImigrante / 4.0));
    }

    private boolean rendaSuficiente(String rendaStr, int dependentes, int membrosImigrantes) {
        try {
            double renda = parseRenda(rendaStr);
            double rendaMinima = 2000 + (dependentes * 500) + (membrosImigrantes * 800);
            return renda >= rendaMinima;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private double parseRenda(Usuario familia) {
        return parseRenda(familia.getRendaFamiliar());
    }

    private double parseRenda(String rendaStr) {
        try {
            return Double.parseDouble(rendaStr.replaceAll("[^\\d.]", ""));
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    private int calcularCompatibilidadeIdiomas(List<String> idiomasFamilia, List<String> idiomasImigrante) {
        if (idiomasImigrante == null || idiomasImigrante.isEmpty()) {
            return 0;
        }
        
        return (int) idiomasImigrante.stream()
                .filter(idioma -> idiomasFamilia != null && idiomasFamilia.contains(idioma))
                .count();
    }
}