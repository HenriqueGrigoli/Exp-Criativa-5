package com.example.demo.services;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Imigrante;
import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;

@Service
public class AcolhimentoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> recomendarMelhorFamilia(Imigrante imigrante) {
    	
        // Get all families first (since we don't have findByAprovado)
        List<Usuario> familiasAprovadas = usuarioRepository.findByAprovado(true);

	     // Apply all other filters
        List<Usuario> familiasFiltradas = familiasAprovadas.stream().map(f -> {f.setPontuacao(calcularPontuacao(f, imigrante)); return f;}).collect(Collectors.toList());
        familiasFiltradas.sort(Comparator.comparingInt(Usuario::getPontuacao).reversed());

       return familiasFiltradas;

    }
    
    private Integer calcularPontuacao(Usuario usuario, Imigrante imigrante) {
    	Integer pontuacao = 0;
		List<String> idiomasImigrante =  imigrante.getIdiomas();
		boolean necessidadesEspeciais = (imigrante.getNecessidadesEspeciais() == null || imigrante.getNecessidadesEspeciais().size() ==0);
		
    	
    	int membrosImigrante =  imigrante.getFamiliaId().length();
    	
    	if (usuario.getQuartosDisponiveis() != null && 
    			usuario.getQuartosDisponiveis() >= calcularQuartosNecessarios(membrosImigrante)) {
    		pontuacao += 20;
    	}
    	
    	if(usuario.getBanheiros() >= calcularBanheirosNecessarios(membrosImigrante)) {
    		pontuacao += 20;
    	}
    	
    	if( rendaSuficiente(usuario.getRendaFamiliar(), 
    			usuario.getPessoasDependentes(), 
                membrosImigrante)) {
    		pontuacao += 20;
    	}
    	
    	
    	return pontuacao;
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
            double renda = (rendaStr==null?0:parseRenda(rendaStr));
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