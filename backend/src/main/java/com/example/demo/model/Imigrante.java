package com.example.demo.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@Document(collection = "imigrantes")
public class Imigrante {
    @Id
    private String id;
    
    @Field("familia_id")
    private String familiaId;
    
    @Field("nome_completo")
    private String nomeCompleto;
    
    @Field("data_nascimento")
    private LocalDate dataNascimento;
    
    @Field("genero")
    private String genero;  // Pode ser enum: MASCULINO, FEMININO, OUTRO, PREFIRO_NAO_DIZER
    
    @Field("pais_origem")
    private String paisOrigem;
    
    @Field("idiomas")
    private List<String> idiomas;
    
    @Field("possui_documento")
    private boolean possuiDocumento;
    
    @Field("tipo_documento")
    private String tipoDocumento;  // Passaporte, RG, Certidão de Nascimento, etc
    
    @Field("numero_documento")
    private String numeroDocumento;
    
    @Field("data_chegada")
    private LocalDate dataChegada;
    
    @Field("situacao_migratoria")
    private String situacaoMigratoria;  // Refugiado, solicitante de refúgio, etc
    
    @Field("necessidades_especiais")
    private List<String> necessidadesEspeciais;  // Saúde, psicológica, jurídica, etc
    
    @Field("saude")
    private Saude saude;  // Subdocumento para informações de saúde
    
    @Field("contato")
    private Contato contato;
    
    @Field("ativo")
    private boolean ativo = true;
    
    @Field("observacoes")
    private String observacoes;
    
    @Field("data_cadastro")
    private LocalDate dataCadastro = LocalDate.now();
    
    // Classe interna para informações de saúde
    @Setter
    @Getter
    public static class Saude {
        @Field("condicoes_medicas")
        private List<String> condicoesMedicas;
        
        @Field("medicamentos_uso")
        private List<String> medicamentosUso;
        
        @Field("necessidade_tratamento_continuo")
        private boolean necessidadeTratamentoContinuo;
        
        @Field("alergias")
        private List<String> alergias;
        
        @Field("tipo_sanguineo")
        private String tipoSanguineo;
    }
    
    // Classe interna para informações de contato
    @Setter
    @Getter
    public static class Contato {
        @Field("telefone")
        private String telefone;
        
        @Field("email")
        private String email;
        
        @Field("endereco")
        private String endereco;
        
        @Field("contato_emergencia")
        private String contatoEmergencia;
        
        @Field("telefone_emergencia")
        private String telefoneEmergencia;
    }
}