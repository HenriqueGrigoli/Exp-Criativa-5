package com.example.demo.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Setter
@Getter
@Document(collection = "imigrantes")
public class Imigrante {
    @Id
    private String id;
    private String idFamilia;
    private String nome;
    private String nacionalidade;
    private String genero;
    private Date dtaNascimento;
    private Date dtaRecebimento;
    private String idioma;

//    Constructor
    public Imigrante(String nome, String nacionalidade, String genero, String idioma) {
        this.nome = nome;
        this.nacionalidade = nacionalidade;
        this.genero = genero;
        this.idioma = idioma;
    }

}
