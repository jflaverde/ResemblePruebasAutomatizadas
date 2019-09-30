const cypress = require('cypress');
const fs = require('fs');
const resemble = require("./resemble");
const compare = require("resemblejs").compare;
module.exports={
	//var fs = require('file-system');
	
	cantidadCarpetas:function()
	{
		let files = fs.readdirSync('./ComparerRows');
		return files;
	},

	moverArchivos:function()
	{
		this.runCypress();
		this.ArchivosCarpetas();
	},

	ArchivosCarpetas:function()
	{
		var carpetas=[];
		let rutaPrincipal ='./ComparerRows/';
		let files=this.cantidadCarpetas();
		let rutaArchivos=[];
		//leo las carpetas
		files.forEach(carpeta => {
			let ruta= rutaPrincipal + carpeta;
			let filesCarpeta = fs.readdirSync(ruta);
			let rutaCarpetas=[];
			//leo los archivos
			filesCarpeta.forEach(archivo =>{
				//convierto el nombre en una ruta
				archivo=rutaPrincipal + carpeta + '/' + archivo;
				rutaCarpetas.push(archivo);
			})
			rutaArchivos.push(rutaCarpetas);
			carpetas.push(filesCarpeta);
			
		});
		
		console.log(rutaArchivos);
		return rutaArchivos;
	},

	populateTable:function()
	{
			let rutaArchivos = this.ArchivosCarpetas();
			rutaArchivos.forEach(element => {
				/* document.body.innerHTML="<tr>";
				document.body.innerHTML="<td><img src=" + element[0] + "></td>" 
				document.body.innerHTML="<td><img src="+ element[1]+ "></td>"  
				document.body.innerHTML="<td><img src=" + element[2] +"></td>"
				document.body.innerHTML="</tr>"*/
				console.log(element[0]);
				console.log(element[1]);
				console.log(element[2]);
			});
	},


	compareImages:function(image1, image2, options) {
		return new Promise((resolve, reject) => {
			resemble.compare(image1, image2, options, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	},

	runCypress:function(){
		cypress.run({
		spec: './cypress/integration/simple-spect.js'
		})
		.then((results) => {
		console.log(results)
		let rutaNueva=this.rutaArchivo();
		let image1=rutaNueva + '/ImagenA.png';
		let image2=rutaNueva + '/ImagenB.png';

		this.getDiff(rutaNueva,image1,image2);


		//console.log(getDiff());

		})
		.catch((err) => {
		console.error(err)
		});
	},


	//Funcion para crear la estructura de archivos y carpetas del comparador
	rutaArchivo:function() {
		//crear carpeta
		if(!fs.existsSync('./ComparerRows'))
		{
			fs.mkdirSync('./ComparerRows');
		}
		let files = fs.readdirSync('./ComparerRows');
		let cantidad=files.length + 1;
		//generar la carpeta de la fila
		let rutaNueva='./ComparerRows/' + cantidad
		fs.mkdirSync(rutaNueva);
		//leer archivos -- copiar archivos
		fs.copyFileSync('./cypress/screenshots/simple-spect.js/imagenA.png',rutaNueva + '/imagenA.png');
		fs.copyFileSync('./cypress/screenshots/simple-spect.js/imagenB.png',rutaNueva + '/imagenB.png');
		console.log('archivos copiados a: ' + rutaNueva);
		return rutaNueva;
	},

	getDiff:function(ruta,image1,image2) {
		let newRuta=ruta + "/output.png";

		resemble(image1).compareTo(image2).ignoreLess().onComplete(function(data){
			fs.writeFileSync(newRuta, data.getBuffer());	
			console.log(data);
		});
		this.cantidadCarpetas();
		//fs.writeFileSync(newRuta, data.getBuffer());
	}
}


