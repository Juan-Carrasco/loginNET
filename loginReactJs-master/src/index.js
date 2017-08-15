import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';

function MasterRow(props) {
	return (
		<div style={{border:"1px solid black", margin:"10px"}} className="MasterRow" onClick={props.onClick}>
		{props.number}	{props.value}					
		</div>
		);
}

function MasterGrid(props){
	var numrows = props.list.length;
	var rows = [];
	for(let i=0; i < numrows; i++) {
		rows.push(<MasterRow value={props.list[i].Nombre} number={i} onClick={() => props.onRowClick(props.list[i].Id)}/>);
	}
	return <div> {rows} </div>;
}



class Master extends React.Component{

	constructor(){
		super();
		this.state = {
			lista :"",
			previousModificador :0
		}
	}

	componentDidMount(){
		$.ajax({
			url:"http://localhost:57470/api/Personas",
			method:"GET"})
		.done(this.binding)
		.fail(function(data){
			alert("ERROR EN EL GET ALL");
		});
	}

	componentDidUpdate(){
		if(this.state.previousModificador!=0){
			$.ajax({
				url:"http://localhost:57470/api/Personas",
				method:"GET"})
			.done(this.binding)
			.fail(function(data){
				alert("ERROR EN EL GET ALL");
			});
		}
	}

	shouldComponentUpdate(){
		if(this.props.modificador > this.state.previousModificador){
			this.setState({previousModificador:this.props.modificador});
			return true;
		}
		else{
			return false;
		}
	}
	binding = (data)=>{
		this.setState({lista:data});
	}
	render(){
		return(
			<div style={{width:"50%"}} id="maestro">
			<MasterGrid  key = {this.props.modificador} list={this.state.lista} onRowClick= {(x)=>this.props.onItemClick(x)}/>
			</div>
			)
	}


}

class Formulario extends React.Component{

	constructor(){
		super();
		this.state = {
			actual:{
				name:"",
				apellidos:"",
				edad:""

			},	
			previous:{
				name:"",
				apellidos:"",
				edad:""
			},
			id:2,
			modificador:1
			
		}
		
	}

	baseURL = "http://localhost:57470/api/Personas/";

	chooseDetail=(i)=>{
		this.setState({id:i});
		let url = ` http://localhost:57470/api/Personas/${i}`
		$.ajax({
			url:url,
			method:"GET",})
		.done(this.binding)
		.fail(function(data){
			alert("ERROR EN EL GET DETAIL");
		});
	}
	componentDidMount(){
	}


	binding= (datos)=>{
		this.setState({actual:{name:datos.Nombre,
			apellidos:datos.Apellido,
			edad:datos.Edad},
			previous:{name:datos.Nombre,
				apellidos:datos.Apellido,
				edad:datos.Edad}});

		//document.getElementById("botonLimpiar").disabled = false;
		//document.getElementById("botonPut").disabled = false;
	}


	submitPut =()=>{
		let url = ` http://localhost:57470/api/Personas/${this.state.id}`
		$.ajax({
			url:url,
			method:"PUT",
			data:{
				Id:this.state.id,
				Nombre:this.state.actual.name,
				Apellido:this.state.actual.apellidos,
				Edad:this.state.actual.edad
			}})
		.done(this.updatePrevious)
		.fail(function(data){
			alert("ERROR EN EL PUT");
		});
	}

	updatePrevious=()=>{
		this.setState({
			previous:{
				name:this.state.actual.name,
				apellidos:this.state.actual.apellidos,
				edad:this.state.actual.edad
			}
		});
	}
	submitClean = () =>{
		this.setState({actual:{name:this.state.previous.name,
			apellidos:this.state.previous.apellidos,
			edad:this.state.previous.edad}});
	}

	restartMaster =() =>{
		this.setState({modificador:this.state.modificador+1});
	}
	submitPost=()=>{
		$.ajax({
			url:"http://localhost:57470/api/Personas",
			method:"POST",
			data:{
				Nombre:this.state.actual.name,
				Apellido:this.state.actual.apellidos,
				Edad:this.state.actual.edad}})
		.done(this.restartMaster)
		.fail(function(data){
			alert("ERROR EN EL POST");
		});

	}
	setDetailDefault=()=>{
		this.setState({actual:{name:"",
			apellidos:"",
			edad:""}});
	}
	submitDelete =()=>{
		let url = ` http://localhost:57470/api/Personas/${this.state.id}`
		$.ajax({
			url:url,
			method:"DELETE",
		})
		.done(this.setDetailDefault, this.restartMaster)
		.fail(function(data){
			alert("ERROR EN EL DELETE");
		});
	}
	render=()=>{
		return(
			<div id="raiz" style={{width:"100%"}}>
			<div style={{width:"50%", float:"right"}} id="Formulario">
			<p>Nombre:</p>
			<input id="nameInput" onInput={this.checkForm} value={this.state.actual.name}></input>
			<br/>
			<p>Apellidos:</p>
			<input id="apellidoInput" onInput={this.checkForm} value={this.state.actual.apellidos}	></input>
			<br/>
			<p>Edad</p>
			<input type="number" id="edadInput" onInput={this.checkForm} value={this.state.actual.edad}></input>
			<br/>
			<button id="botonPut" onClick={this.submitPut}>Actualizar</button>
			<button id="botonLimpiar" onClick={this.submitClean}>Limpiar</button>
			<br/>
			<button id="botonCrear" onClick={this.submitPost}>Crear</button>
			<button id="botonDelete" onClick={this.submitDelete}>Borrar</button>
			</div>
			<Master modificador ={this.state.modificador} onItemClick ={this.chooseDetail}/>
			</div>
			)
	}

	checkForm = (evt) =>{
		switch (evt.target.id) {
			case "nameInput":
			var name = evt.target.value;
			if(name.length <= 20){

				this.setState({actual:{name:name,apellidos:this.state.actual.apellidos,edad:this.state.actual.edad}});
			}				
			break;
			case "apellidoInput":
			var apellidos = evt.target.value;
			if(apellidos.length <= 20){

				this.setState({actual:{name:this.state.actual.name, apellidos:apellidos, edad:this.state.actual.edad}});
			}
			break;
			case "edadInput":
			var edad = evt.target.value;
			if(edad>=0 && edad<=150){

				this.setState({actual:{name:this.state.actual.name, apellidos:this.state.actual.apellidos, edad:edad}});
			}
			break;
			default:
			// code...
			break;
		}
	}

}


ReactDOM.render(<Formulario />, document.getElementById('root'));

////////////////////////
/* FALTA/DUDAS

	-	FALTA: Cuando borro o creo uno,  se renderiza cuando hago el siguiente evento.






*/