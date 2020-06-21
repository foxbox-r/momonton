import React, {Component,useState} from 'react';
//import React, {useState} from 'react';

//import Subject from "./component/Subject";
import './App.css';

function get_day(){//월/일/요일 반환
    let day;
    switch (new Date().getDay()) {
case 0:
    day = "Sunday";
    break;
case 1:
    day = "Monday";
    break;
case 2:
    day = "Tuesday";
    break;
case 3:
    day = "Wednesday";
    break;
case 4:
    day = "Thursday";
    break;
case 5:
    day = "Friday";
    break;
case 6:
    day = "Saturday";
}
    return (new Date().getMonth()+1)+":"+(new Date().getDate())+":"+(day);
}

function get_time(){//시/분/초 반환
    return (new Date().getHours())+":"+(new Date().getMinutes())+":"+(new Date().getSeconds()<10?"0"+new Date().getSeconds():new Date().getSeconds());
}

function set_time(){//스태이스 변경
        this.setState({
            time:get_time()
        });
    }

function mk_list_obj(id,desc){
    return {id:id,desc:desc};
}

function get_lc_storage(name){
    return JSON.parse(localStorage.getItem(name));
}

function set_lc_storage(name,desc){
    localStorage.setItem(name,desc);
}

function update_list(id,desc){
    let prev_list = get_lc_storage("list");
    if(prev_list === null)//처음 만든 상황
    {
        let list = JSON.stringify([mk_list_obj((id===null)?0:id,desc)]);
        set_lc_storage("list",list);
        set_lc_storage("max_id",1);
    } 
    else// 이미 리스트가 있는 상황
    {
        let item = mk_list_obj(id,desc);//리스트에 들어갈 객체 생성
        let max_id = get_lc_storage("max_id");
        prev_list.push(item);
        set_lc_storage("list",JSON.stringify(prev_list));
        set_lc_storage("max_id",max_id+1);
    }
}

class Clock extends Component{
    constructor(props){
        super(props);
        this.state = {
            day:get_day(),
            time:get_time(),
        };
    }

    componentDidMount(){
        setInterval(set_time.bind(this),1000);
    }
    
    render(){
        return (
            <div id="time_box">
                <p id="time_box_day">{this.state.day}</p>
                <h1 id="time_box_time">{this.state.time}</h1>
            </div>
        );
    }
}

class ToDo extends Component{
    constructor(props){
        super(props);
        this.state = {
            todo_list:get_lc_storage("list"),
        };
    }
    
    on_submit(e){
        let title = e.target.title;
        let max_id = get_lc_storage("max_id");
        update_list(max_id,title.value);
        title.value = "";
        let get_list = get_lc_storage("list");
        this.setState({todo_list:get_list});
    }
    
    x_event(e){
        let id = e.target.dataset.id;
        let prev_list = this.state.todo_list;
        for(let i=0;i<prev_list.length;i++){
            let todo = prev_list[i];
            if(todo.id == id){
                prev_list.splice(i,1);
                break;
            }
        }
        set_lc_storage("list",JSON.stringify(prev_list));
        this.setState({
            todo_list:get_lc_storage("list"),
        });
    }
    
    mk_list(){
        let html = [];
        let list = this.state.todo_list;//no
//        let list = get_lc_storage("list");
        
        if(list !== null){
            for(let i=0;i<list.length;i++){
                let todo = list[i];
                let tag = 
<li key={i}>
    <a className="x_but" data-id={todo.id} href={"/x/"+todo.id} onClick={(e)=>{e.preventDefault();this.x_event(e);}}><span className="sp_1"></span><span className="sp_2"></span></a>
    <a className="do_list" href={"/todo_list/"+todo.id} onClick={(e)=>{e.preventDefault();}}>{todo.desc}</a>
</li>;
                html.push(tag);
            }
            return html;
        }
    }
    
    render(){
        return (
            <div id="_todo">
                <h1 id="todo_header">todo_list(foxbox_r)</h1>
                <form autocomplete='off' onSubmit={function(e){e.preventDefault();this.on_submit(e);}.bind(this)}>
                    <input name="title" type="text" placeholder="Write a To Do Here." />
                </form>
                <ul>
                    {this.mk_list()}
                </ul>
            </div>
        );
    }
}

class App extends Component {
    
    constructor(props){
        super(props);
        
    }
    
   
    render(){
 
        
      return (
        <div className="comp" className="App">
            <Clock />
            <ToDo />
        </div>
      );
    }
}

export default App;
