		
$(document).ready(function(){

	var MasterDetail = new Vue({
		el: '#Master-Detail',
		data:{
			lista:[],
			currentPerson:{
				index:"",
				name:"",
				surname:"",
				age:""
			},
			previousPerson:{
				index:"",
				name:"",
				surname:"",
				age:""
			},
			read: true,
			menuChoice: "Personas"
		}, 
		computed:{
			disabledOnNoChange: function(){
				retorno = false;
				if(this.read){
					retorno = true;
				}
				else if(this.currentPerson.name != "" || this.currentPerson.name.localeCompare(this.previousPerson.name) == 0){
					retorno = true;
				}
				else if(this.currentPerson.surname != "" || this.currentPerson.surname.localeCompare(this.previousPerson.surname) == 0){
					retorno = true;
				}
				else if(this.currentPerson.age != "" || this.currentPerson.age.localeCompare(this.previousPerson.age) == 0){
					retorno = true;
				}
				return retorno;

			},
		},

		methods:{
			chooseMenu: function(menu){
				this.menuChoice = menu;
				this.read = this.read; // Esto es para que se recargue menuChoice. No se por que
				this.makeGetListRequest();
			},
			makeGetListRequest: function(){
				$.ajax(url="http://localhost:57470/api/" + this.menuChoice,
					method="GET")
				.done(this.submitGetListValues)
			},
			submitGetListValues: function(datos){
				this.lista = datos;
			},
			makeGetRequest: function(id){
				$.ajax(url="http://localhost:57470/api/" + this.menuChoice + "/" + id,
					method="GET")
				.done(this.submitDetailValues)
			},
			submitDetailValues: function(datos){
				this.currentPerson.index = datos.Id;
				this.currentPerson.name = datos.Nombre;
				this.currentPerson.surname = datos.Apellido;
				this.currentPerson.age = datos.Edad;
			},
			buttonAccept: function(){
				if(this.currentPerson.index==""){
					this.makePostRequest(this.currentPerson);
				}
				else{
					this.makePutRequest(this.currentPerson);

				}
			},
			makePutRequest: function(item){
				$.ajax({url:"http://localhost:57470/api/ " + this.menuChoice +"/" + item.index,
					method:"PUT",
					data: 	{Id: item.index,
						Nombre: item.name,
						Apellido: item.surname,
						Edad: item.age}})	
				.done(this.makeGetListRequest)
				.fail(function(){
					alert("ELEMENTO NO ACTUALIZADO");
				})
			},
			makePostRequest: function(item){
				$.ajax({url:"http://localhost:57470/api/" + this.menuChoice,
					method:"POST",
					data: 	{Nombre: item.name,
						Apellido: item.surname,
						Edad: item.age}})	
				.done(this.afterPostHandler)
				.fail(function(){
					alert("ELEMENTO NO CREADO");
				})
			},
			afterPostHandler: function(datos){
				this.makeGetListRequest();
				this.currentPerson.index = datos.Id;
				this.previousPerson.index = this.currentPerson.index;
				this.previousPerson.name = this.currentPerson.name;
				this.previousPerson.surname = this.currentPerson.surname;
				this.previousPerson.age = this.currentPerson.age;
			},
			computedClass: function (index) {
				classArray = "master-div-row ";
				if (this.currentPerson.index != "" && index == this.currentPerson.index) {
					classArray = classArray + "selected";
				}            

				return classArray;
			},
			readDetail: function(index){
				this.makeGetRequest(index);
				this.read = true;
			},
			updateDetail: function(index){
				this.makeGetRequest(index);
				this.previousPerson.index = this.currentPerson.index;
				this.previousPerson.name = this.currentPerson.name;
				this.previousPerson.surname = this.currentPerson.surname;
				this.previousPerson.age = this.currentPerson.age;
				this.read = false;
			},
			newDetail: function(index){
				this.read= false;
				this.currentPerson.index = "";
				this.currentPerson.name = "";
				this.currentPerson.surname = "";
				this.currentPerson.age = "";
			},
			deleteItem: function(index){
				$.ajax({url:"http://localhost:57470/api/ " + this.menuChoice +"/" + index,
					method:"DELETE"})	
				.done(this.makeGetListRequest)
				.fail(function(){
					alert("ELEMENTO NO BORRADO");
				})
			},
			buttonClean: function(){
				this.currentPerson.index = "";
				this.currentPerson.name = "";
				this.currentPerson.surname = "";
				this.currentPerson.age = "";
			},
			buttonReset: function(){
				this.currentPerson = this.previousPerson;
			},


		},
		created(){
			this.makeGetListRequest();

		},




	})

})		