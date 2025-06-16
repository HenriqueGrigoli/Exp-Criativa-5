package com.example.demo.model;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


import java.util.List;
import java.util.ArrayList;

@Setter
@Getter
@Document(collection = "usuarios")
public class Usuario {
    @Id
    private String id;

    // Informações básicas
    @Field("nome_completo")
    private String nomeCompleto;

    @Field("email")
    private String email;

    @Field("telefone")
    private String telefone;

    @Field("cpf")
    private String cpf;

    // Informações residenciais
    @Field("tipo_moradia")
    private String tipoMoradia;

    @Field("tempo_residencia")
    private String tempoResidencia;

    @Field("endereco_completo")
    private String enderecoCompleto;

    @Field("quartos_disponiveis")
    private Integer quartosDisponiveis;

    @Field("banheiros")
    private int banheiros;

    // Situação financeira
    @Field("renda_familiar")
    private String rendaFamiliar;

    @Field("pessoas_dependentes")
    private int pessoasDependentes;

    // Documentação e compromisso
    @Field("aceita_visitas")
    private boolean aceitaVisitas;

    @Field("disponibilidade_treinamento")
    private boolean disponibilidadeTreinamento;

    @Field("periodo_minimo_acolhimento")
    private String periodoMinimoAcolhimento;

    @Field("antecedentes_criminais")
    private String antecedentesCriminais;

    // Motivação e perfil
    @Field("motivacao")
    private String motivacao;

    @Field("experiencia_previa")
    private String experienciaPrevia;

    @Field("idiomas_falados")
    private List<String> idiomasFalados = new ArrayList<>();

    @Field("aprovado")
    private boolean aprovado = false;
    
    @Transient
    private Integer pontuacao;

    public Usuario(String nomeCompleto, String email, String telefone, String cpf,
                   String tipoMoradia, String tempoResidencia, String enderecoCompleto,
                   int quartosDisponiveis, int banheiros, String rendaFamiliar,
                   int pessoasDependentes, boolean aceitaVisitas,
                   boolean disponibilidadeTreinamento, String periodoMinimoAcolhimento,
                   String antecedentesCriminais, String motivacao,
                   String experienciaPrevia, List<String> idiomasFalados, boolean aprovado) {
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.telefone = telefone;
        this.cpf = cpf;
        this.tipoMoradia = tipoMoradia;
        this.tempoResidencia = tempoResidencia;
        this.enderecoCompleto = enderecoCompleto;
        this.quartosDisponiveis = quartosDisponiveis;
        this.banheiros = banheiros;
        this.rendaFamiliar = rendaFamiliar;
        this.pessoasDependentes = pessoasDependentes;
        this.aceitaVisitas = aceitaVisitas;
        this.disponibilidadeTreinamento = disponibilidadeTreinamento;
        this.periodoMinimoAcolhimento = periodoMinimoAcolhimento;
        this.antecedentesCriminais = antecedentesCriminais;
        this.motivacao = motivacao;
        this.experienciaPrevia = experienciaPrevia;
        this.idiomasFalados = idiomasFalados != null ? idiomasFalados : new ArrayList<>();
        this.aprovado = aprovado;
    }
}