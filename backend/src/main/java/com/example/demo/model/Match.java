package com.example.demo.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Document(collection = "match")
public class Match {
	
    @Id
    private String id;

    @Field("id_usuario")
    private String idUsuario;
    
    @Field("familiaId")
    private String familiaId;
    
    @DBRef
	private Usuario familiaAcolhedora;
	
    @DBRef
	private Imigrante familiaImigrante;
}