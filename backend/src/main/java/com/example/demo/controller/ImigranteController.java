package com.example.demo.controller;

import com.example.demo.model.AcolhimentoHelper;
import com.example.demo.model.Imigrante;
import com.example.demo.model.Usuario;
import com.example.demo.repository.ImigranteRepository;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.services.AcolhimentoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

@RestController
@RequestMapping("/api/imigrantes")
@CrossOrigin(origins = "*")
public class ImigranteController {

	private final ImigranteRepository repository;
	private final Path fileStorageLocation;
	private final ObjectMapper objectMapper;
    private final AcolhimentoService acolhimentoService;
    private final UsuarioRepository usuarioRepository;
    

	public ImigranteController(ImigranteRepository repository, ObjectMapper objectMapper, AcolhimentoService acolhimentoService, UsuarioRepository usuarioRepository) {
		this.repository = repository;
		this.objectMapper = objectMapper;
		this.fileStorageLocation = Paths.get("uploads/imigrantes").toAbsolutePath().normalize();
		this.acolhimentoService = acolhimentoService;
		this.usuarioRepository = usuarioRepository;

		try {
			Files.createDirectories(this.fileStorageLocation);
		} catch (Exception ex) {
			throw new RuntimeException("Não foi possível criar o diretório para uploads.", ex);
		}
	}

	// Cadastra um imigrante (com opção de upload de documento)
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> criarImigrante(@RequestPart("imigrante") String imigranteJson,
			@RequestPart(value = "documento", required = false) MultipartFile arquivo) {

		try {
			Imigrante imigrante = objectMapper.readValue(imigranteJson, Imigrante.class);

			if (arquivo != null && !arquivo.isEmpty()) {
				String originalFileName = StringUtils.cleanPath(arquivo.getOriginalFilename());
				String fileExtension = originalFileName.contains(".")
						? originalFileName.substring(originalFileName.lastIndexOf("."))
						: "";
				String fileName = UUID.randomUUID() + fileExtension;

				Path targetLocation = this.fileStorageLocation.resolve(fileName);
				Files.copy(arquivo.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
				imigrante.setNumeroDocumento(fileName); // Armazena o nome do arquivo como número do documento
			}

			Imigrante imigranteSalvo = repository.save(imigrante);
			return ResponseEntity.status(HttpStatus.CREATED).body(imigranteSalvo);

		} catch (IOException ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Erro ao processar arquivo: " + ex.getMessage());
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body("Erro ao cadastrar imigrante: " + ex.getMessage());
		}
	}

	// Endpoint para download de documentos
	@GetMapping("/uploads/{filename:.+}")
	public ResponseEntity<Resource> servirDocumento(@PathVariable String filename) {
		try {
			Path filePath = this.fileStorageLocation.resolve(filename).normalize();
			Resource resource = new UrlResource(filePath.toUri());

			if (resource.exists()) {
				return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM)
						.header(HttpHeaders.CONTENT_DISPOSITION,
								"attachment; filename=\"" + resource.getFilename() + "\"")
						.body(resource);
			} else {
				return ResponseEntity.notFound().build();
			}
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	// Lista todos os imigrantes
	@GetMapping
	public ResponseEntity<List<Imigrante>> listarTodosImigrantes() {
		List<Imigrante> imigrantes = repository.findAll();
		for (Imigrante imigrante : imigrantes) {
			if(imigrante.getIdUsuarioAcolhedor() != null) {
				Usuario usuario = usuarioRepository.findById(imigrante.getIdUsuarioAcolhedor()).get();
				imigrante.setUsuarioAcolhedor(usuario.getNomeCompleto());
			}
		}
		return ResponseEntity.ok(imigrantes);
	}

	// Busca imigrante por ID
	@GetMapping("/{id}")
	public ResponseEntity<Imigrante> buscarPorId(@PathVariable String id) {
		Optional<Imigrante> imigrante = repository.findById(id);
		return imigrante.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	// Atualiza um imigrante
	@PutMapping("/{id}")
	public ResponseEntity<Imigrante> atualizarImigrante(@PathVariable String id,
			@RequestBody Imigrante imigranteAtualizado) {
		if (repository.existsById(id)) {
			imigranteAtualizado.setId(id);
			Imigrante imigranteSalvo = repository.save(imigranteAtualizado);
			return ResponseEntity.ok(imigranteSalvo);
		}
		return ResponseEntity.notFound().build();
	}

	// Desativa um imigrante (em vez de deletar)
	@PatchMapping("/{id}/desativar")
	public ResponseEntity<Imigrante> desativarImigrante(@PathVariable String id) {
		Optional<Imigrante> imigranteOptional = repository.findById(id);
		if (imigranteOptional.isPresent()) {
			Imigrante imigrante = imigranteOptional.get();
			imigrante.setAtivo(false);
			repository.save(imigrante);
			return ResponseEntity.ok(imigrante);
		}
		return ResponseEntity.notFound().build();
	}

	// Deleta um imigrante (se necessário)
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletarImigrante(@PathVariable String id) {
		if (repository.existsById(id)) {
			repository.deleteById(id);
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}

	@PatchMapping("/{id}/ativar")
	public ResponseEntity<Imigrante> ativarImigrante(@PathVariable String id) {
		Optional<Imigrante> imigranteOptional = repository.findById(id);
		if (imigranteOptional.isPresent()) {
			Imigrante imigrante = imigranteOptional.get();
			imigrante.setAtivo(true);
			repository.save(imigrante);
			return ResponseEntity.ok(imigrante);
		}
		return ResponseEntity.notFound().build();
	}

	@PatchMapping("/{id}/atribuir-familia")
	public ResponseEntity<Imigrante> atribuirFamilia(@PathVariable String id, @RequestParam String familiaId) {

		Optional<Imigrante> imigranteOptional = repository.findById(id);
		if (imigranteOptional.isPresent()) {
			Imigrante imigrante = imigranteOptional.get();
			imigrante.setFamiliaId(familiaId);
			repository.save(imigrante);
			return ResponseEntity.ok(imigrante);
		}
		return ResponseEntity.notFound().build();
	}
	
    // Novo endpoint para recomendar famílias acolhedoras
    @GetMapping("/recomendar/{id}")
    public ResponseEntity<List<Usuario>> recomendarFamiliaAcolhedora(@PathVariable String id) {
    	Optional<Imigrante> imigrantes = repository.findById(id);
    	
    	List<Usuario> listaFamiliasAcolhedores = acolhimentoService.recomendarMelhorFamilia(imigrantes.get());
     
        return ResponseEntity.ok(listaFamiliasAcolhedores);
    }
    
    // Novo endpoint para recomendar famílias acolhedoras
    @GetMapping("/associar/{idFamiliaImigrante}/{idFamiliaAcolhedora}")
    public ResponseEntity<?> associarFamiliaAcolhedora(@PathVariable String idFamiliaImigrante, @PathVariable String idFamiliaAcolhedora) {
    	List<Imigrante> imigrantes = repository.findAllByFamiliaId(idFamiliaImigrante);
    	
    	for (Imigrante imigrante : imigrantes) {
    		 imigrante.setIdUsuarioAcolhedor(idFamiliaAcolhedora);
		}
    	repository.saveAll(imigrantes);
     
        return ResponseEntity.ok(true);
    }
}