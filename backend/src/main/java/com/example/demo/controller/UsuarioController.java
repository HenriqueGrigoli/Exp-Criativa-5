package com.example.demo.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update; // Import adicionado
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.Imigrante;
import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.services.AcolhimentoService;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    private final UsuarioRepository repository;
    private final MongoTemplate mongoTemplate; // Adicionado para consultas mais complexas
    private final Path fileStorageLocation;
    private final ObjectMapper objectMapper;

    public UsuarioController(UsuarioRepository repository, 
                           MongoTemplate mongoTemplate,
                           ObjectMapper objectMapper) {
        this.repository = repository;
        this.mongoTemplate = mongoTemplate;
        this.objectMapper = objectMapper;
        this.fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();
        
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Não foi possível criar o diretório para uploads.", ex);
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> criarUsuario(
            @RequestPart("usuario") String usuarioJson,
            @RequestPart(value = "antecedentesCriminais", required = false) MultipartFile arquivo) {
        
        try {
            Usuario usuario = objectMapper.readValue(usuarioJson, Usuario.class);

            if (arquivo != null && !arquivo.isEmpty()) {
                String originalFileName = StringUtils.cleanPath(arquivo.getOriginalFilename());
                String fileExtension = originalFileName.contains(".") 
                    ? originalFileName.substring(originalFileName.lastIndexOf(".")) 
                    : "";
                String fileName = UUID.randomUUID() + fileExtension;
                
                Path targetLocation = this.fileStorageLocation.resolve(fileName);
                Files.copy(arquivo.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
                usuario.setAntecedentesCriminais(fileName);
            }

            Usuario usuarioSalvo = repository.save(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioSalvo);
            
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao processar arquivo: " + ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao cadastrar usuário: " + ex.getMessage());
        }
    }

    @GetMapping("/uploads/{filename:.+}")
        public ResponseEntity<Resource> servirArquivo(@PathVariable String filename) {
    try {
        Path filePath = this.fileStorageLocation.resolve(filename).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        
        if (resource.exists()) {
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}

    @GetMapping
        public ResponseEntity<List<Usuario>> listarTodosUsuarios() {
            List<Usuario> usuarios = repository.findAll();
            return ResponseEntity.ok(usuarios);
        }


    @PatchMapping("/{id}/aprovar")
    public ResponseEntity<Usuario> aprovarUsuario(@PathVariable String id) {
        Optional<Usuario> usuarioOptional = repository.findById(id);
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            usuario.setAprovado(true);
            repository.save(usuario);
            return ResponseEntity.ok(usuario);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}/rejeitar")
    public ResponseEntity<Void> rejeitarUsuario(@PathVariable String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/aprovados")
    public ResponseEntity<List<Usuario>> listarAprovados() {
        List<Usuario> usuarios = repository.findByAprovado(true);
        return ResponseEntity.ok(usuarios);
    }

    // Novo endpoint para atribuir família acolhedora a um imigrante
    @PatchMapping("/{familiaId}/atribuir/{imigranteId}")
    public ResponseEntity<Void> atribuirImigrante(
            @PathVariable String familiaId,
            @PathVariable String imigranteId) {
        
        // Atualiza o imigrante com a nova família acolhedora
        Query query = new Query(Criteria.where("id").is(imigranteId));
        Update update = new Update().set("familiaId", familiaId);
        mongoTemplate.updateFirst(query, update, Imigrante.class);
        
        return ResponseEntity.noContent().build();
    }

    // Novo endpoint para obter famílias acolhedoras com capacidade disponível
    @GetMapping("/com-capacidade")
    public ResponseEntity<List<Usuario>> listarComCapacidade(
            @RequestParam int membros) {
        
        // Calcula quartos necessários
        int quartosNecessarios = (int) Math.ceil(membros / 2.0);
        
        // Filtra famílias com quartos suficientes e aprovadas
        List<Usuario> familias = repository.findByAprovadoTrueAndQuartosDisponiveisGreaterThanEqual(quartosNecessarios);
        
        return ResponseEntity.ok(familias);
    }
}

