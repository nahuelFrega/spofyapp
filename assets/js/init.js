function init() {
    
    console.log('pagina lista');
    recorrer_ls();
    comprueba_favorito()
}


// Busca ARTISTAS por NOMBRE en la API de Spotify
$("#btn_buscar_artista").click(function() {
    
    console.log('entro a buscar artistas');
    
    var artista             = $("#buscar_artista").val();
    var tipo                = 'artist';
    var api_method          = 'POST';
    var api_datatype        = 'JSON';
    
    $.ajax({
        url: 'https://platzi-music-api.now.sh/search?q=' + artista + '&type=' + tipo,
        method: api_method,
        datatype: api_datatype,
        success: function(data) {
            
            //debugger;
            
            
            // Guarda el resultado de la busqueda en una variable
            var array_artistas = data.artists.items;
            
            $('#grilla_artistas').empty();
            $('#grilla_artistas').append(mostrar_resultado_artistas(array_artistas));
            
        },
        error: function() {
            
            console.log('Error');
        
        } 
    });
});


// Funcion para agregar a favoritos los artistas elegidos en la pantalla "Buscador"
function agregar_favoritos(id_artista) {
    
    console.log('entro a favoritos');
    
    var array_fav = [];
    var id_ls = "id" + id_artista;
    
    array_fav.push(id_artista);
    
    localStorage.setItem(id_ls, JSON.stringify(id_artista));
    
    consultar_artistas_fav(array_fav);
}


// Funcion que recorre el localStorage para luego mostrar en la pantalla "Favoritos" los artistas favoritos
function recorrer_ls() {
    
    var localStorage_info;
    var array_favoritos = [];
    
    for (var i = 0; i < localStorage.length; i++) {
        localStorage_info = JSON.parse(localStorage.getItem(localStorage.key(i)));
        array_favoritos.push(localStorage_info);
    }
    
    consultar_artistas_fav(array_favoritos);
}


// La funcion conuslta por NOMBRE de ARTISTA usando como datos lo almacenado en el localStorage
function consultar_artistas_fav(array_favoritos) {
    
    console.log('entro a buscar artistas favoritos: ' + array_favoritos);     
        
    var id_artistas         = array_favoritos;
    var api_method          = 'POST';
    var api_datatype        = 'JSON';

    $.ajax({
        url: 'https://platzi-music-api.now.sh/artists?ids=' + id_artistas,
        method: api_method,
        datatype: api_datatype,
        success: function(data) {

            //debugger;

            // Guarda el resultado de la busqueda en una variable
            var array_artistas_favoritos = data.artists;
            
            $('#grilla_favoritos').empty();
            $('#grilla_favoritos').append(mostrar_favoritos(array_artistas_favoritos));

        },
        error: function() {

            console.log('Error');

        } 
    });
}


// Busca en la API albumes usando como dato el ID de ARTISTA
function buscar_album_por_artista(id_artista) {
    
    console.log('entro a buscar albumes');
    
    var api_method          = 'POST';
    var api_datatype        = 'JSON';
    
    $.ajax({
        url: 'https://platzi-music-api.now.sh/artists/' + id_artista + '/albums',
        method: api_method,
        datatype: api_datatype,
        success: function(data) {
            
            //debugger;
            
            // Guarda en una variable el array artistas
            var array_albumes = data.items;
            
            $('#grilla_albumes').empty();
            $('#grilla_albumes').append(mostrar_resultado_albumes(array_albumes));
            
            // acomoda las grillas para mostrar los albumes
            $('#grilla_favoritos').slideUp(); // oculta la grilla de favoritos 
            $('#grilla_albumes').slideDown(); // muestra la grilla albumes 
        },
        error: function() {
            
            console.log('Error');
        
        } 
    });
}


// Busca en la API el detalle de un album usando el ID del ALBUM
function buscar_detalle_album(id_album,imagen_album,nombre_album) {
    
    console.log('entro a buscar albumes: ' + imagen_album + ' ' + nombre_album);
    
    var api_method          = 'POST';
    var api_datatype        = 'JSON';
    
    $.ajax({
        url: 'https://platzi-music-api.now.sh/albums/' + id_album + '/tracks',
        method: api_method,
        datatype: api_datatype,
        success: function(data) {
            
            //debugger;
            console.log('entre al detalle');
            
            // Guarda en una variable el resultado de la consulta
            var array_detalle_album = data.items;
            
            $('#grilla_album_contenido').empty();
            $('#grilla_album_contenido').append(mostrar_detalle_album(array_detalle_album));
        },
        error: function() {
            
            console.log('Error');
        
        } 
    });
}


// Funcion para eliminar artistas de Favoritos
function borrar_artista_fav(id_artista) {
    
    console.log('entro a borrar favorito: ' + id_artista);
    
    localStorage.removeItem(localStorage.key(id_artista));
    recorrer_ls();
}


// Funcion para comprobar si el artista ya esta en favoritos
function comprueba_favorito(id_artista) {
    
    var localStorage_info;
    var array_favoritos = [];
    
    for (var i = 0; i < localStorage.length; i++) {
        localStorage_info = JSON.parse(localStorage.getItem(localStorage.key(i)));
        array_favoritos.push(localStorage_info);
    }
    
    var resultado = array_favoritos.indexOf(id_artista);
    
    return resultado;
}


// Cierra la grilla de albumes
function cerrar_album() {

    // acomoda las grillas para mostrar los albumes
    $('#grilla_favoritos').slideDown(); // muestra la grilla de favoritos 
    $('#grilla_albumes').slideUp(); // oculta la grilla albumes
    
    // remueve append
    $('#grilla_albumes').empty();
}